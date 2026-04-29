import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

const BeforeAfter = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Como as homologações são gerenciadas hoje
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-red-600 mb-4 md:mb-6 flex items-center gap-2">
              <X className="w-5 h-5" /> ANTES DO Homologa Plus
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
              <CheckCircle2 className="w-5 h-5" /> COM Homologa Plus
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
    </motion.section>
  );
};

export default BeforeAfter;
