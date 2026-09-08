import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Reveal } from '../lib/anim';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "O sistema gera o memorial descritivo e o diagrama unifilar automaticamente?",
      answer: "Sim, e não para por aí. A partir dos dados do projeto, o Homologa Plus gera o memorial descritivo e de cálculo, o diagrama unifilar dimensionado, o diagrama de blocos, a planta de localização e também os formulários e anexos que cada distribuidora exige, já preenchidos. É o pacote inteiro do protocolo, no padrão da sua distribuidora."
    },
    {
      question: "A automação faz o dimensionamento elétrico (condutores, disjuntores, DPS)?",
      answer: "Sim. O dimensionamento de condutores, disjuntores, DPS e demais proteções é calculado automaticamente, para inversor string e microinversor. Os documentos saem editáveis (DXF/SVG) para você revisar e assinar como responsável técnico."
    },
    {
      question: "Como funciona a validação de conformidade antes de protocolar?",
      answer: "Antes de protocolar, o sistema valida o projeto contra as referências normativas (NBR 5410, NBR 16690, PRODIST e Lei 14.300) e aponta os itens impeditivos, de atenção e conformes, para você corrigir o que reprova antes de enviar à concessionária."
    },
    {
      question: "Como faço para agendar uma demonstração?",
      answer: "É só clicar em qualquer botão de acesso e falar com a gente no WhatsApp: nossa equipe agenda uma demonstração guiada, entende sua operação e libera o acesso. Fazemos o atendimento um a um justamente para acompanhar de perto cada caso."
    },
    {
      question: "Por que o contato é pelo WhatsApp?",
      answer: "Porque é por ele que a gente fala com você: confirmamos alguns dados, combinamos o melhor momento e conduzimos a demonstração. Sem o WhatsApp não conseguimos agendar."
    },
    {
      question: "Em qual plano está a Automação?",
      answer: "A Automação vem nos dois planos. O que muda entre eles é o volume: o Homologa Starter (R$ 297/mês) automatiza 7 projetos por mês e o Homologa Full (R$ 597/mês) não tem teto. Na demonstração, mostramos a Automação gerando e validando documentos de verdade."
    },
    {
      question: "Como funciona a demonstração?",
      answer: "Você agenda pelo WhatsApp e nossa equipe faz uma demonstração guiada do sistema — do cadastro do projeto à documentação gerada e validada — e esclarece dúvidas sobre planos e implantação. Sem compromisso."
    },
    {
      question: "Funciona com a minha concessionária?",
      answer: "Sim. O Homologa Plus organiza todo o processo de homologação (documentos, etapas e prazos), independente da distribuidora (CPFL, Enel, Energisa, Neoenergia, Light e outras)."
    },
    {
      question: "Dá muito trabalho para começar a usar?",
      answer: "Não precisa migrar tudo de uma vez. Você cadastra seus projetos ativos em poucos minutos e vai trazendo o restante conforme avança. E o suporte é humano, direto no WhatsApp, para te ajudar."
    },
    {
      question: "E a área do integrador, como funciona?",
      answer: "Seus integradores parceiros têm um acesso restrito onde cadastram projetos, enviam documentos e acompanham o status de cada homologação em tempo real, sem ficar te cobrando atualização."
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
      className="py-24 md:py-32 bg-ink"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-smoke mb-4">
            Dúvidas
          </p>
          <h2 className="text-clamp-h2 font-bold text-white mb-3 md:mb-4 text-balance">
            Perguntas Frequentes
          </h2>
          <p className="text-ash text-sm md:text-base">
            Tire suas dúvidas sobre como o Homologa Plus pode ajudar sua empresa.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl overflow-hidden bg-obsidian shadow-[var(--key-soft)] transition-all ${openIndex === idx ? 'border-steel' : 'border-white/10'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-graphite transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="font-bold text-white text-sm md:text-base pr-4 md:pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-coral' : 'text-smoke'}`}
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
                  <div className="p-5 md:p-6 pt-0 text-ash text-sm md:text-base leading-relaxed border-t border-white/10">
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
