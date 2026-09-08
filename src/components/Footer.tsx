import React from 'react';
import { Link } from 'react-router-dom';

// FASE 1 do re-skin RAYCAST COCKPIT: rodapé dark sobre Void, hairline no topo,
// texto claro/legível (AA), links legíveis. Preserva os guias de SEO, os links
// Termos/Privacidade e o botão "Preferências de cookies" (LGPD).
const Footer = () => {
  const linkCls =
    'max-md:inline-flex max-md:items-center max-md:min-h-[44px] text-ash hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded';

  return (
    <footer className="bg-void border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2">
            <Link to="/" className="flex items-center gap-2 min-h-[44px] mb-6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/logo-h-white.png" alt="Homologa Plus" width={36} height={36} className="w-9 h-9" />
              <span className="text-xl font-bold text-white">
                Homologa <span className="text-white/70 font-medium">Plus</span>
              </span>
            </Link>
            <p className="text-ash max-w-sm mb-8">
              A plataforma definitiva para gestão de homologação de usinas fotovoltaicas. Profissionalize sua empresa e escale seus resultados.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li><a href="#automacao" className={linkCls}>Automação</a></li>
              <li><a href="#solucao" className={linkCls}>Solução</a></li>
              <li><a href="#planos" className={linkCls}>Planos</a></li>
              <li><a href="https://app.homologaplus.com.br/login" className={linkCls}>Acessar Plataforma</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Guias de homologação</h3>
            <ul className="space-y-4">
              <li><Link to="/homologacao-energia-solar" className={linkCls}>Homologação de energia solar</Link></li>
              <li><Link to="/como-homologar-energia-solar" className={linkCls}>Como homologar (passo a passo)</Link></li>
              <li><Link to="/documentos-homologacao-fotovoltaica" className={linkCls}>Documentos da homologação</Link></li>
              <li><Link to="/erros-homologacao-solar" className={linkCls}>Erros na homologação</Link></li>
              <li><Link to="/homologacao-cpfl" className={linkCls}>Homologação CPFL</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Contato</h3>
            <ul className="space-y-4 text-ash">
              <li>contato@homologaplus.com.br</li>
              <li>(14) 99127-3245</li>
              <li>Bauru - SP</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-smoke">
          <p>© {new Date().getFullYear()} Homologa Plus. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link to="/termos" className="inline-flex items-center min-h-[44px] text-ash hover:text-white transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="inline-flex items-center min-h-[44px] text-ash hover:text-white transition-colors">Privacidade</Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="inline-flex items-center min-h-[44px] text-ash hover:text-white transition-colors"
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
