// Cadastro livre FECHADO: ninguém cria conta sozinho no app.
// Todo CTA primário passa a levar para o formulário de solicitação de acesso
// na própria landing — a equipe cadastra manualmente e avisa pelo WhatsApp.

/** Duração do teste liberado manualmente pela equipe. */
export const TRIAL_DIAS = 3;

/** id da <section> do formulário de solicitação de acesso. */
export const REQUEST_ACCESS_ID = 'solicitar-acesso';

/** Âncora para uso dentro da landing. */
export const REQUEST_ACCESS_HASH = `#${REQUEST_ACCESS_ID}`;

/** Âncora absoluta, para páginas de rota própria (SEO, /start). */
export const REQUEST_ACCESS_URL = `/#${REQUEST_ACCESS_ID}`;

/**
 * Rola até o formulário e foca o primeiro campo. Se a seção não existir na
 * página atual, deixa o navegador seguir o href normalmente (/#solicitar-acesso).
 */
export const scrollToRequestAccess = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const section = document.getElementById(REQUEST_ACCESS_ID);
  if (!section) return;

  e.preventDefault();
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const firstField = section.querySelector<HTMLInputElement>('input:not([type="hidden"])');
  if (!firstField) return;
  // Espera a rolagem suave terminar antes de focar (focar antes cancela o scroll).
  window.setTimeout(() => firstField.focus({ preventScroll: true }), 600);
};
