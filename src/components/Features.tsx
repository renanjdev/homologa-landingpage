import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, FileText, BarChart3, DollarSign, Smartphone } from 'lucide-react';

const Features = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-surface" 
      id="solucao"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 md:mb-6">Funcionalidades</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Tudo o que você precisa para escalar sua empresa de homologação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <LayoutDashboard />, title: "Gestão de Projetos", desc: "Controle completo das usinas em processo de homologação." },
            { icon: <Users />, title: "Área do Integrador", desc: "Cada parceiro possui login próprio para cadastrar e acompanhar projetos." },
            { icon: <FileText />, title: "Controle de Documentos", desc: "Centralize toda a documentação da usina." },
            { icon: <BarChart3 />, title: "Fluxo de Homologação", desc: "Acompanhe cada etapa do processo." },
            { icon: <DollarSign />, title: "Gestão Financeira", desc: "Controle valores recebidos e pendentes por projeto." },
            { icon: <Smartphone />, title: "Mapa de Projetos", desc: "Visualize a localização das usinas cadastradas." },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 md:p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6" })}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
