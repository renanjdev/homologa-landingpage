import React from 'react';
import { Reveal } from '../lib/anim';
import { X, CheckCircle2 } from 'lucide-react';

const BeforeAfter = () => {
  return (
    <Reveal
      as="section"
      y={20}
      margin="-100px"
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-clamp-h2 font-display font-bold text-slate-900 mb-4 md:mb-6">
            Da papelada manual à homologação automatizada
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-slate-500 mb-4 md:mb-6 flex items-center gap-2">
              <X className="w-5 h-5" /> ANTES DO Homologa Plus
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                "Memorial, unifilar e formulários montados à mão, projeto a projeto",
                "Retrabalho quando a concessionária reprova",
                "Documentos espalhados em planilha e WhatsApp",
                "Projetos difíceis de acompanhar"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-500 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary/20 shadow-lg shadow-primary/5">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> COM Homologa Plus
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                "Documentação gerada e validada automaticamente",
                "Impeditivos apontados antes de protocolar",
                "Projetos, documentos e prazos centralizados",
                "Status em tempo real, do projeto ao parecer"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-900 font-medium text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default BeforeAfter;
