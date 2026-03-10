import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const WhoIsItFor = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Para quem é o HOMOLOGA Plus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            "Empresas que prestam serviços de homologação de usinas solares",
            "Empresas de engenharia elétrica",
            "Integradores que terceirizam homologação de sistemas fotovoltaicos"
          ].map((item, idx) => (
            <div key={idx} className="bg-surface p-6 md:p-8 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhoIsItFor;
