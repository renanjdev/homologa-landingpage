import React from 'react';
import { Reveal } from '../lib/anim';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Política de Privacidade | Homologa Plus</title>
        <meta name="description" content="Saiba como o Homologa Plus trata seus dados pessoais: controlador, bases legais, cookies, terceiros, transferência internacional e seus direitos sob a LGPD." />
        <link rel="canonical" href="https://homologaplus.com.br/privacidade" />
      </Helmet>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo-h.png" alt="Homologa Plus" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Homologa <span className="text-bright-sky font-medium">Plus</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar para Home</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <Reveal
          as="div"
          y={20}
          trigger="mount"
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Política de Privacidade</h1>
          <p className="mb-8 font-mono text-[13px] uppercase tracking-[0.14em] text-slate-500">
            Última atualização: 04/09/2026
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Quem é o controlador dos seus dados</h2>
              <p>
                O Homologa Plus, inscrito no CNPJ nº 68.835.775/0001-10, com sede em Bauru/SP, é o
                controlador dos dados pessoais tratados neste site, nos termos da Lei nº 13.709/2018
                (LGPD). Para qualquer assunto relacionado à privacidade e proteção de dados, fale com
                nosso Encarregado (DPO) pelo e-mail{' '}
                <a href="mailto:privacidade@homologaplus.com.br" className="font-semibold text-action hover:text-action-dark">privacidade@homologaplus.com.br</a>.
                Para outros assuntos:{' '}
                <a href="mailto:contato@homologaplus.com.br" className="font-semibold text-action hover:text-action-dark">contato@homologaplus.com.br</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Quais dados coletamos</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li><strong className="font-semibold text-slate-800">Dados de navegação e cookies:</strong> ao aceitar, coletamos identificadores de cookies, endereço IP, páginas visitadas e eventos de interação, por meio de ferramentas de análise e de marketing (ver seção "Cookies").</li>
                <li><strong className="font-semibold text-slate-800">Dados de contato que você nos envia:</strong> ao nos chamar pelo WhatsApp ou por e-mail, você nos fornece dados como nome, telefone/WhatsApp, e-mail e o conteúdo da sua mensagem.</li>
                <li><strong className="font-semibold text-slate-800">Dados de origem:</strong> parâmetros de campanha (UTMs) e a página de referência, quando presentes no link de acesso.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Para que usamos (finalidades) e com que base legal</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="py-2 pr-4 font-semibold text-slate-800">Tratamento</th>
                      <th className="py-2 pr-4 font-semibold text-slate-800">Finalidade</th>
                      <th className="py-2 font-semibold text-slate-800">Base legal (LGPD)</th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Cookies de marketing (Meta Pixel)</td>
                      <td className="py-3 pr-4">Medir campanhas e exibir anúncios</td>
                      <td className="py-3"><strong className="font-semibold text-slate-800">Consentimento</strong> — art. 7º, I</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Cookies analíticos (Vercel Speed Insights)</td>
                      <td className="py-3 pr-4">Medir desempenho e melhorar o site</td>
                      <td className="py-3"><strong className="font-semibold text-slate-800">Consentimento</strong> / legítimo interesse — art. 7º, I / IX</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Atendimento via WhatsApp/e-mail</td>
                      <td className="py-3 pr-4">Responder e conduzir a contratação do serviço</td>
                      <td className="py-3"><strong className="font-semibold text-slate-800">Procedimentos preliminares ao contrato</strong> — art. 7º, V; e/ou <strong className="font-semibold text-slate-800">consentimento</strong> — art. 7º, I</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Cookies estritamente necessários</td>
                      <td className="py-3 pr-4">Fazer o site funcionar</td>
                      <td className="py-3"><strong className="font-semibold text-slate-800">Legítimo interesse</strong> — art. 7º, IX</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Com quem compartilhamos</h2>
              <p className="mb-3">Não vendemos seus dados. Compartilhamos com operadores e parceiros estritamente para as finalidades acima:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><strong className="font-semibold text-slate-800">Meta Platforms, Inc.</strong> — Meta Pixel e WhatsApp (rastreamento de marketing e canal de atendimento).</li>
                <li><strong className="font-semibold text-slate-800">Vercel Inc.</strong> — hospedagem e telemetria de desempenho (Speed Insights).</li>
                <li><strong className="font-semibold text-slate-800">Supabase Inc.</strong> e <strong className="font-semibold text-slate-800">Resend Inc.</strong> — armazenamento e envio de e-mails, quando aplicável a solicitações recebidas.</li>
                <li><strong className="font-semibold text-slate-800">Concessionárias de energia e órgãos reguladores</strong> — apenas quando necessário à execução de serviços de homologação contratados.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Atendimento pelo WhatsApp</h2>
              <p>Nossos botões de contato levam ao WhatsApp, serviço operado pela Meta. Ao iniciar a conversa, seu número e o conteúdo das mensagens são tratados também segundo a política de privacidade do WhatsApp/Meta.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Seus direitos como titular (art. 18 da LGPD)</h2>
              <p>
                Você pode, a qualquer momento: confirmar a existência de tratamento; acessar seus dados;
                corrigir dados incompletos ou desatualizados; solicitar anonimização, bloqueio ou
                eliminação de dados desnecessários ou tratados em desconformidade; solicitar a
                portabilidade; obter informação sobre com quem compartilhamos; ser informado sobre a
                possibilidade de não consentir; <strong className="font-semibold text-slate-800">revogar o consentimento</strong>;
                e peticionar perante a ANPD. Para exercer qualquer direito, escreva para{' '}
                <a href="mailto:privacidade@homologaplus.com.br" className="font-semibold text-action hover:text-action-dark">privacidade@homologaplus.com.br</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Cookies e como recusar</h2>
              <p>
                Usamos três categorias de cookies: <strong className="font-semibold text-slate-800">necessários</strong> (sempre ativos),
                <strong className="font-semibold text-slate-800"> analíticos</strong> e <strong className="font-semibold text-slate-800">de marketing</strong>.
                Cookies analíticos e de marketing só são ativados <strong className="font-semibold text-slate-800">após o seu consentimento</strong>
                {' '}no banner exibido na primeira visita. Você pode <strong className="font-semibold text-slate-800">aceitar, recusar ou personalizar</strong>
                {' '}as categorias a qualquer momento pelo botão{' '}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
                  className="inline font-semibold text-action underline underline-offset-2 hover:text-action-dark"
                >
                  "Preferências de cookies"
                </button>
                {' '}no rodapé. Recusar é tão simples quanto aceitar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Transferência internacional de dados</h2>
              <p>Os parceiros acima (Meta, Vercel, WhatsApp, Supabase, Resend) processam dados em servidores fora do Brasil, inclusive nos Estados Unidos. Essas transferências ocorrem com base nas hipóteses do art. 33 da LGPD e nas salvaguardas contratuais desses fornecedores.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Por quanto tempo guardamos</h2>
              <p>Mantemos os dados apenas pelo tempo necessário às finalidades informadas ou por obrigação legal. Dados de contato de quem não se torna cliente são eliminados ou anonimizados quando cessa a finalidade. Você pode pedir a eliminação antecipada pelo canal do Encarregado.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">10. Segurança</h2>
              <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">11. Encarregado (DPO) e alterações</h2>
              <p>
                Encarregado pelo tratamento de dados:{' '}
                <a href="mailto:privacidade@homologaplus.com.br" className="font-semibold text-action hover:text-action-dark">privacidade@homologaplus.com.br</a>.
                Podemos atualizar esta política; a data de "Última atualização" no topo indica a versão vigente.
              </p>
            </section>
          </div>
        </Reveal>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2026 Homologa Plus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
