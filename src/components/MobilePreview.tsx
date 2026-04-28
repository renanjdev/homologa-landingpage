import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Zap, CheckCircle2 } from 'lucide-react';

const MobilePreview = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Smartphone className="w-4 h-4" />
              Gestão na palma da mão
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Seu sistema de homologação, <span className="text-primary">em qualquer lugar.</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Dê autonomia total aos seus integradores. Com o Homologa Plus, seus parceiros cadastram projetos e acompanham o status direto do canteiro de obras, com uma interface 100% responsiva e veloz.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "Login simplificado para integradores",
                "Envio de documentos via celular",
                "Status em tempo real via WhatsApp",
                "Dashboard móvel com métricas rápidas"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Decorative backgrounds */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
            
            <div className="relative group max-w-[320px] sm:max-w-[380px]">
              <div className="relative z-10">
                <img
                  src="https://i.imgur.com/4bZCkIG.png"
                  alt="Interface Mobile Homologa Plus"
                  width={380}
                  height={760}
                  className="w-full h-auto drop-shadow-[0_45px_60px_rgba(0,0,0,0.15)] rounded-[3rem]"
                  loading="lazy"
                />
              </div>

              {/* Feature Cards Floating */}
              <div className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Status</p>
                    <p className="text-sm font-bold text-slate-900">Acesso Mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
