import React from 'react';
import GuiaPage, { type GuiaSection } from './guia/GuiaPage';

const sections: GuiaSection[] = [
  {
    id: 'por-que',
    title: 'Por Que a Documentação Correta é Crucial?',
    blocks: [
      { kind: 'p', text: 'Segundo dados do setor, aproximadamente 30% dos pedidos de homologação são reprovados na primeira tentativa por problemas documentais. Isso representa um custo oculto enorme para empresas integradoras: horas de trabalho administrativo, ligações para concessionárias, reenvio de formulários e, principalmente, clientes insatisfeitos que não entendem por que seu sistema solar ainda não está gerando créditos de energia.' },
      { kind: 'p', text: 'A documentação correta desde o início do processo não é apenas uma questão burocrática: é uma questão de eficiência operacional e credibilidade profissional. Um integrador que domina a parte documental transmite confiança e entrega resultados mais rápidos. Cada concessionária possui suas particularidades, mas existe um conjunto base de documentos que é exigido em praticamente todas as distribuidoras do Brasil.' },
      { kind: 'p', text: 'A seguir, apresentamos a lista completa dividida por categorias para facilitar sua organização.' },
    ],
  },
  {
    id: 'titular',
    title: 'Documentos do Titular / Proprietário',
    blocks: [
      { kind: 'p', text: 'Os documentos pessoais do titular da unidade consumidora são a base de qualquer solicitação de acesso. Eles comprovam a identidade e a titularidade sobre a conta de energia onde o sistema será conectado.' },
      {
        kind: 'checklist',
        items: [
          <><strong>RG e CPF do titular</strong>: cópias legíveis do documento de identidade e CPF. Para pessoa jurídica, utiliza-se o CNPJ, contrato social e documento do representante legal.</>,
          <><strong>Conta de energia recente</strong>: a fatura mais recente da unidade consumidora, com no máximo 90 dias, que comprova o vínculo entre o titular e o ponto de conexão. Algumas concessionárias exigem as três últimas faturas.</>,
          <><strong>Procuração</strong>: quando o integrador atua como representante do titular, é necessária uma procuração assinada autorizando a empresa a protocolar o pedido junto à concessionária. Algumas distribuidoras exigem firma reconhecida em cartório.</>,
          <><strong>Comprovante de propriedade ou autorização</strong>: em caso de imóvel alugado, autorização do proprietário para instalação do sistema fotovoltaico.</>,
        ],
      },
    ],
  },
  {
    id: 'tecnicos',
    title: 'Documentos Técnicos do Projeto',
    blocks: [
      { kind: 'p', text: 'A parte técnica do projeto é avaliada com rigor pela concessionária. Qualquer inconsistência entre os documentos ou entre o projeto e a instalação real pode resultar em reprovação na vistoria. Certifique-se de que todos os dados estejam coerentes.' },
      {
        kind: 'checklist',
        items: [
          <><strong>Memorial descritivo</strong>: documento que detalha as características do sistema: potência total, quantidade e modelo dos módulos, tipo e modelo do inversor, tipo de conexão (monofásica, bifásica ou trifásica), coordenadas geográficas e orientação dos painéis.</>,
          <><strong>Diagrama unifilar</strong>: representação gráfica simplificada do circuito elétrico do sistema, mostrando a conexão entre os módulos, inversor(es), proteções (disjuntores, DPS, fusíveis), medidor bidirecional e o quadro de distribuição. Deve seguir as normas ABNT NBR 5410 e NBR 16690.</>,
          <><strong>ART ou RRT</strong>: a Anotação de Responsabilidade Técnica (para engenheiros) ou Registro de Responsabilidade Técnica (para técnicos) é obrigatória. Deve ser emitida por profissional habilitado e registrada no CREA ou CAU. Este documento atesta que o projeto foi elaborado por profissional competente e se responsabiliza pela segurança da instalação.</>,
          <><strong>Projeto elétrico completo</strong>: algumas concessionárias exigem o projeto elétrico detalhado, incluindo layout dos módulos no telhado, dimensionamento de cabos, cálculos de proteção e memorial de cálculo.</>,
        ],
      },
    ],
  },
  {
    id: 'equipamentos',
    title: 'Documentos dos Equipamentos',
    blocks: [
      { kind: 'p', text: 'A concessionária precisa verificar se os equipamentos utilizados atendem às normas técnicas brasileiras e possuem certificação válida. Equipamentos sem certificação INMETRO válida são motivo imediato de reprovação.' },
      {
        kind: 'checklist',
        items: [
          <><strong>Datasheet dos módulos fotovoltaicos</strong>: ficha técnica do fabricante contendo potência nominal, tensão de circuito aberto (Voc), corrente de curto-circuito (Isc), eficiência, dimensões e peso do módulo. O modelo deve coincidir exatamente com o informado no memorial descritivo.</>,
          <><strong>Datasheet do inversor</strong>: ficha técnica contendo potência nominal, faixa de tensão MPPT, corrente máxima de entrada, tensão e corrente de saída, frequência de operação e funcionalidades de proteção anti-ilhamento.</>,
          <><strong>Certificados INMETRO</strong>: tanto os módulos quanto os inversores devem possuir certificação INMETRO válida e vigente. Verifique a validade no site oficial do INMETRO, pois certificados vencidos invalidam o pedido de homologação.</>,
          <><strong>Nota fiscal dos equipamentos</strong>: algumas concessionárias solicitam a nota fiscal de compra dos módulos e inversores para verificar procedência e modelo.</>,
        ],
      },
    ],
  },
  {
    id: 'formularios',
    title: 'Formulários da Concessionária',
    blocks: [
      { kind: 'p', text: 'Cada concessionária possui seus próprios formulários padronizados. Embora o formato varie, as informações solicitadas são semelhantes. É fundamental preencher cada campo com atenção, pois erros de preenchimento são uma das causas mais frequentes de devolução de processos.' },
      {
        kind: 'checklist',
        items: [
          <><strong>Formulário de Solicitação de Acesso</strong>: documento principal que formaliza o pedido de conexão da microgeração ou minigeração distribuída à rede. Contém dados do titular, endereço da instalação, características do sistema e dados do responsável técnico.</>,
          <><strong>Formulário de vistoria</strong>: após a instalação, algumas concessionárias exigem o preenchimento de um formulário específico para agendar a vistoria técnica.</>,
          <><strong>Relatório fotográfico</strong>: registro fotográfico da instalação finalizada, incluindo fotos dos módulos instalados, inversor, quadro de proteção, aterramento, etiquetas de identificação e medidor.</>,
        ],
      },
    ],
  },
  {
    id: 'checklist',
    title: 'Checklist Completo por Categoria',
    blocks: [
      {
        kind: 'groups',
        groups: [
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
        ],
      },
    ],
  },
  {
    id: 'erros-comuns',
    title: 'Erros Comuns na Documentação',
    blocks: [
      { kind: 'p', text: 'Conhecer os erros mais frequentes permite evitá-los antes mesmo de protocolar o pedido. Veja os problemas que mais causam reprovação:' },
      {
        kind: 'numbered',
        items: [
          <><strong>Dados divergentes entre documentos</strong>: o nome do titular na procuração deve ser idêntico ao da conta de energia e do formulário de solicitação. Divergências simples como abreviações ou acentos diferentes já podem causar devolução.</>,
          <><strong>ART/RRT não registrada ou vencida</strong>: a ART ou RRT deve estar devidamente registrada no conselho profissional. Uma ART sem pagamento da guia não é considerada válida.</>,
          <><strong>Modelo do equipamento diferente do datasheet</strong>: se o memorial descritivo menciona um modelo de módulo ou inversor e o datasheet anexado é de outro modelo, o pedido será reprovado. Confira modelo e versão com atenção.</>,
          <><strong>Certificado INMETRO vencido</strong>: certificações têm prazo de validade. Antes de protocolar, verifique se a certificação dos equipamentos ainda está vigente consultando o portal do INMETRO.</>,
          <><strong>Diagrama unifilar incompleto</strong>: omitir proteções, não especificar valores de disjuntores ou não incluir o aterramento no diagrama são erros que resultam em solicitação de correção.</>,
          <><strong>Conta de energia vencida</strong>: enviar uma fatura com mais de 90 dias é motivo de devolução imediata em diversas concessionárias.</>,
        ],
      },
    ],
  },
  {
    id: 'dicas',
    title: 'Dicas para Organizar Seus Documentos',
    blocks: [
      { kind: 'p', text: 'Manter a documentação organizada desde o início do projeto economiza tempo e reduz drasticamente a chance de reprovação. Aqui estão práticas recomendadas que os melhores integradores do mercado já adotam:' },
      {
        kind: 'checklist',
        items: [
          <><strong>Crie pastas padronizadas</strong>: estabeleça uma estrutura de pastas fixa para cada projeto: Pessoais, Técnicos, Equipamentos e Formulários. Assim, qualquer membro da equipe sabe exatamente onde encontrar cada documento.</>,
          <><strong>Digitalize com qualidade</strong>: documentos ilegíveis são devolvidos. Utilize aplicativos de scanner que corrigem perspectiva e melhoram contraste. Salve sempre em PDF com resolução adequada.</>,
          <><strong>Revise antes de enviar</strong>: faça uma conferência cruzada, verifique se nomes, números de documentos e modelos de equipamentos estão consistentes em todos os formulários e documentos técnicos.</>,
          <><strong>Mantenha versões atualizadas</strong>: se houve alteração de projeto, atualize todos os documentos afetados. Enviar um diagrama unifilar desatualizado enquanto o memorial descritivo reflete o novo projeto é garantia de reprovação.</>,
          <><strong>Use nomenclatura clara nos arquivos</strong>: nomeie os arquivos de forma descritiva, como "ART_Projeto_12345_JoaoSilva.pdf" em vez de "documento_final_v2.pdf". Isso facilita a localização e evita confusões.</>,
        ],
      },
    ],
  },
  {
    id: 'homologa-plus',
    title: 'Como o Homologa Plus Centraliza Toda a Documentação',
    panel: true,
    blocks: [
      { kind: 'p', text: 'Gerenciar documentação de homologação em pastas no computador, e-mails e grupos de WhatsApp é uma receita para o caos. O Homologa Plus foi criado justamente para resolver esse problema, oferecendo um ambiente centralizado e organizado para toda a documentação de cada projeto.' },
      { kind: 'p', text: 'Com o Homologa Plus, cada projeto possui sua própria área de documentos, organizada por categoria. Você sabe exatamente quais documentos já foram enviados, quais estão pendentes e quais precisam de atualização. Seu cliente também acompanha o status em tempo real, eliminando aquelas dezenas de mensagens diárias perguntando "como está meu processo?".' },
      { kind: 'p', text: 'Além da organização documental, a plataforma oferece acompanhamento completo do fluxo de homologação, desde a solicitação de acesso até a troca do medidor e ativação do sistema. Tudo em um único lugar, acessível de qualquer dispositivo, com histórico completo de cada etapa.' },
      { kind: 'p', text: 'Para empresas integradoras que lidam com dezenas ou centenas de projetos simultaneamente, ter essa visibilidade centralizada significa menos erros, menos retrabalho e mais projetos concluídos por mês.' },
    ],
  },
];

