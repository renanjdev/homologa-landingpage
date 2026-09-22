import React, { useEffect, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink } from '../../../utils/whatsapp';
import '../../../contrato/tokens.css';
import './guia.css';

type Pair = { title: ReactNode; desc: ReactNode };

export type GuiaBlock =
  | { kind: 'p'; text: ReactNode }
  | { kind: 'checklist'; items: ReactNode[]; columns?: 2 }
  | { kind: 'steps'; items: Pair[] }
  | { kind: 'pairs'; items: Pair[] }
  | { kind: 'numbered'; items: ReactNode[] }
  | { kind: 'groups'; groups: { title: string; items: string[] }[] }
  | { kind: 'table'; head: string[]; rows: ReactNode[][] };

export type GuiaSection = {
  id: string;
  title: string;
  step?: number;
  panel?: boolean;
  blocks: GuiaBlock[];
};

type GuiaPageProps = {
  path: string;
  meta: { title: string; description: string; og?: boolean };
  crumb?: string;
  title: string;
  lede?: ReactNode;
  updated?: string;
  sections: GuiaSection[];
  cta?: { title: string; text: string; note?: string };
  related?: boolean;
};

export const GUIAS = [
  { to: '/homologacao-energia-solar', label: 'Homologação solar' },
  { to: '/documentos-homologacao-fotovoltaica', label: 'Documentos para homologação' },
  { to: '/como-homologar-energia-solar', label: 'Como homologar' },
];

const DEMO_LINK = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const trackContact = () => window.fbq?.('track', 'Contact');

