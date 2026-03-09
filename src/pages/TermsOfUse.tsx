import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Termos de Uso | HOMOLOGA Plus</title>
        <meta name="description" content="Leia os termos de uso da plataforma HOMOLOGA Plus. Entenda suas responsabilidades e nossos compromissos com a gestão de homologação solar." />
        <link rel="canonical" href="https://ais-pre-mugp3ltyrxmavzsrbd7ya7-203218294417.us-east1.run.app/termos" />
      </Helmet>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sun className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">HOMOLOGA <span className="text-primary">Plus</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar para Home</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Termos de Uso</h1>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar e usar o HOMOLOGA Plus, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Descrição do Serviço</h2>
              <p>O HOMOLOGA Plus é uma plataforma de gestão e automação de processos de homologação de energia solar junto às concessionárias de energia elétrica.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Responsabilidades do Usuário</h2>
              <p>O usuário é responsável por fornecer informações precisas e verídicas em todos os processos. O uso indevido da plataforma ou a tentativa de burlar sistemas de segurança resultará na suspensão imediata da conta.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Propriedade Intelectual</h2>
              <p>Todo o conteúdo, design e tecnologia do HOMOLOGA Plus são de propriedade exclusiva da nossa empresa e protegidos por leis de direitos autorais.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Limitação de Responsabilidade</h2>
              <p>Embora nos esforcemos para manter a plataforma sempre disponível e precisa, não garantimos que o serviço será ininterrupto ou livre de erros. Não nos responsabilizamos por decisões tomadas pelas concessionárias de energia.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Alterações nos Termos</h2>
              <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso continuado da plataforma após tais alterações constitui sua aceitação dos novos termos.</p>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2026 HOMOLOGA Plus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfUse;
