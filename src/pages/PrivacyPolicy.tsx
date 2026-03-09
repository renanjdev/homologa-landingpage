import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
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
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Política de Privacidade</h1>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Coleta de Informações</h2>
              <p>Coletamos informações necessárias para o processo de homologação, incluindo dados pessoais, documentos técnicos e informações de contato fornecidas voluntariamente por você.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Uso dos Dados</h2>
              <p>Seus dados são utilizados exclusivamente para a finalidade de gerir seus processos de homologação, comunicação sobre o status dos pedidos e melhoria da nossa plataforma.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Compartilhamento de Informações</h2>
              <p>Não vendemos ou alugamos seus dados para terceiros. O compartilhamento ocorre apenas com concessionárias de energia e órgãos reguladores necessários para a conclusão do seu processo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Segurança</h2>
              <p>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Seus Direitos</h2>
              <p>Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento, conforme previsto na Lei Geral de Proteção de Dados (LGPD).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Cookies</h2>
              <p>Utilizamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site. Você pode gerenciar as preferências de cookies em seu navegador.</p>
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

export default PrivacyPolicy;
