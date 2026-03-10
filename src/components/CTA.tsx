import React from 'react';
import { motion } from 'motion/react';

const CTA = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 lg:p-24 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-primary rounded-full blur-[80px] md:blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-blue-600 rounded-full blur-[80px] md:blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-6 md:mb-8">
              Comece a organizar suas homologações hoje
            </h2>
            <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-12">
              Centralize todos os projetos em um único sistema profissional.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://app.homologaplus.com.br/login"
                className="bg-primary hover:bg-primary-dark text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-bold transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Criar conta gratuita
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTA;
