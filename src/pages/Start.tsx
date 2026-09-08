import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Reveal } from '../lib/anim';
import { CheckCircle2, MessageCircle, PlayCircle, FileText, Users, DollarSign, Clock, ShieldCheck, BarChart3 } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

// Conversão direta no WhatsApp: o formulário on-page foi removido, todo CTA
// primário abre a conversa com a equipe para agendar a demonstração.
const startWhatsAppLink = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const trackContact = () => { if (window.fbq) window.fbq('track', 'Contact'); };

const Start = () => {
  return (
    <div className="min-h-screen bg-void text-mist font-sans overflow-x-hidden selection:bg-coral/25">
      <Helmet>
        <title>Teste Grátis por 3 Dias | Homologa Plus - Gestão de Homologação Solar</title>
        <meta name="description" content="Pare de gerenciar homologações solares por planilha e WhatsApp. Controle projetos, clientes e documentos em um só lugar. Agende uma demonstração e veja como funciona." />
        <meta name="keywords" content="demonstração homologa plus, software homologação solar, gestão projetos solares" />
        <link rel="canonical" href="https://homologaplus.com.br/start" />
        <meta property="og:title" content="Teste Grátis por 3 Dias | Homologa Plus" />
        <meta property="og:description" content="Pare de gerenciar homologações solares por planilha e WhatsApp. Controle projetos, clientes e documentos em um só lugar." />
        <meta property="og:url" content="https://homologaplus.com.br/start" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-20 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cobalt rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-coral rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center">

        {/* Logo */}
        <Reveal
          as="div"
          scale={0.9}
          duration={0.5}
          trigger="mount"
          className="flex items-center gap-2 mb-12"
        >
          <img src="/logo-h-white.png" alt="Homologa Plus" width={48} height={48} className="w-12 h-12" />
          <span className="text-2xl font-bold tracking-tight text-white">
            Homologa <span className="text-coral font-medium">Plus</span>
          </span>
        </Reveal>

        {/* Hero - Pain Point */}
        <div className="text-center mb-10">
          <Reveal
            as="h1"
            y={20}
            delay={0.1}
            trigger="mount"
            className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.1] mb-6 px-2"
          >
            Pare de gerenciar homologações no <span className="hero-grif">WhatsApp</span>
          </Reveal>
          <Reveal
            as="p"
            y={20}
            delay={0.2}
            trigger="mount"
            className="text-lg sm:text-xl text-ash leading-relaxed max-w-lg mx-auto px-4"
          >
            Chega de planilha, print de conversa e documento perdido. Tenha <strong>controle total</strong> dos seus projetos solares em um único sistema.
          </Reveal>
        </div>

        {/* Primary CTA */}
        <div className="w-full max-w-sm flex flex-col gap-4 mb-12">
          <Reveal
            as="a"
            y={20}
            delay={0.3}
            trigger="mount"
            href={startWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackContact}
            className="w-full flex items-center justify-center gap-3 bg-mist hover:brightness-105 hover:-translate-y-px text-ink text-lg font-extrabold py-5 px-8 rounded-2xl transition-all shadow-[var(--btn-lift)] active:scale-[0.98] min-h-[56px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <PlayCircle className="w-5 h-5" />
            Agendar demonstração
          </Reveal>

          <Reveal
            as="a"
            y={20}
            delay={0.4}
            trigger="mount"
            href={buildWhatsAppLink('Olá! Quero saber mais sobre o Homologa Plus.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackContact}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 hover:border-steel text-white text-lg font-bold py-5 px-8 rounded-2xl transition-all border border-white/10 shadow-[var(--key-soft)] active:scale-[0.98] min-h-[56px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="w-5 h-5 text-mist" />
            Falar no WhatsApp
          </Reveal>
        </div>

        {/* Pain Section - Before/After */}
        <Reveal
          as="div"
          y={20}
          delay={0.5}
          trigger="mount"
          className="w-full max-w-md mb-12"
        >
          <h2 className="text-xl font-bold text-white text-center mb-6">Você ainda gerencia assim?</h2>
          <div className="space-y-3 px-4">
            {[
              "Planilha no Google Sheets para controlar projetos",
              "WhatsApp para atualizar o cliente sobre o andamento",
              "E-mail para enviar documentos para a concessionária",
              "Anotações soltas sobre prazos e pendências",
            ].map((pain, idx) => (
              <div key={idx} className="flex items-start gap-3 text-ash text-sm sm:text-base">
                <span className="text-coral font-bold mt-0.5">✕</span>
                <span>{pain}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Benefits Section */}
        <Reveal
          as="div"
          y={20}
          delay={0.6}
          trigger="mount"
          className="w-full max-w-md mb-12"
        >
          <h2 className="text-xl font-bold text-white text-center mb-6">Com o Homologa Plus, você tem:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
            {[
              { icon: FileText, title: "Controle de projetos", desc: "Todas as etapas da homologação organizadas e visíveis" },
              { icon: Users, title: "Portal do cliente", desc: "Seu cliente acompanha o projeto em tempo real, sem te ligar" },
              { icon: DollarSign, title: "Gestão financeira", desc: "Controle de recebimentos e cobranças por projeto" },
              { icon: Clock, title: "Prazos automáticos", desc: "Alertas de vencimento para nunca perder um prazo" },
              { icon: ShieldCheck, title: "Documentos centralizados", desc: "Upload e organização de todos os documentos em um só lugar" },
              { icon: BarChart3, title: "Visão gerencial", desc: "Dashboard com métricas e status de todos os projetos" },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-obsidian border border-white/10 shadow-[var(--key-soft)]">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-ash text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Trust Bullets */}
        <Reveal
          as="div"
          duration={0.8}
          delay={0.7}
          trigger="mount"
          className="w-full max-w-sm space-y-4 px-4 mb-12"
        >
          {[
            "Demonstração sem compromisso",
            "Acesso liberado pela nossa equipe, um a um",
            "Suporte humano por WhatsApp",
            "Utilizado por mais de 200 empresas"
          ].map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-3 text-ash font-medium text-sm sm:text-base">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-coral" />
              </div>
              <span>{bullet}</span>
            </div>
          ))}
        </Reveal>

        {/* Fecho: CTA final de WhatsApp, o canal único de conversão. */}
        <Reveal
          as="a"
          y={20}
          delay={0.8}
          href={startWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackContact}
          className="w-full max-w-sm flex items-center justify-center gap-3 bg-mist hover:brightness-105 hover:-translate-y-px text-ink text-lg font-extrabold py-5 px-8 rounded-2xl transition-all shadow-[var(--btn-lift)] active:scale-[0.98] min-h-[56px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <MessageCircle className="w-5 h-5" />
          Agendar demonstração
        </Reveal>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-8 text-smoke text-xs font-medium tracking-wide">
          Homologa Plus © {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
};

export default Start;
