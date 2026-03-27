import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  FileCheck2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Zap,
  MapPin,
  Monitor,
  ListChecks,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const Navbar = lazy(() => import('../../components/Navbar'));
const Footer = lazy(() => import('../../components/Footer'));

const HomologacaoCpfl = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Helmet>
        <title>Homologação CPFL: Como Aprovar Projetos Solares na CPFL | Homologa Plus</title>
        <meta
          name="description"
          content="Guia completo para homologação de energia solar na CPFL. Documentos exigidos, prazos, portal GD e dicas para aprovação sem retrabalho."
        />
        <link rel="canonical" href="https://homologaplus.com.br/homologacao-cpfl" />
        <meta
          property="og:title"
          content="Homologação CPFL: Como Aprovar Projetos Solares na CPFL | Homologa Plus"
        />
        <meta
          property="og:description"
          content="Guia completo para homologação de energia solar na CPFL. Documentos exigidos, prazos, portal GD e dicas para aprovação sem retrabalho."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://homologaplus.com.br/homologacao-cpfl" />
      </Helmet>

      <Suspense fallback={null}>
        <Navbar scrolled={true} />
      </Suspense>

      <main className="pt-32 pb-20 px-4">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar para Home
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5" />
            Guia completo
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Homologação CPFL: Guia Completo para Aprovação de Projetos Solares
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Tudo o que integradores e engenheiros precisam saber para protocolar, acompanhar e
            aprovar projetos de geração distribuída na CPFL sem retrabalho e dentro dos prazos
            regulatórios.
          </p>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-14 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-12">
            {/* 1. Introdução */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  1. Os desafios de homologar na CPFL
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Se você é integrador de energia solar e atua nas regiões atendidas pelo grupo CPFL,
                já sabe que o processo de homologação pode ser um verdadeiro gargalo operacional.
                Documentação incompleta, formulários preenchidos incorretamente, projetos reprovados
                por detalhes técnicos e prazos que se arrastam por semanas: essa realidade consome
                tempo, dinheiro e a paciência da equipe.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A CPFL é uma das maiores distribuidoras de energia elétrica do Brasil e possui
                regras próprias que complementam as normas da ANEEL. Conhecer essas particularidades
                é essencial para quem deseja escalar operações sem acumular retrabalho. Neste guia,
                detalhamos cada etapa, os documentos obrigatórios, os erros mais frequentes e as
                melhores práticas para garantir aprovações consistentes.
              </p>
            </section>

            {/* 2. Área de concessão */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  2. Área de concessão da CPFL
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                O grupo CPFL engloba diversas distribuidoras que atendem milhões de consumidores em
                diferentes estados. As principais são a CPFL Paulista, CPFL Piratininga, CPFL Santa
                Cruz e RGE (Rio Grande Energia), que operam no interior e litoral de São Paulo, bem
                como em extensas regiões do Rio Grande do Sul. Juntas, essas concessionárias cobrem
                mais de 680 municípios e atendem cerca de 10 milhões de unidades consumidoras.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Cada distribuidora do grupo pode apresentar variações pontuais no fluxo de
                atendimento, formulários e canais de contato. Por isso, é fundamental identificar
                exatamente em qual concessionária a unidade consumidora está registrada antes de
                iniciar o protocolo. Essa verificação pode ser feita pela fatura de energia ou
                diretamente no site da CPFL.
              </p>
            </section>

            {/* 3. Portal GD */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  3. Portal GD da CPFL: como funciona
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A CPFL disponibiliza o Portal de Geração Distribuída (Portal GD) como canal oficial
                para solicitações de acesso de micro e minigeração. É por esse portal que
                integradores enviam documentos, acompanham pareceres e recebem notificações sobre o
                andamento do processo. O acesso exige cadastro prévio com CNPJ e dados do
                responsável técnico.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Dentro do portal, o integrador pode criar solicitações de acesso para novas
                instalações fotovoltaicas, submeter projetos elétricos, anexar documentos
                complementares e consultar o status de cada etapa. A interface, embora funcional,
                demanda atenção: uploads com tamanho acima do limite, formatos de arquivo não aceitos
                ou campos obrigatórios em branco são motivos comuns de erro que atrasam a análise.
              </p>
            </section>

            {/* 4. Documentos exigidos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  4. Documentos exigidos pela CPFL
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A lista de documentos pode variar conforme o porte da instalação e a modalidade de
                compensação, mas a base documental padrão para micro e minigeração inclui:
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  'Formulário de Solicitação de Acesso devidamente preenchido',
                  'Diagrama unifilar com dispositivos de proteção e seccionamento',
                  'Memorial descritivo do projeto elétrico',
                  'ART (Anotação de Responsabilidade Técnica) do projeto e da execução',
                  'Datasheet dos módulos fotovoltaicos e do(s) inversor(es)',
                  'Certificação INMETRO dos equipamentos utilizados',
                  'Procuração do titular da UC, quando aplicável',
                  'Comprovante de propriedade ou contrato de locação do imóvel',
                  'Foto do medidor e do padrão de entrada existente',
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Para projetos acima de 75 kW, a CPFL pode solicitar estudos adicionais de impacto
                na rede, além de laudo elétrico complementar. Manter todos os documentos organizados
                e em formato PDF legível reduz significativamente o risco de pendências.
              </p>
            </section>

            {/* 5. Etapas do processo */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  5. Etapas do processo de homologação na CPFL
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                O fluxo de homologação na CPFL segue as diretrizes da Resolução Normativa ANEEL
                n.º 1.059/2023, mas com particularidades operacionais. As etapas principais são:
              </p>
              <div className="space-y-4">
                {[
                  {
                    step: 'Solicitação de Acesso',
                    desc: 'O integrador protocola a solicitação pelo Portal GD, anexando toda a documentação técnica. A CPFL realiza uma triagem inicial para verificar completude dos dados.',
                  },
                  {
                    step: 'Parecer de Acesso',
                    desc: 'A distribuidora emite o parecer de acesso contendo as condições técnicas para conexão, incluindo eventual necessidade de adequação no padrão de entrada ou troca de medidor.',
                  },
                  {
                    step: 'Execução da Obra',
                    desc: 'Com o parecer aprovado, o integrador executa a instalação do sistema fotovoltaico, seguindo rigorosamente as especificações aprovadas no projeto.',
                  },
                  {
                    step: 'Solicitação de Vistoria',
                    desc: 'Após a conclusão da obra, o integrador solicita a vistoria pelo Portal GD. A CPFL agenda uma inspeção presencial ou remota para verificar conformidade.',
                  },
                  {
                    step: 'Vistoria e Aprovação',
                    desc: 'O técnico da concessionária verifica se a instalação está de acordo com o projeto aprovado, se os equipamentos possuem certificação e se as proteções estão adequadas.',
                  },
                  {
                    step: 'Troca do Medidor e Conexão',
                    desc: 'Aprovada a vistoria, a CPFL providencia a troca do medidor para o modelo bidirecional e autoriza a conexão do sistema à rede, finalizando a homologação.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">{item.step}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Prazos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  6. Prazos regulatórios e prazos práticos
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A ANEEL estabelece prazos máximos que as distribuidoras devem cumprir. Para
                microgeração (até 75 kW), o prazo para emissão do parecer de acesso é de 15 dias
                úteis. Para minigeração (de 75 kW a 5 MW), esse prazo sobe para 30 dias úteis. A
                vistoria deve ser realizada em até 7 dias úteis após a solicitação, e a troca do
                medidor em até 5 dias úteis após a aprovação.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Na prática, porém, esses prazos nem sempre são cumpridos. A CPFL costuma atender
                dentro dos prazos regulatórios na maioria das regionais, mas projetos com pendências
                documentais reiniciam a contagem. Regiões com alta demanda de solicitações, como o
                interior de São Paulo, podem apresentar atrasos pontuais na etapa de vistoria.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A dica principal é garantir que a documentação esteja 100% completa na primeira
                submissão. Cada pendência identificada pela distribuidora pode acrescentar de 5 a 15
                dias úteis ao prazo total, dependendo do tempo de correção e reenvio pelo integrador.
              </p>
            </section>

            {/* 7. Motivos comuns de reprovação */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  7. Motivos comuns de reprovação na CPFL
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A maior parte das reprovações na CPFL está relacionada a erros evitáveis. Os
                motivos mais recorrentes incluem:
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  'Diagrama unifilar incompleto ou sem a especificação correta dos dispositivos de proteção (disjuntor, DPS, chave seccionadora)',
                  'ART com dados divergentes do formulário de solicitação (nome do titular, endereço ou potência)',
                  'Inversores ou módulos sem certificação INMETRO vigente no momento do protocolo',
                  'Potência do sistema acima do limite permitido para a classe de tensão da unidade consumidora',
                  'Fotos do padrão de entrada com baixa qualidade ou que não mostram o medidor de forma legível',
                  'Falta de procuração quando o solicitante não é o titular da conta de energia',
                  'Memorial descritivo sem informações sobre o dimensionamento dos condutores e proteções',
                ].map((motivo, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                    <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <span>{motivo}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Muitos desses problemas poderiam ser resolvidos com uma checklist de conferência
                antes do envio. Integradores que adotam um processo padronizado de revisão reduzem
                reprovações em até 80%.
              </p>
            </section>

            {/* 8. Dicas para evitar retrabalho */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  8. Dicas para evitar retrabalho
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  'Padronize seus projetos: utilize templates de diagrama unifilar e memorial descritivo que já contemplem todas as exigências da CPFL.',
                  'Confira os dados antes de protocolar: nome do titular, número da UC, endereço e potência devem coincidir em todos os documentos.',
                  'Verifique a certificação INMETRO de cada equipamento no site oficial antes de incluí-lo no projeto.',
                  'Envie fotos nítidas e atualizadas do padrão de entrada, medidor e disjuntor geral.',
                  'Mantenha a ART registrada no CREA antes de anexá-la ao portal, evitando pendências por documentação não válida.',
                  'Acompanhe o status diariamente no Portal GD para responder a eventuais complementações o mais rápido possível.',
                  'Utilize uma plataforma de gestão de homologações para centralizar documentos, acompanhar prazos e evitar perda de informações.',
                ].map((dica, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{dica}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Homologa Plus */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  9. Como o Homologa Plus ajuda na homologação CPFL
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                O Homologa Plus foi criado para resolver exatamente os problemas que integradores
                enfrentam no dia a dia. A plataforma centraliza todo o fluxo de homologação em um
                único ambiente, eliminando planilhas dispersas, trocas de mensagens no WhatsApp e
                acompanhamentos manuais no portal da concessionária.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Com o Homologa Plus, você organiza cada projeto desde a solicitação de acesso até a
                troca do medidor. A plataforma permite cadastrar as informações do cliente e da
                instalação, anexar documentos, acompanhar o status de cada etapa e compartilhar
                atualizações em tempo real com o cliente final. Isso significa menos ligações
                perguntando "como está meu projeto?" e mais tempo para focar em vendas e instalações.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Integradores que utilizam o Homologa Plus reportam redução significativa no tempo
                gasto com gestão administrativa de homologações, além de uma taxa de aprovação na
                primeira submissão muito superior à média do mercado. A plataforma funciona como um
                copiloto do seu processo, garantindo que nenhum detalhe passe despercebido.
              </p>
            </section>

            {/* 10. CTA Final */}
            <section className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Simplifique suas homologações na CPFL
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                Chega de retrabalho, prazos estourados e clientes cobrando atualização. Organize
                seus projetos de geração distribuída com o Homologa Plus e aprove na primeira
                tentativa.
              </p>
              <a
                href="https://app.homologaplus.com.br/cadastro"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 text-lg"
              >
                Testar grátis por 30 dias
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-slate-400 mt-4">
                Sem cartão de crédito. Configuração em menos de 5 minutos.
              </p>
            </section>
          </div>
        </motion.article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomologacaoCpfl;
