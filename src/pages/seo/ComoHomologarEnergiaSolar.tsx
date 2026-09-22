import React from 'react';
import GuiaPage, { type GuiaSection } from './guia/GuiaPage';

const sections: GuiaSection[] = [
  {
    id: 'por-que',
    title: 'Por Que Homologar Corretamente?',
    blocks: [
      { kind: 'p', text: 'Muitos integradores e instaladores de energia solar focam toda a atenção na parte técnica da instalação e acabam subestimando a complexidade do processo de homologação. O resultado são projetos travados por semanas ou até meses, clientes insatisfeitos cobrando retorno e uma reputação profissional que se desgasta a cada atraso.' },
      { kind: 'p', text: 'A homologação garante que o sistema fotovoltaico está em conformidade com as normas da concessionária local e com a Resolução Normativa 482/2012 da ANEEL (atualizada pela RN 1.059/2023). Somente após a conclusão desse processo o consumidor passa a compensar a energia gerada e a reduzir efetivamente sua conta de luz. Portanto, dominar cada etapa não é apenas uma questão burocrática, é uma questão de viabilidade financeira do projeto.' },
    ],
  },
  {
    id: 'pre-requisitos',
    title: 'Pré-Requisitos para Homologação',
    blocks: [
      { kind: 'p', text: 'Antes de iniciar o processo junto à concessionária, é fundamental ter toda a documentação preparada. A falta de qualquer item pode resultar em indeferimento do pedido e atraso significativo no cronograma. Confira os itens obrigatórios:' },
      {
        kind: 'checklist',
        items: [
          'Projeto elétrico completo elaborado por engenheiro eletricista habilitado, contendo memorial descritivo, diagrama unifilar e especificações dos equipamentos',
          'ART (Anotação de Responsabilidade Técnica) ou RRT (Registro de Responsabilidade Técnica) do projeto e da instalação',
          'Datasheet dos módulos fotovoltaicos e do inversor, com certificação do INMETRO',
          'Formulário de solicitação de acesso preenchido conforme o modelo da concessionária local',
          'Procuração do titular da unidade consumidora, caso o solicitante seja um terceiro',
          'Documento de identidade e CPF/CNPJ do titular da instalação',
        ],
      },
    ],
  },
  {
    id: 'solicitacao-de-acesso',
    title: 'Solicitação de Acesso à Concessionária',
    step: 1,
    blocks: [
      { kind: 'p', text: 'O primeiro passo formal é protocolar a solicitação de acesso junto à distribuidora de energia que atende a unidade consumidora. Cada concessionária possui um portal online ou canal específico para receber esse tipo de requerimento. É nessa etapa que você informa as características técnicas do sistema, como potência instalada, tipo de conexão e dados do inversor.' },
      { kind: 'p', text: 'A concessionária tem um prazo regulatório de até 15 dias para emitir o parecer de acesso em sistemas de microgeração (até 75 kW). Nesse parecer, ela pode solicitar adequações na rede ou aprovar a conexão diretamente. Fique atento: erros no preenchimento do formulário são a causa número um de devoluções nessa fase.' },
    ],
  },
  {
    id: 'documentacao-tecnica',
    title: 'Envio da Documentação Técnica',
    step: 2,
    blocks: [
      { kind: 'p', text: 'Após receber o parecer de acesso favorável, é hora de enviar toda a documentação técnica do projeto. Isso inclui o projeto elétrico completo, a ART registrada no CREA, os datasheets dos equipamentos e as fotos da instalação concluída. Cada concessionária pode ter exigências adicionais, como relatório de comissionamento ou teste de anti-ilhamento.' },
      { kind: 'p', text: 'Organizar essa documentação de forma clara e padronizada reduz drasticamente as chances de devolução. Recomendamos criar um checklist específico para cada distribuidora com a qual você trabalha, pois os requisitos podem variar bastante de uma região para outra.' },
    ],
  },
  {
    id: 'vistoria',
    title: 'Vistoria Técnica',
    step: 3,
    blocks: [
      { kind: 'p', text: 'Com a documentação aprovada, a concessionária agenda uma vistoria técnica presencial na unidade consumidora. O técnico da distribuidora vai conferir se a instalação corresponde ao projeto apresentado, verificar o aterramento, a proteção contra surtos, a sinalização de segurança e o funcionamento do inversor.' },
      { kind: 'p', text: 'Se tudo estiver em conformidade, o laudo de vistoria é aprovado e o processo avança para a próxima etapa. Caso sejam encontradas não conformidades, o integrador recebe um relatório com as pendências que devem ser corrigidas antes de uma nova vistoria. Cada reprovação pode adicionar de 15 a 30 dias ao prazo total do projeto.' },
    ],
  },
  {
    id: 'aprovacao-e-conexao',
    title: 'Aprovação e Conexão',
    step: 4,
    blocks: [
      { kind: 'p', text: 'Após a aprovação da vistoria, a concessionária emite o parecer final autorizando a conexão do sistema fotovoltaico à rede elétrica. Nesse momento, o inversor pode ser configurado para operar em modo de injeção e o sistema começa efetivamente a gerar créditos de energia.' },
      { kind: 'p', text: 'É importante verificar se a concessionária emitiu o documento de Relacionamento Operacional, que formaliza as condições de conexão e as responsabilidades de ambas as partes. Esse documento é a garantia jurídica de que o sistema está regularizado perante a distribuidora.' },
    ],
  },
  {
    id: 'troca-do-medidor',
    title: 'Troca do Medidor',
    step: 5,
    blocks: [
      { kind: 'p', text: 'A última etapa do processo de homologação é a substituição do medidor convencional por um medidor bidirecional. Esse equipamento é capaz de registrar tanto a energia consumida da rede quanto a energia injetada pelo sistema fotovoltaico, permitindo a correta compensação dos créditos na fatura mensal.' },
      { kind: 'p', text: 'A troca do medidor é de responsabilidade da concessionária e costuma ocorrer em até 7 dias úteis após a aprovação da vistoria. A partir desse momento, o cliente passa a ver os créditos de energia refletidos em sua conta de luz, e o projeto está oficialmente concluído do ponto de vista regulatório.' },
    ],
  },
  {
    id: 'dicas',
    title: 'Dicas para Acelerar o Processo',
    blocks: [
      { kind: 'p', text: 'A experiência mostra que integradores organizados conseguem reduzir o prazo de homologação em até 40%. Aqui estão as práticas que mais impactam a velocidade do processo:' },
      {
        kind: 'checklist',
        items: [
          'Prepare toda a documentação antes de protocolar a solicitação. Enviar documentos incompletos é a principal causa de atrasos.',
          'Conheça as exigências específicas de cada concessionária. CPFL, CEMIG, Enel e Energisa possuem formulários e requisitos distintos.',
          'Utilize um software de gestão para acompanhar prazos e pendências de cada projeto simultaneamente.',
          'Mantenha um canal de comunicação direto com o setor de geração distribuída da concessionária.',
          'Realize a instalação seguindo rigorosamente o projeto aprovado para evitar reprovações na vistoria.',
          'Fotografe cada etapa da instalação com detalhes, pois muitas concessionárias exigem registro fotográfico.',
        ],
      },
    ],
  },
  {
    id: 'erros',
    title: 'Erros Que Atrasam a Homologação',
    blocks: [
      { kind: 'p', text: 'Evitar os erros mais frequentes pode poupar semanas de retrabalho e preservar o relacionamento com o cliente. Confira os equívocos mais comuns que observamos no mercado:' },
      {
        kind: 'checklist',
        items: [
          'ART vencida ou com dados inconsistentes em relação ao projeto apresentado.',
          'Inversor sem certificação do INMETRO ou com modelo diferente do especificado no projeto.',
          'Diagrama unifilar incompleto, sem indicação correta dos dispositivos de proteção.',
          'Falta de procuração quando o solicitante não é o titular da unidade consumidora.',
          'Aterramento fora das normas da ABNT NBR 5410, identificado durante a vistoria.',
          'Não acompanhar os prazos regulatórios, perdendo janelas de resposta da concessionária.',
        ],
      },
    ],
  },
  {
    id: 'homologa-plus',
    title: 'Como o Homologa Plus Automatiza Cada Etapa',
    panel: true,
    blocks: [
      { kind: 'p', text: 'O Homologa Plus foi desenvolvido por profissionais do setor de energia solar que viviam diariamente os desafios da homologação. A plataforma centraliza todo o fluxo de trabalho em um único ambiente digital, eliminando planilhas desorganizadas, mensagens perdidas no WhatsApp e o risco de perder prazos regulatórios.' },
      { kind: 'p', text: 'Com o Homologa Plus, cada projeto possui um painel de acompanhamento em tempo real onde você visualiza a etapa atual, os documentos pendentes e os prazos de cada concessionária. O sistema envia alertas automáticos quando um prazo está se aproximando e permite que seu cliente acompanhe o status da homologação sem precisar ligar ou mandar mensagem.' },
      { kind: 'p', text: 'Além disso, a plataforma oferece modelos de documentos pré-configurados para as principais concessionárias do Brasil, reduzindo o tempo de preparação da documentação e minimizando erros de preenchimento. O resultado é uma operação mais eficiente, com menos retrabalho e clientes mais satisfeitos.' },
    ],
  },
];

