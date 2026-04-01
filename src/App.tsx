import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Sun } from 'lucide-react';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Waitlist = lazy(() => import('./pages/Waitlist'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Admin = lazy(() => import('./pages/Admin'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Start = lazy(() => import('./pages/Start'));
const CRMPage = lazy(() => import('./pages/CRM/CRMPage'));

// SEO Pages
const HomologacaoEnergiaSolar = lazy(() => import('./pages/seo/HomologacaoEnergiaSolar'));
const ComoHomologarEnergiaSolar = lazy(() => import('./pages/seo/ComoHomologarEnergiaSolar'));
const HomologacaoCpfl = lazy(() => import('./pages/seo/HomologacaoCpfl'));
const DocumentosHomologacao = lazy(() => import('./pages/seo/DocumentosHomologacao'));
const ErrosHomologacaoSolar = lazy(() => import('./pages/seo/ErrosHomologacaoSolar'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Sun className="w-8 h-8 text-primary animate-spin" /></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/start" element={<Start />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/crm" element={<CRMPage />} />
          {/* SEO Pages */}
          <Route path="/homologacao-energia-solar" element={<HomologacaoEnergiaSolar />} />
          <Route path="/como-homologar-energia-solar" element={<ComoHomologarEnergiaSolar />} />
          <Route path="/homologacao-cpfl" element={<HomologacaoCpfl />} />
          <Route path="/documentos-homologacao-fotovoltaica" element={<DocumentosHomologacao />} />
          <Route path="/erros-homologacao-solar" element={<ErrosHomologacaoSolar />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}