function Block({ block }: { block: GuiaBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="guia__p">{block.text}</p>;
    case 'checklist':
      return (
        <ul className={`guia__checklist${block.columns === 2 ? ' guia__checklist--2' : ''}`}>
          {block.items.map((item, index) => <li key={index}><span>{item}</span></li>)}
        </ul>
      );
    case 'steps':
      return (
        <ol className="guia__steps">
          {block.items.map((item, index) => (
            <li key={index}>
              <span className="guia__steps-num fable-tabular" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ol>
      );
    case 'pairs':
      return (
        <dl className="guia__pairs">
          {block.items.map((item, index) => (
            <div key={index}>
              <dt>{item.title}</dt>
              <dd>{item.desc}</dd>
            </div>
          ))}
        </dl>
      );
    case 'numbered':
      return (
        <ol className="guia__numbered">
          {block.items.map((item, index) => (
            <li key={index}>
              <span className="guia__numbered-num fable-tabular" aria-hidden="true">{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="guia__table-wrap" role="region" aria-label="Tabela" tabIndex={0}>
          <table className="guia__table">
            <thead>
              <tr>{block.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'groups':
      return (
        <div className="guia__groups">
          {block.groups.map((group) => (
            <div key={group.title}>
              <h3 className="guia__group-title">{group.title}</h3>
              <ul className="guia__checklist">
                {group.items.map((item) => <li key={item}><span>{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      );
  }
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -72% 0px' },
    );
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Toc({ sections, active }: { sections: GuiaSection[]; active: string }) {
  return (
    <ol className="guia__toc-list">
      {sections.map((section) => (
        <li key={section.id}>
          <a href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function GuiaPage({ path, meta, crumb = 'Guias', title, lede, updated, sections, cta, related = true }: GuiaPageProps) {
  const ids = React.useMemo(() => sections.map((section) => section.id), [sections]);
  const active = useActiveSection(ids);
  const url = `https://homologaplus.com.br${path}`;
  const others = GUIAS.filter((guia) => guia.to !== path);
  const tocLabel = crumb === 'Guias' ? 'Neste guia' : 'Nesta página';

  // O ruído global de index.css é uma mesclagem de tela cheia a cada quadro de rolagem.
  useEffect(() => {
    document.body.classList.add('guia-active');
    return () => document.body.classList.remove('guia-active');
  }, []);

  return (
    <div className="fable-page guia">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={url} />
        {meta.og !== false && <meta property="og:title" content={meta.title} />}
        {meta.og !== false && <meta property="og:description" content={meta.description} />}
        {meta.og !== false && <meta property="og:type" content="article" />}
        <meta property="og:url" content={url} />
      </Helmet>

      <a className="guia__skip" href="#conteudo">Pular para o conteúdo</a>

      <header className="fable-nav">
        <Link className="fable-brand" to="/" aria-label="Homologa Plus, página inicial">
          <img src="/logo-h-white.png" width="32" height="32" alt="" />
          <span>Homologa <span>Plus</span></span>
        </Link>
        <nav className="fable-nav-links" aria-label="Guias">
          {GUIAS.map((guia) => (
            <Link
              key={guia.to}
              className="fable-nav-button"
              to={guia.to}
              aria-current={guia.to === path ? 'page' : undefined}
            >
              {guia.label}
            </Link>
          ))}
          <a
            className="fable-nav-button fable-nav-button--cta"
            href={DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackContact}
          >
            Agendar demonstração
          </a>
        </nav>
      </header>

      <main id="conteudo" className="guia__main">
        <div className="fable-container">
          <div className="guia__hero">
            <nav aria-label="Trilha de navegação" className="guia__crumbs">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <span>{crumb}</span>
            </nav>
            <h1 className="guia__title">{title}</h1>
            {updated && <p className="guia__updated fable-tabular">{updated}</p>}
            {lede && <p className="guia__lede">{lede}</p>}
          </div>

          <div className="guia__body">
            <aside className="guia__toc" aria-label={tocLabel}>
              <details className="guia__toc-mobile">
                <summary>{tocLabel}</summary>
                <Toc sections={sections} active={active} />
              </details>
              <div className="guia__toc-desktop">
                <p className="guia__toc-title">{tocLabel}</p>
                <Toc sections={sections} active={active} />
              </div>
            </aside>

            <article className="guia__article">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`guia__section${section.panel ? ' guia__section--panel' : ''}`}
                  aria-labelledby={`${section.id}-titulo`}
                >
                  <h2 id={`${section.id}-titulo`} className="guia__h2">
                    {section.step !== undefined && (
                      <span className="guia__h2-step fable-tabular">
                        <span className="guia__sr">Passo </span>
                        {String(section.step).padStart(2, '0')}
                      </span>
                    )}
                    <span>{section.title}</span>
                  </h2>
                  {section.blocks.map((block, index) => <Block key={index} block={block} />)}
                </section>
              ))}

              {cta && (
                <section className="guia__cta fable-invert" aria-labelledby="guia-cta-titulo">
                  <h2 id="guia-cta-titulo" className="guia__cta-title">{cta.title}</h2>
                  <p className="guia__cta-text">{cta.text}</p>
                  <a className="fable-button guia__cta-button" href={DEMO_LINK} target="_blank" rel="noopener noreferrer" onClick={trackContact}>
                    Agendar demonstração
                  </a>
                  {cta.note && <p className="guia__cta-note">{cta.note}</p>}
                </section>
              )}

              {related && <nav className="guia__related" aria-label="Outros guias">
                <p className="guia__toc-title">Continue lendo</p>
                <ul>
                  {others.map((guia) => (
                    <li key={guia.to}>
                      <Link to={guia.to}>{guia.label}<span aria-hidden="true">→</span></Link>
                    </li>
                  ))}
                </ul>
              </nav>}
            </article>
          </div>
        </div>
      </main>

      <footer className="guia__footer fable-container" aria-label="Informações institucionais">
        <div>
          <p className="guia__footer-title">Homologa Plus</p>
          <p className="guia__footer-copy">Automação documental e gestão para homologação solar.</p>
        </div>
        <div>
          <p className="guia__footer-title">Contato</p>
          <a className="guia__footer-link" href="mailto:contato@homologaplus.com.br">contato@homologaplus.com.br</a>
          <p className="guia__footer-copy">Bauru, SP</p>
        </div>
        <nav aria-label="Guias essenciais">
          <p className="guia__footer-title">Guias essenciais</p>
          {GUIAS.map((guia) => <Link className="guia__footer-link" key={guia.to} to={guia.to}>{guia.label}</Link>)}
        </nav>
        <nav aria-label="Informações legais">
          <p className="guia__footer-title">Institucional</p>
          <a className="guia__footer-link" href="https://app.homologaplus.com.br/login" target="_blank" rel="noopener noreferrer">Acessar plataforma</a>
          <Link className="guia__footer-link" to="/termos">Termos de uso</Link>
          <Link className="guia__footer-link" to="/privacidade">Privacidade</Link>
          <button className="guia__footer-link guia__footer-button" type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}>
            Preferências de cookies
          </button>
        </nav>
        <p className="guia__copyright">© {new Date().getFullYear()} Homologa Plus. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
