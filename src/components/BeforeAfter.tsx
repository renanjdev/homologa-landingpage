import React from 'react';
import { Reveal } from '../lib/anim';
import { CheckCircle2, Circle, XCircle, Paperclip, ArrowRight } from 'lucide-react';

/**
 * Componente assinatura do sistema (DESIGN.md §5): o contraste planilha-caótica
 * versus painel-organizado é a prova visual central da página, não decoração.
 *
 * Os dois lados são desenhados no mesmo meio, de propósito: o contraste só lê
 * como contraste porque a única diferença é o alinhamento. À esquerda, quatro
 * artefatos soltos e desalinhados ilustram o processo que o cliente já faz hoje
 * (planilha, cobrança por mensagem, e-mail com versões, reprovação). À direita,
 * um único instrumento alinhado. Nenhum dos dois é captura de tela do produto:
 * a prova real de produto vive no hero, na Automação e na Features.
 */

/** Etapas canônicas da homologação, as mesmas nomeadas na seção de fluxo. */
const etapas = [
  { nome: 'Projeto cadastrado', estado: 'feito' as const },
  { nome: 'Análise documental', estado: 'feito' as const },
  { nome: 'Envio para concessionária', estado: 'atual' as const },
  { nome: 'Aguardando parecer', estado: 'pendente' as const },
  { nome: 'Medidor trocado', estado: 'pendente' as const },
  { nome: 'Homologado', estado: 'pendente' as const },
];

const documentos = ['Memorial', 'Unifilar', 'Blocos', 'Planta', 'Anexo F'];

const colunaTitulo = 'font-display text-lg font-bold text-slate-900 md:text-xl';
const legenda = 'mt-5 max-w-[46ch] text-sm leading-relaxed text-slate-600';

/** Um pedaço de papel do processo atual: fundo branco, contorno frio, torto. */
const Artefato = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => (
  <div
    className={`absolute rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.25)] ${className}`}
  >
    {children}
  </div>
);

