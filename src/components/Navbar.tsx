import React from 'react';
import { useScrollProgress } from '../lib/anim';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

const CTA_WHATSAPP = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const trackContact = () => { if (window.fbq) window.fbq('track', 'Contact'); };

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollProgress = useScrollProgress();

  const navLinks = [
    { name: 'Automação', href: '#automacao' },
    { name: 'Solução', href: '#solucao' },
    { name: 'Planos', href: '#planos' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-[60]">
        <div
          className="h-full bg-primary origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200 py-2 shadow-sm' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 min-h-[44px] shrink-0 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                className="inline-flex items-center min-h-[44px] px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-4"></div>

            <a
              href="https://app.homologaplus.com.br/login"
              className="inline-flex items-center min-h-[44px] px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary rounded-lg transition-colors"
            >
              Acessar
            </a>
            <a
              href={CTA_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackContact}
              className="inline-flex items-center justify-center min-h-[44px] bg-action hover:bg-action-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-action/20 hover:shadow-action/30 active:scale-95"
            >
              Agendar demonstração
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <a
              href={CTA_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackContact}
              className="inline-flex items-center justify-center min-h-[44px] text-xs font-bold text-white px-4 py-2 bg-action rounded-xl whitespace-nowrap shadow-lg shadow-action/20 active:scale-95 transition-transform"
            >
              Agendar demo
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center min-w-[44px] p-1.5 xs:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5 xs:w-6 h-6" aria-hidden="true" /> : <Menu className="w-5 h-5 xs:w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — colapso via grid-template-rows (0fr↔1fr), sem dependência de animação.
          inert quando fechado: links não recebem foco/clique enquanto invisíveis. */}
      <div
        inert={!isOpen}
        className={`md:hidden grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white border-b border-slate-100 shadow-xl">
            <div className="px-4 pt-2 pb-8 space-y-1">
              <p className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Navegação</p>
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
                  href={CTA_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setIsOpen(false); trackContact(); }}
                  className="w-full min-h-[44px] bg-action text-white px-5 py-4 rounded-2xl text-base font-bold shadow-xl shadow-action/20 block text-center active:scale-[0.98] transition-transform"
                >
                  Agendar demonstração
                </a>
                <p className="mt-3 text-center text-xs font-medium text-slate-500">
                  Demonstração sem compromisso · Liberado pela nossa equipe
                </p>
                <a
                  href="https://app.homologaplus.com.br/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 flex items-center justify-center min-h-[44px] text-center text-sm font-semibold text-slate-500 py-2"
                >
                  Já é cliente? Acessar plataforma
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
