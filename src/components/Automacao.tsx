import React from 'react';
import { Reveal } from '../lib/anim';
import {
  Cpu,
  FileText,
  Cable,
  Boxes,
  MapPin,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  Check,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { REQUEST_ACCESS_URL, TRIAL_DIAS, scrollToRequestAccess } from '../utils/cta';

type Documento = {
  Icon: React.ComponentType<{ className?: string }>;
  nome: string;
  desc: string;
  formatos: string[];
};

const documentos: Documento[] = [
  {
    Icon: FileText,
    nome: 'Memorial Descritivo e de Cálculo',
    desc: 'No modelo exigido pela sua distribuidora.',
    formatos: ['PDF'],
  },
  {
    Icon: Cable,
    nome: 'Diagrama Unifilar',
    desc: 'Dimensionado a partir dos dados do projeto.',
    formatos: ['PDF', 'SVG', 'DXF'],
  },
  {
    Icon: Boxes,
    nome: 'Diagrama de Blocos',
    desc: 'Funcional, com todo o sistema representado.',
    formatos: ['PDF', 'SVG', 'DXF'],
  },
  {
    Icon: MapPin,
    nome: 'Planta de Localização',
    desc: 'Vista de satélite com as coordenadas da UC.',
    formatos: ['PDF'],
  },
  {
    Icon: ClipboardList,
    nome: 'Formulários e Anexos',
    desc: 'Os formulários e anexos que cada distribuidora exige, já preenchidos com os dados do projeto.',
    formatos: ['PDF'],
  },
];

type Estado = 'impeditivo' | 'atencao' | 'conforme';

const checagens: { estado: Estado; titulo: string; ref: string }[] = [
  {
    estado: 'impeditivo',
    titulo: 'Disjuntor geral acima do limite do ramal de entrada',
    ref: 'Norma da distribuidora · NBR 5410',
  },
  {
    estado: 'atencao',
    titulo: 'DPS Classe II não identificado na entrada CA',
    ref: 'NBR 5410',
  },
  {
    estado: 'conforme',
    titulo: 'Seção dos condutores CC compatível com o arranjo',
    ref: 'NBR 16690',
  },
  {
    estado: 'conforme',
    titulo: 'Potência instalada dentro do limite de geração da UC',
    ref: 'PRODIST Módulo 3 · Lei 14.300',
  },
];

const estadoStyle: Record<
  Estado,
  { Icon: React.ComponentType<{ className?: string }>; icon: string; chip: string; label: string }
> = {
  impeditivo: { Icon: XCircle, icon: 'text-red-600', chip: 'bg-red-50 text-red-700', label: 'Impeditivo' },
  atencao: { Icon: AlertTriangle, icon: 'text-orange-600', chip: 'bg-warning/10 text-orange-700', label: 'Atenção' },
  conforme: { Icon: CheckCircle2, icon: 'text-emerald-600', chip: 'bg-success/10 text-emerald-700', label: 'Conforme' },
};

const ganchos = [
  'Em poucos cliques, sem montar papelada à mão',
  'No padrão de cada distribuidora',
  'Dimensionamento embutido: condutores, disjuntores, DPS e proteções',
  'Inversor string e microinversor',
  'Carimbo com logo da empresa e RT (CREA/CFT)',
];

const Automacao = () => {
  // Exemplos reais gerados. O diagrama unifilar é o foco (frente/centro do leque).
  const exemplos = [
    { f: 'doc-unifilar', alt: 'Diagrama unifilar gerado pela Automação', fan: 'z-40 group-hover:-translate-y-4' },
    { f: 'doc-blocos', alt: 'Diagrama de blocos gerado pela Automação', fan: 'z-30 translate-x-[68%] rotate-[10deg] group-hover:translate-x-[98%] group-hover:rotate-[15deg]' },
    { f: 'doc-planta', alt: 'Planta de localização gerada pela Automação', fan: 'z-20 -translate-x-[56%] -rotate-[7deg] group-hover:-translate-x-[78%] group-hover:-rotate-[11deg]' },
    { f: 'doc-memorial', alt: 'Memorial descritivo gerado pela Automação', fan: 'z-10 -translate-x-[106%] -rotate-[14deg] group-hover:-translate-x-[132%] group-hover:-rotate-[19deg]' },
  ];

  return (
    <section id="automacao" className="relative overflow-hidden bg-surface py-20 md:py-28">
      {/* Atmosfera azul sutil — sinaliza "instrumento", não decoração */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.14), rgba(37,99,235,0.04) 48%, transparent 72%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <Reveal
          as="div"
          y={20}
          margin="-100px"
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <Cpu className="h-3.5 w-3.5" />
            A Automação por dentro
          </span>
          <h2 className="mt-5 text-clamp-h2 font-display font-extrabold text-slate-900 text-balance">
            A documentação da homologação solar, <span className="text-laminado">gerada e validada</span> automaticamente
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600 text-pretty">
            A partir do projeto já cadastrado, o sistema faz o dimensionamento elétrico e monta o pacote inteiro —
            memorial, diagramas, planta e <strong className="font-semibold text-slate-900">os formulários e anexos que
            cada distribuidora exige</strong> — e ainda checa a conformidade antes de você protocolar, apontando o que
            reprova e a referência normativa. Fonte única: nada diverge entre os documentos.
          </p>
        </Reveal>

        {/* Corpo: documentos gerados + validador */}
        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Documentos que ela gera */}
          <Reveal
            as="div"
            y={20}
            delay={0.05}
            margin="-80px"
          >
            <h3 className="mb-2 font-display text-xl font-bold text-slate-900">Os documentos que ela gera</h3>
            <p className="mb-6 text-slate-600">O pacote completo do protocolo — e editável quando você precisa ajustar.</p>
            <ul>
              {documentos.map((d) => (
                <li
                  key={d.nome}
                  className="flex items-start gap-4 border-t border-slate-200 py-5 first:border-t-0 first:pt-0"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <d.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-display text-base font-bold text-slate-900">{d.nome}</h4>
                    <p className="mt-0.5 text-sm text-slate-600">{d.desc}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {d.formatos.map((f) => (
                        <span
                          key={f}
                          className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-slate-500 ring-1 ring-inset ring-slate-200"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Validador de conformidade — mostra o produto trabalhando */}
          <Reveal
            as="div"
            y={24}
            duration={0.7}
            delay={0.1}
            margin="-80px"
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_70px_-34px_rgba(15,23,42,0.34)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">Validação de conformidade</h3>
                <p className="font-mono text-[11px] text-slate-500">Distribuidora: Enel SP · pré-protocolo</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cpu className="h-5 w-5" />
              </span>
            </div>

            <ul className="px-2 py-1">
              {checagens.map((c, i) => {
                const s = estadoStyle[c.estado];
                return (
                  <Reveal
                    as="li"
                    key={c.titulo}
                    x={12}
                    duration={0.4}
                    delay={0.15 + i * 0.08}
                    className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-slate-50"
                  >
                    <s.Icon className={`mt-0.5 h-5 w-5 flex-none ${s.icon}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug text-slate-900">{c.titulo}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-slate-500">{c.ref}</p>
                    </div>
                    <span className={`flex-none rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.chip}`}>
                      {s.label}
                    </span>
                  </Reveal>
                );
              })}
              {/* reconcilia a contagem do rodapé com a lista exibida (2 conformes aqui + 12 abaixo = 14) */}
              <li className="px-3 py-2 font-mono text-[11px] text-slate-400">+ 12 outras verificações conformes</li>
            </ul>

            <div className="flex flex-col gap-1 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs text-slate-500">
                <span className="font-semibold text-red-700">1 impeditivo</span> ·{' '}
                <span className="font-semibold text-orange-700">1 atenção</span> ·{' '}
                <span className="font-semibold text-emerald-700">14 conformes</span>
              </p>
              <p className="text-xs font-medium text-slate-600">Resolva os impeditivos antes de protocolar.</p>
            </div>
          </Reveal>
        </div>

        {/* Exemplo real do documento gerado */}
        <Reveal
          as="div"
          y={16}
          delay={0.05}
          margin="-80px"
          className="mt-12 lg:mt-16"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">Exemplos do que ela gera</h3>
              <p className="mt-1 text-slate-600">Memorial descritivo, diagrama unifilar, diagrama de blocos e planta de localização — dimensionados e no padrão da distribuidora.</p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">gerado automaticamente</span>
          </div>

          {/* Mobile: grade 2x2 (legível, sem corte) */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {exemplos.map(({ f, alt }) => (
              <div key={f} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img src={`/${f}.webp`} alt={alt} width={620} height={876} className="block h-auto w-full" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Desktop: leque com o diagrama unifilar em foco (frente/centro) */}
          <div className="group relative mx-auto hidden h-[560px] w-full max-w-3xl items-center justify-center sm:flex">
            {exemplos.map(({ f, alt, fan }) => (
              <div
                key={f}
                className={`absolute w-[300px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_22px_55px_-24px_rgba(15,23,42,0.42)] transition-transform duration-500 ease-out ${fan}`}
              >
                <img src={`/${f}.webp`} alt={alt} width={620} height={876} className="block h-auto w-full" loading="lazy" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Ganchos + plano */}
        <Reveal
          as="div"
          y={16}
          delay={0.1}
          margin="-80px"
          className="mt-12 border-t border-slate-200 pt-8"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ganchos.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Check className="h-4 w-4 flex-none text-primary" strokeWidth={3} />
                {g}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={REQUEST_ACCESS_URL}
              onClick={scrollToRequestAccess}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Quero testar a Automação
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-slate-600">
              Incluída nos <strong className="font-semibold text-slate-900">dois planos</strong> — e nos
              <strong className="font-semibold text-slate-900"> {TRIAL_DIAS} dias de teste</strong>, sem cartão.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Automacao;
