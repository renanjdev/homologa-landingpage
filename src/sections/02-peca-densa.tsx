import React, { useState } from 'react';
import { LineReveal } from '../contrato/reveal';
import { useMockTelemetry } from '../contrato/mock';
import type { SectionProps } from '../contrato/types';

const documents = [
  { id: 'memorial', label: 'Memorial', title: 'Memorial descritivo', src: '/doc-memorial.webp', alt: 'Prévia do memorial descritivo da usina solar' },
  { id: 'unifilar', label: 'Unifilar', title: 'Diagrama unifilar completo', src: '/doc-unifilar-completo.webp', alt: 'Prévia do diagrama unifilar completo' },
  { id: 'blocos', label: 'Blocos', title: 'Diagrama de blocos', src: '/doc-blocos.webp', alt: 'Prévia do diagrama de blocos do sistema fotovoltaico' },
  { id: 'planta', label: 'Planta', title: 'Planta de localização', src: '/doc-planta.webp', alt: 'Prévia da planta de localização da instalação' },
  { id: 'cpfl', label: 'Anexo CPFL', title: 'Anexo da distribuidora', src: '/doc-anexo-cpfl.webp', alt: 'Prévia do anexo CPFL para protocolo' },
] as const;

const validationItems = [
  { state: 'Impeditivo', reference: 'NBR 5410', text: 'Inconsistência que bloqueia a composição do dossiê.' },
  { state: 'Atenção', reference: 'PRODIST Módulo 3', text: 'Ponto que exige conferência técnica antes do protocolo.' },
  { state: 'Conforme', reference: 'NBR 16690', text: 'Item conferido pela regra aplicável ao documento.' },
] as const;

