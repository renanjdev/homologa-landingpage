import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FablePreloader } from '../contrato/preloader';
import { FableRegistry, SECTION_REGISTRY } from '../contrato/registry';
import { useVirtualScroll } from '../contrato/scroll';
import { buildWhatsAppLink } from '../utils/whatsapp';
import '../contrato/tokens.css';

const DEMO_LINK = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const FableScene = lazy(() => import('../contrato/scene').then((module) => ({ default: module.FableScene })));
const DESKTOP_POINTER_QUERY = '(min-width: 1024px) and (pointer: fine)';
const SCENE_IDLE_TIMEOUT = 2000;
const SCENE_IDLE_FALLBACK_DELAY = 1200;

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export default function LandingPage() {
  const { rootRef } = useVirtualScroll(SECTION_REGISTRY.length);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [isDesktopPointer, setIsDesktopPointer] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_POINTER_QUERY).matches,
  );
  const [sceneIdleReady, setSceneIdleReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_POINTER_QUERY);
    const onChange = () => setIsDesktopPointer(media.matches);
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | undefined;
    let fallbackTimer: number | undefined;

    const scheduleIdle = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(() => {
          if (!cancelled) setSceneIdleReady(true);
        }, { timeout: SCENE_IDLE_TIMEOUT });
      } else {
        fallbackTimer = window.setTimeout(() => {
          if (!cancelled) setSceneIdleReady(true);
        }, SCENE_IDLE_FALLBACK_DELAY);
      }
    };

    if (document.readyState === 'complete') {
      scheduleIdle();
    } else {
      window.addEventListener('load', scheduleIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleIdle);
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
    };
  }, []);

  const saveDataEnabled =
    typeof navigator !== 'undefined' && Boolean((navigator as NavigatorWithConnection).connection?.saveData);
  const canRenderScene = !reducedMotion && isDesktopPointer && !saveDataEnabled && sceneIdleReady;

  const goTo = (index: number) => window.__fable?.scrollTo(index);

  return (
    <div className="fable-page">
      <Helmet>
        <title>Automação e Gestão de Homologação Solar | Homologa Plus</title>
        <meta name="description" content="Gere memorial, unifilar, planta e anexos no padrão da distribuidora, valide a conformidade e acompanhe a homologação solar em um só fluxo." />
        <link rel="canonical" href="https://homologaplus.com.br/" />
      </Helmet>

      <FablePreloader />
      <header className="fable-nav">
        <button className="fable-brand" type="button" onClick={() => goTo(0)} aria-label="Voltar ao início">
          <img src="/logo-h-white.png" width="32" height="32" alt="" />
          <span>Homologa <span>Plus</span></span>
        </button>
        <nav className="fable-nav-links" aria-label="Navegação principal">
          <button className="fable-nav-button" type="button" onClick={() => goTo(1)}>Automação</button>
          <button className="fable-nav-button" type="button" onClick={() => goTo(2)}>Como funciona</button>
          <button className="fable-nav-button" type="button" onClick={() => goTo(4)}>Planos</button>
          <a
            className="fable-nav-button fable-nav-button--cta"
            href={DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.fbq?.('track', 'Contact')}
          >
            Agendar demonstração
          </a>
        </nav>
      </header>

      <div className="fable-viewport">
        <div className="fable-grid-overlay" aria-hidden="true" />
        <div ref={rootRef} data-scroll-root className="fable-scroll-root">
          <FableRegistry />
        </div>
      </div>
      {canRenderScene ? (
        <Suspense fallback={<div className="fable-scene-fallback" aria-hidden="true"><img src="/logo-h-white.png" alt="" /></div>}>
          <FableScene />
        </Suspense>
      ) : !reducedMotion && (
        <div className="fable-scene-fallback" aria-hidden="true"><img src="/logo-h-white.png" alt="" /></div>
      )}
      <div className="fable-noise" aria-hidden="true" />
      <div className="fable-scrollbar" aria-hidden="true"><span /></div>
    </div>
  );
}
