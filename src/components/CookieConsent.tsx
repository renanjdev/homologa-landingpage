import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck } from 'lucide-react';
import {
  getConsent,
  setConsent,
  hasConsentDecision,
  initConsentedTrackers,
} from '../lib/consent';

/**
 * Banner de consentimento de cookies (LGPD / ANPD). Opt-in real: Pixel e
 * Speed Insights só carregam após o aceite; "Recusar" tem o mesmo peso visual
 * de "Aceitar" (sem dark pattern). Reabre pelo evento `open-cookie-preferences`.
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

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    close();
  };
  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false });
    close();
  };
  const savePrefs = () => {
    setConsent({ analytics: toggles.analytics, marketing: toggles.marketing });
    close();
  };

  // Só dá para fechar sem escolher se já houve uma decisão anterior
  // (reaberto pelo rodapé). Na 1ª visita, o titular precisa escolher.
  const dismissible = hasConsentDecision();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && dismissible) {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const root = dialogRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  // Botão base do cockpit. Aceitar e Recusar têm o MESMO peso visual (ANPD):
  // dois botões sólidos de mesmo tamanho — "primário" (Mist tátil) e "neutro"
  // (Graphite tátil), ambos proeminentes. Sem dark pattern.
  const primaryBtn =
    'inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
  const btnMist = 'bg-mist text-ink shadow-[var(--btn-lift)] hover:-translate-y-0.5 hover:brightness-105';
  const btnNeutral = 'bg-graphite text-mist border border-white/10 shadow-[var(--key-soft)] hover:-translate-y-0.5 hover:bg-obsidian';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-void/70 p-4 backdrop-blur-[2px] sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && dismissible) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-title"
        aria-describedby="cc-desc"
        onKeyDown={onKeyDown}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[var(--key),0_40px_90px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="p-6 sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-coral-ember text-coral ring-1 ring-coral/25">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 id="cc-title" className="font-display text-lg font-bold text-white">
              Sua privacidade
            </h2>
          </div>

          <p id="cc-desc" className="text-sm leading-relaxed text-ash">
            Usamos cookies necessários para o site funcionar e, com o seu consentimento, cookies
            analíticos (desempenho) e de marketing (Meta Pixel). Você pode aceitar, recusar ou
            escolher por categoria. Recusar é tão simples quanto aceitar. Saiba mais na{' '}
            <Link
              to="/privacidade"
              className="font-semibold text-coral underline underline-offset-2 hover:text-white"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          {!showPrefs ? (
            <div className="mt-6">
              {/* Aceitar e Recusar com o MESMO peso visual (requisito ANPD). */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={acceptAll}
                  className={`${primaryBtn} ${btnMist}`}
                >
                  Aceitar todos
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className={`${primaryBtn} ${btnNeutral}`}
                >
                  Recusar
                </button>
              </div>
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
                className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-ash underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Preferências
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <ul className="divide-y divide-white/10 rounded-xl border border-white/10 bg-obsidian">
                <li className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 flex-none text-emerald-400" aria-hidden="true" />
                      <p className="text-sm font-bold text-white">Necessários</p>
                    </div>
                    <p className="mt-1 text-[13px] leading-snug text-ash">
                      Essenciais para o site funcionar. Sempre ativos.
                    </p>
                  </div>
                  <Switch id="cc-necessary" label="Cookies necessários (sempre ativos)" checked disabled />
                </li>
                <li className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Analíticos</p>
                    <p className="mt-1 text-[13px] leading-snug text-ash">
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
                <li className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Marketing</p>
                    <p className="mt-1 text-[13px] leading-snug text-ash">
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

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={savePrefs}
                  className={`${primaryBtn} ${btnMist}`}
                >
                  Salvar preferências
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className={`${primaryBtn} ${btnNeutral}`}
                >
                  Voltar
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
