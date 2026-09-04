import { useSyncExternalStore } from 'react';

// Consentimento de cookies (LGPD / Guia de Cookies da ANPD). Opt-in de verdade:
// nada de analytics/marketing carrega sem escolha explícita do titular.

export const CONSENT_KEY = 'hp_cookie_consent';
/** Suba este número quando as categorias/política mudarem: força re-consentimento. */
export const CONSENT_VERSION = 1;

export type ConsentRecord = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

const listeners = new Set<() => void>();
// undefined = ainda não lido do storage; null = lido e sem escolha válida.
let cache: ConsentRecord | null | undefined;

function readStorage(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord> | null;
    if (!parsed || typeof parsed !== 'object') return null;
    // Sem escolha OU versão antiga => precisa reconsentir.
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      ts: typeof parsed.ts === 'string' ? parsed.ts : new Date().toISOString(),
    };
  } catch {
    // localStorage indisponível (modo privado, bloqueado): trata como sem escolha.
    return null;
  }
}

/** Escolha atual do titular, ou null se ainda não decidiu (mostrar o banner). */
export function getConsent(): ConsentRecord | null {
  if (cache === undefined) cache = readStorage();
  return cache;
}

/** true quando o titular já escolheu (banner não deve aparecer sozinho). */
export function hasConsentDecision(): boolean {
  return getConsent() !== null;
}

/** Grava a escolha, aplica os efeitos (sobe o Pixel se marketing) e notifica. */
export function setConsent(choice: { analytics: boolean; marketing: boolean }): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: !!choice.analytics,
    marketing: !!choice.marketing,
    ts: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Sem storage: mantém a escolha em memória só nesta sessão.
  }
  cache = record;
  applySideEffects(record);
  listeners.forEach((l) => l());
  return record;
}

export function onConsentChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// Efeitos NÃO-React do consentimento. O Speed Insights é gateado no React
// (useConsent); aqui só o Meta Pixel, que vive fora do React (index.html).
function applySideEffects(record: ConsentRecord) {
  if (typeof window === 'undefined') return;
  if (record.marketing) {
    // initMetaPixel() é idempotente (guarda window.__mpxLoaded) — chamar 2x é seguro.
    window.initMetaPixel?.();
  }
}

/**
 * Chamar UMA vez no boot: se o titular já consentiu marketing numa visita
 * anterior, sobe o Pixel no load. Sem consentimento, nada é requisitado.
 */
export function initConsentedTrackers(): void {
  const record = getConsent();
  if (record) applySideEffects(record);
}

/** Hook React: re-renderiza quem depende do consentimento quando ele muda. */
export function useConsent(): ConsentRecord | null {
  return useSyncExternalStore(onConsentChange, getConsent, () => null);
}
