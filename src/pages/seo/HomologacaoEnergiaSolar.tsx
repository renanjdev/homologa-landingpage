import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sun,
  FileCheck,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  ChevronRight,
} from 'lucide-react';

const Navbar = lazy(() => import('../../components/Navbar'));
const Footer = lazy(() => import('../../components/Footer'));

const HomologacaoEnergiaSolar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Helmet>
        <title>Homologação de Energia Solar: Guia Completo para Engenheiros | Homologa Plus</title>
        <meta
          name="description"
          content="Entenda todo o processo de homologação de energia solar junto às concessionárias. Passo a passo completo, documentos necessários e como evitar erros. Guia atualizado."
        />
        <link rel="canonical" href="https://homologaplus.com.br/homologacao-energia-solar" />
        <meta property="og:title" content="Homologação de Energia Solar: Guia Completo para Engenheiros | Homologa Plus" />
        <meta
          property="og:description"
          content="Entenda todo o processo de homologação de energia solar junto às concessionárias. Passo a passo completo, documentos necessários e como evitar erros. Guia atualizado."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://homologaplus.com.br/homologacao-energia-solar" />
      </Helmet>

      <Suspense fallback={<div className="h-16" />}>
        <Navbar scrolled={scrolled} />
      </Suspense>

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Sun className="w-3.5 h-3.5" />
              Guia Completo
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-[1.15] mb-6">
              Homologação de Energia Solar: Guia Completo para Engenheiros e Integradores
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Tudo o que você precisa saber para conduzir o processo de homologação de sistemas fotovoltaicos junto às concessionárias de energia, de forma eficiente e sem retrabalho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Section 1 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Sun className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              O que é homologação de energia solar?
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>
              A homologação de energia solar é o processo formal pelo qual um sistema de geração distribuída fotovoltaica é aprovado e autorizado a operar conectado à rede elétrica da concessionária local. Em termos práticos, é a etapa que transforma uma instalação física de painéis solares em uma unidade geradora reconhecida oficialmente, permitindo ao consumidor compensar a energia gerada na sua fatura de eletricidade.
            </p>
            <p>
              Sem a homologação, o sistema fotovoltaico não pode injetar energia na rede de distribuição e o proprietário não recebe os créditos energéticos previstos no sistema de compensação. Isso significa que todo o investimento realizado na instalação dos módulos e inversores não gera o retorno financeiro esperado enquanto o processo não for concluído. Para engenheiros e integradores solares, dominar esse processo é fundamental para entregar projetos com excelência e garantir a satisfação dos clientes finais.
            </p>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Por que a homologação é obrigatória?
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>
              A obrigatoriedade da homologação está prevista nas resoluções normativas da ANEEL (Agência Nacional de Energia Elétrica), com destaque para a Resolução Normativa n.º 482/2012 e suas atualizações, incluindo a REN 687/2015 e o Marco Legal da Geração Distribuída (Lei 14.300/2022). Essas regulamentações estabelecem que qualquer sistema de micro ou minigeração distribuída deve passar por um processo de aprovação junto à distribuidora de energia antes de entrar em operação.
            </p>
            <p>
              O processo de homologação garante a segurança da rede elétrica e dos técnicos que trabalham na manutenção, assegura que os equipamentos atendem aos padrões técnicos exigidos e formaliza o direito do consumidor à compensação de energia. Operar um sistema fotovoltaico sem a devida homologação pode gerar penalidades, suspensão do fornecimento e riscos à segurança elétrica da instalação e da rede pública.
            </p>
            <p>
              Além dos aspectos legais, a homologação confere credibilidade ao integrador solar perante seus clientes. Um processo conduzido de forma transparente e dentro dos prazos demonstra profissionalismo e fortalece a reputação da empresa no mercado de energia solar, cada vez mais competitivo.
            </p>
          </div>
        </motion.section>

        {/* Section 3 - Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Etapas do processo de homologação (passo a passo)
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8">
            O processo de homologação de energia solar pode variar ligeiramente entre as distribuidoras, mas de forma geral segue um fluxo padrão que todo integrador deve conhecer em detalhes. Acompanhar cada etapa com precisão evita atrasos e devoluções de documentos. Veja as etapas principais:
          </p>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Solicitação de Acesso (Parecer de Acesso)',
                desc: 'O integrador submete à concessionária o formulário de solicitação de acesso, acompanhado do projeto elétrico, ART ou TRT do responsável técnico e dados do sistema fotovoltaico. A distribuidora analisa as condições da rede e emite o parecer de acesso, indicando se há necessidade de adequações na rede ou no ponto de conexão.',
              },
              {
                step: '2',
                title: 'Aprovação do Projeto Técnico',
                desc: 'Após recebimento do parecer favorável, o projeto técnico detalhado é avaliado pela distribuidora. Essa análise inclui diagramas unifilares, especificações dos módulos e inversores, memorial descritivo e demais documentos técnicos exigidos. O projeto deve atender às normas da ABNT, especialmente a NBR 16274 e NBR 5410.',
              },
              {
                step: '3',
                title: 'Instalação e Adequações',
                desc: 'Com o projeto aprovado, a instalação física é realizada seguindo rigorosamente o projeto técnico homologado. Eventuais adequações no padrão de entrada, medidor bidirecional ou proteções devem ser concluídas antes da etapa seguinte. O integrador coordena com a concessionária a troca do medidor, quando necessário.',
              },
              {
                step: '4',
                title: 'Vistoria da Concessionária',
                desc: 'A distribuidora agenda uma vistoria presencial para verificar se a instalação está em conformidade com o projeto aprovado. O técnico da concessionária inspeciona as conexões, a sinalização de segurança, os dispositivos de proteção e o medidor bidirecional. Se tudo estiver correto, a vistoria é aprovada.',
              },
              {
                step: '5',
                title: 'Emissão do Parecer de Conexão e Operação',
                desc: 'Após aprovação na vistoria, a concessionária emite o parecer de conexão e autoriza o sistema a entrar em operação. A partir desse momento, a energia excedente gerada é injetada na rede e o consumidor passa a acumular créditos energéticos conforme a regulamentação vigente. O processo de homologação está formalmente concluído.',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4 - Documents */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Documentos necessários para a homologação
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
            Reunir a documentação completa desde o início do processo é essencial para evitar devoluções e atrasos. A lista exata pode variar conforme a distribuidora, mas os documentos mais comuns incluem:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Formulário de solicitação de acesso preenchido',
              'Projeto elétrico com diagrama unifilar',
              'ART (Anotação de Responsabilidade Técnica) ou TRT',
              'Datasheet dos módulos fotovoltaicos',
              'Datasheet e certificado INMETRO do inversor',
              'Memorial descritivo da instalação',
              'Procuração do titular da unidade consumidora',
              'Cópia da conta de energia recente',
              'Documento de identidade e CPF/CNPJ do titular',
              'Comprovante de propriedade ou contrato de locação',
            ].map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm md:text-base">{doc}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 5 - Deadlines */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Prazos e regulamentação
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>
              A ANEEL estabelece prazos máximos que as distribuidoras devem cumprir em cada etapa do processo de homologação. Para sistemas de microgeração (até 75 kW), a concessionária tem até 15 dias úteis para emitir o parecer de acesso, 30 dias para a vistoria após a solicitação e 7 dias úteis para a troca do medidor e conexão após a aprovação na vistoria.
            </p>
            <p>
              Para minigeração distribuída (de 75 kW a 5 MW), os prazos são maiores: 30 dias úteis para o parecer de acesso e 45 dias para a implementação das obras de conexão. É importante que o integrador conheça esses prazos regulatórios para gerenciar as expectativas dos clientes e identificar possíveis atrasos por parte da concessionária, podendo acionar a ANEEL em caso de descumprimento.
            </p>
            <p>
              Com a entrada em vigor da Lei 14.300/2022, o Marco Legal da Geração Distribuída trouxe novas regras sobre a tarifação da energia injetada e o Fio B, impactando diretamente o cálculo de retorno dos projetos. Engenheiros e integradores devem se manter atualizados sobre essas mudanças para orientar corretamente seus clientes sobre a viabilidade financeira dos sistemas fotovoltaicos.
            </p>
          </div>
        </motion.section>

        {/* Section 6 - Common Errors */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Erros comuns na homologação e como evitá-los
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
            Mesmo profissionais experientes podem cometer erros que atrasam significativamente o processo de homologação. Conhecer as falhas mais recorrentes é o primeiro passo para evitá-las e garantir agilidade na aprovação dos projetos.
          </p>
          <div className="space-y-4">
            {[
              {
                error: 'Documentação incompleta ou incorreta',
                solution:
                  'Mantenha uma checklist atualizada para cada concessionária e valide todos os documentos antes do envio. Confira se as ARTs estão dentro da validade e se os datasheets correspondem aos equipamentos efetivamente instalados.',
              },
              {
                error: 'Incompatibilidade entre projeto e instalação',
                solution:
                  'Garanta que a instalação siga fielmente o projeto aprovado. Qualquer alteração de layout, potência ou equipamento deve ser comunicada e aprovada pela concessionária antes da vistoria, sob risco de reprovação.',
              },
              {
                error: 'Padrão de entrada fora das especificações',
                solution:
                  'Verifique as exigências da distribuidora local para o padrão de entrada antes de iniciar a instalação. Muitas reprovações ocorrem por falta de disjuntor adequado, aterramento insuficiente ou caixa de medição incompatível.',
              },
              {
                error: 'Desconhecimento dos prazos regulatórios',
                solution:
                  'Acompanhe ativamente cada protocolo junto à concessionária. Se os prazos da ANEEL não forem cumpridos, registre reclamação formal para que o processo não fique estagnado indefinidamente.',
              },
              {
                error: 'Falta de comunicação com o cliente',
                solution:
                  'Mantenha o cliente final informado sobre cada etapa do processo. A falta de transparência gera frustração e pode comprometer o relacionamento comercial, especialmente quando há atrasos inesperados.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.error}</h3>
                <p className="text-slate-600 leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 7 - Homologa Plus */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Como o Homologa Plus simplifica o processo
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>
              O Homologa Plus foi desenvolvido por profissionais do setor de energia solar para resolver exatamente os desafios que engenheiros e integradores enfrentam diariamente no processo de homologação. A plataforma centraliza toda a gestão dos projetos em um único ambiente, eliminando planilhas dispersas, mensagens perdidas no WhatsApp e a falta de visibilidade sobre o andamento de cada etapa.
            </p>
            <p>
              Com o Homologa Plus, você acompanha em tempo real o status de cada homologação, desde a solicitação de acesso até a emissão do parecer de conexão. A plataforma envia notificações automáticas sobre prazos, permite o armazenamento organizado de toda a documentação do projeto e oferece ao cliente final um painel de acompanhamento transparente, reduzindo drasticamente as ligações e mensagens pedindo atualização sobre o processo.
            </p>
            <p>
              O resultado é mais produtividade para a equipe, menos erros por falta de controle e uma experiência profissional que diferencia o integrador no mercado. Empresas que utilizam o Homologa Plus relatam redução significativa no tempo de gestão de cada projeto e maior satisfação dos clientes, o que se traduz em mais indicações e crescimento sustentável do negócio.
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Simplifique suas homologações agora mesmo
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Pare de perder tempo com planilhas e mensagens desorganizadas. Experimente o Homologa Plus gratuitamente por 30 dias e veja como a gestão profissional de homologações transforma o seu negócio.
            </p>
            <a
              href="https://app.homologaplus.com.br/cadastro"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-lg px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
            >
              Testar grátis por 30 dias
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.section>

        {/* Back to home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Voltar para a página inicial
          </Link>
        </div>
      </article>

      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomologacaoEnergiaSolar;
