import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Star, Zap, Award, ShieldCheck } from 'lucide-react';

const Pricing = () => {
  const whatsappNumber = "5514991273245"; // Troque pelo seu número

  const plans = [
    {
      name: "Plano Essencial",
      price: "199,90",
      description: "Para empresas que estão iniciando sua jornada de organização.",
      icon: <ShieldCheck className="w-6 h-6" />,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      features: [
        { text: "2 Usuários Técnicos", included: true },
        { text: "25 Usuários Integradores", included: true },
        { text: "Até 30 Projetos por mês", included: true },
        { text: "Funil de Projetos", included: true },
        { text: "Biblioteca de Equipamentos", included: true },
        { text: "Gerador de Procuração", included: false },
        { text: "Financeiro", included: false },
        { text: "Notificação de Status por Email", included: false },
        { text: "Relatórios", included: false },
        { text: "Mapa de Projetos", included: false },
      ],
      ctaText: "Começar agora",
      highlight: false,
    },
    {
      name: "Plano Professional",
      price: "299,90",
      description: "Perfeito para empresas em crescimento com fluxo constante.",
      icon: <Zap className="w-6 h-6" />,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      features: [
        { text: "6 Usuários Técnicos", included: true },
        { text: "50 Usuários Integradores", included: true },
        { text: "Até 60 Projetos por mês", included: true },
        { text: "Funil de Projetos", included: true },
        { text: "Biblioteca de Equipamentos", included: true },
        { text: "Gerador de Procuração", included: true },
        { text: "Financeiro", included: true },
        { text: "Notificação de Status por Email", included: true },
        { text: "Relatórios", included: false },
        { text: "Mapa de Projetos", included: false },
      ],
      ctaText: "Escolher Professional",
      highlight: true,
      badge: "MAIS POPULAR"
    },
    {
      name: "Plano Empresarial",
      price: "399,90",
      description: "A solução completa para empresas de alto volume.",
      icon: <Award className="w-6 h-6" />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      features: [
        { text: "10 Usuários Técnicos", included: true },
        { text: "Usuários Integradores ilimitado", included: true },
        { text: "Até 100 Projetos por mês", included: true },
        { text: "Funil de Projetos", included: true },
        { text: "Biblioteca de Equipamentos", included: true },
        { text: "Gerador de Procuração", included: true },
        { text: "Financeiro", included: true },
        { text: "Notificação de Status por Email", included: true },
        { text: "Relatórios", included: true },
        { text: "Mapa de Projetos", included: true },
      ],
      ctaText: "Seja Empresarial",
      highlight: false,
    }
  ];

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
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white p-6 sm:p-8 rounded-3xl border ${plan.highlight ? 'border-primary shadow-xl scale-100 lg:scale-105 z-10' : 'border-slate-200 shadow-sm'} flex flex-col hover:shadow-md transition-all w-full max-w-md mx-auto lg:max-w-none relative`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 tracking-wider whitespace-nowrap">
                  <Star className="w-3 h-3 fill-white" />
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <div className={`w-12 h-12 ${plan.iconBg} ${plan.iconColor} rounded-2xl flex items-center justify-center mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mt-2">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-500 text-lg font-medium">R$</span>
                  <span className="text-4xl font-display font-black text-slate-900">{plan.price.split(',')[0]}</span>
                  <span className="text-2xl font-display font-bold text-slate-900">,{plan.price.split(',')[1]}</span>
                  <span className="text-slate-500 text-sm">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                    {feature.included ? (
                      <CheckCircle2 className={`w-4 h-4 ${plan.highlight ? 'text-primary' : index === 2 ? 'text-orange-500' : 'text-success'} shrink-0 mt-0.5`} />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-200 shrink-0 mt-0.5" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+${encodeURIComponent(plan.name)}+do+Homologa+Plus.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-2xl ${plan.highlight ? 'bg-primary hover:bg-primary-dark' : 'bg-slate-900 hover:bg-black'} text-white font-bold transition-all shadow-xl ${plan.highlight ? 'shadow-primary/20' : 'shadow-slate-200'} mb-4 block text-center`}
                >
                  {plan.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Pricing;
