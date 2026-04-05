import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Sun, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
const Pricing = lazy(() => import('../components/Pricing'));
const Footer = lazy(() => import('../components/Footer'));

const Navbar = lazy(() => import('../components/Navbar')); // I'll move Navbar too

const Hero = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" />
              Lançamento Oficial
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-extrabold text-slate-900 leading-[1.2] xs:leading-[1.15] sm:leading-[1.1] mb-6 break-words">
              <span className="block">Sistema de gestão</span>
              <span className="block text-primary">para homologação</span>
              <span className="block">de usinas solares</span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 break-words">
              Toda a gestão de projetos, integradores e etapas da homologação na palma da sua mão, em um único sistema profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://app.homologaplus.com.br/cadastro"
                onClick={() => window.fbq('track', 'Lead')}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Testar gratuitamente
              </a>
            </div>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/64/64`} 
                    alt={`Usuário da plataforma ${i}`} 
                    className="w-8 h-8 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                ))}
              </div>
              <span className="text-center sm:text-left font-medium">Utilizado por mais de 50 empresas de engenharia</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end lg:-mr-16"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[750px] xl:max-w-[900px]"
            >
              <img 
                src="https://i.imgur.com/GZGcSIL.png"
                alt="Dashboard Homologa Plus no MacBook" 
                className="w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.2)] rounded-xl"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/15 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400/15 rounded-full blur-3xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
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
            "name": "HOMOLOGA Plus",
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
              "name": "HOMOLOGA Plus",
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
          <Flow />
          <MobilePreview />
          <Features />
          <MapControl />
          <WhoIsItFor />
          <Testimonials />
          <Pricing />
          <FAQ />
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
