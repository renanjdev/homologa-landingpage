import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Sun, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy load components below the fold
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const Flow = lazy(() => import('../components/Flow'));
const Features = lazy(() => import('../components/Features'));
const WhoIsItFor = lazy(() => import('../components/WhoIsItFor'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const Pricing = lazy(() => import('../components/Pricing'));
const CTA = lazy(() => import('../components/CTA'));
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
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
            <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto md:mx-0 break-words">
              Toda a gestão de projetos, integradores e etapas da homologação na palma da sua mão, em um único sistema profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/waitlist"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Testar gratuitamente
              </Link>
            </div>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/64/64`} 
                    alt="User" 
                    className="w-8 h-8 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                ))}
              </div>
              <span className="text-center sm:text-left">Utilizado por mais de 50 empresas de engenharia</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center md:justify-end"
          >
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px]"
            >
              <img 
                src="https://i.imgur.com/NruoIEi.png" 
                alt="Dashboard Homologa Plus" 
                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                referrerPolicy="no-referrer"
                loading="eager"
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
      <Helmet>
        <title>HOMOLOGA Plus | Homologação Solar e Gestão de Usinas Fotovoltaicas</title>
        <meta name="description" content="Simplifique a homologação solar e a gestão de usinas fotovoltaicas com o HOMOLOGA Plus. Agilidade e segurança para empresas de energia solar e engenheiros." />
        <meta name="keywords" content="homologação solar, energia fotovoltaica, gestão de usinas, engenharia solar, homologa plus, projetos solares, usina solar" />
        <link rel="canonical" href="https://ais-pre-mugp3ltyrxmavzsrbd7ya7-203218294417.us-east1.run.app/" />
      </Helmet>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar scrolled={scrolled} />
      </Suspense>
      <Hero />
      <Suspense fallback={<div className="h-20" />}>
        <BeforeAfter />
        <Flow />
        <Features />
        <WhoIsItFor />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
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
