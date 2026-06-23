import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Zap, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

type Feature = { text: string; included: boolean };

type Plan = {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  features: Feature[];
  ctaText: string;
  highlight: boolean;
  priceSubtitle?: string;
  badge?: string;
  badgeClass?: string;
  note?: string;
  automationHighlight?: boolean;
  secondaryCta?: string;
};

const CADASTRO_URL = 'https://app.homologaplus.com.br/cadastro';

const Pricing = () => {
  const plans: Plan[] = [
    {
      name: "Essencial",
      price: "197",
      description: "Saia das planilhas e organize o básico da operação.",
      icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      features: [
        { text: "1 usuário técnico", included: true },
        { text: "Até 10 integradoras", included: true },
        { text: "Projetos ilimitados", included: true },
        { text: "Funil de homologação", included: true },
        { text: "Catálogo de equipamentos", included: true },
        { text: "Financeiro básico", included: true },
        { text: "Gestão financeira completa (DRE)", included: false },
        { text: "Dashboards e relatórios", included: false },
        { text: "Automação de documentos (no Empresarial)", included: false },
      ],
      ctaText: "Começar teste grátis (7 dias)",
      highlight: false,
    },
    {
      name: "Profissional",
      price: "297",
      description: "Ganhe controle dos prazos e centralize sua operação.",
      priceSubtitle: "Menos de R$ 10 por dia para controlar toda a sua operação.",
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      features: [
        { text: "3 usuários técnicos", included: true },
        { text: "Até 50 integradoras", included: true },
        { text: "Projetos ilimitados", included: true },
        { text: "Gestão financeira completa (DRE e fluxo de caixa)", included: true },
        { text: "Visão territorial no mapa", included: true },
        { text: "Dashboards e relatórios inteligentes", included: true },
        { text: "Alertas automáticos de prazo", included: true },
        { text: "Automação de documentos (no Empresarial)", included: false },
      ],
      ctaText: "Começar teste grátis (7 dias)",
      highlight: false,
      note: "Para operações que já têm volume",
    },
    {
      name: "Empresarial",
      price: "397",
      description: "A operação completa com a Automação que gera e valida sua documentação.",
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      automationHighlight: true,
      features: [
        { text: "Tudo do Profissional incluído", included: true },
        { text: "10 usuários técnicos", included: true },
        { text: "Integradoras ilimitadas", included: true },
        { text: "Projetos ilimitados", included: true },
        { text: "Suporte dedicado", included: true },
      ],
      ctaText: "Começar teste grátis (7 dias)",
      secondaryCta: "Falar com especialista",
      highlight: true,
      badge: "Recomendado · com Automação",
      badgeClass: "bg-primary text-white",
    },
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
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-clamp-h2 font-display font-bold text-slate-900 mb-3 md:mb-5">
            Escolha o plano ideal para sua operação
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Mais de 200 empresas já organizam suas homologações com o Homologa Plus.
          </p>
        </div>

        {/* Guia de escolha — orienta sem selo de popularidade */}
        <p className="mx-auto mb-10 md:mb-14 max-w-2xl text-center text-sm md:text-base text-slate-600">
          Não precisa da automação? O <strong className="font-semibold text-slate-900">Profissional</strong> dá conta da operação.
          Quer <strong className="font-semibold text-primary">gerar e validar a documentação</strong> automaticamente? Vá de Empresarial — incluído no teste grátis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-start px-2 sm:px-0">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white p-6 sm:p-8 rounded-3xl border-2 ${plan.highlight ? 'border-primary shadow-xl shadow-primary/10 scale-100 lg:scale-105 z-10' : 'border-slate-100 shadow-sm'} flex flex-col hover:shadow-md transition-all w-full max-w-md mx-auto lg:max-w-none relative h-full`}
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
                  <p className="text-slate-600 text-[13px] md:text-sm font-medium mt-3 md:mt-4 leading-snug">
                    {plan.priceSubtitle}
                  </p>
                )}
              </div>

              {/* Destaque da Automação no Empresarial */}
              {plan.automationHighlight && (
                <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <p className="font-display text-sm font-bold text-slate-900">Inclui a Automação</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Gera memorial, unifilar, blocos e planta no padrão da distribuidora — e valida a conformidade antes de protocolar.
                  </p>
                </div>
              )}

              <ul className="space-y-3.5 md:space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-xs sm:text-sm ${feature.included ? 'text-slate-700' : 'text-slate-500'}`}>
                    {feature.included ? (
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success shrink-0 mt-[2px]" />
                    ) : (
                      <XCircle className="w-4 h-4 md:w-5 md:h-5 text-slate-300 shrink-0 mt-[2px]" />
                    )}
                    <span className="leading-tight">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col items-center">
                <a
                  href={CADASTRO_URL}
                  onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: plan.name })}
                  className={`w-full py-3 md:py-3.5 rounded-xl font-semibold transition-all text-center text-sm md:text-base block ${plan.highlight ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5' : 'bg-white hover:bg-surface text-primary border-2 border-slate-200 hover:border-primary'}`}
                >
                  {plan.ctaText}
                </a>
                {plan.secondaryCta && (
                  <a
                    href={buildWhatsAppLink('Olá! Tenho interesse no plano Empresarial do Homologa Plus (Automação).')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.fbq && window.fbq('track', 'Contact')}
                    className="mt-3 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    {plan.secondaryCta}
                  </a>
                )}
                {plan.note && (
                  <span className="text-[11px] md:text-xs text-slate-500 font-medium mt-3">
                    {plan.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center flex flex-col items-center gap-2">
          <p className="text-slate-500 text-sm md:text-base flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
            7 dias grátis, sem cartão de crédito. Sem fidelidade, cancele quando quiser.
          </p>
          <p className="text-slate-500 text-xs md:text-sm">
            Pagamento seguro via Stripe com criptografia de ponta a ponta.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Pricing;
