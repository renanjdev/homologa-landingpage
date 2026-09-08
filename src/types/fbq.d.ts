interface Window {
  // Só existe DEPOIS que initMetaPixel() roda (gate de consentimento de marketing).
  // Por isso é opcional: todo uso é protegido por `window.fbq && ...`.
  fbq?: (event: string, action: string, params?: Record<string, unknown>) => void;
  // Definida em index.html; sobe o Meta Pixel sob demanda (chamada por src/lib/consent.ts).
  initMetaPixel?: () => void;
  __mpxLoaded?: number;
}
