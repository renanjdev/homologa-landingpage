import React from 'react';
import { useScrollProgress } from '../lib/anim';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

const CTA_WHATSAPP = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const trackContact = () => { if (window.fbq) window.fbq('track', 'Contact'); };

// FASE 1 do re-skin RAYCAST COCKPIT: a navbar é sempre cockpit-dark (glass sobre
// Void). `scrolled` só adensa o vidro quando a página rola — nunca volta a claro.
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
      {/* Trilho de progresso — hairline coral sobre o topo */}
      <div className="fixed top-0 left-0 right-0 h-px z-[60] bg-white/10">
        <div
          className="h-full origin-left bg-coral transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-2xl transition-all duration-300 ${
          scrolled ? 'bg-ink/80 py-2' : 'bg-ink/55 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              to="/"
              className="flex items-center gap-2 min-h-[44px] shrink-0 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo-h-white.png"
                alt="Homologa Plus"
                width={36}
                height={36}
                className="w-9 h-9 group-hover:scale-110 transition-transform"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Homologa <span className="font-medium text-white/70">Plus</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="inline-flex items-center min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg text-ash hover:text-white hover:bg-white/5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.name}
                </a>
              ))}

              <div className="h-6 w-px mx-4 bg-white/15"></div>

              <a
                href="https://app.homologaplus.com.br/login"
                className="inline-flex items-center min-h-[44px] px-4 py-2 text-sm font-semibold rounded-lg text-mist/80 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Acessar
              </a>
              {/* CTA primário do sistema: botão neutro Mist tátil (tecla). */}
              <a
                href={CTA_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackContact}
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl text-sm font-bold bg-mist text-ink shadow-[var(--btn-lift)] hover:brightness-105 hover:-translate-y-px active:translate-y-0 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                className="inline-flex items-center justify-center min-h-[44px] text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap bg-mist text-ink shadow-[var(--btn-lift)] active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Agendar demo
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isOpen}
                className="inline-flex items-center justify-center min-w-[44px] p-1.5 xs:p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {isOpen ? (
                  <X className="w-5 h-5 xs:w-6 xs:h-6 text-ash" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 xs:w-6 xs:h-6 text-ash" aria-hidden="true" />
                )}
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
            <div className="bg-ink border-b border-white/10 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)]">
              <div className="px-4 pt-2 pb-8 space-y-1">
                <p className="px-3 py-2 text-[11px] font-bold text-smoke uppercase tracking-widest font-mono">Navegação</p>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3 py-3 text-base font-semibold text-mist hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-smoke" />
                  </a>
                ))}

                <div className="pt-8 px-2">
                  <a
                    href={CTA_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { setIsOpen(false); trackContact(); }}
                    className="w-full min-h-[44px] bg-mist text-ink px-5 py-4 rounded-2xl text-base font-bold shadow-[var(--btn-lift)] block text-center active:scale-[0.98] transition-transform"
                  >
                    Agendar demonstração
                  </a>
                  <p className="mt-3 text-center text-xs font-medium text-smoke">
                    Demonstração sem compromisso · Liberado pela nossa equipe
                  </p>
                  <a
                    href="https://app.homologaplus.com.br/login"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 flex items-center justify-center min-h-[44px] text-center text-sm font-semibold text-ash hover:text-white py-2 transition-colors"
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
