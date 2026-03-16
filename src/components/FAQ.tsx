import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "Quais funcionalidades o sistema oferece?",
      answer: "O HOMOLOGA Plus oferece gestão completa de projetos, controle de documentos, acompanhamento de etapas de homologação, dashboard de indicadores, gestão de integradores e muito mais."
    },
    {
      question: "Como funciona a área do integrador?",
      answer: "Seus integradores parceiros têm um acesso restrito onde podem cadastrar novos projetos, fazer upload de documentos e acompanhar o status de cada homologação em tempo real."
    },
    {
      question: "Quais planos estão disponíveis?",
      answer: "Oferecemos planos Mensal, Semestral e Anual, todos com acesso completo às funcionalidades do sistema."
    },
    {
      question: "Como entrar em contato com o suporte?",
      answer: "Nosso suporte é humanizado e realizado diretamente via WhatsApp para garantir agilidade no atendimento aos nossos clientes."
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
          <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 mb-3 md:mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Tire suas dúvidas sobre como o HOMOLOGA Plus pode ajudar sua empresa.
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
                  className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} 
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
