import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  FileX,
  Ruler,
  CircuitBoard,
  Building2,
  FileCheck,
  Clock,
  MessageSquareX,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

const Navbar = lazy(() => import('../../components/Navbar'));
const Footer = lazy(() => import('../../components/Footer'));

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const erros = [
  {
    icon: FileX,
    titulo: 'Erro 1: Documentação incompleta ou desatualizada',
    conteudo:
      'Um dos erros mais recorrentes na homologação de sistemas fotovoltaicos é enviar documentação incompleta ou com dados desatualizados. Muitas concessionárias possuem checklists específicos que mudam periodicamente, e o engenheiro que não acompanha essas atualizações acaba tendo o projeto devolvido logo na triagem inicial. Formulários de solicitação de acesso, cópias de documentos do titular, procurações e comprovantes de propriedade precisam estar corretos e legíveis. Uma simples divergência de nome entre a conta de energia e o documento de identidade pode travar todo o processo. O ideal é criar um checklist padronizado para cada concessionária e revisá-lo antes de cada envio.',
  },
  {
    icon: Ruler,
    titulo: 'Erro 2: Projeto técnico com erros de dimensionamento',
    conteudo:
      'Dimensionar o sistema fotovoltaico de maneira incorreta é um erro que gera reprovação técnica e, pior, pode comprometer a segurança da instalação. Isso inclui superdimensionamento da potência inversora em relação ao padrão de entrada, uso de módulos com especificações incompatíveis com o inversor ou cálculos de string incorretos. Além disso, algumas concessionárias possuem limites de potência por fase e regras sobre compensação que devem ser respeitadas no memorial descritivo. Sempre confira a relação módulo-inversor, as tensões de operação, a corrente máxima admissível e o fator de potência exigido. Um memorial bem elaborado evita idas e vindas desnecessárias.',
  },
  {
    icon: CircuitBoard,
    titulo: 'Erro 3: Diagrama unifilar incorreto ou fora do padrão',
    conteudo:
      'O diagrama unifilar é um dos documentos mais analisados pela concessionária. Erros como ausência de dispositivos de proteção obrigatórios (disjuntores, DPS, seccionadora visível), simbologia fora da norma ABNT, falta de indicação do ponto de conexão ou representação incorreta do arranjo dos módulos levam à reprovação imediata. Cada distribuidora pode ter exigências adicionais, como a representação do medidor bidirecional ou do transformador. É fundamental que o diagrama seja claro, siga a NBR 5410 e as normas técnicas da distribuidora local, e contenha todas as informações de proteção e seccionamento.',
  },
  {
    icon: Building2,
    titulo: 'Erro 4: Não verificar as normas da concessionária local',
    conteudo:
      'O Brasil possui mais de 50 distribuidoras de energia, e cada uma possui suas próprias normas técnicas para conexão de micro e minigeração distribuída. O que é aceito pela CEMIG pode ser reprovado pela CPFL ou pela Enel. Não consultar a norma técnica atualizada da concessionária antes de elaborar o projeto é um erro grave. Isso inclui padrões de entrada, limites de potência por fase, exigências de proteção anti-ilhamento, requisitos de aterramento e até o formato dos arquivos para submissão digital. Manter um banco de dados atualizado com as normas de cada concessionária economiza tempo e reduz drasticamente as reprovações.',
  },
  {
    icon: FileCheck,
    titulo: 'Erro 5: Falta de ART/RRT ou ART com escopo incorreto',
    conteudo:
      'A Anotação de Responsabilidade Técnica (ART) ou o Registro de Responsabilidade Técnica (RRT) é documento obrigatório para a homologação. Muitos profissionais esquecem de emitir a ART antes do envio ou emitem com escopo que não cobre todas as atividades realizadas — por exemplo, emitindo ART apenas de projeto quando também há execução da obra. Além disso, a ART precisa estar vinculada ao profissional habilitado e com o CREA ou CAU em dia. Uma ART com escopo incompleto ou vencida é motivo de reprovação automática em praticamente todas as distribuidoras do país.',
  },
  {
    icon: Clock,
    titulo: 'Erro 6: Não acompanhar os prazos regulatórios',
    conteudo:
      'A Resolução Normativa 1.000 da ANEEL estabelece prazos claros para cada etapa do processo de conexão de micro e minigeração distribuída. A distribuidora tem prazos para emitir parecer de acesso, aprovar o projeto e realizar a vistoria. Por outro lado, o acessante também tem prazos para responder solicitações e realizar adequações. Perder um prazo pode significar o arquivamento do processo, obrigando o integrador a recomeçar do zero. Manter um controle rigoroso do calendário de cada projeto, com alertas e lembretes, é essencial para não perder prazos e evitar retrabalho desnecessário.',
  },
  {
    icon: MessageSquareX,
    titulo: 'Erro 7: Comunicação falha com o cliente durante o processo',
    conteudo:
      'A homologação é um processo que pode levar semanas ou até meses, dependendo da concessionária e da complexidade do projeto. Durante esse período, o cliente quer saber o que está acontecendo. Quando o integrador não comunica o status de forma proativa, surgem ligações, mensagens no WhatsApp e e-mails cobrando atualização. Isso consome tempo operacional e desgasta a relação comercial. Pior ainda: quando o cliente descobre um problema antes do integrador informá-lo, a confiança é quebrada. Um sistema que ofereça visibilidade em tempo real ao cliente elimina esse atrito e libera o time para tarefas produtivas.',
  },
  {
    icon: LayoutDashboard,
    titulo: 'Erro 8: Não usar um sistema de gestão para controlar as etapas',
    conteudo:
      'Gerenciar homologações em planilhas, e-mails e grupos de WhatsApp é uma receita para o caos. À medida que o volume de projetos cresce, torna-se impossível manter o controle manual sem que alguma etapa seja esquecida, algum documento se perca ou algum prazo seja ultrapassado. A ausência de um sistema centralizado de gestão faz com que retrabalhos se multipliquem, informações fiquem fragmentadas e a equipe perca produtividade. Um software especializado permite rastrear cada projeto em cada etapa, armazenar documentos de forma organizada, notificar prazos e gerar relatórios de desempenho.',
  },
];

