import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Eng. Ricardo Santos",
      role: "Diretor Técnico na SolarEng",
      content: "O Homologa Plus transformou nossa gestão. Antes perdíamos prazos por falta de organização, agora temos controle total de cada etapa da homologação.",
      avatar: "https://picsum.photos/seed/ricardo/128/128"
    },
    {
      name: "Monalisa Felipe",
      role: "Gerente de Projetos na EcoPower",
      content: "A facilidade de gerenciar múltiplos integradores em um só lugar é o grande diferencial. O sistema é intuitivo e o suporte é excelente.",
      avatar: "https://i.imgur.com/M7OKfJ3b.jpg"
    },
    {
      name: "Wellington Ribeiro",
      role: "Sócio-Fundador da WR Projetos Elétricos",
      content: "Reduzimos em 40% o tempo gasto com burocracia e organização de documentos. É uma ferramenta indispensável para quem quer escalar no setor solar.",
      avatar: "https://i.imgur.com/SyFgrfwb.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Empresas de engenharia que já profissionalizaram sua gestão com o Homologa Plus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-8 flex-grow">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
