import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  User,
  Cpu,
  Building2,
  FolderOpen,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = lazy(() => import('../../components/Navbar'));
const Footer = lazy(() => import('../../components/Footer'));

const DocumentosHomologacao = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Documentos para Homologação Fotovoltaica: Lista Completa | Homologa Plus</title>
        <meta
          name="description"
          content="Lista completa de documentos necessários para homologação de sistemas fotovoltaicos. Checklist prático para não esquecer nenhum documento e evitar reprovação."
        />
        <link rel="canonical" href="https://homologaplus.com.br/documentos-homologacao-fotovoltaica" />
        <meta property="og:title" content="Documentos para Homologação Fotovoltaica: Lista Completa | Homologa Plus" />
        <meta
          property="og:description"
          content="Lista completa de documentos necessários para homologação de sistemas fotovoltaicos. Checklist prático para não esquecer nenhum documento e evitar reprovação."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://homologaplus.com.br/documentos-homologacao-fotovoltaica" />
      </Helmet>

      <Suspense fallback={null}>
        <Navbar scrolled />
      </Suspense>

      <main className="pt-32 pb-20 px-4">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar para Home
          </Link>

          {/* Hero */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
            <div className="flex items-center gap-3 text-primary mb-6">
              <FileText className="w-8 h-8" />
              <span className="text-sm font-semibold uppercase tracking-wider">Guia Completo</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight">
              Documentos para Homologação Fotovoltaica: Lista Completa e Atualizada
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              A homologação de um sistema fotovoltaico junto à concessionária de energia é uma das etapas mais
              importantes — e também uma das que mais geram retrabalho — em um projeto de energia solar. A falta
              de um único documento pode significar semanas de atraso, reprovação do pedido e frustração tanto
              para o integrador quanto para o cliente final. Neste guia, reunimos todos os documentos necessários,
              organizados por categoria, para que você nunca mais perca tempo com pendências documentais.
            </p>
          </div>

          {/* Section 1: Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-900">
                Por Que a Documentação Correta é Crucial?
              </h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Segundo dados do setor, aproximadamente 30% dos pedidos de homologação são reprovados na
                primeira tentativa por problemas documentais. Isso representa um custo oculto enorme para
                empresas integradoras: horas de trabalho administrativo, ligações para concessionárias,
                reenvio de formulários e, principalmente, clientes insatisfeitos que não entendem por que
                seu sistema solar ainda não está gerando créditos de energia.
              </p>
              <p>
                A documentação correta desde o início do processo não é apenas uma questão burocrática — é
                uma questão de eficiência operacional e credibilidade profissional. Um integrador que domina
                a parte documental transmite confiança e entrega resultados mais rápidos. Cada concessionária
                possui suas particularidades, mas existe um conjunto base de documentos que é exigido em
                praticamente todas as distribuidoras do Brasil.
              </p>
              <p>
                A seguir, apresentamos a lista completa dividida por categorias para facilitar sua organização.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Documentos do Titular */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900">
                Documentos do Titular / Proprietário
              </h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Os documentos pessoais do titular da unidade consumidora são a base de qualquer solicitação
                de acesso. Eles comprovam a identidade e a titularidade sobre a conta de energia onde o
                sistema será conectado.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>RG e CPF do titular</strong> — Cópias legíveis do documento de identidade e CPF.
                    Para pessoa jurídica, utiliza-se o CNPJ, contrato social e documento do representante legal.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Conta de energia recente</strong> — A fatura mais recente da unidade consumidora,
                    com no máximo 90 dias, que comprova o vínculo entre o titular e o ponto de conexão. Algumas
                    concessionárias exigem as três últimas faturas.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Procuração</strong> — Quando o integrador atua como representante do titular, é
                    necessária uma procuração assinada autorizando a empresa a protocolar o pedido junto à
                    concessionária. Algumas distribuidoras exigem firma reconhecida em cartório.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Comprovante de propriedade ou autorização</strong> — Em caso de imóvel alugado,
                    autorização do proprietário para instalação do sistema fotovoltaico.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 3: Documentos Técnicos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900">Documentos Técnicos do Projeto</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                A parte técnica do projeto é avaliada com rigor pela concessionária. Qualquer inconsistência
                entre os documentos ou entre o projeto e a instalação real pode resultar em reprovação na
                vistoria. Certifique-se de que todos os dados estejam coerentes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Memorial descritivo</strong> — Documento que detalha as características do sistema:
                    potência total, quantidade e modelo dos módulos, tipo e modelo do inversor, tipo de conexão
                    (monofásica, bifásica ou trifásica), coordenadas geográficas e orientação dos painéis.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Diagrama unifilar</strong> — Representação gráfica simplificada do circuito elétrico
                    do sistema, mostrando a conexão entre os módulos, inversor(es), proteções (disjuntores,
                    DPS, fusíveis), medidor bidirecional e o quadro de distribuição. Deve seguir as normas
                    ABNT NBR 5410 e NBR 16690.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>ART ou RRT</strong> — A Anotação de Responsabilidade Técnica (para engenheiros) ou
                    Registro de Responsabilidade Técnica (para técnicos) é obrigatória. Deve ser emitida por
                    profissional habilitado e registrada no CREA ou CAU. Este documento atesta que o projeto
                    foi elaborado por profissional competente e se responsabiliza pela segurança da instalação.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Projeto elétrico completo</strong> — Algumas concessionárias exigem o projeto
                    elétrico detalhado, incluindo layout dos módulos no telhado, dimensionamento de cabos,
                    cálculos de proteção e memorial de cálculo.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4: Documentos dos Equipamentos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900">Documentos dos Equipamentos</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                A concessionária precisa verificar se os equipamentos utilizados atendem às normas técnicas
                brasileiras e possuem certificação válida. Equipamentos sem certificação INMETRO válida são
                motivo imediato de reprovação.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Datasheet dos módulos fotovoltaicos</strong> — Ficha técnica do fabricante
                    contendo potência nominal, tensão de circuito aberto (Voc), corrente de curto-circuito
                    (Isc), eficiência, dimensões e peso do módulo. O modelo deve coincidir exatamente com
                    o informado no memorial descritivo.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Datasheet do inversor</strong> — Ficha técnica contendo potência nominal, faixa
                    de tensão MPPT, corrente máxima de entrada, tensão e corrente de saída, frequência de
                    operação e funcionalidades de proteção anti-ilhamento.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Certificados INMETRO</strong> — Tanto os módulos quanto os inversores devem possuir
                    certificação INMETRO válida e vigente. Verifique a validade no site oficial do INMETRO,
                    pois certificados vencidos invalidam o pedido de homologação.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Nota fiscal dos equipamentos</strong> — Algumas concessionárias solicitam a nota
                    fiscal de compra dos módulos e inversores para verificar procedência e modelo.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 5: Formulários da Concessionária */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900">Formulários da Concessionária</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Cada concessionária possui seus próprios formulários padronizados. Embora o formato varie,
                as informações solicitadas são semelhantes. É fundamental preencher cada campo com atenção,
                pois erros de preenchimento são uma das causas mais frequentes de devolução de processos.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Formulário de Solicitação de Acesso</strong> — Documento principal que formaliza
                    o pedido de conexão da microgeração ou minigeração distribuída à rede. Contém dados do
                    titular, endereço da instalação, características do sistema e dados do responsável técnico.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Formulário de vistoria</strong> — Após a instalação, algumas concessionárias
                    exigem o preenchimento de um formulário específico para agendar a vistoria técnica.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Relatório fotográfico</strong> — Registro fotográfico da instalação finalizada,
                    incluindo fotos dos módulos instalados, inversor, quadro de proteção, aterramento,
                    etiquetas de identificação e medidor.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 6: Checklist Completo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FolderOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900">Checklist Completo por Categoria</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Documentos Pessoais',
                  items: [
                    'RG e CPF do titular (ou CNPJ e contrato social)',
                    'Conta de energia recente (até 90 dias)',
                    'Procuração assinada (se aplicável)',
                    'Comprovante de propriedade ou autorização do proprietário',
                  ],
                },
                {
                  title: 'Documentos Técnicos',
                  items: [
                    'Memorial descritivo do projeto',
                    'Diagrama unifilar atualizado',
                    'ART ou RRT registrada',
                    'Projeto elétrico completo (se exigido)',
                  ],
                },
                {
                  title: 'Documentos dos Equipamentos',
                  items: [
                    'Datasheet dos módulos fotovoltaicos',
                    'Datasheet do inversor',
                    'Certificados INMETRO válidos (módulos e inversor)',
                    'Nota fiscal dos equipamentos (se exigida)',
                  ],
                },
                {
                  title: 'Formulários e Registros',
                  items: [
                    'Formulário de Solicitação de Acesso preenchido',
                    'Formulário de vistoria (se aplicável)',
                    'Relatório fotográfico da instalação',
                  ],
                },
              ].map((category, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-slate-800 mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 7: Erros Comuns */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-900">Erros Comuns na Documentação</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Conhecer os erros mais frequentes permite evitá-los antes mesmo de protocolar o pedido.
                Veja os problemas que mais causam reprovação:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">1.</span>
                  <span>
                    <strong>Dados divergentes entre documentos</strong> — O nome do titular na procuração
                    deve ser idêntico ao da conta de energia e do formulário de solicitação. Divergências
                    simples como abreviações ou acentos diferentes já podem causar devolução.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">2.</span>
                  <span>
                    <strong>ART/RRT não registrada ou vencida</strong> — A ART ou RRT deve estar devidamente
                    registrada no conselho profissional. Uma ART sem pagamento da guia não é considerada válida.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">3.</span>
                  <span>
                    <strong>Modelo do equipamento diferente do datasheet</strong> — Se o memorial descritivo
                    menciona um modelo de módulo ou inversor e o datasheet anexado é de outro modelo, o pedido
                    será reprovado. Confira modelo e versão com atenção.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">4.</span>
                  <span>
                    <strong>Certificado INMETRO vencido</strong> — Certificações têm prazo de validade.
                    Antes de protocolar, verifique se a certificação dos equipamentos ainda está vigente
                    consultando o portal do INMETRO.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">5.</span>
                  <span>
                    <strong>Diagrama unifilar incompleto</strong> — Omitir proteções, não especificar
                    valores de disjuntores ou não incluir o aterramento no diagrama são erros que
                    resultam em solicitação de correção.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5">6.</span>
                  <span>
                    <strong>Conta de energia vencida</strong> — Enviar uma fatura com mais de 90 dias
                    é motivo de devolução imediata em diversas concessionárias.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 8: Dicas para Organizar */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900">
                Dicas para Organizar Seus Documentos
              </h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Manter a documentação organizada desde o início do projeto economiza tempo e reduz
                drasticamente a chance de reprovação. Aqui estão práticas recomendadas que os melhores
                integradores do mercado já adotam:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Crie pastas padronizadas</strong> — Estabeleça uma estrutura de pastas fixa
                    para cada projeto: Pessoais, Técnicos, Equipamentos e Formulários. Assim, qualquer
                    membro da equipe sabe exatamente onde encontrar cada documento.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Digitalize com qualidade</strong> — Documentos ilegíveis são devolvidos.
                    Utilize aplicativos de scanner que corrigem perspectiva e melhoram contraste. Salve
                    sempre em PDF com resolução adequada.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Revise antes de enviar</strong> — Faça uma conferência cruzada: verifique se
                    nomes, números de documentos e modelos de equipamentos estão consistentes em todos os
                    formulários e documentos técnicos.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Mantenha versões atualizadas</strong> — Se houve alteração de projeto, atualize
                    todos os documentos afetados. Enviar um diagrama unifilar desatualizado enquanto o
                    memorial descritivo reflete o novo projeto é garantia de reprovação.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Use nomenclatura clara nos arquivos</strong> — Nomeie os arquivos de forma
                    descritiva, como "ART_Projeto_12345_JoaoSilva.pdf" em vez de "documento_final_v2.pdf".
                    Isso facilita a localização e evita confusões.
                  </span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 9: Como o Homologa Plus Ajuda */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-primary/10 mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Como o Homologa Plus Centraliza Toda a Documentação
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Gerenciar documentação de homologação em pastas no computador, e-mails e grupos de
                WhatsApp é uma receita para o caos. O Homologa Plus foi criado justamente para resolver
                esse problema, oferecendo um ambiente centralizado e organizado para toda a documentação
                de cada projeto.
              </p>
              <p>
                Com o Homologa Plus, cada projeto possui sua própria área de documentos, organizada por
                categoria. Você sabe exatamente quais documentos já foram enviados, quais estão pendentes
                e quais precisam de atualização. Seu cliente também acompanha o status em tempo real,
                eliminando aquelas dezenas de mensagens diárias perguntando "como está meu processo?".
              </p>
              <p>
                Além da organização documental, a plataforma oferece acompanhamento completo do fluxo
                de homologação, desde a solicitação de acesso até a troca do medidor e ativação do
                sistema. Tudo em um único lugar, acessível de qualquer dispositivo, com histórico
                completo de cada etapa.
              </p>
              <p>
                Para empresas integradoras que lidam com dezenas ou centenas de projetos simultaneamente,
                ter essa visibilidade centralizada significa menos erros, menos retrabalho e mais
                projetos concluídos por mês.
              </p>
            </div>
          </motion.section>

          {/* Section 10: CTA Final */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Organize Seus Documentos de Homologação Agora
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Pare de perder tempo com documentação desorganizada e reprovações evitáveis. Experimente
              o Homologa Plus gratuitamente por 30 dias e veja como a gestão documental pode ser simples.
            </p>
            <a
              href="https://app.homologaplus.com.br/cadastro"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white text-lg font-extrabold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
            >
              Começar teste grátis
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-slate-400 mt-4">
              Sem cartão de crédito. Sem compromisso. 30 dias grátis.
            </p>
          </motion.section>
        </motion.article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DocumentosHomologacao;
