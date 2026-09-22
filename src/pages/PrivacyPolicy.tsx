import React from 'react';
import GuiaPage, { type GuiaSection } from './seo/guia/GuiaPage';

const Email = ({ to }: { to: string }) => <a className="guia__link" href={`mailto:${to}`}>{to}</a>;

const sections: GuiaSection[] = [
  {
    id: 'controlador',
    title: '1. Quem é o controlador dos seus dados',
    blocks: [{
      kind: 'p',
      text: <>O Homologa Plus, inscrito no CNPJ nº 68.835.775/0001-10, com sede em Bauru/SP, é o controlador dos dados pessoais tratados neste site, nos termos da Lei nº 13.709/2018 (LGPD). Para qualquer assunto relacionado à privacidade e proteção de dados, fale com nosso Encarregado (DPO) pelo e-mail{' '}<Email to="privacidade@homologaplus.com.br" />. Para outros assuntos:{' '}<Email to="contato@homologaplus.com.br" />.</>,
    }],
  },
  {
    id: 'dados-coletados',
    title: '2. Quais dados coletamos',
    blocks: [{
      kind: 'checklist',
      items: [
        <><strong>Dados de navegação e cookies:</strong> ao aceitar, coletamos identificadores de cookies, endereço IP, páginas visitadas e eventos de interação, por meio de ferramentas de análise e de marketing (ver seção "Cookies").</>,
        <><strong>Dados de contato que você nos envia:</strong> ao nos chamar pelo WhatsApp ou por e-mail, você nos fornece dados como nome, telefone/WhatsApp, e-mail e o conteúdo da sua mensagem.</>,
        <><strong>Dados de origem:</strong> parâmetros de campanha (UTMs) e a página de referência, quando presentes no link de acesso.</>,
      ],
    }],
  },
  {
    id: 'finalidades',
    title: '3. Para que usamos (finalidades) e com que base legal',
    blocks: [{
      kind: 'table',
      head: ['Tratamento', 'Finalidade', 'Base legal (LGPD)'],
      rows: [
        ['Cookies de marketing (Meta Pixel)', 'Medir campanhas e exibir anúncios', <><strong>Consentimento</strong>: art. 7º, I</>],
        ['Cookies analíticos (Vercel Speed Insights)', 'Medir desempenho e melhorar o site', <><strong>Consentimento</strong> / legítimo interesse: art. 7º, I / IX</>],
        ['Atendimento via WhatsApp/e-mail', 'Responder e conduzir a contratação do serviço', <><strong>Procedimentos preliminares ao contrato</strong>: art. 7º, V; e/ou <strong>consentimento</strong>: art. 7º, I</>],
        ['Cookies estritamente necessários', 'Fazer o site funcionar', <><strong>Legítimo interesse</strong>: art. 7º, IX</>],
      ],
    }],
  },
  {
    id: 'compartilhamento',
    title: '4. Com quem compartilhamos',
    blocks: [
      { kind: 'p', text: 'Não vendemos seus dados. Compartilhamos com operadores e parceiros estritamente para as finalidades acima:' },
      {
        kind: 'checklist',
        items: [
          <><strong>Meta Platforms, Inc.</strong>: Meta Pixel e WhatsApp (rastreamento de marketing e canal de atendimento).</>,
          <><strong>Vercel Inc.</strong>: hospedagem e telemetria de desempenho (Speed Insights).</>,
          <><strong>Supabase Inc.</strong> e <strong>Resend Inc.</strong>: armazenamento e envio de e-mails, quando aplicável a solicitações recebidas.</>,
          <><strong>Concessionárias de energia e órgãos reguladores</strong>: apenas quando necessário à execução de serviços de homologação contratados.</>,
        ],
      },
    ],
  },
  {
    id: 'whatsapp',
    title: '5. Atendimento pelo WhatsApp',
    blocks: [{ kind: 'p', text: 'Nossos botões de contato levam ao WhatsApp, serviço operado pela Meta. Ao iniciar a conversa, seu número e o conteúdo das mensagens são tratados também segundo a política de privacidade do WhatsApp/Meta.' }],
  },
  {
    id: 'direitos',
    title: '6. Seus direitos como titular (art. 18 da LGPD)',
    blocks: [{
      kind: 'p',
      text: <>Você pode, a qualquer momento: confirmar a existência de tratamento; acessar seus dados; corrigir dados incompletos ou desatualizados; solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade; solicitar a portabilidade; obter informação sobre com quem compartilhamos; ser informado sobre a possibilidade de não consentir; <strong>revogar o consentimento</strong>; e peticionar perante a ANPD. Para exercer qualquer direito, escreva para{' '}<Email to="privacidade@homologaplus.com.br" />.</>,
    }],
  },
  {
    id: 'cookies',
    title: '7. Cookies e como recusar',
    blocks: [{
      kind: 'p',
      text: (
        <>
          Usamos três categorias de cookies: <strong>necessários</strong> (sempre ativos),
          <strong> analíticos</strong> e <strong>de marketing</strong>.
          Cookies analíticos e de marketing só são ativados <strong>após o seu consentimento</strong>
          {' '}no banner exibido na primeira visita. Você pode <strong>aceitar, recusar ou personalizar</strong>
          {' '}as categorias a qualquer momento pelo botão{' '}
          <button
            type="button"
            className="guia__link"
            onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
          >
            "Preferências de cookies"
          </button>
          {' '}no rodapé. Recusar é tão simples quanto aceitar.
        </>
      ),
    }],
  },
  {
    id: 'transferencia',
    title: '8. Transferência internacional de dados',
    blocks: [{ kind: 'p', text: 'Os parceiros acima (Meta, Vercel, WhatsApp, Supabase, Resend) processam dados em servidores fora do Brasil, inclusive nos Estados Unidos. Essas transferências ocorrem com base nas hipóteses do art. 33 da LGPD e nas salvaguardas contratuais desses fornecedores.' }],
  },
  {
    id: 'retencao',
    title: '9. Por quanto tempo guardamos',
    blocks: [{ kind: 'p', text: 'Mantemos os dados apenas pelo tempo necessário às finalidades informadas ou por obrigação legal. Dados de contato de quem não se torna cliente são eliminados ou anonimizados quando cessa a finalidade. Você pode pedir a eliminação antecipada pelo canal do Encarregado.' }],
  },
  {
    id: 'seguranca',
    title: '10. Segurança',
    blocks: [{ kind: 'p', text: 'Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.' }],
  },
  {
    id: 'encarregado',
    title: '11. Encarregado (DPO) e alterações',
    blocks: [{
      kind: 'p',
      text: <>Encarregado pelo tratamento de dados:{' '}<Email to="privacidade@homologaplus.com.br" />. Podemos atualizar esta política; a data de "Última atualização" no topo indica a versão vigente.</>,
    }],
  },
];

const PrivacyPolicy = () => (
  <GuiaPage
    path="/privacidade"
    meta={{
      title: 'Política de Privacidade | Homologa Plus',
      description: 'Saiba como o Homologa Plus trata seus dados pessoais: controlador, bases legais, cookies, terceiros, transferência internacional e seus direitos sob a LGPD.',
      og: false,
    }}
    crumb="Institucional"
    title="Política de Privacidade"
    updated="Última atualização: 04/09/2026"
    sections={sections}
    related={false}
  />
);

export default PrivacyPolicy;
