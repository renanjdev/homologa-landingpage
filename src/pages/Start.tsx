import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Sun, CheckCircle2, MessageCircle, PlayCircle } from 'lucide-react';

const Start = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-primary/20">
      <Helmet>
        <title>Teste grátis | Homologa Plus</title>
        <meta name="description" content="Comece seu teste grátis no Homologa Plus e organize suas homologações com mais eficiência" />
      </Helmet>

      {/* Decorative background elements - optimized for mobile and very light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-blue-400 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center min-h-screen">
        
        {/* Logo - Centered */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-16"
        >
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-slate-900">
            HOMOLOGA <span className="text-primary">Plus</span>
          </span>
        </motion.div>

        {/* Hero Section - Direct & Impactful */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 leading-[1.1] mb-6 px-2"
          >
            Pare de gerenciar homologações no <span className="text-primary">WhatsApp</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto px-4"
          >
            Organize seus projetos e dê visibilidade aos seus clientes em tempo real
          </motion.p>
        </div>

        {/* Action Buttons - Mobile First Focus */}
        <div className="w-full max-w-sm flex flex-col gap-4 mb-14">
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

        {/* Trust & Features Bullets */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-sm space-y-4 px-4"
        >
          {[
            "Acompanhamento em tempo real",
            "Menos mensagens no WhatsApp",
            "Organização completa dos projetos"
          ].map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-3 text-slate-600 font-medium text-sm sm:text-base">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <span>{bullet}</span>
            </div>
          ))}
        </motion.div>

        {/* Minimalist Footnote */}
        <div className="mt-auto pt-16 pb-8 text-slate-400 text-xs font-medium tracking-wide">
          HOMOLOGA PLUS © {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
};

export default Start;
