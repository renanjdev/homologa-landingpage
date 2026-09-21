import React, { type CSSProperties } from 'react';

// Proporção (largura/altura) de cada arquivo em public/concessionarias.
const CONCESSIONARIAS = [
  { nome: 'CPFL', arquivo: 'cpfl', proporcao: 131 / 96 },
  { nome: 'Enel', arquivo: 'enel', proporcao: 181 / 96 },
  { nome: 'Energisa', arquivo: 'energisa', proporcao: 294 / 96 },
  { nome: 'Cemig', arquivo: 'cemig', proporcao: 379 / 96 },
  { nome: 'Equatorial', arquivo: 'equatorial', proporcao: 322 / 96 },
  { nome: 'Neoenergia', arquivo: 'neoenergia', proporcao: 466 / 96 },
  { nome: 'EDP', arquivo: 'edp', proporcao: 259 / 96 },
];

// Equaliza o peso visual: logos largas ficam mais baixas, as compactas mais altas.
const alturaPx = (proporcao: number) => Math.round(Math.min(40, Math.max(20, 29 * Math.pow(2.5 / proporcao, 0.4))));

function Logos({ copia }: { copia?: boolean }) {
  return (
    <ul className="esteira__grupo" aria-hidden={copia || undefined}>
      {CONCESSIONARIAS.map(({ nome, arquivo, proporcao }) => {
        const altura = alturaPx(proporcao);
        return (
          <li key={arquivo} className="esteira__item">
            <img
              src={`/concessionarias/${arquivo}.webp`}
              alt={copia ? '' : nome}
              width={Math.round(altura * proporcao)}
              height={altura}
              decoding="async"
              style={{ '--logo-h': `${altura}px` } as CSSProperties}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default function EsteiraConcessionarias() {
  return (
    <div className="esteira" role="region" aria-label="Distribuidoras atendidas">
      <p className="fable-label esteira__titulo">Preparado para o padrão das principais distribuidoras</p>
      <div className="esteira__trilho">
        <div className="esteira__faixa">
          <Logos />
          <Logos copia />
        </div>
      </div>
    </div>
  );
}
