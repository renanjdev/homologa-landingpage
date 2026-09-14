import React from 'react';
import { Reveal } from '../lib/anim';

type Feature = {
  label: string;
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
    title: 'Saiba em 5 segundos quais projetos precisam de você hoje',
    desc: 'Projetos, prazos, pendências e potência instalada em uma visão única. Saiba na hora o que precisa de atenção, sem abrir dez planilhas.',
    bullets: [
      'Visão geral de todos os projetos e etapas',
      'Alertas do que requer ação imediata',
      'Indicadores de aprovação e potência',
    ],
    img: '/dashboard.webp',
    alt: 'Painel de gestão do Homologa Plus com projetos, pendências, potência e pipeline por etapa',
  },
  {
    label: 'Fluxo de homologação',
    title: 'Veja na hora qual projeto travou, e onde agir',
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
    title: 'Veja onde estão suas obras, e onde vale vender mais',
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


const FeatureLabel = ({ f }: { f: Feature }) => (
  <span className="block mb-4 text-sm font-semibold text-smoke">{f.label}</span>
);

const FeatureBullets = ({ bullets }: { bullets: string[] }) => (
  <ul className="tick-list space-y-3">
    {bullets.map((b) => (
      <li key={b} className="text-ash font-medium">
        {b}
      </li>
    ))}
  </ul>
);

const FeatureShot = ({ f, imgClassName = 'block h-auto w-full' }: { f: Feature; imgClassName?: string }) => (
  <div className={f.frameless ? '' : 'rounded-2xl overflow-hidden border border-white/10 bg-ink shadow-[var(--key-soft)]'}>
    <img
      src={(f.webp || f.img).replace(/\.(png|jpe?g)$/, '.webp')}
      alt={f.alt}
      width={f.w ?? 1919}
      height={f.h ?? 964}
      className={imgClassName}
      loading="lazy"
    />
  </div>
);

const Features = () => {
  return (
    <section id="solucao" className="py-16 md:py-28 bg-void overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          as="div"
          y={20}
          margin="-100px"
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <h2 className="text-clamp-h2 font-bold text-white mb-4 text-balance">
            A plataforma por trás da automação
          </h2>
          <p className="text-base md:text-lg text-ash leading-relaxed">
            Além de gerar e validar os documentos, o Homologa Plus controla projetos, prazos, financeiro e território; cada parte da operação em um só lugar.
          </p>
        </Reveal>

        <div className="flex flex-col gap-20 md:gap-28">
          {features.slice(0, 2).map((f) => (
            <Reveal
              as="div"
              key={f.label}
              y={30}
              margin="-80px"
              className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[0.8fr_1.4fr]"
            >
              <div className={f.flip ? 'lg:order-2' : ''}>
                <FeatureLabel f={f} />
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-[1.12] tracking-tight mb-4 text-balance">
                  {f.title}
                </h3>
                <p className="text-base md:text-lg text-ash leading-relaxed mb-7 max-w-xl">
                  {f.desc}
                </p>
                <FeatureBullets bullets={f.bullets} />
              </div>
              <div className={f.flip ? 'lg:order-1' : ''}>
                <FeatureShot f={f} />
              </div>
            </Reveal>
          ))}

          {/* Os demais recursos em grade de 2 colunas: quebra o zigue-zague (máx. 2 seguidos) */}
          <div className="grid gap-14 md:grid-cols-2 md:gap-10">
            {features.slice(2).map((f, idx) => (
              <Reveal as="div" key={f.label} y={24} delay={idx * 0.08} margin="-80px" className="flex flex-col">
                {/* imagens com alturas diferentes: alinha pela base para os títulos ficarem na mesma linha */}
                <div className="flex items-end justify-center md:h-[400px]">
                  <FeatureShot f={f} imgClassName="block h-auto w-full md:max-h-[400px] md:w-auto" />
                </div>
                <div className="mt-8">
                  <FeatureLabel f={f} />
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-[1.15] tracking-tight mb-3 text-balance">
                    {f.title}
                  </h3>
                  <p className="text-base text-ash leading-relaxed mb-6">{f.desc}</p>
                  <FeatureBullets bullets={f.bullets} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
