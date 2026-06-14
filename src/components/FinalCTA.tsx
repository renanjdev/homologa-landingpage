import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[2rem] bg-primary-dark px-6 py-14 sm:px-12 md:py-20 text-center"
        >
          {/* Textura instrumental sutil: grade de pontos, sem blobs decorativos */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bright-sky mb-5">
              Comece hoje
            </p>
            <h2 className="text-clamp-h2 font-display font-extrabold text-white mb-5 text-balance">
              Tire suas homologações do caos de planilhas
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto text-pretty">
              Centralize projetos, integradores e prazos em um único painel. Comece em minutos, sem instalar nada.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://app.homologaplus.com.br/cadastro"
                onClick={() => window.fbq && window.fbq('track', 'Lead')}
                className="group bg-white hover:bg-slate-100 text-primary-dark px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 ease-out shadow-lg shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Testar gratuitamente
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.fbq && window.fbq('track', 'Contact')}
                className="border border-white/30 hover:border-white/60 hover:bg-white/5 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 ease-out flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-300">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>7 dias grátis · Sem cartão de crédito · Cancele quando quiser.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
