import React, { useRef, useState } from 'react';
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
  X,
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

// Foco visível no escuro: o outline global (grafite) some sobre o Void, então
// todo elemento interativo desta seção força outline branco (spec §4.4).
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

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

// Cores de status = SEMÂNTICA (não decoração): vermelho impeditivo, laranja
// atenção, esmeralda conforme. Tons claros p/ passar AA sobre a superfície obsidian.
const estadoStyle: Record<
  Estado,
  { Icon: React.ComponentType<{ className?: string }>; icon: string; chip: string; label: string }
> = {
  impeditivo: { Icon: XCircle, icon: 'text-red-400', chip: 'bg-red-500/10 text-red-300', label: 'Impeditivo' },
  atencao: { Icon: AlertTriangle, icon: 'text-orange-400', chip: 'bg-orange-500/10 text-orange-300', label: 'Atenção' },
  conforme: { Icon: CheckCircle2, icon: 'text-emerald-400', chip: 'bg-emerald-500/10 text-emerald-300', label: 'Conforme' },
};

const ganchos = [
  'Em poucos cliques, sem montar papelada à mão',
  'No padrão de cada distribuidora',
  'Dimensionamento embutido: condutores, disjuntores, DPS e proteções',
  'Inversor string e microinversor',
  'Carimbo com logo da empresa e RT (CREA/CFT)',
];

// Formulários das concessionárias — a prova de que não é só o pacote técnico
// genérico: sai o anexo exato que cada distribuidora exige, já preenchido.
const anexos = [
  {
    f: 'doc-anexo-equatorial',
    distribuidora: 'Equatorial',
    doc: 'Anexo I · Solicitação de Orçamento',
    alt: 'Anexo I da Equatorial preenchido automaticamente pelo Homologa Plus',
  },
  {
    f: 'doc-anexo-cpfl',
    distribuidora: 'CPFL',
    doc: 'Anexo F · Registro de Micro e Minigeração',
    alt: 'Anexo F da CPFL preenchido automaticamente pelo Homologa Plus',
  },
  {
    f: 'doc-anexo-energisa',
    distribuidora: 'Energisa',
    doc: 'Formulário de Orçamento de Conexão',
    alt: 'Formulário de orçamento de conexão da Energisa preenchido automaticamente pelo Homologa Plus',
  },
];

const unifilarCompletoAlt =
  'Diagrama unifilar completo gerado pela Automação, com memória de cálculo, legenda e carimbo do responsável técnico';

