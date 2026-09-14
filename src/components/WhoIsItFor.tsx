import React from 'react';
import { Reveal } from '../lib/anim';

const personas = [
  {
    label: 'Empresas de homologação',
    desc: 'Quem presta serviço de homologação de usinas solares para terceiros e precisa de escala.',
  },
  {
    label: 'Engenharia elétrica',
    desc: 'Empresas de engenharia elétrica que assinam e respondem pelos projetos fotovoltaicos.',
  },
];

const WhoIsItFor = () => {
  return (
    <section className="py-14 md:py-20 bg-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal y={20} margin="-100px">
            <h2 className="text-clamp-h2-sm font-bold text-white mb-4">
              Para quem é o Homologa Plus
            </h2>
            <p className="text-lg text-ash leading-relaxed max-w-md">
              Feito para quem vive a homologação de usinas solares no dia a dia, do projeto ao parecer da concessionária.
            </p>
          </Reveal>

          <ul className="flex flex-col">
            {personas.map((p, idx) => (
              <Reveal
                as="li"
                key={p.label}
                y={16}
                duration={0.5}
                delay={idx * 0.08}
                margin="-80px"
                className="border-t border-white/10 py-6 first:border-t-0 first:pt-0 md:py-7"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{p.label}</h3>
                  <p className="text-ash leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
