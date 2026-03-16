import React from 'react';
import { motion } from 'motion/react';
import mapProjetosUnico from '../assets/map-projetos-unico.png';
import { MapPin, Navigation } from 'lucide-react';

const MapControl = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative z-10 w-full flex justify-center lg:justify-start">
               <motion.div
                 whileHover={{ y: -5 }}
                 className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-slate-100"
               >
                 <img 
                   src={mapProjetosUnico} 
                   alt="Visão geral do mapa de projetos" 
                   className="w-full h-auto object-cover"
                   loading="lazy"
                 />
               </motion.div>
            </div>
            {/* Decoração atrás das imagens */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <MapPin className="w-4 h-4" />
              Visão Geográfica
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Controle de Projetos <span className="text-primary">no Mapa</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Visualize todas as suas obras e projetos em andamento de forma geográfica. 
              Identifique rapidamente a concentração de novos negócios e acompanhe o 
              volume de homologações diretamente pelo mapa interativo.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Visão ampla de todos os projetos em um único mapa",
                "Filtros de status visualizados por cores no território",
                "Análise rápida da concentração comercial das equipes",
                "Acesso rápido aos detalhes das obras pela visualização geográfica"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 mt-1">
                    <Navigation className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => {
                const plansSection = document.getElementById('planos');
                if (plansSection) {
                  plansSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              Conhecer a Plataforma
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default MapControl;
