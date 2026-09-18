import React, { type CSSProperties } from 'react';
import type { SectionDefinition } from './types';
import Demonstracao from '../sections/01-demonstracao';
import PecaDensa from '../sections/02-peca-densa';
import Mecanismo from '../sections/03-mecanismo';
import Virada from '../sections/04-virada';
import Prova from '../sections/05-prova';
import Acao from '../sections/06-acao';

export const SECTION_REGISTRY: SectionDefinition[] = [
  { id: '01', label: 'Demonstração', duration: 1.55, overlap: 0, component: Demonstracao },
  { id: '02', label: 'A peça densa', duration: 1.9, overlap: 0.12, component: PecaDensa },
  { id: '03', label: 'O mecanismo', duration: 1.65, overlap: 0.1, component: Mecanismo },
  { id: '04', label: 'A virada', duration: 1.45, overlap: 0.08, component: Virada, inverted: true },
  { id: '05', label: 'A prova', duration: 1.95, overlap: 0.1, component: Prova },
  { id: '06', label: 'A ação', duration: 1.55, overlap: 0.08, component: Acao },
];

export function FableRegistry() {
  return (
    <main>
      {SECTION_REGISTRY.map((section, index) => {
        const Component = section.component;
        return (
          <section
            key={section.id}
            data-section={section.id}
            aria-label={`${section.id}. ${section.label}`}
            className={`fable-section-shell ${section.inverted ? 'fable-invert' : ''}`}
            style={{
              '--section-duration': section.duration,
              '--section-overlap': section.overlap,
            } as CSSProperties}
          >
            <Component id={section.id} index={index} label={section.label} />
          </section>
        );
      })}
    </main>
  );
}
