import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Zap, ChevronRight, Star, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy load components below the fold
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const Flow = lazy(() => import('../components/Flow'));
const MobilePreview = lazy(() => import('../components/MobilePreview'));
const Features = lazy(() => import('../components/Features'));
const MapControl = lazy(() => import('../components/MapControl'));
const WhoIsItFor = lazy(() => import('../components/WhoIsItFor'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));
const Pricing = lazy(() => import('../components/Pricing'));
const Footer = lazy(() => import('../components/Footer'));

const Navbar = lazy(() => import('../components/Navbar')); // I'll move Navbar too

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-[clamp(7rem,12vw,11rem)] pb-16 md:pb-24">
      {/* Atmosfera: brilho azul + grade sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-200px] -z-10 h-[600px] w-[1060px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.17), rgba(37,99,235,0.05) 46%, transparent 70%)' }}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Para empresas de engenharia e integradores
          </span>
          <h1 className="mx-auto mt-5 max-w-[18ch] text-[clamp(2rem,4vw+0.5rem,3.6rem)] font-display font-extrabold leading-[1.06] tracking-[-0.025em] text-slate-900 text-balance">
            O sistema de gestão preferido de quem <span className="text-primary">homologa energia solar</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[42em] text-base md:text-xl leading-relaxed text-slate-600 text-pretty">
            Centralize projetos, integradores, documentos e prazos em um só painel. Do cadastro do projeto à aprovação na concessionária, sem planilhas e sem retrabalho.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://app.homologaplus.com.br/cadastro"
              onClick={() => window.fbq && window.fbq('track', 'Lead')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-dark active:translate-y-0 sm:w-auto"
            >
              Testar gratuitamente
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
          <p className="mt-4 text-sm text-slate-500">7 dias grátis. Cancele quando quiser.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-5">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-mono text-sm font-semibold text-slate-700">4,8/5</span>
            </div>
            <div className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span className="font-medium text-slate-500">Mais de 200 empresas de engenharia já usam</span>
          </div>
        </motion.div>

        {/* Painel real do produto: recortado, gradiente de continuidade e chips de destaque */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-[1120px]"
        >
          <div
            className="animate-floaty absolute -top-5 -left-3 z-20 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-[0_20px_44px_-16px_rgba(15,23,42,0.32)] md:flex lg:-left-6"
            style={{ animationDelay: '1.4s' }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold leading-tight text-slate-900">78% de aprovação</span>
              <span className="block font-mono text-[11px] text-slate-400">taxa de homologação</span>
            </span>
          </div>
          <div
            className="animate-floaty absolute top-[46%] -right-3 z-20 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-[0_20px_44px_-16px_rgba(15,23,42,0.32)] md:flex lg:-right-6"
            style={{ animationDelay: '1.9s' }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold leading-tight text-slate-900">935.6 kWp</span>
              <span className="block font-mono text-[11px] text-slate-400">potência gerenciada</span>
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_26px_70px_-34px_rgba(15,23,42,0.34)]">
            <img
              src="/dashboard.png"
              alt="Painel do Homologa Plus com total de projetos, concluídos, pendências, potência total e o pipeline por etapa"
              width={1919}
              height={1041}
              className="w-full"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ... Helmet below ... */}
      <Helmet>
        <title>Homologação de Energia Solar sem Erro | Software para Engenheiros e Integradores</title>
        <meta name="description" content="Organize e aprove homologações de energia solar sem retrabalho. Controle projetos, clientes e documentos em um só sistema. Teste grátis." />
        <meta name="keywords" content="homologação solar, homologação energia solar, software homologação, gestão de usinas fotovoltaicas, engenharia solar, homologa plus, projetos solares, integrador solar" />
        <meta property="og:title" content="Homologação de Energia Solar sem Erro | Software para Engenheiros e Integradores" />
        <meta property="og:description" content="Organize e aprove homologações de energia solar sem retrabalho. Controle projetos, clientes e documentos em um só sistema. Teste grátis." />
        <link rel="canonical" href="https://homologaplus.com.br/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Homologa Plus",
            "url": "https://homologaplus.com.br",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "Sistema de gestão para homologação de usinas solares fotovoltaicas. Controle projetos, integradores e etapas da homologação em um único sistema profissional.",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "BRL",
              "lowPrice": "199.90",
              "highPrice": "399.90",
              "offerCount": "3",
              "availability": "https://schema.org/InStock",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Plano Starter",
                  "price": "199.90",
                  "priceCurrency": "BRL",
                  "priceValidUntil": "2026-12-31",
                  "url": "https://homologaplus.com.br/#pricing"
                },
                {
                  "@type": "Offer",
                  "name": "Plano Profissional",
                  "price": "299.90",
                  "priceCurrency": "BRL",
                  "priceValidUntil": "2026-12-31",
                  "url": "https://homologaplus.com.br/#pricing"
                },
                {
                  "@type": "Offer",
                  "name": "Plano Enterprise",
                  "price": "399.90",
                  "priceCurrency": "BRL",
                  "priceValidUntil": "2026-12-31",
                  "url": "https://homologaplus.com.br/#pricing"
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "47",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Carlos Mendes"
                },
                "datePublished": "2025-11-15",
                "reviewBody": "Reduziu o tempo de homologação dos nossos projetos pela metade. Ferramenta indispensável para quem trabalha com energia solar.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                }
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Ana Ferreira"
                },
                "datePublished": "2025-12-03",
                "reviewBody": "Finalmente um sistema que organiza toda a documentação de homologação. Parei de perder prazo por falta de controle.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                }
              }
            ],
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
          <WhoIsItFor />
          <Flow />
          <MobilePreview />
          <Features />
          <MapControl />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </Suspense>
      <SpeedInsights />
      
      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 bg-white text-primary p-4 rounded-2xl shadow-2xl border border-slate-100 hover:bg-primary hover:text-white transition-all group"
      >
        <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </div>
  );
};

export default LandingPage;