const Automacao = () => {
  // Exemplos reais gerados. O diagrama unifilar é o foco (frente/centro do leque).
  const exemplos = [
    { f: 'doc-unifilar', alt: 'Diagrama unifilar gerado pela Automação', label: 'Diagrama Unifilar', fan: 'z-40 group-hover:-translate-y-4' },
    { f: 'doc-blocos', alt: 'Diagrama de blocos gerado pela Automação', label: 'Diagrama de Blocos', fan: 'z-30 translate-x-[68%] rotate-[10deg] group-hover:translate-x-[98%] group-hover:rotate-[15deg]' },
    { f: 'doc-planta', alt: 'Planta de localização gerada pela Automação', label: 'Planta de Localização', fan: 'z-20 -translate-x-[56%] -rotate-[7deg] group-hover:-translate-x-[78%] group-hover:-rotate-[11deg]' },
    { f: 'doc-memorial', alt: 'Memorial descritivo gerado pela Automação', label: 'Memorial Descritivo', fan: 'z-10 -translate-x-[106%] -rotate-[14deg] group-hover:-translate-x-[132%] group-hover:-rotate-[19deg]' },
  ];

  // Visualizador em tela cheia: <dialog> nativo, sem biblioteca. showModal() cuida
  // de foco, Esc e retorno de foco ao gatilho; só tratamos o clique no backdrop.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [viewer, setViewer] = useState<{ src: string; alt: string } | null>(null);

  const openViewer = (src: string, alt: string) => {
    setViewer({ src, alt });
    dialogRef.current?.showModal();
  };

  const closeViewer = () => {
    dialogRef.current?.close();
  };

  return (
    <section id="automacao" className="relative overflow-hidden bg-void py-20 md:py-28 border-t border-white/10">
      {/* Atmosfera cockpit sutil — coral/cobalto, sinaliza "instrumento" (arte, não texto) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,99,99,0.08), rgba(20,60,163,0.05) 48%, transparent 72%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <Reveal
          as="div"
          y={20}
          margin="-100px"
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral-ember px-3.5 py-1.5 font-mono text-[11px] md:text-xs font-medium uppercase tracking-[0.08em] text-ash">
            <Cpu className="h-3.5 w-3.5 text-coral" />
            A Automação por dentro
          </span>
          <h2 className="mt-5 text-clamp-h2 font-display font-extrabold text-white text-balance">
            A documentação da homologação solar,{' '}
            <span className="relative whitespace-nowrap text-white">
              gerada e validada
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-coral/0 via-coral to-coral/0"
              />
            </span>{' '}
            automaticamente
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ash text-pretty">
            A partir do projeto já cadastrado, o sistema faz o dimensionamento elétrico e monta o pacote inteiro:
            memorial, diagramas, planta e <strong className="font-semibold text-white">os formulários e anexos que
            cada distribuidora exige</strong>, e ainda checa a conformidade antes de você protocolar, apontando o que
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
            <h3 className="mb-2 font-display text-xl font-bold text-white">Os documentos que ela gera</h3>
            <p className="mb-6 text-ash">O pacote completo do protocolo, e editável quando você precisa ajustar.</p>
            <ul>
              {documentos.map((d) => (
                <li
                  key={d.nome}
                  className="flex items-start gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-obsidian text-coral shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                    <d.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-display text-base font-bold text-mist">{d.nome}</h4>
                    <p className="mt-0.5 text-sm text-ash">{d.desc}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {d.formatos.map((f) => (
                        <span
                          key={f}
                          className="rounded-md bg-graphite px-2 py-0.5 font-mono text-[11px] font-medium text-ash ring-1 ring-inset ring-white/10"
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
            className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian shadow-[var(--key-soft)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <h3 className="font-display text-sm font-bold text-white">Validação de conformidade</h3>
                <p className="font-mono text-[11px] text-smoke">Distribuidora: Enel SP · pré-protocolo</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-graphite text-coral shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
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
                    className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-white/5"
                  >
                    <s.Icon className={`mt-0.5 h-5 w-5 flex-none ${s.icon}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug text-mist">{c.titulo}</p>
                      <p className="mt-0.5 font-mono text-[13px] text-smoke">{c.ref}</p>
                    </div>
                    <span className={`flex-none rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.chip}`}>
                      {s.label}
                    </span>
                  </Reveal>
                );
              })}
              {/* reconcilia a contagem do rodapé com a lista exibida (2 conformes aqui + 12 abaixo = 14) */}
              <li className="px-3 py-2 font-mono text-[11px] text-smoke">+ 12 outras verificações conformes</li>
            </ul>

            <div className="flex flex-col gap-1 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs text-smoke">
                <span className="font-semibold text-red-300">1 impeditivo</span> ·{' '}
                <span className="font-semibold text-orange-300">1 atenção</span> ·{' '}
                <span className="font-semibold text-emerald-300">14 conformes</span>
              </p>
              <p className="text-xs font-medium text-ash">Resolva os impeditivos antes de protocolar.</p>
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
              <h3 className="font-display text-xl font-bold text-white">Exemplos do que ela gera</h3>
              <p className="mt-1 text-ash">Memorial descritivo, diagrama unifilar, diagrama de blocos e planta de localização, dimensionados e no padrão da distribuidora.</p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-smoke">gerado automaticamente</span>
          </div>

          {/* Mobile: um documento em destaque (recorte legível do unifilar completo)
              + tira horizontal rolável com os demais. Miniatura de 164px não convence
              um engenheiro; um recorte grande e nítido, sim. */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => openViewer('/doc-unifilar-completo.webp', unifilarCompletoAlt)}
              aria-label={`Ampliar: ${unifilarCompletoAlt}`}
              className={`block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-obsidian text-left shadow-[var(--key-soft)] ${focusRing}`}
            >
              {/* Recorte de verdade, não a prancha inteira encolhida: a fonte é
                  1400x1009 e o container é 4/3, então object-cover cortaria só 4%
                  da largura e devolveria o mesmo borrão. A imagem entra a 210% da
                  largura do container e é deslocada para enquadrar o bloco denso
                  (proteções, DADOS TECNICOS e MEMORIA DE CALCULO). */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                <img
                  src="/doc-unifilar-completo.webp"
                  alt={unifilarCompletoAlt}
                  width={1400}
                  height={1009}
                  className="absolute left-[-102%] top-[-12%] w-[210%] max-w-none"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-white/10 px-4 py-3">
                <p className="font-display text-sm font-bold text-mist">Diagrama Unifilar Completo</p>
                <p className="mt-0.5 text-xs leading-snug text-ash">Memória de cálculo, legenda e carimbo do RT. Toque para ampliar.</p>
              </div>
            </button>

            <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {exemplos.map(({ f, alt, label }) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => openViewer(`/${f}.webp`, alt)}
                  aria-label={`Ampliar: ${alt}`}
                  className={`w-36 flex-none cursor-zoom-in snap-center overflow-hidden rounded-xl border border-white/10 bg-obsidian text-left shadow-[var(--key-soft)] ${focusRing}`}
                >
                  <img src={`/${f}.webp`} alt={alt} width={620} height={876} className="block h-auto w-full" loading="lazy" />
                  <span className="block truncate px-2 py-1.5 text-[11px] font-medium text-ash">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: leque com o diagrama unifilar em foco (frente/centro) */}
          <div className="group relative mx-auto hidden h-[560px] w-full max-w-3xl items-center justify-center sm:flex">
            {exemplos.map(({ f, alt, fan }) => (
              <button
                type="button"
                key={f}
                onClick={() => openViewer(`/${f}.webp`, alt)}
                aria-label={`Ampliar: ${alt}`}
                className={`absolute w-[300px] cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-obsidian text-left shadow-[var(--key)] transition-transform duration-500 ease-out ${fan} ${focusRing}`}
              >
                <img src={`/${f}.webp`} alt={alt} width={620} height={876} className="block h-auto w-full" loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* O unifilar por inteiro: é onde dá pra ler a memória de cálculo.
            Só no desktop — num A3 denso reduzido a ~340px o desenho vira borrão. */}
        <Reveal as="figure" y={16} delay={0.05} margin="-80px" className="mt-10 hidden sm:block lg:mt-12">
          <button
            type="button"
            onClick={() => openViewer('/doc-unifilar-completo.webp', unifilarCompletoAlt)}
            aria-label={`Ampliar: ${unifilarCompletoAlt}`}
            className={`block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-obsidian text-left shadow-[var(--key-soft)] ${focusRing}`}
          >
            <img
              src="/doc-unifilar-completo.webp"
              alt={unifilarCompletoAlt}
              width={1400}
              height={1009}
              className="block h-auto w-full"
              loading="lazy"
            />
          </button>
          <figcaption className="mt-3 text-sm text-ash">
            O unifilar sai com <strong className="font-semibold text-white">memória de cálculo</strong>, legenda e
            carimbo do RT: condutores, disjuntores, DPS e queda de tensão já dimensionados a partir dos dados do projeto.
          </figcaption>
        </Reveal>

        {/* Formulários da distribuidora */}
        <Reveal as="div" y={16} delay={0.05} margin="-80px" className="mt-12 lg:mt-16">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-white">E o formulário da sua distribuidora, preenchido</h3>
            <p className="mt-1 text-ash">
              Cada concessionária tem o seu anexo, com os seus campos. A Automação preenche o que a sua exige, com os dados
              do projeto, sem redigitar nada.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {anexos.map(({ f, distribuidora, doc, alt }) => (
              <li
                key={f}
                className="overflow-hidden rounded-xl border border-white/10 bg-obsidian shadow-[var(--key-soft)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:bg-graphite"
              >
                <button
                  type="button"
                  onClick={() => openViewer(`/${f}.webp`, alt)}
                  aria-label={`Ampliar: ${alt}`}
                  className={`block w-full cursor-zoom-in text-left ${focusRing}`}
                >
                  {/* object-top: a área útil do formulário fica no topo da página */}
                  <img
                    src={`/${f}.webp`}
                    alt={alt}
                    width={620}
                    height={876}
                    className="block h-52 w-full object-cover object-top sm:h-60"
                    loading="lazy"
                  />
                </button>
                <div className="border-t border-white/10 px-4 py-3">
                  <p className="font-display text-sm font-bold text-mist">{distribuidora}</p>
                  <p className="mt-0.5 text-xs leading-snug text-smoke">{doc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Ganchos + plano */}
        <Reveal
          as="div"
          y={16}
          delay={0.1}
          margin="-80px"
          className="mt-12 border-t border-white/10 pt-8"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ganchos.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm font-medium text-ash">
                <Check className="h-4 w-4 flex-none text-coral" strokeWidth={3} />
                {g}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={buildWhatsAppLink('Olá! Quero uma demonstração da Automação do Homologa Plus.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq && window.fbq('track', 'Contact')}
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-mist px-7 py-3.5 text-base font-bold text-ink shadow-[var(--btn-lift)] transition-all hover:-translate-y-px hover:brightness-105 ${focusRing}`}
            >
              Agendar demonstração da Automação
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-ash">
              Incluída nos <strong className="font-semibold text-white">dois planos</strong> — peça uma
              <strong className="font-semibold text-white"> demonstração</strong> e veja funcionando.
            </p>
          </div>
        </Reveal>

        {/* Visualizador em tela cheia: <dialog> nativo cuida de foco, Esc e
            devolução de foco ao gatilho. Só o clique no backdrop é tratado aqui. */}
        <dialog
          ref={dialogRef}
          onClick={(e) => {
            if (e.target === dialogRef.current) closeViewer();
          }}
          aria-label={viewer?.alt}
          className="m-auto max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-void/90"
        >
          <div className="relative flex max-h-[100vh] max-w-[100vw] items-center justify-center p-4">
            <button
              type="button"
              onClick={closeViewer}
              aria-label="Fechar visualizador"
              className={`absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-mist text-ink shadow-[var(--btn-lift)] transition hover:brightness-105 sm:right-4 sm:top-4 ${focusRing}`}
            >
              <X className="h-5 w-5" />
            </button>
            {viewer && (
              <img
                src={viewer.src}
                alt={viewer.alt}
                className="max-h-[90vh] max-w-[95vw] object-contain"
              />
            )}
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default Automacao;
