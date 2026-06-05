import React from 'react';

/**
 * Faixa de prova social (logos de clientes).
 * TODO: substituir os placeholders neutros pelos logos reais, ex.:
 *   <img src="/logos/cliente.svg" alt="Cliente" className="h-8 w-auto opacity-70 grayscale" />
 * Mantidos como placeholders cinza por ora.
 */
const Logos = () => {
  const placeholders = [0, 1, 2, 3, 4];

  return (
    <section className="bg-white border-y border-slate-100 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-7">
          Empresas de engenharia em todo o Brasil confiam no Homologa Plus
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {placeholders.map((i) => (
            <div key={i} className="flex items-center gap-2.5 opacity-60" aria-hidden="true">
              <div className="h-8 w-8 rounded-lg bg-slate-200" />
              <div className="h-3.5 w-20 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
