import React from 'react';
import { Reveal } from '../lib/anim';
import { LayoutDashboard, Workflow, LineChart, Map, Check, CheckCircle2 } from 'lucide-react';

type Feature = {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  bullets: string[];
  img: string;
  webp?: string;
  w?: number;
  h?: number;
  alt: string;
  flip?: boolean;
  frameless?: boolean;
  badge?: { title: string; sub: string };
};

const features: Feature[] = [
  {
    label: 'Painel de gestão',
    Icon: LayoutDashboard,
    title: 'Saiba em 5 segundos quais projetos precisam de você hoje',
    desc: 'Projetos, prazos, pendências e potência instalada em uma visão única. Saiba na hora o que precisa de atenção, sem abrir dez planilhas.',
    bullets: [
      'Visão geral de todos os projetos e etapas',
      'Alertas do que requer ação imediata',
      'Indicadores de aprovação e potência',
    ],
    img: '/dashboard.webp',
    alt: 'Painel de gestão do Homologa Plus com projetos, pendências, potência e pipeline por etapa',
    badge: { title: '98% de aprovação', sub: 'taxa de homologação' },
  },
  {
    label: 'Fluxo de homologação',
    Icon: Workflow,
    title: 'Veja na hora qual projeto travou — e onde agir',
    desc: 'Cada projeto avança por um fluxo claro: análise documental, envio à concessionária, vistoria e homologação. Você vê na hora o que travou e onde agir.',
    bullets: [
      'Status em tempo real por etapa',
      'Identifique projetos parados há dias',
      'Fim da cobrança de status por WhatsApp',
    ],
    img: '/fluxo.webp',
    alt: 'Acompanhamento do fluxo de homologação de um projeto, etapa por etapa',
    flip: true,
  },
  {
    label: 'Gestão financeira',
    Icon: LineChart,
    title: 'Feche o mês sabendo o que entrou, o que falta e o que venceu',
    desc: 'Acompanhe o financeiro de cada homologação: o que já entrou, o que está a receber e o que venceu, mês a mês, sem controle paralelo.',
    bullets: [
      'Receita recebida x a receber',
      'Alertas de recebíveis vencidos',
      'Resultado e evolução por período',
    ],
    img: '/financeiro.webp',
    alt: 'Módulo financeiro com receita, valores a receber, vencidos e gráficos de evolução',
  },
  {
    label: 'Visão de território',
    Icon: Map,
    title: 'Veja onde estão suas obras — e onde vale vender mais',
    desc: 'Acompanhe todos os projetos no mapa e enxergue a concentração de negócios por região, num relance.',
    bullets: [
      'Todos os projetos em um único mapa',
      'Status por cores no território',
      'Concentração comercial das equipes',
    ],
    img: '/mapa-projetos.webp',
    w: 760,
    h: 760,
    alt: 'Mapa com a distribuição geográfica dos projetos de homologação',
    flip: true,
    frameless: true,
  },
];

const Features = () => {
  return (
    <section id="solucao" className="py-16 md:py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          as="div"
          y={20}
          margin="-100px"
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <h2 className="text-clamp-h2 font-display font-extrabold text-slate-900 mb-4 text-balance">
            A plataforma por trás da automação
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Além de gerar e validar os documentos, o Homologa Plus controla projetos, prazos, financeiro e território — cada parte da operação em um só lugar.
          </p>
        </Reveal>

        <div className="flex flex-col gap-20 md:gap-28">
          {features.map((f) => (
            <Reveal
              as="div"
              key={f.label}
              y={30}
              margin="-80px"
              className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[0.8fr_1.4fr]"
            >
              {/* Copy */}
              <div className={f.flip ? 'lg:order-2' : ''}>
                <span className="inline-flex items-center gap-2.5 mb-5 font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.Icon className="w-4 h-4" />
                  </span>
                  {f.label}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-[2.05rem] font-display font-extrabold text-slate-900 leading-[1.12] tracking-tight mb-4 text-balance">
                  {f.title}
                </h3>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-7 max-w-xl">
                  {f.desc}
                </p>
                <ul className="space-y-3.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-slate-700 font-medium">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Check className="w-3 h-3" strokeWidth={3.5} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Print */}
              <div className={`relative ${f.flip ? 'lg:order-1' : ''}`}>
                {f.badge && (
                  <div className="animate-floaty absolute -top-4 left-4 z-10 hidden md:flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.3)]">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15 text-success">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold leading-tight text-slate-900">{f.badge.title}</span>
                      <span className="block font-mono text-[11px] text-slate-500">{f.badge.sub}</span>
                    </span>
                  </div>
                )}
                <div className={f.frameless ? '' : 'rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]'}>
                  <img
                    src={(f.webp || f.img).replace(/\.(png|jpe?g)$/, '.webp')}
                    alt={f.alt}
                    width={f.w ?? 1919}
                    height={f.h ?? 964}
                    className={`block h-auto w-full ${f.frameless ? 'drop-shadow-2xl' : ''}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