const BeforeAfter = () => {
  return (
    <Reveal as="section" y={20} margin="-100px" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2 className="text-clamp-h2 font-display font-bold text-slate-900">
            O mesmo projeto, nos dois processos
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            De um lado, o caminho que a sua equipe faz hoje. Do outro, o que o sistema faz por ela.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* ANTES: quatro artefatos soltos. O desalinhamento é a mensagem. */}
          <div>
            <h3 className={colunaTitulo}>Seu processo hoje</h3>

            {/* Peso visual "dor": a mesa fria e recuada, com a borda de alerta
                em âmbar. É o oposto emocional do painel resolvido ao lado — o
                contraste é de cor/peso, não de tamanho. */}
            <div
              role="img"
              aria-label="Ilustração do processo atual: uma planilha de controle com campos em aberto, uma cobrança de status por mensagem, um e-mail com várias versões do mesmo documento e uma reprovação da distribuidora."
              className="relative mt-5 h-[360px] select-none rounded-2xl border border-slate-200 border-l-[3px] border-l-amber-400 bg-slate-200/50 shadow-[inset_0_2px_6px_-4px_rgba(15,23,42,0.18)] sm:h-[370px] lg:h-[410px]"
            >
              <div aria-hidden="true" className="absolute inset-0">
                {/* Planilha de controle */}
                <Artefato className="left-0 top-2 w-[62%] max-w-[280px] -rotate-2">
                  <p className="font-mono text-[11px] text-slate-500">controle_homologacao_v7.xlsx</p>
                  <div className="mt-2.5 grid grid-cols-3 gap-x-2 gap-y-1.5 font-mono text-[11px]">
                    <span className="text-slate-500">PROJETO</span>
                    <span className="text-slate-500">ETAPA</span>
                    <span className="text-slate-500">DOC</span>
                    <span className="text-slate-700">0142</span>
                    <span className="text-slate-400">?</span>
                    <span className="text-slate-700">v3 final</span>
                    <span className="text-slate-700">0139</span>
                    <span className="text-slate-700">enviado</span>
                    <span className="text-slate-400">?</span>
                    <span className="text-slate-700">0155</span>
                    <span className="text-slate-700">vistoria</span>
                    <span className="text-slate-400">falta</span>
                  </div>
                </Artefato>

                {/* E-mail com o mesmo documento em várias versões. Fica sobre a
                    planilha de propósito: quatro peças nos quatro cantos formariam
                    simetria, e simetria lê como ordem. */}
                <Artefato className="left-[46%] top-[13%] w-[52%] max-w-[230px] rotate-3">
                  <p className="text-[11px] font-semibold text-slate-700">RE: RE: RE: documentos 0142</p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                    <Paperclip className="h-3 w-3 shrink-0" />
                    docs_0142_v3_FINAL_ok.pdf
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">4 anexos</p>
                </Artefato>

                {/* Cobrança de status por mensagem */}
                <Artefato className="bottom-[30%] left-[4%] w-[58%] max-w-[250px] rotate-1 sm:bottom-[13%]">
                  <p className="text-sm leading-snug text-slate-700">
                    e o memorial do 0142, saiu?
                  </p>
                  <p className="mt-1.5 text-right font-mono text-[11px] text-slate-500">14:52</p>
                </Artefato>

                {/* A reprovação, que só aparece depois do protocolo */}
                <Artefato className="bottom-0 right-[2%] w-[70%] max-w-[290px] -rotate-3 border-red-200 border-l-[3px] border-l-red-400">
                  <p className="flex items-center gap-2 text-sm font-bold text-red-700">
                    <XCircle className="h-4 w-4 shrink-0" />
                    Reprovado pela distribuidora
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-slate-600">
                    Disjuntor geral acima do limite do ramal de entrada.
                  </p>
                </Artefato>
              </div>
            </div>

            <p className={legenda}>
              Memorial e unifilar montados à mão, documento em quatro lugares diferentes, e o
              retrabalho aparecendo só depois que a distribuidora reprova.
            </p>
          </div>

          {/* Eixo do contraste. Some no mobile, onde a leitura já é vertical. */}
          <div aria-hidden="true" className="hidden self-center lg:flex lg:flex-col lg:items-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>

          {/* DEPOIS: um instrumento só, alinhado. */}
          <div>
            <h3 className={colunaTitulo}>Com o Homologa Plus</h3>

            {/* Sem altura fixa: com 6 etapas, 5 chips e a faixa de conformidade,
                um teto de 330px cortava justamente o desfecho do lado bom. */}
            {/* Peso visual "alívio": acento de marca esmeralda no topo, sombra
                mais forte e com leve tinta verde — o painel "sobe" e resolve. */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 border-t-[3px] border-t-emerald-500 bg-white shadow-[0_24px_56px_-28px_rgba(16,185,129,0.30),0_14px_34px_-22px_rgba(15,23,42,0.26)]">
              <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 px-5 py-4">
                <p className="font-display text-base font-bold text-slate-900">Projeto 0142</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-600">
                  UC 3004512
                </p>
              </div>

              <ol className="px-5 py-4">
                {etapas.map((e) => (
                  <li key={e.nome} className="flex items-center gap-2.5 py-[5px]">
                    {e.estado === 'feito' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    ) : e.estado === 'atual' ? (
                      <span
                        aria-hidden="true"
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-action"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-action" />
                      </span>
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                    )}
                    <span
                      className={
                        e.estado === 'pendente'
                          ? 'text-[13px] text-slate-500 sm:text-sm'
                          : 'text-[13px] font-medium text-slate-900 sm:text-sm'
                      }
                    >
                      {e.nome}
                    </span>
                    {e.estado === 'atual' && (
                      <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-action">
                        agora
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <div className="border-t border-slate-200 px-5 py-3.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-600">
                  Documentação gerada
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {documentos.map((d) => (
                    <li
                      key={d}
                      className="rounded-md bg-surface px-2 py-1 font-mono text-[11px] text-slate-700"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="flex items-center gap-2 border-t border-slate-200 bg-emerald-50/60 px-5 py-3.5 text-[13px] font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Conformidade validada, sem impeditivos
              </p>
            </div>

            <p className={legenda}>
              Um projeto, um painel: documentação gerada e validada, impeditivo apontado antes do
              protocolo, e cada etapa visível até o parecer.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default BeforeAfter;