const ErrosHomologacaoSolar = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Erros na Homologação Solar: Como Evitar Reprovações | Homologa Plus</title>
        <meta
          name="description"
          content="Conheça os erros mais comuns na homologação de energia solar e aprenda como evitá-los. Dicas práticas para engenheiros e integradores aprovarem projetos de primeira."
        />
        <link rel="canonical" href="https://homologaplus.com.br/erros-homologacao-solar" />
        <meta
          property="og:title"
          content="Erros na Homologação Solar: Como Evitar Reprovações | Homologa Plus"
        />
        <meta
          property="og:description"
          content="Conheça os erros mais comuns na homologação de energia solar e aprenda como evitá-los. Dicas práticas para engenheiros e integradores aprovarem projetos de primeira."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://homologaplus.com.br/erros-homologacao-solar" />
      </Helmet>

      <Suspense fallback={null}>
        <Navbar scrolled />
      </Suspense>

      {/* Hero */}
      <header className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-tight mb-6"
          >
            Erros na Homologação Solar:{' '}
            <span className="text-primary">Como Evitar Reprovações e Retrabalho</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Guia completo com os 8 erros mais frequentes que causam reprovações na homologação
            de energia solar — e como eliminá-los de vez do seu fluxo de trabalho.
          </motion.p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Introdução */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">O impacto dos erros na homologação</h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              A homologação de sistemas fotovoltaicos junto às distribuidoras de energia é uma das etapas mais
              críticas — e mais burocráticas — do processo de instalação de energia solar no Brasil. Para
              engenheiros e integradores, cada erro nessa fase significa projeto devolvido, prazo estourado,
              custo operacional adicional e, acima de tudo, um cliente insatisfeito que pode nunca mais voltar
              a fazer negócio.
            </p>
            <p>
              Segundo dados do setor, estima-se que até 40% dos projetos enviados para homologação são
              reprovados na primeira tentativa. Cada reprovação pode atrasar o projeto em duas a quatro
              semanas, gerando retrabalho para a equipe técnica e desgastando a relação com o cliente final.
              Em um mercado cada vez mais competitivo, onde a experiência do cliente é diferencial, não dá
              para se dar ao luxo de errar repetidamente na homologação.
            </p>
            <p>
              Neste guia, vamos detalhar os 8 erros mais comuns que levam à reprovação de projetos
              fotovoltaicos na homologação e, mais importante, mostrar como prevenir cada um deles com
              processos bem definidos e ferramentas adequadas.
            </p>
          </div>
        </motion.section>

        {/* Lista de Erros */}
        <div className="space-y-8 mb-16">
          {erros.map((erro, index) => {
            const Icon = erro.icon;
            return (
              <motion.section
                key={index}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-lg shadow-slate-200/40 border border-slate-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">{erro.titulo}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed pl-14">{erro.conteudo}</p>
              </motion.section>
            );
          })}
        </div>

        {/* Como prevenir */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Como prevenir todos esses erros com um sistema profissional
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Analisando os 8 erros listados acima, fica evidente que a maioria deles tem uma causa raiz em
              comum: a falta de um processo estruturado e de uma ferramenta centralizada para gerenciar o
              fluxo de homologação. Quando o integrador depende de planilhas avulsas, trocas de mensagens
              informais e memória individual da equipe, as falhas são inevitáveis.
            </p>
            <p>
              A solução passa por adotar um sistema de gestão especializado que centralize documentos,
              automatize verificações, alerte sobre prazos e mantenha todas as partes interessadas informadas
              em tempo real. Com um fluxo padronizado, checklists integrados e rastreabilidade completa, é
              possível reduzir as reprovações drasticamente e aumentar a velocidade de aprovação dos projetos.
            </p>
            <p>
              Além disso, um sistema profissional permite escalar a operação: à medida que o volume de
              projetos cresce, a qualidade se mantém porque o processo está sistematizado, e não dependente
              de pessoas específicas. Isso significa mais projetos aprovados em menos tempo, com menos custo
              operacional e muito mais satisfação do cliente.
            </p>
          </div>
        </motion.section>

        {/* Homologa Plus */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-primary/10 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Como o Homologa Plus elimina esses problemas
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              O Homologa Plus foi criado por profissionais do setor solar que viveram na prática cada um desses
              problemas. A plataforma oferece um fluxo completo de gestão de homologações, do parecer de
              acesso à vistoria final, com rastreabilidade total e visibilidade para o cliente.
            </p>
            <p>
              Com o Homologa Plus, cada projeto segue um pipeline visual e organizado, com etapas claras,
              documentos armazenados de forma centralizada, alertas automáticos de prazos e um portal do
              cliente onde ele acompanha o andamento do seu projeto em tempo real — sem precisar ligar ou
              mandar mensagem pedindo atualização.
            </p>
            <p>
              Isso significa menos reprovações, menos retrabalho, menos tempo perdido e, principalmente,
              clientes mais satisfeitos que indicam o seu trabalho. Integradores que utilizam um sistema
              profissional de gestão reportam até 60% de redução no tempo de aprovação e eliminação quase
              total de reprovações por erros documentais.
            </p>
          </div>
        </motion.section>

        {/* CTA Final */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Pare de perder tempo com reprovações
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Experimente o Homologa Plus gratuitamente e descubra como aprovar seus projetos
            de primeira, com menos esforço e mais controle.
          </p>
          <a
            href="https://app.homologaplus.com.br/cadastro"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
          >
            Começar teste grátis
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ErrosHomologacaoSolar;
