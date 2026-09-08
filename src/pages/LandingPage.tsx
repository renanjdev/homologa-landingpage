import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Reveal } from '../lib/anim';
import { ShieldCheck, ChevronRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { SpeedInsights } from "@vercel/speed-insights/react";
import HeroMedia from '../components/HeroMedia';
import { useConsent } from '../lib/consent';

// Lazy load components below the fold
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const Flow = lazy(() => import('../components/Flow'));
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
  return (
    <section className="hero-dark">
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
          <span className="hero-eyebrow">
            <span className="hero-ia-badge">IA</span>
            Sistema de gestão para homologação solar
          </span>
          <h1 className="hero-h1">
            Pare de montar memorial e unifilar à mão. O Homologa Plus <span className="hero-grif">gera e valida</span> sozinho.
          </h1>
          <p className="hero-sub">
            A partir do projeto cadastrado, o sistema dimensiona e monta o pacote inteiro (memorial, diagramas, planta e os formulários e anexos exigidos pela sua distribuidora) e checa a conformidade antes de você protocolar. E mais: toda a gestão de projetos, prazos e financeiro num só painel.
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
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
          <p className="hero-note">
            <b>Demonstração sem compromisso</b> · Acesso liberado pela nossa equipe
          </p>

          {/* Prova de resultado visível no mobile (no desktop vira card flutuante sobre o painel) */}
          <div className="hero-mproof">
            <span className="hero-mchip">
              <span className="hero-chip-ico coral"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /></span>
              <span className="hero-chip-txt">
                <span className="hero-chip-t">98% de aprovação</span>
                <span className="hero-chip-s">taxa de homologação</span>
              </span>
            </span>
            <span className="hero-mchip">
              <span className="hero-chip-ico mist"><ShieldCheck className="h-4 w-4" aria-hidden="true" /></span>
              <span className="hero-chip-txt">
                <span className="hero-chip-t">Conformidade</span>
                <span className="hero-chip-s">validada</span>
              </span>
            </span>
          </div>
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
          <div className="hero-float hero-float-tl animate-floaty" style={{ animationDelay: '1.4s' }}>
            <span className="hero-chip-ico coral"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /></span>
            <span className="hero-chip-txt">
              <span className="hero-chip-t">98% de aprovação</span>
              <span className="hero-chip-s">taxa de homologação</span>
            </span>
          </div>
          <div className="hero-float hero-float-br animate-floaty" style={{ animationDelay: '1.9s' }}>
            <span className="hero-chip-ico mist"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
            <span className="hero-chip-txt">
              <span className="hero-chip-t">Conformidade validada</span>
              <span className="hero-chip-s">antes de protocolar</span>
            </span>
          </div>

          <HeroMedia />
        </Reveal>

        <div className="hero-trust">Mais de 200 empresas de engenharia já usam o Homologa Plus</div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const [scrolled, setScrolled] = React.useState(false);
  // FASE 1: o site inteiro é escuro (Void). A navbar é sempre cockpit-dark —
  // não há mais troca dark→claro ao rolar. `scrolled` só governa os CTAs fixos.
  // Telemetria de desempenho só com consentimento de cookies analíticos (LGPD).
  const consent = useConsent();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 600);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ... Helmet below ... */}
      <Helmet>
        <title>Sistema de Gestão de Homologação Solar | Homologa Plus</title>
        <meta name="description" content="Gere memorial, unifilar, planta e os formulários e anexos exigidos pela sua distribuidora, e valide a conformidade antes de protocolar. Homologação solar sem retrabalho." />
        <meta name="keywords" content="homologação solar, sistema de gestão de homologação solar, automação homologação solar, memorial descritivo fotovoltaico, diagrama unifilar automático, formulários da distribuidora, anexos homologação fotovoltaica, dimensionamento elétrico fotovoltaico" />
        <meta property="og:title" content="Sistema de Gestão de Homologação Solar | Homologa Plus" />
        <meta property="og:description" content="Gere memorial, unifilar, planta e os formulários e anexos exigidos pela sua distribuidora, e valide a conformidade antes de protocolar. Homologação solar sem retrabalho." />
        <link rel="canonical" href="https://homologaplus.com.br/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Homologa Plus",
            "url": "https://homologaplus.com.br",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "Sistema de gestão de homologação de energia solar que gera automaticamente a documentação técnica (memorial descritivo, diagrama unifilar, diagrama de blocos, planta de localização e os formulários e anexos exigidos por cada distribuidora) e valida a conformidade do projeto antes do protocolo. Inclui dimensionamento elétrico, gestão de projetos, prazos e financeiro.",
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
          <Flow />
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
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-mist px-5 py-3.5 text-base font-bold text-ink shadow-[var(--btn-lift)] hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Agendar demo
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
          <MessageCircle className="h-6 w-6" />
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
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Back to Top Button (apenas desktop — no mobile a barra de CTA ocupa o rodapé) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        aria-hidden={!scrolled}
        tabIndex={scrolled ? 0 : -1}
        className={`fixed bottom-28 right-8 z-40 hidden bg-obsidian text-mist p-4 rounded-2xl shadow-[var(--key-soft)] border border-white/10 hover:bg-graphite transition-all group md:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${scrolled ? '' : 'pointer-events-none'}`}
        style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? 'scale(1)' : 'scale(0.5)' }}
      >
        <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
      </button>
    </div>
  );
};

export default LandingPage;
