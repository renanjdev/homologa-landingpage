import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
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
  Star
} from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

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
    { name: 'Como Funciona', href: '#funciona' },
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
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-display font-bold tracking-tight text-slate-900">
              HOMOLOGA <span className="text-primary">Plus</span>
            </span>
          </div>
          
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
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
            >
              Acessar Sistema
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2 xs:gap-4">
            <a 
              href="https://app.homologaplus.com.br/login"
              className="text-[10px] xs:text-xs font-bold text-primary px-2 xs:px-3 py-1.5 bg-primary/10 rounded-lg whitespace-nowrap"
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
                🚀 Testar gratuitamente
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
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="text-center sm:text-left">Utilizado por mais de 50 empresas de engenharia</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-slate-900 rounded-3xl p-4 shadow-2xl overflow-hidden border border-slate-800">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="ml-2 h-5 w-24 sm:w-48 bg-slate-800 rounded-md" />
              </div>
              
            <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4 mb-6">
                <div className="bg-slate-800/50 p-2 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700">
                  <p className="text-slate-400 text-[6px] xs:text-[8px] sm:text-xs uppercase font-bold mb-1 truncate">Em Análise</p>
                  <p className="text-sm xs:text-lg sm:text-2xl font-bold text-white">12</p>
                </div>
                <div className="bg-slate-800/50 p-2 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700">
                  <p className="text-slate-400 text-[6px] xs:text-[8px] sm:text-xs uppercase font-bold mb-1 truncate">Enviados</p>
                  <p className="text-sm xs:text-lg sm:text-2xl font-bold text-white">28</p>
                </div>
                <div className="bg-slate-800/50 p-2 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700">
                  <p className="text-slate-400 text-[6px] xs:text-[8px] sm:text-xs uppercase font-bold mb-1 truncate">Homologados</p>
                  <p className="text-sm xs:text-lg sm:text-2xl font-bold text-green-400">145</p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: "Usina Solar Silva", status: "Parecer", color: "bg-blue-500" },
                  { name: "Fazenda Sol Nascente", status: "Análise", color: "bg-yellow-500" },
                  { name: "Residencial Horizonte", status: "OK", color: "bg-green-500" },
                ].map((project, idx) => (
                  <div key={idx} className="bg-slate-800/30 p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center justify-between border border-slate-700/50 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.color}`} />
                      <span className="text-[10px] sm:text-sm text-slate-200 font-medium truncate">{project.name}</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-md uppercase font-bold whitespace-nowrap shrink-0">{project.status}</span>
                  </div>
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  return (
    <section className="py-16 md:py-24 bg-surface">
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
    </section>
  );
};

const Flow = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Fluxo organizado da homologação
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          {[
            { title: "Projeto cadastrado", icon: <FileText className="w-5 h-5" /> },
            { title: "Análise documental", icon: <ShieldCheck className="w-5 h-5" /> },
            { title: "Envio para concessionária", icon: <Zap className="w-5 h-5" /> },
            { title: "Aguardando parecer", icon: <Clock className="w-5 h-5" /> },
            { title: "Homologado", icon: <CheckCircle2 className="w-5 h-5" /> }
          ].map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-3 group w-full lg:w-auto relative">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-sm ${idx === arr.length - 1 ? 'bg-success text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                  {step.icon}
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-700 text-center max-w-[140px] px-4 lg:px-0">
                  {step.title}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div className="flex lg:flex-row flex-col items-center">
                  <div className="w-px h-8 lg:w-12 xl:w-16 lg:h-px bg-slate-200" />
                  <ChevronRight className="w-4 h-4 text-slate-300 hidden lg:block" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-surface" id="solucao">
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
    </section>
  );
};

const WhoIsItFor = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
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
    </section>
  );
};

const DashboardMockup = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white overflow-hidden" id="funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 md:mb-6 px-4">
            Veja o sistema funcionando na prática
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto px-4 md:px-0"
        >
          <div className="bg-slate-800 rounded-[2rem] p-2 md:p-4 shadow-2xl border border-slate-700 relative">
            <div className="bg-slate-900 rounded-[1.5rem] overflow-hidden aspect-[16/10] md:aspect-video relative border border-slate-800">
              <img 
                src="https://picsum.photos/seed/solar-dashboard/1200/800" 
                alt="Dashboard Mockup" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-transparent" />
              
              {/* Simulated UI Elements */}
              <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="h-2 w-20 bg-primary/40 rounded-full" />
                    <div className="h-4 w-32 bg-white/20 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                      <div className="h-1.5 w-10 bg-white/20 rounded-full mb-2" />
                      <div className="h-3 w-16 bg-white/40 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-primary/20 backdrop-blur-xl p-6 md:p-10 rounded-full border border-primary/30 shadow-2xl animate-pulse">
                  <LayoutDashboard className="w-12 h-12 md:w-20 md:h-20 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative floating elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-success rounded-full blur-3xl opacity-20" />
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="planos" className="py-16 md:py-24 bg-surface">
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
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-16 md:py-24">
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
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">HOMOLOGA <span className="text-primary">Plus</span></span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed text-sm">
              Sistema de gestão de homologação de usinas fotovoltaicas. Desenvolvido para simplificar a vida de engenheiros e empresas do setor solar.
            </p>
          </div>
          
          <div className="flex flex-col items-start text-left">
            <h4 className="font-bold text-slate-900 mb-4 md:mb-6">Links Rápidos</h4>
            <ul className="flex flex-col items-start space-y-3 md:space-y-4 text-sm text-slate-600">
              <li><a href="#problema" className="hover:text-primary">O Problema</a></li>
              <li><a href="#solucao" className="hover:text-primary">A Solução</a></li>
              <li><a href="#funciona" className="hover:text-primary">Como Funciona</a></li>
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
          <p>© 2024 HOMOLOGA Plus. Todos os direitos reservados.</p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="hover:text-slate-600">Termos de Uso</a>
            <a href="#" className="hover:text-slate-600">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar scrolled={scrolled} />
      <Hero />
      <BeforeAfter />
      <Flow />
      <Features />
      <WhoIsItFor />
      <DashboardMockup />
      <Pricing />
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
}
