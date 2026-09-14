import React from 'react';
import { Reveal } from '../lib/anim';

const MobilePreview = () => {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <Reveal as="div" x={-20}>
            <h2 className="text-clamp-h2-sm font-bold text-white mb-3">
              Seu sistema de homologação, em qualquer lugar.
            </h2>

            <p className="text-lg text-ash mb-5 leading-relaxed">
              Dê autonomia total aos seus integradores. Com o Homologa Plus, seus parceiros cadastram projetos, enviam documentos e acompanham o status pelo celular, direto do canteiro de obra.
            </p>

            <ul className="tick-list space-y-2.5">
              {[
                "Login simplificado para integradores",
                "Envio de documentos via celular",
                "Acompanhamento do status do projeto por etapa",
                "Dashboard móvel com métricas rápidas"
              ].map((item, i) => (
                <li key={i} className="text-ash font-medium">{item}</li>
              ))}
            </ul>
          </Reveal>

          {/* Image Preview */}
          <Reveal
            as="div"
            scale={0.9}
            duration={0.7}
            className="relative flex justify-center"
          >
            {/* Recorte com gradiente de continuidade, a mesma técnica do painel
                do hero: encolher o aparelho para caber cortaria a altura mas
                faria a captura ler como miniatura. Assim ela fica em escala e a
                seção continua enxuta. */}
            <div className="relative max-w-[260px] sm:max-w-[290px]">
              <div
                className="relative z-10 max-h-[300px] overflow-hidden sm:max-h-[360px]"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 74%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, #000 74%, transparent 100%)',
                }}
              >
                <img
                  src="/mobile-preview.webp"
                  alt="Tela do Homologa Plus no navegador do celular, mostrando as etapas do projeto (Planejamento, Homologação, Obra na Rede, Aprovado) e o acompanhamento do protocolo com número, datas de envio e prazo de resposta da distribuidora"
                  width={380}
                  height={770}
                  className="w-full h-auto rounded-[3rem]"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