const DocumentosHomologacao = () => (
  <GuiaPage
    path="/documentos-homologacao-fotovoltaica"
    meta={{
      title: 'Documentos para Homologação Fotovoltaica: Lista Completa | Homologa Plus',
      description: 'Lista completa de documentos necessários para homologação de sistemas fotovoltaicos. Checklist prático para não esquecer nenhum documento e evitar reprovação.',
    }}
    title="Documentos para Homologação Fotovoltaica: Lista Completa e Atualizada"
    lede="A homologação de um sistema fotovoltaico junto à concessionária de energia é uma das etapas mais importantes (e também uma das que mais geram retrabalho) em um projeto de energia solar. A falta de um único documento pode significar semanas de atraso, reprovação do pedido e frustração tanto para o integrador quanto para o cliente final. Neste guia, reunimos todos os documentos necessários, organizados por categoria, para que você nunca mais perca tempo com pendências documentais."
    sections={sections}
    cta={{
      title: 'Organize Seus Documentos de Homologação Agora',
      text: 'Pare de perder tempo com documentação desorganizada e reprovações evitáveis. Agende uma demonstração e veja como a gestão documental pode ser simples.',
      note: 'Acesso liberado pela nossa equipe.',
    }}
  />
);

export default DocumentosHomologacao;