export default function PecaDensa({ label }: SectionProps) {
  const telemetry = useMockTelemetry();
  const [activeDocument, setActiveDocument] = useState(0);
  const selected = documents[activeDocument];

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = documents.length - 1;
    let next = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === index) return;

    event.preventDefault();
    setActiveDocument(next);
    document.getElementById(`dossie-tab-${documents[next].id}`)?.focus();
  };

  return (
    <section className="peca-densa" aria-labelledby="dossie-title">
      <style>{`
        .peca-densa { width: min(100%, 90rem); margin-inline: auto; }
        .peca-densa__intro { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(17rem, .9fr); gap: clamp(1.5rem, 5vw, 6rem); align-items: end; margin-bottom: clamp(1.75rem, 4vh, 3.5rem); }
        .peca-densa__intro .fable-label { margin-bottom: 1rem; }
        .peca-densa__heading { max-width: 9ch; font-size: clamp(2.6rem, 6vw, 6.8rem); line-height: .88; }
        .peca-densa__lede { align-self: end; padding-bottom: .35rem; }
        .peca-densa__board { display: grid; grid-template-columns: minmax(0, 1fr) minmax(17.25rem, .34fr); min-height: min(43rem, 64vh); border: 1px solid color-mix(in srgb, var(--fable-paper) 15%, transparent); background: color-mix(in srgb, var(--fable-paper) 4%, var(--fable-void)); box-shadow: inset 0 1px color-mix(in srgb, var(--fable-paper) 9%, transparent), 0 2rem 6rem color-mix(in srgb, var(--fable-void) 65%, transparent); }
        .peca-densa__workbench { min-width: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); border-right: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); }
        .peca-densa__tabs { display: flex; gap: .25rem; padding: .75rem; overflow-x: auto; border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); scrollbar-width: thin; scrollbar-color: var(--fable-accent) transparent; }
        .peca-densa__tab { flex: 0 0 auto; min-height: 2.75rem; border: 1px solid transparent; border-radius: .45rem; padding: .55rem .78rem; color: var(--fable-muted); background: transparent; font: 600 var(--fable-label)/1.1 "Cascadia Code", ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: color 220ms var(--fable-ease), background 220ms var(--fable-ease), border-color 220ms var(--fable-ease); }
        .peca-densa__tab:hover { color: var(--fable-paper); background: color-mix(in srgb, var(--fable-paper) 6%, transparent); }
        .peca-densa__tab[aria-selected="true"] { color: var(--fable-void); border-color: var(--fable-accent); background: var(--fable-accent); }
        .peca-densa__tab:focus-visible, .peca-densa__status:focus-visible { outline: 2px solid var(--fable-accent); outline-offset: 3px; }
        .peca-densa__canvas { position: relative; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); padding: clamp(1rem, 2vw, 1.5rem); background: color-mix(in srgb, var(--fable-void) 82%, var(--fable-paper)); }
        .peca-densa__document-meta { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding-bottom: .8rem; color: var(--fable-muted); font-family: "Cascadia Code", ui-monospace, monospace; font-size: var(--fable-label); letter-spacing: .11em; line-height: 1.25; text-transform: uppercase; }
        .peca-densa__document-meta strong { color: var(--fable-paper); font-weight: 620; }
        .peca-densa__preview { min-height: 0; overflow: hidden; border: 1px solid color-mix(in srgb, var(--fable-paper) 14%, transparent); background: var(--fable-paper); }
        .peca-densa__preview img { display: block; width: 100%; height: 100%; min-height: 17rem; object-fit: contain; object-position: center; }
        .peca-densa__panel { min-width: 0; display: flex; flex-direction: column; }
        .peca-densa__panel-head { display: flex; justify-content: space-between; gap: 1rem; align-items: center; padding: 1.15rem 1.2rem; border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); }
        .peca-densa__panel-head h3 { margin: 0; font-size: .92rem; font-weight: 620; }
        .peca-densa__simulation { color: var(--fable-accent); font-family: "Cascadia Code", ui-monospace, monospace; font-size: .61rem; font-weight: 650; letter-spacing: .08em; line-height: 1.2; text-align: right; text-transform: uppercase; }
        .peca-densa__metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); }
        .peca-densa__metric { min-width: 0; padding: 1rem 1.15rem; border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 10%, transparent); }
        .peca-densa__metric:nth-child(odd) { border-right: 1px solid color-mix(in srgb, var(--fable-paper) 10%, transparent); }
        .peca-densa__metric dt { color: var(--fable-muted); font-family: "Cascadia Code", ui-monospace, monospace; font-size: .6rem; font-weight: 620; letter-spacing: .1em; line-height: 1.25; text-transform: uppercase; }
        .peca-densa__metric dd { margin: .35rem 0 0; color: var(--fable-paper); font-size: clamp(1.2rem, 2vw, 1.7rem); font-weight: 470; line-height: 1; }
        .peca-densa__checks { display: grid; gap: .65rem; padding: 1rem 1.15rem; }
        .peca-densa__checks h4 { margin: 0 0 .05rem; color: var(--fable-muted); font-family: "Cascadia Code", ui-monospace, monospace; font-size: .61rem; font-weight: 620; letter-spacing: .1em; line-height: 1.25; text-transform: uppercase; }
        .peca-densa__status { width: 100%; min-height: 3.65rem; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: .65rem; align-items: start; border: 1px solid color-mix(in srgb, var(--fable-paper) 12%, transparent); border-radius: .55rem; padding: .7rem; color: var(--fable-paper); background: color-mix(in srgb, var(--fable-paper) 3%, transparent); text-align: left; font: inherit; }
        .peca-densa__status-marker { width: .58rem; height: .58rem; margin-top: .22rem; border-radius: 50%; background: var(--fable-accent); }
        .peca-densa__status:nth-of-type(2) .peca-densa__status-marker { opacity: .62; }
        .peca-densa__status:nth-of-type(3) .peca-densa__status-marker { opacity: .28; }
        .peca-densa__status strong { display: block; font-family: "Cascadia Code", ui-monospace, monospace; font-size: .64rem; font-weight: 650; letter-spacing: .08em; line-height: 1.2; text-transform: uppercase; }
        .peca-densa__status span { display: block; margin-top: .18rem; color: var(--fable-muted); font-size: .71rem; line-height: 1.35; }
        .peca-densa__note { margin: auto 1.15rem 1.15rem; padding-top: .9rem; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 12%, transparent); color: var(--fable-muted); font-size: .72rem; line-height: 1.42; }
        .peca-densa__note strong { color: var(--fable-paper); font-weight: 580; }
        @media (max-width: 60rem) { .peca-densa__intro, .peca-densa__board { grid-template-columns: 1fr; } .peca-densa__workbench { border-right: 0; border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); } .peca-densa__panel { min-height: 24rem; } }
        @media (max-width: 32rem) { .peca-densa__intro { gap: 1rem; } .peca-densa__heading { font-size: clamp(2.3rem, 13vw, 3.4rem); } .peca-densa__canvas { padding: .75rem; } .peca-densa__preview img { min-height: 14rem; } .peca-densa__panel-head { padding-inline: .9rem; } .peca-densa__simulation { max-width: 8rem; } .peca-densa__metric, .peca-densa__checks { padding-inline: .9rem; } .peca-densa__note { margin-inline: .9rem; } }
      `}</style>

      <div className="peca-densa__intro">
        <div>
          <p className="fable-label">02 · {label}</p>
          <LineReveal
            as="h2"
            section="02"
            className="fable-heading peca-densa__heading"
            lines={['Dossiê técnico', 'em leitura ativa.']}
          />
        </div>
        <p className="fable-copy peca-densa__lede">
          Documentos do protocolo e uma leitura de conformidade no mesmo instrumento. O validador classifica cada item por referência normativa aplicável.
        </p>
      </div>

      <div className="peca-densa__board fable-tabular">
        <div className="peca-densa__workbench">
          <div className="peca-densa__tabs" role="tablist" aria-label="Documentos do dossiê técnico">
            {documents.map((document, index) => (
              <button
                className="peca-densa__tab"
                id={`dossie-tab-${document.id}`}
                key={document.id}
                type="button"
                role="tab"
                aria-selected={activeDocument === index}
                aria-controls="dossie-panel"
                tabIndex={activeDocument === index ? 0 : -1}
                onClick={() => setActiveDocument(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {document.label}
              </button>
            ))}
          </div>

          <div
            className="peca-densa__canvas"
            id="dossie-panel"
            role="tabpanel"
            aria-labelledby={`dossie-tab-${selected.id}`}
          >
            <div className="peca-densa__document-meta">
              <strong>{selected.title}</strong>
              <span>prévia documental</span>
            </div>
            <div className="peca-densa__preview">
              <img src={selected.src} alt={selected.alt} />
            </div>
          </div>
        </div>

        <aside className="peca-densa__panel" aria-label="Estado da validação">
          <div className="peca-densa__panel-head">
            <h3>Leitura do validador</h3>
            <span className="peca-densa__simulation">simulação visual</span>
          </div>

          <dl className="peca-densa__metrics" aria-label="Dados simulados do dossiê">
            <div className="peca-densa__metric"><dt>Projeto</dt><dd>{telemetry.projectId}</dd></div>
            <div className="peca-densa__metric"><dt>Etapa</dt><dd>{telemetry.activeStep + 1}/5</dd></div>
            <div className="peca-densa__metric"><dt>Documentos</dt><dd>{telemetry.documents}</dd></div>
            <div className="peca-densa__metric"><dt>Verificações</dt><dd>{telemetry.checks}</dd></div>
          </dl>

          <div className="peca-densa__checks">
            <h4>Classificação por regra</h4>
            {validationItems.map((item) => (
              <div className="peca-densa__status" key={item.state}>
                <span className="peca-densa__status-marker" aria-hidden="true" />
                <span><strong>{item.state} · {item.reference}</strong><span>{item.text}</span></span>
              </div>
            ))}
          </div>

          <p className="peca-densa__note">
            <strong>Simulação visual.</strong> Os dados exibidos são apenas demonstrativos e não representam métricas de cliente.
          </p>
        </aside>
      </div>
    </section>
  );
}
