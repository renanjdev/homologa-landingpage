import type { CSSProperties } from 'react';
import type { SectionProps } from '../contrato/types';
import { LineReveal } from '../contrato/reveal';

export default function Virada({ label }: SectionProps) {
  const ruleStyle: CSSProperties = {
    borderColor: 'color-mix(in srgb, var(--fable-void) 32%, transparent)',
  };

  return (
    <div className="fable-container" style={{ display: 'grid', gap: 'clamp(2rem, 4vh, 4rem)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid',
          ...ruleStyle,
        }}
      >
        <p className="fable-label" style={{ margin: 0 }}>{label}</p>
        <span
          className="fable-tabular"
          style={{ fontFamily: '"Cascadia Code", "JetBrains Mono", ui-monospace, monospace', fontSize: 'var(--fable-label)', fontWeight: 620, letterSpacing: '0.14em' }}
        >
          04 / 06
        </span>
      </div>

      <LineReveal
        as="h2"
        section="04"
        className="fable-display"
        lines={[
          'Mais que gestão.',
          'É engenharia automatizada',
          'antes do protocolo.',
        ]}
      />

      <div className="fable-grid-2" style={{ alignItems: 'end' }}>
        <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '38rem' }}>
          <LineReveal
            as="p"
            section="04"
            className="fable-copy"
            lines={[
              'A gestão do processo existe. Ela organiza responsáveis, etapas e pendências.',
              'O diferencial está antes do envio: dimensionar, gerar o pacote documental e verificar a conformidade técnica do projeto.',
              'Projetos, prazos, financeiro, território e integradores permanecem no mesmo fluxo de operação.',
            ]}
          />
          <p className="fable-copy">
            Memorial, unifilar, planta e anexos entram no mesmo fluxo de validação normativa. Assim, a operação não fica limitada a acompanhar o retrabalho depois que ele aparece.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid',
            ...ruleStyle,
          }}
        >
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <span className="fable-label" style={{ margin: 0 }}>Gestão de processo</span>
            <p className="fable-title" style={{ maxWidth: '13ch' }}>Acompanhar o processo inteiro.</p>
          </div>
          <div
            style={{
              display: 'grid',
              gap: '0.35rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid',
              ...ruleStyle,
            }}
          >
            <span className="fable-label" style={{ margin: 0 }}>Motor de engenharia</span>
            <p className="fable-title" style={{ maxWidth: '15ch' }}>Eliminar a origem do retrabalho.</p>
          </div>
        </div>
      </div>

      <div
        aria-label="Sinais técnicos"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem 1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid',
          ...ruleStyle,
          fontFamily: '"Cascadia Code", "JetBrains Mono", ui-monospace, monospace',
          fontSize: 'var(--fable-label)',
          fontWeight: 620,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>Dimensionamento</span>
        <span>Pacote documental</span>
        <span>Validação normativa</span>
        <span>Antes do protocolo</span>
      </div>
    </div>
  );
}
