import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
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

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 bg-white"
    >
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
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4 md:pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 md:w-5 md:h-5 text-slate-500 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-5 md:p-6 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
