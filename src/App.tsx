import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle2, 
  LayoutDashboard, 
  Users, 
  FileText, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Smartphone, 
  Clock, 
  Sun,
  ChevronRight,
  Menu,
  X,
  DollarSign,
  Calendar,
  Award,
  Star,
  ChevronDown,
  Gauge
} from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showFeatures, setShowFeatures] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'O Problema', href: '#problema' },
    { name: 'Solução', href: '#solucao' },
    { name: 'Planos', href: '#planos' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-[60]">
        <motion.div 
          className="h-full bg-primary origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200 py-2 shadow-sm' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-display font-bold tracking-tight text-slate-900">
              HOMOLOGA <span className="text-primary">Plus</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-4"></div>

            <a 
              href="https://app.homologaplus.com.br/login"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
            >
              Acessar Sistema
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <a 
              href="https://app.homologaplus.com.br/login"
              className="inline-flex items-center justify-center text-xs font-bold text-primary px-4 py-2 bg-primary/10 rounded-xl whitespace-nowrap active:scale-95 transition-transform"
            >
              Acessar
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 xs:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              {isOpen ? <X className="w-5 h-5 xs:w-6 h-6" /> : <Menu className="w-5 h-5 xs:w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-8 space-y-1">
              <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navegação</p>
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-between px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </a>
              ))}
              
              <div className="pt-8 px-2">
                <a 
                  href="https://app.homologaplus.com.br/login"
                  className="w-full bg-primary text-white px-5 py-4 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 block text-center active:scale-[0.98] transition-transform"
                >
                  Testar Gratuitamente
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

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
              Organize projetos, integradores e etapas da homologação em um único sistema profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="https://app.homologaplus.com.br/login"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Testar gratuitamente
              </a>
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
                src="https://i.imgur.com/X8O9as5.png" 
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

