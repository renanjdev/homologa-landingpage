import React from 'react';
import { Reveal, useInView } from '../lib/anim';
import { FileText, ShieldCheck, Zap, Clock, Gauge, CheckCircle2 } from 'lucide-react';

const Flow = () => {
  const steps = [
    { title: "Projeto cadastrado", icon: <FileText className="w-4 h-4" /> },
    { title: "Análise documental", icon: <ShieldCheck className="w-4 h-4" /> },
    { title: "Envio para concessionária", icon: <Zap className="w-4 h-4" /> },
    { title: "Aguardando parecer", icon: <Clock className="w-4 h-4" /> },
    { title: "Medidor trocado", icon: <Gauge className="w-4 h-4" /> },
    { title: "Homologado", icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  const [lineRef, lineIn] = useInView<HTMLDivElement>({ once: true });

  return (
    <Reveal
      as="section"
      margin="-100px"
      className="py-20 md:py-28 bg-ink overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-smoke">
            Do cadastro ao parecer
          </p>
          <h2 className="text-clamp-h2 font-display font-bold text-white text-balance mb-3">
            Fluxo organizado da{' '}
            <span className="relative whitespace-nowrap text-white">
              homologação
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-coral/0 via-coral to-coral/0"
              />
            </span>
          </h2>
          <p className="text-ash max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Acompanhe cada etapa do processo de forma clara e automatizada, eliminando gargalos e erros manuais.
          </p>
        </div>

        <div className="relative">
          {/* Trilho conector — liga os seis passos e culmina no acento coral do
              "Homologado". Fica em z-0 (atrás dos ícones, que têm chip opaco),
              de centro a centro do 1º/último passo (1/12 de cada lado na grade
              de 6 colunas). Só no desktop: no mobile os passos rolam lado a lado
              e o trilho fica oculto com elegância. */}
          <div className="hidden lg:block absolute top-6 left-[8.333%] right-[8.333%] h-0.5 rounded-full bg-white/10 z-0">
            <div
              ref={lineRef}
              style={{
                transform: lineIn ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.5s ease-in-out',
              }}
              className="h-full w-full rounded-full bg-gradient-to-r from-electric-sky/50 via-coral/70 to-coral"
            />
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:pb-0">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <Reveal
                  as="div"
                  key={idx}
                  y={20}
                  duration={0.5}
                  delay={idx * 0.15}
                  className="flex flex-shrink-0 w-24 snap-start lg:w-auto flex-col items-center group relative"
                >
                  {/* Chip do passo — CARD "tecla": obsidian + hairline + inner-shadow,
                      sem drop-shadow. O último passo recebe o único acento coral. */}
                  <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-obsidian border border-white/10 shadow-[var(--key-soft)] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-graphite">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center bg-graphite shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-500 group-hover:scale-110 ${
                        isLast ? 'text-coral' : 'text-mist'
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 className="text-sm md:text-base font-bold text-mist group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default Flow;