const ComoHomologarEnergiaSolar = () => (
  <GuiaPage
    path="/como-homologar-energia-solar"
    meta={{
      title: 'Como Homologar Energia Solar Passo a Passo | Homologa Plus',
      description: 'Aprenda como homologar sistemas de energia solar junto às concessionárias. Passo a passo detalhado com documentos, prazos e dicas para aprovação rápida.',
    }}
    title="Como Homologar Energia Solar: Passo a Passo Completo"
    lede="A homologação de um sistema fotovoltaico junto à concessionária de energia é uma das etapas mais importantes e, ao mesmo tempo, mais burocráticas de qualquer projeto solar. Sem ela, o sistema instalado no telhado do cliente simplesmente não pode injetar energia na rede e gerar os créditos que tornam o investimento viável. Neste guia, você vai entender cada etapa do processo, os documentos necessários, os prazos envolvidos e como evitar os erros mais comuns que atrasam a aprovação."
    sections={sections}
    cta={{
      title: 'Pare de Perder Tempo com Homologações Manuais',
      text: 'Organize seus projetos, acompanhe prazos e dê visibilidade aos seus clientes com o Homologa Plus. Agende uma demonstração: nossa equipe fala com você pelo WhatsApp.',
    }}
  />
);

export default ComoHomologarEnergiaSolar;
