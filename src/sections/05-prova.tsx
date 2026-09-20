import React from 'react';
import { LineReveal } from '../contrato/reveal';
import type { SectionProps } from '../contrato/types';
import { buildWhatsAppLink } from '../utils/whatsapp';

type Plan = {
  name: 'Starter' | 'Full';
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '297',
    description: 'Para estruturar a operação com capacidade definida.',
    features: ['7 projetos automatizados/mês', '3 usuários técnicos', 'Até 50 integradoras'],
  },
  {
    name: 'Full',
    price: '597',
    description: 'Para uma operação contínua, sem teto de projetos.',
    features: ['Projetos ilimitados', '10 usuários técnicos', 'Integradoras ilimitadas', 'Suporte dedicado'],
    featured: true,
  },
];

const trackPlan = (plan: Plan) => {
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', { content_name: plan.name });
    window.fbq('track', 'Contact');
  }
};

export default function Prova({ label }: SectionProps) {
  return (
    <section className="proof" aria-label="Prova da plataforma e planos Homologa Plus">
      <style>{`
        .proof { width: min(100%, 90rem); margin-inline: auto; }
        .proof__intro { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(17rem, .68fr); gap: clamp(1.5rem, 5vw, 6rem); align-items: end; margin-bottom: clamp(1.75rem, 4vw, 3.5rem); }
        .proof__intro .fable-label { margin-bottom: 1rem; }
        .proof__heading { max-width: 10ch; font-size: clamp(3rem, 5.8vw, 6.2rem); line-height: .92; }
        .proof__lede { padding-bottom: .3rem; }
        .proof__layout { display: grid; grid-template-columns: minmax(0, 1.04fr) minmax(23rem, .96fr); gap: clamp(1rem, 2.25vw, 2rem); align-items: stretch; }
        .proof__evidence { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; min-height: clamp(32rem, 60vh, 43rem); border: 1px solid color-mix(in srgb, var(--fable-paper) 15%, transparent); background: color-mix(in srgb, var(--fable-paper) 4%, var(--fable-void)); box-shadow: inset 0 1px color-mix(in srgb, var(--fable-paper) 9%, transparent), 0 2rem 6rem color-mix(in srgb, var(--fable-void) 65%, transparent); overflow: hidden; }
        .proof__evidence-head { display: flex; justify-content: space-between; gap: 1rem; align-items: center; padding: 1rem 1.15rem; border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); }
        .proof__eyebrow, .proof__capture-state, .proof__note-title, .proof__plan-kicker, .proof__plan-tag { font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace; font-size: var(--fable-label); font-weight: 650; letter-spacing: .1em; line-height: 1.2; text-transform: uppercase; }
        .proof__eyebrow { color: var(--fable-paper); }
        .proof__capture-state { color: var(--fable-accent); text-align: right; }
        .proof__image-wrap { position: relative; min-height: 0; padding: clamp(.6rem, 1.2vw, 1rem); background: color-mix(in srgb, var(--fable-void) 82%, var(--fable-paper)); }
        .proof__image-wrap::after { content: ""; position: absolute; inset: clamp(.6rem, 1.2vw, 1rem); pointer-events: none; border: 1px solid color-mix(in srgb, var(--fable-paper) 16%, transparent); }
        .proof__image { display: block; width: 100%; height: 100%; min-height: 19rem; object-fit: cover; object-position: top left; filter: saturate(.92) contrast(1.04); }
        .proof__caption { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: .85rem; padding: 1rem 1.15rem 1.15rem; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); }
        .proof__caption-mark { width: .6rem; height: .6rem; margin-top: .28rem; border-radius: 50%; background: var(--fable-accent); box-shadow: 0 0 1rem color-mix(in srgb, var(--fable-accent) 60%, transparent); }
        .proof__caption p { margin: 0; color: var(--fable-muted); font-size: .79rem; line-height: 1.45; }
        .proof__caption strong { color: var(--fable-paper); font-weight: 600; }
        .proof__plans { display: grid; grid-template-rows: repeat(2, auto); gap: 1rem; }
        .proof__plan { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto minmax(0, 1fr) auto; gap: 1.25rem; align-items: start; border: 1px solid color-mix(in srgb, var(--fable-paper) 15%, transparent); padding: clamp(1.25rem, 2vw, 1.75rem); background: color-mix(in srgb, var(--fable-paper) 4%, var(--fable-void)); overflow: hidden; }
        .proof__plan--full { border-color: var(--fable-accent); background: var(--fable-accent); color: var(--fable-void); box-shadow: 0 1.5rem 4rem color-mix(in srgb, var(--fable-accent) 19%, transparent); }
        .proof__plan--full::before { content: ""; position: absolute; width: 17rem; height: 17rem; right: -8rem; top: -12rem; border: 1px solid color-mix(in srgb, var(--fable-void) 25%, transparent); border-radius: 50%; }
        .proof__plan-copy, .proof__plan-side { position: relative; z-index: 1; }
        .proof__plan-side { display: grid; justify-items: end; gap: .8rem; min-width: 8.25rem; }
        .proof__plan-kicker { margin: 0 0 .6rem; color: var(--fable-muted); }
        .proof__plan--full .proof__plan-kicker { color: color-mix(in srgb, var(--fable-void) 66%, transparent); }
        .proof__plan-name { margin: 0; color: var(--fable-paper); font-size: clamp(1.9rem, 3vw, 3.1rem); font-weight: 450; letter-spacing: -.06em; line-height: .88; }
        .proof__plan--full .proof__plan-name { color: var(--fable-void); }
        .proof__plan-description { max-width: 28rem; margin: .65rem 0 0; color: var(--fable-muted); font-size: .77rem; line-height: 1.4; }
        .proof__plan--full .proof__plan-description { color: color-mix(in srgb, var(--fable-void) 73%, transparent); }
        .proof__price { display: flex; align-items: baseline; justify-content: flex-end; color: var(--fable-paper); font-variant-numeric: tabular-nums; letter-spacing: -.065em; white-space: nowrap; }
        .proof__plan--full .proof__price { color: var(--fable-void); }
        .proof__currency { align-self: flex-start; margin-top: .25rem; font-size: .8rem; font-weight: 650; letter-spacing: -.03em; }
        .proof__price strong { font-size: clamp(2.55rem, 4vw, 4.5rem); font-weight: 360; line-height: .76; }
        .proof__period { margin-left: .3rem; color: var(--fable-muted); font-size: .68rem; font-weight: 600; letter-spacing: -.01em; }
        .proof__plan--full .proof__period { color: color-mix(in srgb, var(--fable-void) 68%, transparent); }
        .proof__plan-tag { display: inline-flex; align-items: center; min-height: 1.5rem; padding: 0 .5rem; color: var(--fable-void); background: var(--fable-accent); }
        .proof__plan--full .proof__plan-tag { color: var(--fable-paper); background: var(--fable-void); }
        .proof__features { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-content: start; gap: .5rem 1rem; margin: 0; padding: .9rem 0 0; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 13%, transparent); list-style: none; }
        .proof__plan--full .proof__features { border-color: color-mix(in srgb, var(--fable-void) 20%, transparent); }
        .proof__features li { display: grid; grid-template-columns: .5rem minmax(0, 1fr); gap: .5rem; color: var(--fable-paper); font-size: .72rem; line-height: 1.35; }
        .proof__features li::before { content: ""; width: .42rem; height: .42rem; margin-top: .25rem; border-radius: 50%; background: var(--fable-accent); }
        .proof__plan--full .proof__features li { color: var(--fable-void); }
        .proof__plan--full .proof__features li::before { background: var(--fable-void); }
        .proof__action { grid-column: 1 / -1; display: inline-flex; align-items: center; justify-content: center; width: 100%; min-height: 2.9rem; border: 1px solid color-mix(in srgb, var(--fable-paper) 24%, transparent); border-radius: 999px; padding: .7rem 1rem; color: var(--fable-paper); background: transparent; font: 660 .76rem/1.15 "Segoe UI Variable", "Inter", ui-sans-serif, system-ui, sans-serif; text-align: center; text-decoration: none; white-space: nowrap; transition: transform 260ms var(--fable-ease), background 260ms var(--fable-ease), color 260ms var(--fable-ease); }
        .proof__action:hover { color: var(--fable-void); background: var(--fable-paper); transform: translateY(-.12rem); }
        .proof__action:focus-visible { outline: 2px solid var(--fable-accent); outline-offset: 3px; }
        .proof__plan--full .proof__action { border-color: var(--fable-void); color: var(--fable-void); }
        .proof__plan--full .proof__action:hover { color: var(--fable-paper); background: var(--fable-void); }
        .proof__terms { display: grid; grid-template-columns: minmax(0, .8fr) repeat(2, minmax(0, 1fr)); gap: .7rem; margin: 1rem 0 0; padding: 1rem 0 0; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 14%, transparent); color: var(--fable-muted); font-size: .7rem; line-height: 1.35; }
        .proof__note-title { display: block; margin-bottom: .28rem; color: var(--fable-paper); font-size: .58rem; }
        .proof__faq { margin-top: clamp(2.25rem, 5vw, 4rem); padding-top: 1rem; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 14%, transparent); }
        .proof__faq-heading { margin: 0 0 1rem; color: var(--fable-paper); font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace; font-size: var(--fable-label); font-weight: 650; letter-spacing: .12em; line-height: 1.25; text-transform: uppercase; }
        .proof__faq-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 1.5rem; }
        .proof__faq-item { border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 12%, transparent); }
        .proof__faq-item summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.25rem; padding: .75rem 0; color: var(--fable-paper); cursor: pointer; font-size: .78rem; font-weight: 600; line-height: 1.3; list-style: none; }
        .proof__faq-item summary::-webkit-details-marker { display: none; }
        .proof__faq-item summary::after { content: "+"; flex: 0 0 auto; color: var(--fable-accent); font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace; font-size: 1rem; font-weight: 400; }
        .proof__faq-item[open] summary::after { content: "−"; }
        .proof__faq-item summary:focus-visible { outline: 2px solid var(--fable-accent); outline-offset: .25rem; }
        .proof__faq-item p { max-width: 36rem; margin: 0 0 1rem; color: var(--fable-muted); font-size: .75rem; line-height: 1.5; }
        @media (max-width: 62rem) { .proof__layout { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; } .proof__evidence { min-height: 29rem; } .proof__plans { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; } }
        @media (max-width: 42rem) { .proof__intro { grid-template-columns: minmax(0, 1fr); gap: 1rem; } .proof__heading { max-width: 11ch; font-size: clamp(2.6rem, 12vw, 3.8rem); line-height: .94; } .proof__plans { grid-template-columns: minmax(0, 1fr); } .proof__plan { grid-template-columns: minmax(0, 1fr) auto; } .proof__evidence { min-height: 25rem; } .proof__image { min-height: 15rem; } }
        @media (max-width: 42rem) { .proof__faq-grid { grid-template-columns: minmax(0, 1fr); } }
        @media (max-width: 28rem) { .proof__evidence-head, .proof__caption { padding-inline: .85rem; } .proof__plan { gap: .85rem; padding: 1.05rem; } .proof__plan-side { min-width: 6.5rem; } .proof__price strong { font-size: 2.25rem; } .proof__features, .proof__terms { grid-template-columns: minmax(0, 1fr); } .proof__features { gap: .45rem; } .proof__capture-state { max-width: 7rem; } }
      `}</style>

      <div className="proof__intro">
        <div>
          <p className="fable-label">05 · {label}</p>
          <LineReveal
            as="h2"
            className="fable-heading proof__heading"
            section="05"
            lines={['A plataforma', 'à vista.']}
          />
        </div>
        <LineReveal
          as="p"
          className="fable-copy proof__lede"
          section="05"
          lines={[
            'Uma captura real do ambiente de trabalho e planos com escopo verificável.',
            'Os dois planos incluem a plataforma completa e a Automação. O que muda é o volume mensal.',
          ]}
        />
      </div>

      <div className="proof__layout" data-scroll-anchor>
        <figure className="proof__evidence" aria-labelledby="proof-capture-caption">
          <div className="proof__evidence-head">
            <span className="proof__eyebrow">Ambiente Homologa Plus</span>
            <span className="proof__capture-state">captura de produto real</span>
          </div>
          <div className="proof__image-wrap">
            <img className="proof__image" src="/dashboard.webp" alt="Tela real do dashboard da plataforma Homologa Plus" />
          </div>
          <figcaption className="proof__caption" id="proof-capture-caption">
            <span className="proof__caption-mark" aria-hidden="true" />
            <p><strong>Produto em operação.</strong> A plataforma reúne o acompanhamento do trabalho técnico e a Automação no mesmo ambiente.</p>
          </figcaption>
        </figure>

        <div className="proof__plans" data-scroll-anchor aria-label="Planos Homologa Plus">
          {plans.map((plan) => (
            <article className={`proof__plan ${plan.featured ? 'proof__plan--full' : ''}`} key={plan.name} aria-label={`Plano ${plan.name}`}>
              <div className="proof__plan-copy">
                <p className="proof__plan-kicker">Plano Homologa Plus</p>
                <h3 className="proof__plan-name">{plan.name}</h3>
                <p className="proof__plan-description">{plan.description}</p>
              </div>
              <div className="proof__plan-side">
                {plan.featured && <span className="proof__plan-tag">mais escolhido</span>}
                <div className="proof__price" aria-label={`R$ ${plan.price} por mês`}>
                  <span className="proof__currency">R$</span><strong>{plan.price}</strong><span className="proof__period">/mês</span>
                </div>
              </div>
              <ul className="proof__features">
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                <li>Plataforma inteira e Automação</li>
              </ul>
              <a
                className="proof__action"
                href={buildWhatsAppLink(`Olá! Quero contratar o plano Homologa Plus ${plan.name}.`)}
                onClick={() => trackPlan(plan)}
              >
                Falar sobre o plano {plan.name}
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="proof__terms" aria-label="Condições comerciais">
        <div><span className="proof__note-title">Contratação</span>Sem fidelidade.</div>
        <div><span className="proof__note-title">Cancelamento</span>Feito diretamente pelo sistema.</div>
        <div><span className="proof__note-title">Pagamento</span>Processado via Stripe.</div>
      </div>

      <div className="proof__faq" data-scroll-anchor aria-labelledby="proof-faq-title">
        <p className="proof__faq-heading" id="proof-faq-title">Dúvidas rápidas antes de começar</p>
        <div className="proof__faq-grid">
          <details className="proof__faq-item">
            <summary>Funciona com a minha distribuidora?</summary>
            <p>Sim. O fluxo organiza documentos, etapas e prazos conforme a distribuidora, com exemplos para CPFL, Energisa e Equatorial.</p>
          </details>
          <details className="proof__faq-item">
            <summary>Os arquivos ficam editáveis?</summary>
            <p>Sim. A Automação entrega PDF e, quando aplicável, SVG e DXF para revisão e assinatura do responsável técnico.</p>
          </details>
          <details className="proof__faq-item">
            <summary>A Automação está nos dois planos?</summary>
            <p>Sim. O Starter automatiza 7 projetos por mês; o Full não tem teto. Ambos incluem a plataforma completa.</p>
          </details>
          <details className="proof__faq-item">
            <summary>Como funciona a demonstração?</summary>
            <p>Você agenda pelo WhatsApp e nossa equipe mostra o fluxo real, do cadastro do projeto à documentação validada, sem compromisso.</p>
          </details>
          <details className="proof__faq-item">
            <summary>Posso cancelar quando quiser?</summary>
            <p>Sim. Não há fidelidade e o cancelamento pode ser feito diretamente pelo sistema.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
