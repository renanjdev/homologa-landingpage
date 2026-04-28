import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

const CTA = () => {
  const [count, setCount] = useState(87);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist');
        if (response.ok) {
          const data = await response.json();
          setCount(data.count || 87);
        }
      } catch (err) {
        console.error('Failed to fetch waitlist count:', err);
      }
    };
    fetchCount();
    
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 lg:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              {count} / 100 Vagas • Plano Fundador
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              Garanta seu lugar no <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">lançamento oficial</span>
            </h2>
            
            <p className="text-base md:text-xl text-slate-400 mb-10 md:mb-14 leading-relaxed">
              O Homologa Plus está sendo construído com os maiores especialistas do setor. 
              Entre na lista agora e garanta o <span className="text-white font-semibold">Plano Fundador</span> com benefícios vitalícios.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/waitlist"
                className="group bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl text-lg md:text-xl font-bold transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 w-full sm:w-auto justify-center hover:scale-105 active:scale-95"
              >
                Entrar na Lista de Espera
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Acesso Prioritário</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Plano Fundador</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Suporte VIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTA;
