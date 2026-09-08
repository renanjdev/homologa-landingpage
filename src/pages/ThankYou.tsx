import React from 'react';
import { Reveal } from '../lib/anim';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { buildWhatsAppLink } from '../utils/whatsapp';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col bg-void text-mist">
      <Navbar scrolled={true} />

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <Reveal
            as="div"
            y={20}
            scale={0.95}
            trigger="mount"
            className="bg-obsidian rounded-3xl p-8 sm:p-12 shadow-[var(--key-soft)] border border-white/10 text-center"
          >
            {/* Ícone de Sucesso */}
            <Reveal
              as="div"
              scale={0}
              duration={0.5}
              delay={0.2}
              trigger="mount"
              className="w-24 h-24 bg-coral-ember rounded-full flex items-center justify-center mx-auto mb-8 shadow-[inset_0_0_0_1px_rgba(255,99,99,0.25)]"
            >
              <CheckCircle2 className="w-12 h-12 text-coral" />
            </Reveal>

            {/* Títulos */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Obrigado pela sua assinatura!
            </h1>
            <p className="text-lg text-ash mb-8 max-w-xl mx-auto">
              Sua escolha pelo Homologa Plus foi confirmada. Estamos preparando seu ambiente e, em breve, nossa equipe entrará em contato com os próximos passos.
            </p>

            {/* Passos / Instruções */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/10 shadow-[var(--key-soft)]">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                O que acontece agora?
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-ash">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-graphite text-coral flex items-center justify-center font-bold text-xs shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">1</span>
                  <span>Você receberá um e-mail com os detalhes do seu plano e nota fiscal.</span>
                </li>
                <li className="flex gap-3 text-sm text-ash">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-graphite text-coral flex items-center justify-center font-bold text-xs shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">2</span>
                  <span>Nossa equipe de Customer Success vai chamar você no WhatsApp para apoiar na configuração inicial (Onboarding).</span>
                </li>
                <li className="flex gap-3 text-sm text-ash">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-graphite text-coral flex items-center justify-center font-bold text-xs shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">3</span>
                  <span>Seu ambiente será liberado para uso em até 24 horas úteis.</span>
                </li>
              </ul>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={buildWhatsAppLink('Olá! Acabei de assinar o Homologa Plus e gostaria de falar com o time de suporte.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-mist hover:brightness-105 hover:-translate-y-px text-ink rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[var(--btn-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-5 h-5" />
                Dúvidas? Fale no WhatsApp
              </a>
              <Link 
                to="/"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 text-white hover:bg-white/10 hover:border-steel border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[var(--key-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Voltar à Página Inicial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
