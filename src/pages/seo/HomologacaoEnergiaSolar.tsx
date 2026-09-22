import React from 'react';
import GuiaPage, { type GuiaSection } from './guia/GuiaPage';

const sections: GuiaSection[] = [
  {
    id: 'o-que-e',
    title: 'O que é homologação de energia solar?',
    blocks: [
      { kind: 'p', text: 'A homologação de energia solar é o processo formal pelo qual um sistema de geração distribuída fotovoltaica é aprovado e autorizado a operar conectado à rede elétrica da concessionária local. Em termos práticos, é a etapa que transforma uma instalação física de painéis solares em uma unidade geradora reconhecida oficialmente, permitindo ao consumidor compensar a energia gerada na sua fatura de eletricidade.' },
      { kind: 'p', text: 'Sem a homologação, o sistema fotovoltaico não pode injetar energia na rede de distribuição e o proprietário não recebe os créditos energéticos previstos no sistema de compensação. Isso significa que todo o investimento realizado na instalação dos módulos e inversores não gera o retorno financeiro esperado enquanto o processo não for concluído. Para engenheiros e integradores solares, dominar esse processo é fundamental para entregar projetos com excelência e garantir a satisfação dos clientes finais.' },
    ],
  },
  {
    id: 'obrigatoria',
    title: 'Por que a homologação é obrigatória?',
    blocks: [
      { kind: 'p', text: 'A obrigatoriedade da homologação está prevista nas resoluções normativas da ANEEL (Agência Nacional de Energia Elétrica), com destaque para a Resolução Normativa n.º 482/2012 e suas atualizações, incluindo a REN 687/2015 e o Marco Legal da Geração Distribuída (Lei 14.300/2022). Essas regulamentações estabelecem que qualquer sistema de micro ou minigeração distribuída deve passar por um processo de aprovação junto à distribuidora de energia antes de entrar em operação.' },
      { kind: 'p', text: 'O processo de homologação garante a segurança da rede elétrica e dos técnicos que trabalham na manutenção, assegura que os equipamentos atendem aos padrões técnicos exigidos e formaliza o direito do consumidor à compensação de energia. Operar um sistema fotovoltaico sem a devida homologação pode gerar penalidades, suspensão do fornecimento e riscos à segurança elétrica da instalação e da rede pública.' },
      { kind: 'p', text: 'Além dos aspectos legais, a homologação confere credibilidade ao integrador solar perante seus clientes. Um processo conduzido de forma transparente e dentro dos prazos demonstra profissionalismo e fortalece a reputação da empresa no mercado de energia solar, cada vez mais competitivo.' },
    ],
  },
  {
    id: 'etapas',
    title: 'Etapas do processo de homologação (passo a passo)',
    blocks: [
      { kind: 'p', text: 'O processo de homologação de energia solar pode variar ligeiramente entre as distribuidoras, mas de forma geral segue um fluxo padrão que todo integrador deve conhecer em detalhes. Acompanhar cada etapa com precisão evita atrasos e devoluções de documentos. Veja as etapas principais:' },
      {
        kind: 'steps',
        items: [
          { title: 'Solicitação de Acesso (Parecer de Acesso)', desc: 'O integrador submete à concessionária o formulário de solicitação de acesso, acompanhado do projeto elétrico, ART ou TRT do responsável técnico e dados do sistema fotovoltaico. A distribuidora analisa as condições da rede e emite o parecer de acesso, indicando se há necessidade de adequações na rede ou no ponto de conexão.' },
          { title: 'Aprovação do Projeto Técnico', desc: 'Após recebimento do parecer favorável, o projeto técnico detalhado é avaliado pela distribuidora. Essa análise inclui diagramas unifilares, especificações dos módulos e inversores, memorial descritivo e demais documentos técnicos exigidos. O projeto deve atender às normas da ABNT, especialmente a NBR 16274 e NBR 5410.' },
          { title: 'Instalação e Adequações', desc: 'Com o projeto aprovado, a instalação física é realizada seguindo rigorosamente o projeto técnico homologado. Eventuais adequações no padrão de entrada, medidor bidirecional ou proteções devem ser concluídas antes da etapa seguinte. O integrador coordena com a concessionária a troca do medidor, quando necessário.' },
          { title: 'Vistoria da Concessionária', desc: 'A distribuidora agenda uma vistoria presencial para verificar se a instalação está em conformidade com o projeto aprovado. O técnico da concessionária inspeciona as conexões, a sinalização de segurança, os dispositivos de proteção e o medidor bidirecional. Se tudo estiver correto, a vistoria é aprovada.' },
          { title: 'Emissão do Parecer de Conexão e Operação', desc: 'Após aprovação na vistoria, a concessionária emite o parecer de conexão e autoriza o sistema a entrar em operação. A partir desse momento, a energia excedente gerada é injetada na rede e o consumidor passa a acumular créditos energéticos conforme a regulamentação vigente. O processo de homologação está formalmente concluído.' },
        ],
      },
    ],
  },
  {
    id: 'documentos',
    title: 'Documentos necessários para a homologação',
    blocks: [
      { kind: 'p', text: 'Reunir a documentação completa desde o início do processo é essencial para evitar devoluções e atrasos. A lista exata pode variar conforme a distribuidora, mas os documentos mais comuns incluem:' },
      {
        kind: 'checklist',
        columns: 2,
        items: [
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
        ],
      },
    ],
  },
  {
    id: 'prazos',
    title: 'Prazos e regulamentação',
    blocks: [
      { kind: 'p', text: 'A ANEEL estabelece prazos máximos que as distribuidoras devem cumprir em cada etapa do processo de homologação. Para sistemas de microgeração (até 75 kW), a concessionária tem até 15 dias úteis para emitir o parecer de acesso, 30 dias para a vistoria após a solicitação e 7 dias úteis para a troca do medidor e conexão após a aprovação na vistoria.' },
      { kind: 'p', text: 'Para minigeração distribuída (de 75 kW a 5 MW), os prazos são maiores: 30 dias úteis para o parecer de acesso e 45 dias para a implementação das obras de conexão. É importante que o integrador conheça esses prazos regulatórios para gerenciar as expectativas dos clientes e identificar possíveis atrasos por parte da concessionária, podendo acionar a ANEEL em caso de descumprimento.' },
      { kind: 'p', text: 'Com a entrada em vigor da Lei 14.300/2022, o Marco Legal da Geração Distribuída trouxe novas regras sobre a tarifação da energia injetada e o Fio B, impactando diretamente o cálculo de retorno dos projetos. Engenheiros e integradores devem se manter atualizados sobre essas mudanças para orientar corretamente seus clientes sobre a viabilidade financeira dos sistemas fotovoltaicos.' },
    ],
  },
  {
    id: 'erros-comuns',
    title: 'Erros comuns na homologação e como evitá-los',
    blocks: [
      { kind: 'p', text: 'Mesmo profissionais experientes podem cometer erros que atrasam significativamente o processo de homologação. Conhecer as falhas mais recorrentes é o primeiro passo para evitá-las e garantir agilidade na aprovação dos projetos.' },
      {
        kind: 'pairs',
        items: [
          { title: 'Documentação incompleta ou incorreta', desc: 'Mantenha uma checklist atualizada para cada concessionária e valide todos os documentos antes do envio. Confira se as ARTs estão dentro da validade e se os datasheets correspondem aos equipamentos efetivamente instalados.' },
          { title: 'Incompatibilidade entre projeto e instalação', desc: 'Garanta que a instalação siga fielmente o projeto aprovado. Qualquer alteração de layout, potência ou equipamento deve ser comunicada e aprovada pela concessionária antes da vistoria, sob risco de reprovação.' },
          { title: 'Padrão de entrada fora das especificações', desc: 'Verifique as exigências da distribuidora local para o padrão de entrada antes de iniciar a instalação. Muitas reprovações ocorrem por falta de disjuntor adequado, aterramento insuficiente ou caixa de medição incompatível.' },
          { title: 'Desconhecimento dos prazos regulatórios', desc: 'Acompanhe ativamente cada protocolo junto à concessionária. Se os prazos da ANEEL não forem cumpridos, registre reclamação formal para que o processo não fique estagnado indefinidamente.' },
          { title: 'Falta de comunicação com o cliente', desc: 'Mantenha o cliente final informado sobre cada etapa do processo. A falta de transparência gera frustração e pode comprometer o relacionamento comercial, especialmente quando há atrasos inesperados.' },
        ],
      },
    ],
  },
  {
    id: 'homologa-plus',
    title: 'Como o Homologa Plus simplifica o processo',
    panel: true,
    blocks: [
      { kind: 'p', text: 'O Homologa Plus foi desenvolvido por profissionais do setor de energia solar para resolver exatamente os desafios que engenheiros e integradores enfrentam diariamente no processo de homologação. A plataforma centraliza toda a gestão dos projetos em um único ambiente, eliminando planilhas dispersas, mensagens perdidas no WhatsApp e a falta de visibilidade sobre o andamento de cada etapa.' },
      { kind: 'p', text: 'Com o Homologa Plus, você acompanha em tempo real o status de cada homologação, desde a solicitação de acesso até a emissão do parecer de conexão. A plataforma envia notificações automáticas sobre prazos, permite o armazenamento organizado de toda a documentação do projeto e oferece ao cliente final um painel de acompanhamento transparente, reduzindo drasticamente as ligações e mensagens pedindo atualização sobre o processo.' },
      { kind: 'p', text: 'O resultado é mais produtividade para a equipe, menos erros por falta de controle e uma experiência profissional que diferencia o integrador no mercado. Empresas que utilizam o Homologa Plus relatam redução significativa no tempo de gestão de cada projeto e maior satisfação dos clientes, o que se traduz em mais indicações e crescimento sustentável do negócio.' },
    ],
  },
];

const HomologacaoEnergiaSolar = () => (
  <GuiaPage
    path="/homologacao-energia-solar"
    meta={{
      title: 'Homologação de Energia Solar: Guia Completo para Engenheiros | Homologa Plus',
      description: 'Entenda todo o processo de homologação de energia solar junto às concessionárias. Passo a passo completo, documentos necessários e como evitar erros. Guia atualizado.',
    }}
    title="Homologação de Energia Solar: Guia Completo para Engenheiros e Integradores"
    lede="Tudo o que você precisa saber para conduzir o processo de homologação de sistemas fotovoltaicos junto às concessionárias de energia, de forma eficiente e sem retrabalho."
    sections={sections}
    cta={{
      title: 'Simplifique suas homologações agora mesmo',
      text: 'Pare de perder tempo com planilhas e mensagens desorganizadas. Agende uma demonstração e veja como a gestão profissional de homologações transforma o seu negócio.',
    }}
  />
);

export default HomologacaoEnergiaSolar;
