import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Reveal } from '../lib/anim';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "O sistema gera o memorial descritivo e o diagrama unifilar automaticamente?",
      answer: "Sim. A partir dos dados do projeto, o Homologa Plus gera o memorial descritivo e de cálculo, o diagrama unifilar dimensionado, o diagrama de blocos e a planta de localização no padrão exigido pela sua distribuidora."
    },
    {
      question: "A automação faz o dimensionamento elétrico (condutores, disjuntores, DPS)?",
      answer: "Sim. O dimensionamento de condutores, disjuntores, DPS e demais proteções é calculado automaticamente, para inversor string e microinversor. Os documentos saem editáveis (DXF/SVG) para você revisar e assinar como responsável técnico."
    },
    {
      question: "Como funciona a validação de conformidade antes de protocolar?",
      answer: "Antes de protocolar, o sistema valida o projeto contra as referências normativas (NBR 5410, NBR 16690, PRODIST e Lei 14.300) e aponta os itens impeditivos, de atenção e conformes — para você corrigir o que reprova antes de enviar à concessionária."
    },
    {
      question: "Em qual plano está a Automação? Consigo testar no período grátis?",
      answer: "A Automação está no plano Empresarial e fica liberada nos 7 dias de teste grátis, sem cartão de crédito — assim você gera e valida documentos de verdade antes de decidir."
    },
    {
      question: "Preciso cadastrar cartão de crédito para testar?",
      answer: "Não. Você ativa o teste e usa o sistema completo por 7 dias sem informar nenhum cartão de crédito."
    },
    {
      question: "O que acontece quando o teste de 7 dias acaba?",
      answer: "Como não pedimos cartão, não existe cobrança automática. Ao fim dos 7 dias você decide com calma se quer assinar um dos planos — sem surpresa na fatura."
    },
    {
      question: "Funciona com a minha concessionária?",
      answer: "Sim. O Homologa Plus organiza todo o processo de homologação — documentos, etapas e prazos — independente da distribuidora (CPFL, Enel, Energisa, Neoenergia, Light e outras)."
    },
    {
      question: "Dá muito trabalho para começar a usar?",
      answer: "Não precisa migrar tudo de uma vez. Você cadastra seus projetos ativos em poucos minutos e vai trazendo o restante conforme avança. E o suporte é humano, direto no WhatsApp, para te ajudar."
    },
    {
      question: "E a área do integrador, como funciona?",
      answer: "Seus integradores parceiros têm um acesso restrito onde cadastram projetos, enviam documentos e acompanham o status de cada homologação em tempo real — sem ficar te cobrando atualização."
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim. Sem fidelidade e sem multa: você cancela quando quiser, direto pelo sistema."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };

  return (
    <Reveal
      as="section"
      y={20}
      margin="-100px"
      className="py-16 md:py-24 bg-white"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-clamp-h2 font-display font-bold text-slate-900 mb-3 md:mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Tire suas dúvidas sobre como o Homologa Plus pode ajudar sua empresa.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-slate-100 rounded-2xl overflow-hidden bg-surface transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4 md:pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 text-slate-500 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-panel-${idx}`}
                inert={openIndex !== idx}
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-5 md:p-6 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default FAQ;
