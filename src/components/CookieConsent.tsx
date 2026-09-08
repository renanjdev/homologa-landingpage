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
    className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action ${
      checked ? 'bg-action' : 'bg-slate-300'
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

  const primaryBtn =
    'inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/40 p-4 backdrop-blur-[2px] sm:items-center"
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
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-24px_rgba(15,23,42,0.5)]"
      >
        <div className="p-6 sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 id="cc-title" className="font-display text-lg font-bold text-slate-900">
              Sua privacidade
            </h2>
          </div>

          <p id="cc-desc" className="text-sm leading-relaxed text-slate-600">
            Usamos cookies necessários para o site funcionar e, com o seu consentimento, cookies
            analíticos (desempenho) e de marketing (Meta Pixel). Você pode aceitar, recusar ou
            escolher por categoria. Recusar é tão simples quanto aceitar. Saiba mais na{' '}
            <Link
              to="/privacidade"
              className="font-semibold text-action underline underline-offset-2 hover:text-action-dark"
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
                  className={`${primaryBtn} bg-action text-white shadow-lg shadow-action/30 hover:-translate-y-0.5 hover:bg-action-dark`}
                >
                  Aceitar todos
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className={`${primaryBtn} border-2 border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50`}
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
                className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 underline underline-offset-2 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
              >
                Preferências
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                <li className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 flex-none text-emerald-700" aria-hidden="true" />
                      <p className="text-sm font-bold text-slate-900">Necessários</p>
                    </div>
                    <p className="mt-1 text-[13px] leading-snug text-slate-600">
                      Essenciais para o site funcionar. Sempre ativos.
                    </p>
                  </div>
                  <Switch id="cc-necessary" label="Cookies necessários (sempre ativos)" checked disabled />
                </li>
                <li className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">Analíticos</p>
                    <p className="mt-1 text-[13px] leading-snug text-slate-600">
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
                    <p className="text-sm font-bold text-slate-900">Marketing</p>
                    <p className="mt-1 text-[13px] leading-snug text-slate-600">
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
                  className={`${primaryBtn} bg-action text-white shadow-lg shadow-action/30 hover:-translate-y-0.5 hover:bg-action-dark`}
                >
                  Salvar preferências
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className={`${primaryBtn} border-2 border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50`}
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
