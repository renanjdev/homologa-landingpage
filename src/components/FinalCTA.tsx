import React from 'react';
import { Reveal } from '../lib/anim';
import { ArrowRight } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { buildWhatsAppLink } from '../utils/whatsapp';

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          as="div"
          y={30}
          margin="-100px"
          className="relative overflow-hidden rounded-[2rem] bg-obsidian border border-white/10 shadow-[var(--key)] px-6 py-14 sm:px-12 md:py-20 text-center"
        >
          {/* Textura instrumental sutil: grade de pontos, sem blobs decorativos */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-clamp-h2 font-bold text-white mb-5 text-balance">
              Gere e valide sua documentação a partir de hoje
            </h2>
            <p className="text-base md:text-lg text-ash mb-10 leading-relaxed max-w-xl mx-auto text-pretty">
              Gere os documentos no padrão da distribuidora, valide a conformidade antes de protocolar e gerencie tudo num só painel. Fale com a nossa equipe no WhatsApp e a gente libera o seu acesso.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.fbq && window.fbq('track', 'Contact')}
                className="group flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#172b50] px-5 py-4 text-base font-bold text-white ring-1 ring-coral/40 shadow-[var(--key),var(--btn-lift)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-125 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-lg"
              >
                Agendar demonstração
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.fbq && window.fbq('track', 'Contact')}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base font-bold text-white shadow-[var(--key-soft)] transition-all duration-200 ease-out hover:border-steel hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-lg"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </div>

            <p className="mt-8 text-sm text-ash">
              Demonstração sem compromisso · Acesso liberado pela nossa equipe.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