const BeforeAfter = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Como as homologações são gerenciadas hoje
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-red-600 mb-4 md:mb-6 flex items-center gap-2">
              <X className="w-5 h-5" /> ANTES DO HOMOLOGA Plus
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                "Planilhas espalhadas",
                "Documentos no WhatsApp",
                "Integradores cobrando status",
                "Projetos difíceis de acompanhar"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary/20 shadow-lg shadow-primary/5">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> COM HOMOLOGA Plus
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                "Projetos centralizados",
                "Área exclusiva para integradores",
                "Status atualizado em tempo real",
                "Fluxo de homologação organizado"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-900 font-medium text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Flow = () => {
  const steps = [
    { title: "Projeto cadastrado", icon: <FileText className="w-6 h-6" />, color: "bg-blue-500" },
    { title: "Análise documental", icon: <ShieldCheck className="w-6 h-6" />, color: "bg-indigo-500" },
    { title: "Envio para concessionária", icon: <Zap className="w-6 h-6" />, color: "bg-amber-500" },
    { title: "Aguardando parecer", icon: <Clock className="w-6 h-6" />, color: "bg-purple-500" },
    { title: "Medidor Trocado", icon: <Gauge className="w-6 h-6" />, color: "bg-rose-500" },
    { title: "Homologado", icon: <CheckCircle2 className="w-6 h-6" />, color: "bg-emerald-500" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Fluxo organizado da <span className="text-primary">homologação</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Acompanhe cada etapa do processo de forma clara e automatizada, eliminando gargalos e erros manuais.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary/20 via-primary to-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="flex flex-col items-center group relative"
              >
                {/* Step Number */}
                <span className="absolute -top-8 text-4xl font-display font-black text-slate-50 select-none group-hover:text-slate-100 transition-colors">
                  0{idx + 1}
                </span>

                <div className="relative">
                  {/* Outer Glow */}
                  <div className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${step.color}`} />
                  
                  {/* Icon Container */}
                  <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-sm border border-white bg-white group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-slate-200/50`}>
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-inner ${step.color} transition-transform duration-500 group-hover:scale-110`}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <div className="w-8 h-1 bg-slate-100 mx-auto rounded-full group-hover:w-12 group-hover:bg-primary transition-all duration-300" />
                </div>

                {/* Mobile/Tablet Connector */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-100 md:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Features = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-surface" 
      id="solucao"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">Funcionalidades</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Tudo o que você precisa para escalar sua empresa de homologação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <LayoutDashboard />, title: "Gestão de Projetos", desc: "Controle completo das usinas em processo de homologação." },
            { icon: <Users />, title: "Área do Integrador", desc: "Cada parceiro possui login próprio para cadastrar e acompanhar projetos." },
            { icon: <FileText />, title: "Controle de Documentos", desc: "Centralize toda a documentação da usina." },
            { icon: <BarChart3 />, title: "Fluxo de Homologação", desc: "Acompanhe cada etapa do processo." },
            { icon: <DollarSign />, title: "Gestão Financeira", desc: "Controle valores recebidos e pendentes por projeto." },
            { icon: <Smartphone />, title: "Mapa de Projetos", desc: "Visualize a localização das usinas cadastradas." },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 md:p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6" })}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const WhoIsItFor = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Para quem é o HOMOLOGA Plus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            "Empresas que prestam serviços de homologação de usinas solares",
            "Empresas de engenharia elétrica",
            "Integradores que terceirizam homologação de sistemas fotovoltaicos"
          ].map((item, idx) => (
            <div key={idx} className="bg-surface p-6 md:p-8 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Eng. Ricardo Santos",
      role: "Diretor Técnico na SolarEng",
      content: "O HOMOLOGA Plus transformou nossa gestão. Antes perdíamos prazos por falta de organização, agora temos controle total de cada etapa da homologação.",
      avatar: "https://picsum.photos/seed/ricardo/128/128"
    },
    {
      name: "Monalisa Felipe",
      role: "Gerente de Projetos na EcoPower",
      content: "A facilidade de gerenciar múltiplos integradores em um só lugar é o grande diferencial. O sistema é intuitivo e o suporte é excelente.",
      avatar: "https://i.imgur.com/M7OKfJ3b.jpg"
    },
    {
      name: "Wellington Ribeiro",
      role: "Sócio-Fundador da WR Projetos Elétricos",
      content: "Reduzimos em 40% o tempo gasto com burocracia e organização de documentos. É uma ferramenta indispensável para quem quer escalar no setor solar.",
      avatar: "https://i.imgur.com/SyFgrfwb.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Empresas de engenharia que já profissionalizaram sua gestão com o HOMOLOGA Plus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-8 flex-grow">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "Quais funcionalidades o sistema oferece?",
      answer: "O HOMOLOGA Plus oferece gestão completa de projetos, controle de documentos, acompanhamento de etapas de homologação, dashboard de indicadores, gestão de integradores e muito mais."
    },
    {
      question: "Como funciona a área do integrador?",
      answer: "Seus integradores parceiros têm um acesso restrito onde podem cadastrar novos projetos, fazer upload de documentos e acompanhar o status de cada homologação em tempo real."
    },
    {
      question: "Quais planos estão disponíveis?",
      answer: "Oferecemos planos Mensal, Semestral (com 15% de desconto) e Anual (com 25% de desconto), todos com acesso completo às funcionalidades do sistema."
    },
    {
      question: "Como entrar em contato com o suporte?",
      answer: "Nosso suporte é humanizado e realizado diretamente via WhatsApp para garantir agilidade no atendimento aos nossos clientes."
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 mb-3 md:mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Tire suas dúvidas sobre como o HOMOLOGA Plus pode ajudar sua empresa.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-slate-100 rounded-2xl overflow-hidden bg-surface transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4 md:pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-5 md:p-6 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Pricing = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      id="planos" 
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Principal da Seção */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Planos e Preços
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
            Escolha o plano ideal para profissionalizar a gestão da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-stretch px-2 sm:px-0">
          {/* Plano Mensal */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow w-full max-w-md mx-auto lg:max-w-none">
            <div className="mb-6">
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plano Mensal</h3>
              <p className="text-primary font-medium text-sm">Ideal para começar</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              Para empresas que estão estruturando seus processos ou desejam testar a plataforma.
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-lg font-medium">R$</span>
                <span className="text-4xl font-display font-black text-slate-900">249</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Acesso completo à plataforma",
                "Cadastro ilimitado de projetos",
                "Gestão de integradores",
                "Controle de documentos",
                "Acompanhamento das etapas de homologação",
                "Suporte via WhatsApp"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <a 
                href="https://app.homologaplus.com.br/login"
                className="w-full py-4 rounded-2xl border border-slate-900 text-slate-900 font-bold hover:bg-slate-50 transition-colors mb-4 block text-center"
              >
                Criar conta
              </a>
              <p className="text-[10px] text-slate-400 text-center italic">
                Indicado para: profissionais autônomos e pequenas empresas que estão iniciando.
              </p>
            </div>
          </div>

          {/* Plano Semestral - DESTAQUE */}
          <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-xl relative flex flex-col transform lg:scale-105 z-10 w-full max-w-md mx-auto lg:max-w-none my-4 lg:my-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 tracking-wider whitespace-nowrap">
              <Star className="w-3 h-3 fill-white" />
              MAIS POPULAR
            </div>
            
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plano Semestral</h3>
              <p className="text-primary font-medium text-sm">Mais resultados pelo menor custo</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              Para empresas em crescimento que possuem fluxo constante de projetos.
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-lg font-medium">R$</span>
                <span className="text-4xl font-display font-black text-slate-900">219</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <p className="text-xs text-primary font-bold mt-1">Cobrança semestral</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Todos os benefícios do plano mensal",
                "Economia em relação ao plano mensal",
                "Onboarding assistido",
                "Treinamento para uso da plataforma",
                "Suporte prioritário"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <a 
                href="https://app.homologaplus.com.br/login"
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mb-4 block text-center"
              >
                Criar conta
              </a>
              <p className="text-[10px] text-slate-400 text-center italic">
                Indicado para empresas com fluxo constante de projetos.
              </p>
            </div>
          </div>

          {/* Plano Anual */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow w-full max-w-md mx-auto lg:max-w-none relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-sm flex items-center gap-1.5 tracking-wider whitespace-nowrap">
              <Star className="w-3 h-3 fill-amber-600" />
              MAIS ECONÔMICO
            </div>
            
            <div className="mb-6 relative">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plano Anual</h3>
              <p className="text-primary font-medium text-sm">Plano profissional</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              O plano mais completo e vantajoso para empresas com grande volume de homologações.
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-lg font-medium">R$</span>
                <span className="text-4xl font-display font-black text-slate-900">189</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <p className="text-xs text-orange-600 font-bold mt-1">Cobrança anual</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Todos os benefícios do plano semestral",
                "Maior economia entre os planos",
                "Suporte premium",
                "Atendimento prioritário",
                "Consultoria de processos para organização da homologação"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <a 
                href="https://app.homologaplus.com.br/login"
                className="w-full py-4 rounded-2xl border border-slate-900 text-slate-900 font-bold hover:bg-slate-50 transition-colors mb-4 block text-center"
              >
                Criar conta
              </a>
              <p className="text-[10px] text-slate-400 text-center italic">
                Indicado para empresas estruturadas com grande volume de projetos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const CTA = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[32px] md:rounded-[40px] p-8 md:p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-0 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-primary rounded-full blur-[80px] md:blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-blue-600 rounded-full blur-[80px] md:blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-6 md:mb-8">
              Comece a organizar suas homologações hoje
            </h2>
            <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-12">
              Centralize todos os projetos em um único sistema profissional.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://app.homologaplus.com.br/login"
                className="bg-primary hover:bg-primary-dark text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-bold transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                🚀 Criar conta gratuita
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-primary p-1.5 rounded-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">HOMOLOGA <span className="text-primary">Plus</span></span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed text-sm">
              Sistema de gestão de homologação de usinas fotovoltaicas. Desenvolvido para simplificar a vida de engenheiros e empresas do setor solar.
            </p>
          </div>
          
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Links Rápidos</h4>
            <ul className="flex flex-col items-start space-y-3 md:space-y-4 text-sm text-slate-600">
              <li><a href="#problema" className="hover:text-primary">O Problema</a></li>
              <li><a href="#solucao" className="hover:text-primary">A Solução</a></li>
              <li><a href="#planos" className="hover:text-primary">Planos</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Contato</h4>
            <ul className="flex flex-col items-start space-y-3 md:space-y-4 text-sm text-slate-600">
              <li>contato@homologaplus.com.br</li>
              <li>Suporte via WhatsApp</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-400 text-center md:text-left">
          <p>© 2026 HOMOLOGA Plus. Todos os direitos reservados.</p>
          <div className="flex gap-6 md:gap-8">
            <Link to="/termos" className="hover:text-slate-600">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-slate-600">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
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
        <title>HOMOLOGA Plus | Gestão de Homologação de Usinas Fotovoltaicas</title>
        <meta name="description" content="A plataforma definitiva para engenheiros e empresas de energia solar. Gerencie e homologue suas usinas fotovoltaicas com agilidade, segurança e automação." />
        <link rel="canonical" href="https://ais-pre-mugp3ltyrxmavzsrbd7ya7-203218294417.us-east1.run.app/" />
      </Helmet>
      <Navbar scrolled={scrolled} />
      <Hero />
      <BeforeAfter />
      <Flow />
      <Features />
      <WhoIsItFor />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/termos" element={<TermsOfUse />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
