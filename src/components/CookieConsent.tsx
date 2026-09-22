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
import './cookie-consent.css';

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
    className="cc__switch"
  >
    <span className="cc__switch-knob" />
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

  // Aceitar e Recusar têm o MESMO tamanho e presença (ANPD): pílula clara e
  // pílula escura com borda, ambas proeminentes. Sem dark pattern.
  return (
    <div className={`cc${presence.show ? ' cc--show' : ''}`}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Consentimento de cookies"
        aria-describedby="cc-desc"
        onKeyDown={onKeyDown}
        className="cc__panel"
      >
        {!showPrefs ? (
          <div className="cc__bar">
            <p id="cc-desc" className="cc__text">
              Usamos cookies necessários para o site funcionar e, com seu consentimento,
              cookies analíticos e de marketing.{' '}
              <Link to="/privacidade" className="cc__link">Saiba mais</Link>
              .
            </p>

            {/* Aceitar e Recusar com o MESMO peso visual (requisito ANPD). */}
            <div className="cc__actions">
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
                className="cc__text-button"
              >
                Preferências
              </button>
              <button type="button" onClick={rejectAll} className="cc__button cc__button--ghost">
                Recusar
              </button>
              <button ref={firstFocusRef} type="button" onClick={acceptAll} className="cc__button">
                Aceitar todos
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="cc__title">Preferências de cookies</p>
            <p id="cc-desc" className="cc__text">
              Escolha por categoria. Necessários ficam sempre ativos; o resto é opcional.{' '}
              <Link to="/privacidade" className="cc__link">Política de Privacidade</Link>
              .
            </p>

            <ul className="cc__list">
              <li>
                <div>
                  <p className="cc__item-title">Necessários</p>
                  <p className="cc__item-text">Essenciais para o site funcionar. Sempre ativos.</p>
                </div>
                <Switch id="cc-necessary" label="Cookies necessários (sempre ativos)" checked disabled />
              </li>
              <li>
                <div>
                  <p className="cc__item-title">Analíticos</p>
                  <p className="cc__item-text">Medem o desempenho do site (Vercel Speed Insights).</p>
                </div>
                <Switch
                  id="cc-analytics"
                  label="Cookies analíticos"
                  checked={toggles.analytics}
                  onChange={(v) => setToggles((t) => ({ ...t, analytics: v }))}
                />
              </li>
              <li>
                <div>
                  <p className="cc__item-title">Marketing</p>
                  <p className="cc__item-text">Medem campanhas e anúncios (Meta Pixel).</p>
                </div>
                <Switch
                  id="cc-marketing"
                  label="Cookies de marketing"
                  checked={toggles.marketing}
                  onChange={(v) => setToggles((t) => ({ ...t, marketing: v }))}
                />
              </li>
            </ul>

            <div className="cc__actions cc__actions--end">
              <button type="button" onClick={() => setShowPrefs(false)} className="cc__button cc__button--ghost">
                Voltar
              </button>
              <button ref={firstFocusRef} type="button" onClick={savePrefs} className="cc__button">
                Salvar preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
