import React from 'react';
import { Reveal, useInView } from '../lib/anim';
import { FileText, ShieldCheck, Zap, Clock, Gauge, CheckCircle2 } from 'lucide-react';

const Flow = () => {
  const steps = [
    { title: "Projeto cadastrado", icon: <FileText className="w-4 h-4" />, color: "bg-bright-sky" },
    { title: "Análise documental", icon: <ShieldCheck className="w-4 h-4" />, color: "bg-bright-sky" },
    { title: "Envio para concessionária", icon: <Zap className="w-4 h-4" />, color: "bg-primary" },
    { title: "Aguardando parecer", icon: <Clock className="w-4 h-4" />, color: "bg-primary" },
    { title: "Medidor trocado", icon: <Gauge className="w-4 h-4" />, color: "bg-primary-dark" },
    { title: "Homologado", icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-success" }
  ];

  const [lineRef, lineIn] = useInView<HTMLDivElement>({ once: true });

  return (
    <Reveal
      as="section"
      margin="-100px"
      className="py-14 md:py-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-clamp-h2 font-display font-bold text-slate-900 mb-3">
            Fluxo organizado da <span className="text-action">homologação</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Acompanhe cada etapa do processo de forma clara e automatizada, eliminando gargalos e erros manuais.
          </p>
        </div>

        <div className="relative">
          {/* Trilho conector — liga os seis passos e termina no verde do
              "Homologado". Fica em z-0 (atrás dos ícones, que têm bg-white
              opaco), de centro a centro do 1º/último passo (1/12 de cada lado
              na grade de 6 colunas). Só no desktop: no mobile os passos rolam
              lado a lado e o trilho fica oculto com elegância. */}
          <div className="hidden lg:block absolute top-6 left-[8.333%] right-[8.333%] h-0.5 rounded-full bg-slate-200/80 z-0">
            <div
              ref={lineRef}
              style={{
                transform: lineIn ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.5s ease-in-out',
              }}
              className="h-full w-full rounded-full bg-gradient-to-r from-bright-sky via-primary to-success"
            />
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:pb-0">
            {steps.map((step, idx) => (
              <Reveal
                as="div"
                key={idx}
                y={20}
                duration={0.5}
                delay={idx * 0.15}
                className="flex flex-shrink-0 w-24 snap-start lg:w-auto flex-col items-center group relative"
              >
                {/* Icon Container */}
                <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm border border-slate-200 bg-white group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-slate-200/50 group-hover:border-slate-300`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-inner ${step.color} transition-transform duration-500 group-hover:scale-110`}>
                    {step.icon}
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default Flow;
