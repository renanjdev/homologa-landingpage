import React from 'react';
import { Reveal } from '../lib/anim';
import { CheckCircle2, Zap, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { REQUEST_ACCESS_URL, TRIAL_DIAS, scrollToRequestAccess } from '../utils/cta';

type Plan = {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  /** Cota de automação — é o que realmente separa os dois planos. */
  quota: string;
  quotaSubtitle: string;
  features: string[];
  ctaText: string;
  highlight: boolean;
  priceSubtitle?: string;
  badge?: string;
  badgeClass?: string;
  secondaryCta?: string;
};

// Os dois planos entregam a plataforma inteira (incl. a Automação).
// A diferença é o volume de projetos automatizados por mês.
const SHARED_FEATURES = [
  "Memorial descritivo em 1 clique, no padrão da distribuidora",
  "Diagrama unifilar dimensionado, pronto para anexar",
  "Formulários e anexos exigidos por cada distribuidora",
  "Validador de conformidade antes de protocolar",
  "Dimensionamento com a referência normativa citada",
  "Gestão financeira completa (DRE e fluxo de caixa)",
  "Visão territorial no mapa",
  "Dashboards e relatórios inteligentes",
  "Link público de cadastro de parceiros com a sua marca",
  "Catálogo de equipamentos",
  "Cadastro de projetos sem limite",
];

const Pricing = () => {
  const plans: Plan[] = [
    {
      name: "Homologa Starter",
      price: "297",
      description: "Para quem homologa com regularidade.",
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      quota: "7 projetos",
      quotaSubtitle: "automatizados por mês",
      features: [
        "3 usuários técnicos",
        "Até 50 integradoras",
      ],
      ctaText: `Solicitar teste de ${TRIAL_DIAS} dias`,
      highlight: false,
    },
    {
      name: "Homologa Full",
      price: "597",
      description: "Para quem homologa em volume.",
      priceSubtitle: "Automação sem teto por menos de R$ 20 por dia.",
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      quota: "Projetos ilimitados",
      quotaSubtitle: "automatizados por mês",
      features: [
        "10 usuários técnicos",
        "Integradoras ilimitadas",
        "Suporte dedicado",
      ],
      ctaText: `Solicitar teste de ${TRIAL_DIAS} dias`,
      secondaryCta: "Falar com especialista",
      highlight: true,
      badge: "Mais escolhido",
      badgeClass: "bg-primary text-white",
    },
  ];

  return (
    <Reveal
      as="section"
      y={20}
      margin="-100px"
      id="planos"
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-clamp-h2 font-display font-bold text-slate-900 mb-3 md:mb-5">
            Escolha o plano ideal para sua operação
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Mais de 200 empresas já organizam suas homologações com o Homologa Plus.
          </p>
        </div>

        {/* Guia de escolha — a diferença entre os planos é o volume, não o recurso */}
        <p className="mx-auto mb-10 md:mb-14 max-w-2xl text-center text-sm md:text-base text-slate-600">
          Os dois planos vêm com a plataforma completa e com a{' '}
          <strong className="font-semibold text-primary">Automação de documentos</strong>. A diferença é o volume:
          o <strong className="font-semibold text-slate-900">Starter</strong> automatiza 7 projetos por mês; o{' '}
          <strong className="font-semibold text-slate-900">Full</strong> não tem teto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start px-2 sm:px-0 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white p-6 sm:p-8 rounded-3xl border-2 ${plan.highlight ? 'border-primary shadow-xl shadow-primary/10' : 'border-slate-100 shadow-sm'} flex flex-col hover:shadow-md transition-all w-full max-w-md mx-auto md:max-w-none relative h-full`}
            >
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${plan.badgeClass} text-[11px] md:text-xs font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${plan.iconBg} ${plan.iconColor} rounded-xl flex items-center justify-center shrink-0`}>
                    {plan.icon}
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold ${plan.highlight ? 'text-primary' : 'text-slate-900'}`}>{plan.name}</h3>
                </div>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl md:text-3xl font-bold ${plan.highlight ? 'text-primary' : 'text-slate-900'}`}>R$</span>
                  <span className={`text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight ${plan.highlight ? 'text-primary' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className="text-slate-500 text-sm md:text-base font-medium ml-1">/mês</span>
                </div>
                {plan.priceSubtitle && (
                  <p className={`text-[13px] md:text-sm font-medium mt-3 leading-snug ${plan.highlight ? 'text-primary' : 'text-slate-600'}`}>
                    {plan.priceSubtitle}
                  </p>
                )}
              </div>

              {/* Cota de automação: o diferencial real entre os planos */}
              <div className={`mb-6 rounded-2xl p-4 ${plan.highlight ? 'border border-primary/20 bg-primary/5' : 'border border-slate-100 bg-slate-50'}`}>
                <div className="flex items-center gap-2.5">
                  <Sparkles className={`h-4 w-4 shrink-0 ${plan.highlight ? 'text-primary' : 'text-slate-500'}`} />
                  <p className={`font-display text-base font-bold ${plan.highlight ? 'text-primary' : 'text-slate-900'}`}>{plan.quota}</p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{plan.quotaSubtitle}</p>
              </div>

              <ul className="space-y-3.5 md:space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success shrink-0 mt-[2px]" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col items-center">
                <a
                  href={REQUEST_ACCESS_URL}
                  onClick={(e) => {
                    window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: plan.name });
                    scrollToRequestAccess(e);
                  }}
                  className={`w-full py-3 md:py-3.5 rounded-xl font-semibold transition-all text-center text-sm md:text-base block ${plan.highlight ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5' : 'bg-white hover:bg-surface text-primary border-2 border-slate-200 hover:border-primary'}`}
                >
                  {plan.ctaText}
                </a>
                {plan.secondaryCta && (
                  <a
                    href={buildWhatsAppLink('Olá! Tenho interesse no plano Homologa Full (automação ilimitada).')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.fbq && window.fbq('track', 'Contact')}
                    className="mt-3 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    {plan.secondaryCta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* O que já vem nos dois planos */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-slate-500 mb-6">
            Nos dois planos você tem
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {SHARED_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success shrink-0 mt-[2px]" />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 md:mt-16 text-center flex flex-col items-center gap-2">
          <p className="text-slate-500 text-sm md:text-base flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
            {TRIAL_DIAS} dias grátis, sem cartão de crédito. Sem fidelidade, cancele quando quiser.
          </p>
          <p className="text-slate-500 text-xs md:text-sm">
            Pagamento seguro via Stripe com criptografia de ponta a ponta.
          </p>
        </div>
      </div>
    </Reveal>
  );
};

export default Pricing;
