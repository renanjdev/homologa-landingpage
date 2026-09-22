import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FIRST_CONSENT_DECISION_EVENT,
  getConsent,
  setConsent,
  hasConsentDecision,
  initConsentedTrackers,
} from '../lib/consent';
import { usePresence } from '../lib/anim';

/**
 * Banner de consentimento de cookies (LGPD / ANPD): barra discreta no rodapé,
 * não-modal (não bloqueia o conteúdo atrás). Opt-in real: Pixel e Speed
 * Insights só carregam após o aceite; "Recusar" tem o mesmo peso visual de
 * "Aceitar" (sem dark pattern). Reabre pelo evento `open-cookie-preferences`.
 */

type Toggle = { analytics: boolean; marketing: boolean };

const Switch = ({
  checked,
  disabled,
  onChange,
  label,
  id,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
  id: string;
}) => (
  <button
    type="button"
    role="switch"
    id={id}
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full border border-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
      checked ? 'bg-coral border-coral/60' : 'bg-graphite'
    } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [toggles, setToggles] = useState<Toggle>({ analytics: false, marketing: false });

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const isFirstDecisionRef = useRef(!hasConsentDecision());
  const presence = usePresence(open, 280);

  // Boot: sobe trackers já consentidos e decide se o banner aparece sozinho.
  useEffect(() => {
    initConsentedTrackers();
    if (!hasConsentDecision()) setOpen(true);

    const reopen = () => {
      const current = getConsent();
      setToggles({
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      });
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener('open-cookie-preferences', reopen);
    return () => window.removeEventListener('open-cookie-preferences', reopen);
  }, []);

  // Foco inicial no diálogo ao abrir.
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => firstFocusRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
  }, [open, showPrefs]);

  const close = useCallback(() => {
    setOpen(false);
    setShowPrefs(false);
  }, []);

  const announceFirstDecision = useCallback(() => {
    if (!isFirstDecisionRef.current) return;
    isFirstDecisionRef.current = false;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(
      () => window.dispatchEvent(new Event(FIRST_CONSENT_DECISION_EVENT)),
      reduced ? 0 : 140,
    );
  }, []);

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    close();
    announceFirstDecision();
  };
  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false });
    close();
    announceFirstDecision();
  };
  const savePrefs = () => {
    setConsent({ analytics: toggles.analytics, marketing: toggles.marketing });
    close();
    announceFirstDecision();
  };

  // Só dá para fechar sem escolher se já houve uma decisão anterior
  // (reaberto pelo rodapé). Na 1ª visita, o titular precisa escolher.
  const dismissible = hasConsentDecision();

  // Barra não-modal: sem trap de Tab (o conteúdo atrás continua navegável).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && dismissible) {
      e.stopPropagation();
      close();
    }
  };

  if (!presence.mounted) return null;

  // Botão base do cockpit. Aceitar e Recusar têm o MESMO peso visual (ANPD):
  // dois botões sólidos de mesmo tamanho — "primário" (Mist tátil) e "neutro"
  // (Graphite tátil), ambos proeminentes, mas compactos (barra discreta). Sem dark pattern.
  const primaryBtn =
    'inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-[transform,filter,background-color,border-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[13px]';
  const btnMist = 'border border-transparent bg-mist text-ink shadow-[var(--btn-lift)] hover:-translate-y-0.5 hover:brightness-105';
  const btnNeutral = 'bg-graphite text-mist border border-white/10 shadow-[var(--key-soft)] hover:-translate-y-0.5 hover:bg-obsidian';

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 transition-[opacity,transform] duration-[280ms] ease-out sm:px-4 sm:pb-4 ${
        presence.show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Consentimento de cookies"
        aria-describedby="cc-desc"
        onKeyDown={onKeyDown}
        className="max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-xl border border-white/10 bg-ink/95 shadow-[var(--key),0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-sm"
      >
        <div className="p-4 sm:p-5">
          {!showPrefs ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p id="cc-desc" className="text-xs leading-relaxed text-ash sm:text-[13px] sm:pr-4">
                Usamos cookies necessários para o site funcionar e, com seu consentimento,
                cookies analíticos e de marketing.{' '}
                <Link
                  to="/privacidade"
                  className="font-semibold text-coral underline underline-offset-2 hover:text-white"
                >
                  Saiba mais
                </Link>
                .
              </p>

              {/* Aceitar e Recusar com o MESMO peso visual (requisito ANPD). */}
              <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const current = getConsent();
                    setToggles({
                      analytics: current?.analytics ?? false,
                      marketing: current?.marketing ?? false,
                    });
                    setShowPrefs(true);
                  }}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-lg px-3 text-xs font-semibold text-ash underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[13px]"
                >
                  Preferências
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className={`${primaryBtn} ${btnNeutral}`}
                >
                  Recusar
                </button>
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={acceptAll}
                  className={`${primaryBtn} ${btnMist}`}
                >
                  Aceitar todos
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p id="cc-desc" className="text-xs leading-relaxed text-ash sm:text-[13px]">
                Escolha por categoria. Necessários ficam sempre ativos; o resto é opcional.{' '}
                <Link
                  to="/privacidade"
                  className="font-semibold text-coral underline underline-offset-2 hover:text-white"
                >
                  Política de Privacidade
                </Link>
                .
              </p>

              <ul className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10 bg-obsidian">
                <li className="flex items-start justify-between gap-4 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Necessários</p>
                    <p className="mt-0.5 text-xs leading-snug text-ash">
                      Essenciais para o site funcionar. Sempre ativos.
                    </p>
                  </div>
                  <Switch id="cc-necessary" label="Cookies necessários (sempre ativos)" checked disabled />
                </li>
                <li className="flex items-start justify-between gap-4 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Analíticos</p>
                    <p className="mt-0.5 text-xs leading-snug text-ash">
                      Medem o desempenho do site (Vercel Speed Insights).
                    </p>
                  </div>
                  <Switch
                    id="cc-analytics"
                    label="Cookies analíticos"
                    checked={toggles.analytics}
                    onChange={(v) => setToggles((t) => ({ ...t, analytics: v }))}
                  />
                </li>
                <li className="flex items-start justify-between gap-4 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Marketing</p>
                    <p className="mt-0.5 text-xs leading-snug text-ash">
                      Medem campanhas e anúncios (Meta Pixel).
                    </p>
                  </div>
                  <Switch
                    id="cc-marketing"
                    label="Cookies de marketing"
                    checked={toggles.marketing}
                    onChange={(v) => setToggles((t) => ({ ...t, marketing: v }))}
                  />
                </li>
              </ul>

              <div className="mt-3 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className={`${primaryBtn} ${btnNeutral}`}
                >
                  Voltar
                </button>
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={savePrefs}
                  className={`${primaryBtn} ${btnMist}`}
                >
                  Salvar preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
