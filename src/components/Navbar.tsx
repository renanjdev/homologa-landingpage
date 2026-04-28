import React from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
            <img
              src="/logo-h.png"
              alt="Homologa Plus"
              width={36}
              height={36}
              className="w-9 h-9 group-hover:scale-110 transition-transform"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Homologa <span className="text-bright-sky font-medium">Plus</span>
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
              Acessar Plataforma
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <a 
              href="https://app.homologaplus.com.br/login"
              className="inline-flex items-center justify-center text-xs font-bold text-primary px-4 py-2 bg-primary/10 rounded-xl whitespace-nowrap active:scale-95 transition-transform"
            >
              Acessar Plataforma
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
                  href="https://app.homologaplus.com.br/cadastro"
                  onClick={() => setIsOpen(false)}
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

export default Navbar;
