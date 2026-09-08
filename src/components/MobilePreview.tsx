import React from 'react';
import { Reveal } from '../lib/anim';
import { CheckCircle2 } from 'lucide-react';

const MobilePreview = () => {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <Reveal as="div" x={-20}>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-smoke">
              No celular
            </span>
            <h2 className="text-clamp-h2 font-bold text-white mb-3 mt-3">
              Seu sistema de homologação, <span className="hero-grif">em qualquer lugar.</span>
            </h2>

            <p className="text-lg text-ash mb-5 leading-relaxed">
              Dê autonomia total aos seus integradores. Com o Homologa Plus, seus parceiros cadastram projetos, enviam documentos e acompanham o status pelo celular, direto do canteiro de obra.
            </p>

            <div className="space-y-2.5">
              {[
                "Login simplificado para integradores",
                "Envio de documentos via celular",
                "Acompanhamento do status do projeto por etapa",
                "Dashboard móvel com métricas rápidas"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-obsidian flex items-center justify-center text-coral shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-ash font-medium">{item}</span>
                </div>
              ))}
            </div>
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
