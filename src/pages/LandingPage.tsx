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
    <section className="relative overflow-hidden pt-[clamp(5rem,7vw,7rem)] pb-16 md:pb-24">
      {/* Atmosfera: brilho azul + grade sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-200px] -z-10 h-[600px] w-[1060px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(27,42,74,0.10), rgba(27,42,74,0.03) 46%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 64% at 50% 0, #000 28%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse 90% 64% at 50% 0, #000 28%, transparent 70%)',
        }}
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <Reveal
          as="div"
          y={20}
          trigger="mount"
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Sistema de gestão para homologação solar · Automação
          </span>
          <h1 className="mx-auto mt-5 max-w-[24ch] text-[clamp(2rem,4vw+0.5rem,3.6rem)] font-display font-extrabold leading-[1.06] tracking-[-0.025em] text-slate-900 text-balance">
            Pare de montar memorial e unifilar à mão. O Homologa Plus <span className="heading-accent">gera e valida</span> sozinho.
          </h1>
          <p className="mx-auto mt-5 max-w-[34em] text-base md:text-lg leading-relaxed text-slate-600 text-pretty">
            A partir do projeto cadastrado, o sistema dimensiona e monta o pacote inteiro (memorial, diagramas, planta e os formulários e anexos exigidos pela sua distribuidora) e checa a conformidade antes de você protocolar. E mais: toda a gestão de projetos, prazos e financeiro num só painel.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq && window.fbq('track', 'Contact')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-action px-8 py-4 text-lg font-bold text-white shadow-lg shadow-action/30 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-action-dark active:translate-y-0 sm:w-auto"
            >
              Agendar demonstração
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq && window.fbq('track', 'Contact')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface px-8 py-4 text-lg font-bold text-primary transition-all duration-200 ease-out hover:bg-slate-200 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            <span className="font-semibold text-emerald-700">Demonstração sem compromisso</span> · Acesso liberado pela nossa equipe
          </p>

          {/* Prova de resultado visível no mobile (no desktop ela vira card flutuante sobre o painel) */}
          <div className="mt-6 flex justify-center gap-2.5 md:hidden">
            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight text-slate-900">98% de aprovação</span>
                <span className="block font-mono text-[11px] text-slate-500">taxa de homologação</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight text-slate-900">Conformidade</span>
                <span className="block font-mono text-[11px] text-slate-500">validada</span>
              </span>
            </span>
          </div>
        </Reveal>

        {/* Painel real do produto: recortado, gradiente de continuidade e chips de destaque */}
        <Reveal
          as="div"
          y={30}
          duration={0.7}
          delay={0.2}
          trigger="mount"
          className="relative mx-auto mt-12 max-w-[1120px]"
        >
          <div
            className="animate-floaty absolute -top-5 -left-3 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-md px-3.5 py-3 shadow-[0_20px_44px_-16px_rgba(15,23,42,0.32)] md:flex lg:-left-6"
            style={{ animationDelay: '1.4s' }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold leading-tight text-slate-900">98% de aprovação</span>
              <span className="block font-mono text-[11px] text-slate-500">taxa de homologação</span>
            </span>
          </div>
          <div
            className="animate-floaty absolute -bottom-5 -right-3 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-md px-3.5 py-3 shadow-[0_20px_44px_-16px_rgba(15,23,42,0.32)] md:flex lg:-right-6"
            style={{ animationDelay: '1.9s' }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold leading-tight text-slate-900">Conformidade validada</span>
              <span className="block font-mono text-[11px] text-slate-500">antes de protocolar</span>
            </span>
          </div>

          <HeroMedia />
        </Reveal>

        <div className="mt-8 flex items-center justify-center text-sm">
          <span className="font-medium text-slate-500">Mais de 200 empresas de engenharia já usam o Homologa Plus</span>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const [scrolled, setScrolled] = React.useState(false);
  // Telemetria de desempenho só com consentimento de cookies analíticos (LGPD).
  const consent = useConsent();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
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
        className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2.5 border-t border-slate-200 bg-white/80 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden transition-transform duration-[250ms] ease-out"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))', transform: scrolled ? 'translateY(0)' : 'translateY(120px)' }}
      >
        <a
          href={buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.fbq && window.fbq('track', 'Contact')}
          tabIndex={scrolled ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-action px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-action/30 active:scale-[0.98]"
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
          className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-success active:scale-[0.98]"
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
        className="fixed bottom-8 right-8 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 transition-transform hover:-translate-y-0.5 md:flex"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Back to Top Button (apenas desktop — no mobile a barra de CTA ocupa o rodapé) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        aria-hidden={!scrolled}
        tabIndex={scrolled ? 0 : -1}
        className={`fixed bottom-28 right-8 z-40 hidden bg-white text-primary p-4 rounded-2xl shadow-2xl border border-slate-100 hover:bg-primary hover:text-white transition-all group md:block ${scrolled ? '' : 'pointer-events-none'}`}
        style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? 'scale(1)' : 'scale(0.5)' }}
      >
        <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
      </button>
    </div>
  );
};

export default LandingPage;
