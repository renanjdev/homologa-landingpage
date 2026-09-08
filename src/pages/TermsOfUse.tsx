import React from 'react';
import { Reveal } from '../lib/anim';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-void font-sans text-mist">
      <Helmet>
        <title>Termos de Uso | Homologa Plus</title>
        <meta name="description" content="Leia os termos de uso da plataforma Homologa Plus. Entenda suas responsabilidades e nossos compromissos com a gestão de homologação solar." />
        <link rel="canonical" href="https://homologaplus.com.br/termos" />
      </Helmet>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo-h-white.png" alt="Homologa Plus" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-white">Homologa <span className="text-coral font-medium">Plus</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-ash hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
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
          className="max-w-3xl mx-auto bg-obsidian rounded-3xl p-8 md:p-12 shadow-[var(--key-soft)] border border-white/10"
        >
          <h1 className="text-4xl font-bold mb-6 text-white">Termos de Uso</h1>

          <p className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-ash leading-relaxed shadow-[var(--key-soft)]">
            Estes Termos regem o uso do site e da plataforma Homologa Plus, operados por Homologa Plus,
            CNPJ nº 68.835.775/0001-10, com sede em Bauru/SP. Contato:{' '}
            <a href="mailto:contato@homologaplus.com.br" className="font-semibold text-coral underline underline-offset-2 hover:text-white">contato@homologaplus.com.br</a>.
          </p>

          <div className="space-y-6 text-ash leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar e usar o Homologa Plus, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Descrição do Serviço</h2>
              <p>O Homologa Plus é uma plataforma de gestão e automação de processos de homologação de energia solar junto às concessionárias de energia elétrica.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Responsabilidades do Usuário</h2>
              <p>O usuário é responsável por fornecer informações precisas e verídicas em todos os processos. O uso indevido da plataforma ou a tentativa de burlar sistemas de segurança resultará na suspensão imediata da conta.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Propriedade Intelectual</h2>
              <p>Todo o conteúdo, design e tecnologia do Homologa Plus são de propriedade exclusiva da nossa empresa e protegidos por leis de direitos autorais.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Limitação de Responsabilidade</h2>
              <p>Embora nos esforcemos para manter a plataforma sempre disponível e precisa, não garantimos que o serviço será ininterrupto ou livre de erros. Não nos responsabilizamos por decisões tomadas pelas concessionárias de energia.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Alterações nos Termos</h2>
              <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso continuado da plataforma após tais alterações constitui sua aceitação dos novos termos.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Proteção de Dados Pessoais</h2>
              <p>
                O tratamento de dados pessoais relacionado ao uso do site e da plataforma segue a nossa{' '}
                <Link to="/privacidade" className="font-semibold text-coral underline underline-offset-2 hover:text-white">Política de Privacidade</Link>,
                parte integrante destes Termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Legislação Aplicável e Foro</h2>
              <p>Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Bauru/SP para dirimir quaisquer controvérsias, salvo disposição legal em contrário aplicável ao consumidor.</p>
            </section>
          </div>
        </Reveal>
      </main>

      <footer className="bg-void border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-smoke text-sm">
          <p>© 2026 Homologa Plus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfUse;
