import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, PlayCircle, FileText, Users, DollarSign, Clock, ShieldCheck, BarChart3 } from 'lucide-react';

const Start = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-primary/20">
      <Helmet>
        <title>Teste Grátis por 30 Dias | Homologa Plus - Gestão de Homologação Solar</title>
        <meta name="description" content="Pare de gerenciar homologações solares por planilha e WhatsApp. Controle projetos, clientes e documentos em um só lugar. Teste grátis por 30 dias." />
        <meta name="keywords" content="teste grátis homologa plus, software homologação solar, gestão projetos solares" />
        <link rel="canonical" href="https://homologaplus.com.br/start" />
        <meta property="og:title" content="Teste Grátis por 30 Dias | Homologa Plus" />
        <meta property="og:description" content="Pare de gerenciar homologações solares por planilha e WhatsApp. Controle projetos, clientes e documentos em um só lugar." />
        <meta property="og:url" content="https://homologaplus.com.br/start" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-blue-400 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <img src="/logo-h.png" alt="Homologa Plus" width={48} height={48} className="w-12 h-12" />
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Homologa <span className="text-bright-sky font-medium">Plus</span>
          </span>
        </motion.div>

        {/* Hero - Pain Point */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 leading-[1.1] mb-6 px-2"
          >
            Pare de gerenciar homologações no <span className="text-primary">WhatsApp</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto px-4"
          >
            Chega de planilha, print de conversa e documento perdido. Tenha <strong>controle total</strong> dos seus projetos solares em um único sistema.
          </motion.p>
        </div>

        {/* Primary CTA */}
        <div className="w-full max-w-sm flex flex-col gap-4 mb-12">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="https://app.homologaplus.com.br/cadastro"
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white text-lg font-extrabold py-5 px-8 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] min-h-[56px]"
          >
            <PlayCircle className="w-5 h-5" />
            Testar grátis por 30 dias
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="https://wa.me/5514991273245?text=Quero%20testar%20o%20Homologa%20Plus"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 text-lg font-bold py-5 px-8 rounded-2xl transition-all border border-slate-200 shadow-sm active:scale-[0.98] min-h-[56px]"
          >
            <MessageCircle className="w-5 h-5 text-success" />
            Falar no WhatsApp
          </motion.a>
        </div>

        {/* Pain Section - Before/After */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-md mb-12"
        >
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Você ainda gerencia assim?</h2>
          <div className="space-y-3 px-4">
            {[
              "Planilha no Google Sheets para controlar projetos",
              "WhatsApp para atualizar o cliente sobre o andamento",
              "E-mail para enviar documentos para a concessionária",
              "Anotações soltas sobre prazos e pendências",
            ].map((pain, idx) => (
              <div key={idx} className="flex items-start gap-3 text-slate-500 text-sm sm:text-base">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span>{pain}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-md mb-12"
        >
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Com o Homologa Plus, você tem:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
            {[
              { icon: FileText, title: "Controle de projetos", desc: "Todas as etapas da homologação organizadas e visíveis" },
              { icon: Users, title: "Portal do cliente", desc: "Seu cliente acompanha o projeto em tempo real, sem te ligar" },
              { icon: DollarSign, title: "Gestão financeira", desc: "Controle de recebimentos e cobranças por projeto" },
              { icon: Clock, title: "Prazos automáticos", desc: "Alertas de vencimento para nunca perder um prazo" },
              { icon: ShieldCheck, title: "Documentos centralizados", desc: "Upload e organização de todos os documentos em um só lugar" },
              { icon: BarChart3, title: "Visão gerencial", desc: "Dashboard com métricas e status de todos os projetos" },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full max-w-sm space-y-4 px-4 mb-12"
        >
          {[
            "Sem cartão de crédito para começar",
            "Configuração em menos de 5 minutos",
            "Suporte humano por WhatsApp",
            "Utilizado por mais de 50 empresas"
          ].map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-3 text-slate-600 font-medium text-sm sm:text-base">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <span>{bullet}</span>
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full max-w-sm text-center mb-8"
        >
          <p className="text-slate-600 text-sm mb-4">Pronto para organizar suas homologações?</p>
          <a
            href="https://app.homologaplus.com.br/cadastro"
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white text-lg font-extrabold py-5 px-8 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] min-h-[56px]"
          >
            <PlayCircle className="w-5 h-5" />
            Começar teste grátis agora
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-8 text-slate-400 text-xs font-medium tracking-wide">
          Homologa Plus © {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
};

export default Start;
