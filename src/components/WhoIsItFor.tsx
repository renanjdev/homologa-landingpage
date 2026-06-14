import React from 'react';
import { motion } from 'motion/react';
import { Building2, Zap } from 'lucide-react';

const personas = [
  {
    Icon: Building2,
    label: 'Empresas de homologação',
    desc: 'Quem presta serviço de homologação de usinas solares para terceiros e precisa de escala.',
  },
  {
    Icon: Zap,
    label: 'Engenharia elétrica',
    desc: 'Empresas de engenharia elétrica que assinam e respondem pelos projetos fotovoltaicos.',
  },
];

const WhoIsItFor = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-clamp-h2 font-display font-bold text-slate-900 mb-4">
              Para quem é o Homologa Plus
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
              Feito para quem vive a homologação de usinas solares no dia a dia, do projeto ao parecer da concessionária.
            </p>
          </motion.div>

          <ul className="flex flex-col">
            {personas.map((p, idx) => (
              <motion.li
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-start gap-5 border-t border-slate-100 py-6 first:border-t-0 first:pt-0 md:gap-6 md:py-7"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-primary/10 text-primary md:h-14 md:w-14">
                  <p.Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 mb-1">{p.label}</h3>
                  <p className="text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
