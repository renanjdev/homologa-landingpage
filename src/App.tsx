import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Sun } from 'lucide-react';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Waitlist = lazy(() => import('./pages/Waitlist'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

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
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
