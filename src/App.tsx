import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import CookieConsent from './components/CookieConsent';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Start = lazy(() => import('./pages/Start'));

// SEO Pages
const HomologacaoEnergiaSolar = lazy(() => import('./pages/seo/HomologacaoEnergiaSolar'));
const ComoHomologarEnergiaSolar = lazy(() => import('./pages/seo/ComoHomologarEnergiaSolar'));
const HomologacaoCpfl = lazy(() => import('./pages/seo/HomologacaoCpfl'));
const DocumentosHomologacao = lazy(() => import('./pages/seo/DocumentosHomologacao'));
const ErrosHomologacaoSolar = lazy(() => import('./pages/seo/ErrosHomologacaoSolar'));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Âncoras vindas de outra rota (ex.: /#solicitar-acesso): as seções abaixo
    // da dobra são lazy, então tenta até o componente montar (~3s).
    const id = hash.slice(1);
    let frames = 0;
    let raf = requestAnimationFrame(function tryScroll() {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (frames++ < 180) raf = requestAnimationFrame(tryScroll);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CookieConsent />
      <Suspense fallback={<div className="min-h-screen bg-void flex items-center justify-center"><img src="/logo-h-white.png" alt="Homologa Plus" width={48} height={48} className="w-12 h-12 animate-pulse" /></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/start" element={<Start />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/obrigado" element={<ThankYou />} />
          {/* SEO Pages */}
          <Route path="/homologacao-energia-solar" element={<HomologacaoEnergiaSolar />} />
          <Route path="/como-homologar-energia-solar" element={<ComoHomologarEnergiaSolar />} />
          <Route path="/homologacao-cpfl" element={<HomologacaoCpfl />} />
          <Route path="/documentos-homologacao-fotovoltaica" element={<DocumentosHomologacao />} />
          <Route path="/erros-homologacao-solar" element={<ErrosHomologacaoSolar />} />
          {/* Rota desconhecida (inclusive as antigas /admin e /crm) cai na home
              em vez de renderizar uma página em branco. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}