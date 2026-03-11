import React from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, Star, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      id="planos" 
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Principal da Seção */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Planos e Preços
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
            Escolha o plano ideal para profissionalizar a gestão da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-stretch px-2 sm:px-0">
          {/* Plano Mensal */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow w-full max-w-md mx-auto lg:max-w-none">
            <div className="mb-6">
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plano Mensal</h3>
              <p className="text-primary font-medium text-sm">Ideal para começar</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              Para empresas que estão estruturando seus processos ou desejam testar a plataforma.
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-lg font-medium">R$</span>
                <span className="text-4xl font-display font-black text-slate-900">249</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Acesso completo à plataforma",
                "Cadastro ilimitado de projetos",
                "Gestão de integradores",
                "Controle de documentos",
                "Acompanhamento das etapas de homologação",
                "Suporte via WhatsApp"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Link 
                to="/waitlist"
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mb-4 block text-center"
              >
                Garantir Vaga Fundador
              </Link>
              <p className="text-[10px] text-slate-400 text-center italic">
                Indicado para: profissionais autônomos e pequenas empresas que estão iniciando.
              </p>
            </div>
          </div>

          {/* Plano Semestral - DESTAQUE */}
          <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-xl relative flex flex-col transform lg:scale-105 z-10 w-full max-w-md mx-auto lg:max-w-none my-4 lg:my-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 tracking-wider whitespace-nowrap">
              <Star className="w-3 h-3 fill-white" />
              MAIS POPULAR
            </div>
            
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plano Semestral</h3>
              <p className="text-primary font-medium text-sm">Mais resultados pelo menor custo</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              Para empresas em crescimento que possuem fluxo constante de projetos.
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-lg font-medium">R$</span>
                <span className="text-4xl font-display font-black text-slate-900">219</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <p className="text-xs text-primary font-bold mt-1">Cobrança semestral</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Todos os benefícios do plano mensal",
                "Economia em relação ao plano mensal",
                "Onboarding assistido",
                "Treinamento para uso da plataforma",
                "Suporte prioritário"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Link 
                to="/waitlist"
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mb-4 block text-center"
              >
                Garantir Vaga Fundador
              </Link>
              <p className="text-[10px] text-slate-400 text-center italic">
                Indicado para empresas com fluxo constante de projetos.
              </p>
            </div>
          </div>

          {/* Plano Anual */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow w-full max-w-md mx-auto lg:max-w-none relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-sm flex items-center gap-1.5 tracking-wider whitespace-nowrap">
              <Star className="w-3 h-3 fill-amber-600" />
              MAIS ECONÔMICO
            </div>
            
            <div className="mb-6 relative">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Plano Anual</h3>
              <p className="text-primary font-medium text-sm">Plano profissional</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-6">
              O plano mais completo e vantajoso para empresas com grande volume de homologações.
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-lg font-medium">R$</span>
                <span className="text-4xl font-display font-black text-slate-900">189</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <p className="text-xs text-orange-600 font-bold mt-1">Cobrança anual</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Todos os benefícios do plano semestral",
                "Maior economia entre os planos",
                "Suporte premium",
                "Atendimento prioritário",
                "Consultoria de processos para organização da homologação"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Link 
                to="/waitlist"
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mb-4 block text-center"
              >
                Garantir Vaga Fundador
              </Link>
              <p className="text-[10px] text-slate-400 text-center italic">
                Indicado para empresas estruturadas com grande volume de projetos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Pricing;
