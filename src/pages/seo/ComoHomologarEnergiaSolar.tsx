import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sun,
  ChevronLeft,
  FileText,
  ClipboardCheck,
  Search,
  CheckCircle2,
  Zap,
  Gauge,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  Clock,
  ShieldCheck,
} from 'lucide-react';

const Navbar = lazy(() => import('../../components/Navbar'));
const Footer = lazy(() => import('../../components/Footer'));

const ComoHomologarEnergiaSolar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Como Homologar Energia Solar Passo a Passo | Homologa Plus</title>
        <meta
          name="description"
          content="Aprenda como homologar sistemas de energia solar junto às concessionárias. Passo a passo detalhado com documentos, prazos e dicas para aprovação rápida."
        />
        <link rel="canonical" href="https://homologaplus.com.br/como-homologar-energia-solar" />
        <meta property="og:title" content="Como Homologar Energia Solar Passo a Passo | Homologa Plus" />
        <meta
          property="og:description"
          content="Aprenda como homologar sistemas de energia solar junto às concessionárias. Passo a passo detalhado com documentos, prazos e dicas para aprovação rápida."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://homologaplus.com.br/como-homologar-energia-solar" />
      </Helmet>

      <Suspense fallback={null}>
        <Navbar scrolled={scrolled} />
      </Suspense>

      <main className="pt-32 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10"
          >
            <div className="flex items-center gap-3 text-primary mb-6">
              <Sun className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Guia Completo</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight">
              Como Homologar Energia Solar: Passo a Passo Completo
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              A homologação de um sistema fotovoltaico junto à concessionária de energia é uma das etapas mais
              importantes e, ao mesmo tempo, mais burocráticas de qualquer projeto solar. Sem ela, o sistema
              instalado no telhado do cliente simplesmente não pode injetar energia na rede e gerar os créditos
              que tornam o investimento viável. Neste guia, você vai entender cada etapa do processo, os documentos
              necessários, os prazos envolvidos e como evitar os erros mais comuns que atrasam a aprovação.
            </p>
          </motion.div>

          {/* Content sections */}
          <div className="space-y-10">
            {/* Introdução */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-slate-900">Por Que Homologar Corretamente?</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Muitos integradores e instaladores de energia solar focam toda a atenção na parte técnica da
                  instalação e acabam subestimando a complexidade do processo de homologação. O resultado são
                  projetos travados por semanas ou até meses, clientes insatisfeitos cobrando retorno e uma
                  reputação profissional que se desgasta a cada atraso.
                </p>
                <p>
                  A homologação garante que o sistema fotovoltaico está em conformidade com as normas da
                  concessionária local e com a Resolução Normativa 482/2012 da ANEEL (atualizada pela RN
                  1.059/2023). Somente após a conclusão desse processo o consumidor passa a compensar a energia
                  gerada e a reduzir efetivamente sua conta de luz. Portanto, dominar cada etapa não é apenas
                  uma questão burocrática, é uma questão de viabilidade financeira do projeto.
                </p>
              </div>
            </motion.section>

            {/* Pré-requisitos */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <ClipboardCheck className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">Pré-Requisitos para Homologação</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Antes de iniciar o processo junto à concessionária, é fundamental ter toda a documentação
                  preparada. A falta de qualquer item pode resultar em indeferimento do pedido e atraso
                  significativo no cronograma. Confira os itens obrigatórios:
                </p>
                <ul className="space-y-3">
                  {[
                    'Projeto elétrico completo elaborado por engenheiro eletricista habilitado, contendo memorial descritivo, diagrama unifilar e especificações dos equipamentos',
                    'ART (Anotação de Responsabilidade Técnica) ou RRT (Registro de Responsabilidade Técnica) do projeto e da instalação',
                    'Datasheet dos módulos fotovoltaicos e do inversor, com certificação do INMETRO',
                    'Formulário de solicitação de acesso preenchido conforme o modelo da concessionária local',
                    'Procuração do titular da unidade consumidora, caso o solicitante seja um terceiro',
                    'Documento de identidade e CPF/CNPJ do titular da instalação',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Passo 1 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <h2 className="text-2xl font-bold text-slate-900">Solicitação de Acesso à Concessionária</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  O primeiro passo formal é protocolar a solicitação de acesso junto à distribuidora de energia
                  que atende a unidade consumidora. Cada concessionária possui um portal online ou canal específico
                  para receber esse tipo de requerimento. É nessa etapa que você informa as características
                  técnicas do sistema, como potência instalada, tipo de conexão e dados do inversor.
                </p>
                <p>
                  A concessionária tem um prazo regulatório de até 15 dias para emitir o parecer de acesso em
                  sistemas de microgeração (até 75 kW). Nesse parecer, ela pode solicitar adequações na rede
                  ou aprovar a conexão diretamente. Fique atento: erros no preenchimento do formulário são a
                  causa número um de devoluções nessa fase.
                </p>
              </div>
            </motion.section>

            {/* Passo 2 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <h2 className="text-2xl font-bold text-slate-900">Envio da Documentação Técnica</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Após receber o parecer de acesso favorável, é hora de enviar toda a documentação técnica do
                  projeto. Isso inclui o projeto elétrico completo, a ART registrada no CREA, os datasheets
                  dos equipamentos e as fotos da instalação concluída. Cada concessionária pode ter exigências
                  adicionais, como relatório de comissionamento ou teste de anti-ilhamento.
                </p>
                <p>
                  Organizar essa documentação de forma clara e padronizada reduz drasticamente as chances de
                  devolução. Recomendamos criar um checklist específico para cada distribuidora com a qual
                  você trabalha, pois os requisitos podem variar bastante de uma região para outra.
                </p>
              </div>
            </motion.section>

            {/* Passo 3 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <h2 className="text-2xl font-bold text-slate-900">Vistoria Técnica</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Com a documentação aprovada, a concessionária agenda uma vistoria técnica presencial na
                  unidade consumidora. O técnico da distribuidora vai conferir se a instalação corresponde ao
                  projeto apresentado, verificar o aterramento, a proteção contra surtos, a sinalização de
                  segurança e o funcionamento do inversor.
                </p>
                <p>
                  Se tudo estiver em conformidade, o laudo de vistoria é aprovado e o processo avança para a
                  próxima etapa. Caso sejam encontradas não conformidades, o integrador recebe um relatório
                  com as pendências que devem ser corrigidas antes de uma nova vistoria. Cada reprovação pode
                  adicionar de 15 a 30 dias ao prazo total do projeto.
                </p>
              </div>
            </motion.section>

            {/* Passo 4 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                <h2 className="text-2xl font-bold text-slate-900">Aprovação e Conexão</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Após a aprovação da vistoria, a concessionária emite o parecer final autorizando a conexão
                  do sistema fotovoltaico à rede elétrica. Nesse momento, o inversor pode ser configurado para
                  operar em modo de injeção e o sistema começa efetivamente a gerar créditos de energia.
                </p>
                <p>
                  É importante verificar se a concessionária emitiu o documento de Relacionamento Operacional,
                  que formaliza as condições de conexão e as responsabilidades de ambas as partes. Esse documento
                  é a garantia jurídica de que o sistema está regularizado perante a distribuidora.
                </p>
              </div>
            </motion.section>

            {/* Passo 5 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                <h2 className="text-2xl font-bold text-slate-900">Troca do Medidor</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  A última etapa do processo de homologação é a substituição do medidor convencional por um
                  medidor bidirecional. Esse equipamento é capaz de registrar tanto a energia consumida da rede
                  quanto a energia injetada pelo sistema fotovoltaico, permitindo a correta compensação dos
                  créditos na fatura mensal.
                </p>
                <p>
                  A troca do medidor é de responsabilidade da concessionária e costuma ocorrer em até 7 dias
                  úteis após a aprovação da vistoria. A partir desse momento, o cliente passa a ver os créditos
                  de energia refletidos em sua conta de luz, e o projeto está oficialmente concluído do ponto
                  de vista regulatório.
                </p>
              </div>
            </motion.section>

            {/* Dicas */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-slate-900">Dicas para Acelerar o Processo</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  A experiência mostra que integradores organizados conseguem reduzir o prazo de homologação
                  em até 40%. Aqui estão as práticas que mais impactam a velocidade do processo:
                </p>
                <ul className="space-y-3">
                  {[
                    'Prepare toda a documentação antes de protocolar a solicitação. Enviar documentos incompletos é a principal causa de atrasos.',
                    'Conheça as exigências específicas de cada concessionária. CPFL, CEMIG, Enel e Energisa possuem formulários e requisitos distintos.',
                    'Utilize um software de gestão para acompanhar prazos e pendências de cada projeto simultaneamente.',
                    'Mantenha um canal de comunicação direto com o setor de geração distribuída da concessionária.',
                    'Realize a instalação seguindo rigorosamente o projeto aprovado para evitar reprovações na vistoria.',
                    'Fotografe cada etapa da instalação com detalhes, pois muitas concessionárias exigem registro fotográfico.',
                  ].map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Erros comuns */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-slate-900">Erros Que Atrasam a Homologação</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Evitar os erros mais frequentes pode poupar semanas de retrabalho e preservar o relacionamento
                  com o cliente. Confira os equívocos mais comuns que observamos no mercado:
                </p>
                <ul className="space-y-3">
                  {[
                    'ART vencida ou com dados inconsistentes em relação ao projeto apresentado.',
                    'Inversor sem certificação do INMETRO ou com modelo diferente do especificado no projeto.',
                    'Diagrama unifilar incompleto, sem indicação correta dos dispositivos de proteção.',
                    'Falta de procuração quando o solicitante não é o titular da unidade consumidora.',
                    'Aterramento fora das normas da ABNT NBR 5410, identificado durante a vistoria.',
                    'Não acompanhar os prazos regulatórios, perdendo janelas de resposta da concessionária.',
                  ].map((error, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Homologa Plus */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Como o Homologa Plus Automatiza Cada Etapa
                </h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  O Homologa Plus foi desenvolvido por profissionais do setor de energia solar que viviam
                  diariamente os desafios da homologação. A plataforma centraliza todo o fluxo de trabalho
                  em um único ambiente digital, eliminando planilhas desorganizadas, mensagens perdidas no
                  WhatsApp e o risco de perder prazos regulatórios.
                </p>
                <p>
                  Com o Homologa Plus, cada projeto possui um painel de acompanhamento em tempo real onde
                  você visualiza a etapa atual, os documentos pendentes e os prazos de cada concessionária.
                  O sistema envia alertas automáticos quando um prazo está se aproximando e permite que seu
                  cliente acompanhe o status da homologação sem precisar ligar ou mandar mensagem.
                </p>
                <p>
                  Além disso, a plataforma oferece modelos de documentos pré-configurados para as principais
                  concessionárias do Brasil, reduzindo o tempo de preparação da documentação e minimizando
                  erros de preenchimento. O resultado é uma operação mais eficiente, com menos retrabalho e
                  clientes mais satisfeitos.
                </p>
              </div>
            </motion.section>

            {/* CTA Final */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/20 text-white text-center"
            >
              <Clock className="w-10 h-10 mx-auto mb-4 text-white/80" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Pare de Perder Tempo com Homologações Manuais
              </h2>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl mx-auto mb-8">
                Organize seus projetos, acompanhe prazos e dê visibilidade aos seus clientes com o Homologa
                Plus. Teste gratuitamente por 30 dias e descubra como simplificar sua operação.
              </p>
              <a
                href="https://app.homologaplus.com.br/cadastro"
                className="inline-flex items-center gap-3 bg-white text-primary font-bold text-lg py-4 px-10 rounded-2xl hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Começar teste grátis
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.section>
          </div>
        </article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ComoHomologarEnergiaSolar;
