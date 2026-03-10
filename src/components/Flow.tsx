import React from 'react';
import { motion } from 'motion/react';
import { FileText, ShieldCheck, Zap, Clock, Gauge, CheckCircle2 } from 'lucide-react';

const Flow = () => {
  const steps = [
    { title: "Projeto cadastrado", icon: <FileText className="w-6 h-6" />, color: "bg-blue-500" },
    { title: "Análise documental", icon: <ShieldCheck className="w-6 h-6" />, color: "bg-indigo-500" },
    { title: "Envio para concessionária", icon: <Zap className="w-6 h-6" />, color: "bg-amber-500" },
    { title: "Aguardando parecer", icon: <Clock className="w-6 h-6" />, color: "bg-purple-500" },
    { title: "Medidor Trocado", icon: <Gauge className="w-6 h-6" />, color: "bg-rose-500" },
    { title: "Homologado", icon: <CheckCircle2 className="w-6 h-6" />, color: "bg-emerald-500" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Fluxo organizado da <span className="text-primary">homologação</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Acompanhe cada etapa do processo de forma clara e automatizada, eliminando gargalos e erros manuais.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary/20 via-primary to-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="flex flex-col items-center group relative"
              >
                {/* Step Number */}
                <span className="absolute -top-8 text-4xl font-display font-black text-slate-50 select-none group-hover:text-slate-100 transition-colors">
                  0{idx + 1}
                </span>

                <div className="relative">
                  {/* Outer Glow */}
                  <div className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${step.color}`} />
                  
                  {/* Icon Container */}
                  <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-sm border border-white bg-white group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-slate-200/50`}>
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-inner ${step.color} transition-transform duration-500 group-hover:scale-110`}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <div className="w-8 h-1 bg-slate-100 mx-auto rounded-full group-hover:w-12 group-hover:bg-primary transition-all duration-300" />
                </div>

                {/* Mobile/Tablet Connector */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-100 md:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Flow;
