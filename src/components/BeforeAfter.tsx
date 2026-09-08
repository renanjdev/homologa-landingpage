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
 *
 * Re-skin cockpit (FASE 2): os dois lados agora são cartões obsidian "tecla" no
 * mesmo canvas escuro — o que reforça a tese "mesmo meio, só muda o alinhamento".
 * As cores viram semânticas racionadas: âmbar/vermelho = dor/reprovação, coral =
 * o estado ativo do instrumento resolvido, esmeralda = etapa concluída/validada.
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

const colunaTitulo = 'font-display text-lg font-bold text-white md:text-xl';
const legenda = 'mt-5 max-w-[46ch] text-sm leading-relaxed text-ash';

/** Um pedaço de papel do processo atual: cartão obsidian "tecla", torto. */
const Artefato = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => (
  <div
    className={`absolute rounded-xl border border-white/10 bg-obsidian p-3 shadow-[var(--key-soft)] ${className}`}
  >
    {children}
  </div>
);

const BeforeAfter = () => {
  return (
    <Reveal as="section" y={20} margin="-100px" className="bg-ink py-20 md:py-28 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-smoke">
            Antes e depois
          </p>
          <h2 className="text-clamp-h2 font-display font-bold text-white text-balance">
            O mesmo projeto, nos dois processos
          </h2>
          <p className="mt-4 text-base text-ash md:text-lg leading-relaxed">
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
              className="relative mt-5 h-[360px] select-none rounded-2xl border border-white/10 border-l-[3px] border-l-amber-400/80 bg-void shadow-[inset_0_2px_10px_-4px_rgba(0,0,0,0.6)] sm:h-[370px] lg:h-[410px]"
            >
              <div aria-hidden="true" className="absolute inset-0">
                {/* Planilha de controle */}
                <Artefato className="left-0 top-2 w-[62%] max-w-[280px] -rotate-2">
                  <p className="font-mono text-[11px] text-smoke">controle_homologacao_v7.xlsx</p>
                  <div className="mt-2.5 grid grid-cols-3 gap-x-2 gap-y-1.5 font-mono text-[11px]">
                    <span className="text-smoke">PROJETO</span>
                    <span className="text-smoke">ETAPA</span>
                    <span className="text-smoke">DOC</span>
                    <span className="text-ash">0142</span>
                    <span className="text-amber-400/80">?</span>
                    <span className="text-ash">v3 final</span>
                    <span className="text-ash">0139</span>
                    <span className="text-ash">enviado</span>
                    <span className="text-amber-400/80">?</span>
                    <span className="text-ash">0155</span>
                    <span className="text-ash">vistoria</span>
                    <span className="text-amber-400/80">falta</span>
                  </div>
                </Artefato>

                {/* E-mail com o mesmo documento em várias versões. Fica sobre a
                    planilha de propósito: quatro peças nos quatro cantos formariam
                    simetria, e simetria lê como ordem. */}
                <Artefato className="left-[46%] top-[13%] w-[52%] max-w-[230px] rotate-3">
                  <p className="text-[11px] font-semibold text-mist">RE: RE: RE: documentos 0142</p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-smoke">
                    <Paperclip className="h-3 w-3 shrink-0" />
                    docs_0142_v3_FINAL_ok.pdf
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-smoke">4 anexos</p>
                </Artefato>

                {/* Cobrança de status por mensagem */}
                <Artefato className="bottom-[30%] left-[4%] w-[58%] max-w-[250px] rotate-1 sm:bottom-[13%]">
                  <p className="text-sm leading-snug text-ash">
                    e o memorial do 0142, saiu?
                  </p>
                  <p className="mt-1.5 text-right font-mono text-[11px] text-smoke">14:52</p>
                </Artefato>

                {/* A reprovação, que só aparece depois do protocolo */}
                <Artefato className="bottom-0 right-[2%] w-[70%] max-w-[290px] -rotate-3 border-l-[3px] border-l-red-500/70">
                  <p className="flex items-center gap-2 text-sm font-bold text-red-400">
                    <XCircle className="h-4 w-4 shrink-0" />
                    Reprovado pela distribuidora
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-ash">
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
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-obsidian text-mist shadow-[var(--key-soft)]">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>

          {/* DEPOIS: um instrumento só, alinhado. */}
          <div>
            <h3 className={colunaTitulo}>Com o Homologa Plus</h3>

            {/* Sem altura fixa: com 6 etapas, 5 chips e a faixa de conformidade,
                um teto de 330px cortava justamente o desfecho do lado bom. */}
            {/* Peso visual "alívio": acento coral no topo e inner-shadow "tecla" —
                o painel "sobe" e resolve, sem drop-shadow solto. */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 border-t-[3px] border-t-coral bg-obsidian shadow-[var(--key-soft)]">
              <div className="flex items-baseline justify-between gap-3 border-b border-white/10 px-5 py-4">
                <p className="font-display text-base font-bold text-white">Projeto 0142</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
                  UC 3004512
                </p>
              </div>

              <ol className="px-5 py-4">
                {etapas.map((e) => (
                  <li key={e.nome} className="flex items-center gap-2.5 py-[5px]">
                    {e.estado === 'feito' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    ) : e.estado === 'atual' ? (
                      <span
                        aria-hidden="true"
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-coral"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                      </span>
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-iron" aria-hidden="true" />
                    )}
                    <span
                      className={
                        e.estado === 'pendente'
                          ? 'text-[13px] text-smoke sm:text-sm'
                          : 'text-[13px] font-medium text-mist sm:text-sm'
                      }
                    >
                      {e.nome}
                    </span>
                    {e.estado === 'atual' && (
                      <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-coral">
                        agora
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <div className="border-t border-white/10 px-5 py-3.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
                  Documentação gerada
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {documentos.map((d) => (
                    <li
                      key={d}
                      className="rounded-md bg-graphite px-2 py-1 font-mono text-[11px] text-ash"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="flex items-center gap-2 border-t border-white/10 bg-emerald-500/10 px-5 py-3.5 text-[13px] font-medium text-emerald-300">
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
