import React from 'react';
import { Link } from 'react-router-dom';
import GuiaPage, { type GuiaSection } from './seo/guia/GuiaPage';

const sections: GuiaSection[] = [
  {
    id: 'aceitacao',
    title: '1. Aceitação dos Termos',
    blocks: [{ kind: 'p', text: 'Ao acessar e usar o Homologa Plus, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.' }],
  },
  {
    id: 'servico',
    title: '2. Descrição do Serviço',
    blocks: [{ kind: 'p', text: 'O Homologa Plus é uma plataforma de gestão e automação de processos de homologação de energia solar junto às concessionárias de energia elétrica.' }],
  },
  {
    id: 'responsabilidades',
    title: '3. Responsabilidades do Usuário',
    blocks: [{ kind: 'p', text: 'O usuário é responsável por fornecer informações precisas e verídicas em todos os processos. O uso indevido da plataforma ou a tentativa de burlar sistemas de segurança resultará na suspensão imediata da conta.' }],
  },
  {
    id: 'propriedade-intelectual',
    title: '4. Propriedade Intelectual',
    blocks: [{ kind: 'p', text: 'Todo o conteúdo, design e tecnologia do Homologa Plus são de propriedade exclusiva da nossa empresa e protegidos por leis de direitos autorais.' }],
  },
  {
    id: 'limitacao',
    title: '5. Limitação de Responsabilidade',
    blocks: [{ kind: 'p', text: 'Embora nos esforcemos para manter a plataforma sempre disponível e precisa, não garantimos que o serviço será ininterrupto ou livre de erros. Não nos responsabilizamos por decisões tomadas pelas concessionárias de energia.' }],
  },
  {
    id: 'alteracoes',
    title: '6. Alterações nos Termos',
    blocks: [{ kind: 'p', text: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso continuado da plataforma após tais alterações constitui sua aceitação dos novos termos.' }],
  },
  {
    id: 'dados-pessoais',
    title: '7. Proteção de Dados Pessoais',
    blocks: [{
      kind: 'p',
      text: <>O tratamento de dados pessoais relacionado ao uso do site e da plataforma segue a nossa{' '}<Link className="guia__link" to="/privacidade">Política de Privacidade</Link>, parte integrante destes Termos.</>,
    }],
  },
  {
    id: 'legislacao',
    title: '8. Legislação Aplicável e Foro',
    blocks: [{ kind: 'p', text: 'Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Bauru/SP para dirimir quaisquer controvérsias, salvo disposição legal em contrário aplicável ao consumidor.' }],
  },
];

const TermsOfUse = () => (
  <GuiaPage
    path="/termos"
    meta={{
      title: 'Termos de Uso | Homologa Plus',
      description: 'Leia os termos de uso da plataforma Homologa Plus. Entenda suas responsabilidades e nossos compromissos com a automação e gestão da homologação solar.',
      og: false,
    }}
    crumb="Institucional"
    title="Termos de Uso"
    lede={<>Estes Termos regem o uso do site e da plataforma Homologa Plus, operados por Homologa Plus, CNPJ nº 68.835.775/0001-10, com sede em Bauru/SP. Contato:{' '}<a className="guia__link" href="mailto:contato@homologaplus.com.br">contato@homologaplus.com.br</a>.</>}
    sections={sections}
    related={false}
  />
);

export default TermsOfUse;
