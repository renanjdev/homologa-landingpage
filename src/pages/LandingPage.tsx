import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Reveal, useScrolledPast } from '../lib/anim';
import { ChevronRight } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { SpeedInsights } from "@vercel/speed-insights/react";
import HeroMedia from '../components/HeroMedia';
import { FIRST_CONSENT_DECISION_EVENT, hasConsentDecision, useConsent } from '../lib/consent';

// Lazy load components below the fold
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const MobilePreview = lazy(() => import('../components/MobilePreview'));
const Features = lazy(() => import('../components/Features'));
const Automacao = lazy(() => import('../components/Automacao'));
const WhoIsItFor = lazy(() => import('../components/WhoIsItFor'));
const FAQ = lazy(() => import('../components/FAQ'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));
const Pricing = lazy(() => import('../components/Pricing'));
const Footer = lazy(() => import('../components/Footer'));

const Navbar = lazy(() => import('../components/Navbar'));

const Hero = () => {
  const [launchState, setLaunchState] = useState<'standby' | 'revealing' | 'ready'>(() =>
    hasConsentDecision() ? 'ready' : 'standby',
  );
  const revealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const reveal = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setLaunchState('ready');
        return;
      }
      setLaunchState('revealing');
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = window.setTimeout(() => setLaunchState('ready'), 1450);
    };

    window.addEventListener(FIRST_CONSENT_DECISION_EVENT, reveal);
    return () => {
      window.removeEventListener(FIRST_CONSENT_DECISION_EVENT, reveal);
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
    };
  }, []);

  return (
    <section id="conteudo-principal" tabIndex={-1} className={`hero-dark hero-${launchState}`}>
      {/* Atmosfera: geometria gradiente coral/azul dramática sobre o canvas Void */}
      <div className="hero-atmos" aria-hidden="true">
        <div className="hero-blue" />
        <div className="hero-sky" />
        <div className="hero-coral-bar" />
        <div className="hero-coral-bar two" />
        <div className="hero-vignette" />
      </div>

      <div className="hero-inner">
        <Reveal as="div" y={20} trigger="mount" className="hero-copy">
          <p className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            Automação documental para homologação solar
          </p>
          <h1 className="hero-h1">
            Do projeto ao protocolo, sua documentação sai <span className="hero-grif hero-grif--wrap">pronta e validada</span>.
          </h1>
          <p className="hero-sub">
            O Homologa Plus dimensiona e gera memorial, unifilar, planta, formulários e anexos no padrão de cada distribuidora. <strong>Projetos, prazos e financeiro ficam no mesmo painel.</strong>
          </p>
          <div className="hero-cta-row">
            <a
              href={buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq && window.fbq('track', 'Contact')}
              className="hero-btn hero-btn-mist"
            >
              Agendar demonstração
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq && window.fbq('track', 'Contact')}
              className="hero-btn hero-btn-ghost"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>

          <ul className="hero-proof-list" aria-label="Diferenciais da automação">
            <li>Dimensionamento elétrico</li>
            <li>Padrão da distribuidora</li>
            <li>Validação normativa</li>
          </ul>

        </Reveal>

        {/* Palco do produto: a janela tátil "tecla de teclado" com chips de prova flutuando */}
        <Reveal
          as="div"
          y={30}
          duration={0.7}
          delay={0.2}
          trigger="mount"
          className="hero-stage"
        >
          <div className="hero-float hero-float-br animate-floaty" style={{ animationDelay: '1.9s' }}>
            <span className="hero-chip-txt">
              <span className="hero-chip-t">Conformidade validada</span>
              <span className="hero-chip-s">antes de protocolar</span>
            </span>
          </div>

          <HeroMedia />
        </Reveal>

        <div className="hero-trust">Memorial, unifilar, planta e anexos gerados no mesmo fluxo</div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const scrolled = useScrolledPast(600);
  // FASE 1: o site inteiro é escuro (Void). A navbar é sempre cockpit-dark —
  // não há mais troca dark→claro ao rolar. `scrolled` só governa os CTAs fixos.
  // Telemetria de desempenho só com consentimento de cookies analíticos (LGPD).
  const consent = useConsent();


  return (
    <div className="min-h-screen">
      <a
        href="#conteudo-principal"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-mist px-4 py-3 font-semibold text-ink focus:not-sr-only"
      >
        Pular para o conteúdo principal
      </a>
      {/* ... Helmet below ... */}
      <Helmet>
        <title>Automação e Gestão de Homologação Solar | Homologa Plus</title>
        <meta name="description" content="Automação e gestão da homologação solar: gera memorial, unifilar, planta e os anexos da sua distribuidora e valida a conformidade antes do protocolo." />
        <meta name="keywords" content="automação de homologação solar, homologação solar, software de homologação fotovoltaica, gestão de homologação solar, memorial descritivo automático, diagrama unifilar automático, formulários da distribuidora, anexos homologação fotovoltaica, dimensionamento elétrico fotovoltaico" />
        <meta property="og:title" content="Automação e Gestão de Homologação Solar | Homologa Plus" />
        <meta property="og:description" content="Automação e gestão da homologação solar: gera memorial, unifilar, planta e os anexos da sua distribuidora e valida a conformidade antes do protocolo." />
        <link rel="canonical" href="https://homologaplus.com.br/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Homologa Plus",
            "url": "https://homologaplus.com.br",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "Software de automação e gestão da homologação de energia solar que gera automaticamente a documentação técnica (memorial descritivo, diagrama unifilar, diagrama de blocos, planta de localização e os formulários e anexos exigidos por cada distribuidora) e valida a conformidade do projeto antes do protocolo. Inclui dimensionamento elétrico, gestão de projetos, prazos e financeiro.",
            "featureList": [
              "Geração automática de memorial descritivo e de cálculo no padrão da distribuidora",
              "Diagrama unifilar dimensionado (condutores, disjuntores, DPS, proteções)",
              "Diagrama de blocos e planta de localização",
              "Formulários e anexos exigidos por cada distribuidora, já preenchidos com os dados do projeto",
              "Dimensionamento elétrico para inversor string e microinversor",
              "Validação de conformidade (NBR 5410, NBR 16690, PRODIST, Lei 14.300) antes de protocolar",
              "Gestão de homologação do projeto ao parecer da concessionária"
            ],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "BRL",
              "lowPrice": "297.00",
              "highPrice": "597.00",
              "offerCount": "2",
              "availability": "https://schema.org/InStock",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Homologa Starter",
                  "price": "297.00",
                  "priceCurrency": "BRL",
                  "priceValidUntil": "2027-12-31",
                  "url": "https://homologaplus.com.br/#planos"
                },
                {
                  "@type": "Offer",
                  "name": "Homologa Full",
                  "price": "597.00",
                  "priceCurrency": "BRL",
                  "priceValidUntil": "2027-12-31",
                  "url": "https://homologaplus.com.br/#planos"
                }
              ]
            },
            "provider": {
              "@type": "Organization",
              "name": "Homologa Plus",
              "url": "https://homologaplus.com.br",
              "email": "contato@homologaplus.com.br",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bauru",
                "addressRegion": "SP",
                "addressCountry": "BR"
              }
            }
          }
        `}</script>
      </Helmet>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar scrolled={scrolled} />
      </Suspense>
      <Hero />
      <Suspense fallback={<div className="h-20" />}>
        <main>
          <BeforeAfter />
          <Automacao />
          <Features />
          <MobilePreview />
          <WhoIsItFor />
          <Pricing />
          <FAQ />
          {/* Fecho da landing: quem rola até o fim termina no CTA de WhatsApp,
              o único canal de conversão agora que o formulário foi removido. */}
          <FinalCTA />
        </main>
        <Footer />
      </Suspense>
      {consent?.analytics && <SpeedInsights />}

      {/* CTA fixo no mobile: recaptura a intenção durante a rolagem (aparece após sair do hero) */}
      <div
        aria-hidden={!scrolled}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2.5 border-t border-white/10 bg-ink/90 px-4 py-3 shadow-[var(--key-soft)] backdrop-blur-xl md:hidden transition-transform duration-[250ms] ease-out"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))', transform: scrolled ? 'translateY(0)' : 'translateY(120px)' }}
      >
        <a
          href={buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.fbq && window.fbq('track', 'Contact')}
          tabIndex={scrolled ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-mist px-3 py-3.5 text-sm font-bold text-ink shadow-[var(--btn-lift)] hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 sm:text-base"
        >
          Agendar demonstração
        </a>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.fbq && window.fbq('track', 'Contact')}
          aria-label="Falar no WhatsApp"
          tabIndex={scrolled ? 0 : -1}
          className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[#25D366] hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>

      {/* Botão flutuante de WhatsApp (desktop — no mobile o WhatsApp já fica na barra fixa de CTA) */}
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.fbq && window.fbq('track', 'Contact')}
        aria-label="Falar no WhatsApp"
        className="fixed bottom-8 right-8 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-obsidian text-[#25D366] shadow-[var(--key-soft)] transition-transform hover:-translate-y-0.5 hover:bg-graphite md:flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {/* Back to Top Button (apenas desktop — no mobile a barra de CTA ocupa o rodapé) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        aria-hidden={!scrolled}
        tabIndex={scrolled ? 0 : -1}
        className={`fixed bottom-28 right-8 z-40 hidden bg-obsidian text-mist p-4 rounded-2xl shadow-[var(--key-soft)] border border-white/10 hover:bg-graphite transition-[opacity,transform,background-color] group md:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${scrolled ? '' : 'pointer-events-none'}`}
        style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? 'scale(1)' : 'scale(0.5)' }}
      >
        <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
      </button>
    </div>
  );
};

export default LandingPage;
