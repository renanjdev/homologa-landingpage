import React from 'react';
import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-primary p-1.5 rounded-xl">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-slate-900">
                HOMOLOGA <span className="text-primary">Plus</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-8">
              A plataforma definitiva para gestão de homologação de usinas fotovoltaicas. Profissionalize sua empresa e escale seus resultados.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#problema" className="hover:text-primary transition-colors">O Problema</a></li>
              <li><a href="#solucao" className="hover:text-primary transition-colors">Solução</a></li>
              <li><a href="#planos" className="hover:text-primary transition-colors">Planos</a></li>
              <li><a href="https://app.homologaplus.com.br/login" className="hover:text-primary transition-colors">Acessar Sistema</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contato</h4>
            <ul className="space-y-4 text-slate-500">
              <li>contato@homologaplus.com.br</li>
              <li>(14) 99127-3245</li>
              <li>Bauru - SP</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} HOMOLOGA Plus. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <Link to="/admin" className="hover:text-slate-600">Admin</Link>
            <Link to="/termos" className="hover:text-slate-600">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-slate-600">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
