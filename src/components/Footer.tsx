import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2">
            <Link to="/" className="flex items-center gap-2 min-h-[44px] mb-6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/logo-h.png" alt="Homologa Plus" width={36} height={36} className="w-9 h-9" />
              <span className="text-xl font-bold text-slate-900">
                Homologa <span className="text-bright-sky font-medium">Plus</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-8">
              A plataforma definitiva para gestão de homologação de usinas fotovoltaicas. Profissionalize sua empresa e escale seus resultados.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-6">Links Rápidos</h3>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#automacao" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Automação</a></li>
              <li><a href="#solucao" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Solução</a></li>
              <li><a href="#planos" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Planos</a></li>
              <li><a href="https://app.homologaplus.com.br/login" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Acessar Plataforma</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6">Guias de homologação</h3>
            <ul className="space-y-4 text-slate-500">
              <li><Link to="/homologacao-energia-solar" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Homologação de energia solar</Link></li>
              <li><Link to="/como-homologar-energia-solar" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Como homologar (passo a passo)</Link></li>
              <li><Link to="/documentos-homologacao-fotovoltaica" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Documentos da homologação</Link></li>
              <li><Link to="/erros-homologacao-solar" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Erros na homologação</Link></li>
              <li><Link to="/homologacao-cpfl" className="max-md:inline-flex max-md:items-center max-md:min-h-[44px] hover:text-primary transition-colors">Homologação CPFL</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6">Contato</h3>
            <ul className="space-y-4 text-slate-500">
              <li>contato@homologaplus.com.br</li>
              <li>(14) 99127-3245</li>
              <li>Bauru - SP</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Homologa Plus. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link to="/termos" className="inline-flex items-center min-h-[44px] hover:text-slate-600">Termos de Uso</Link>
            <Link to="/privacidade" className="inline-flex items-center min-h-[44px] hover:text-slate-600">Privacidade</Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="inline-flex items-center min-h-[44px] hover:text-slate-600 transition-colors"
            >
              Preferências de cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
