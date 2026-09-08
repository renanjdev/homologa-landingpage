import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const POSTER = '/automacao-demo-poster.jpg';
const VIDEO = '/automacao-demo.mp4';
const VIDEO_WEBM = '/automacao-demo.webm';

// Performance: o vídeo (~558KB) NÃO baixa no carregamento.
// O poster (~83KB) é o LCP. O vídeo só carrega/autoplaya em desktop com boa
// conexão (quando o browser está ocioso). No mobile / conexão lenta /
// reduced-motion, fica o poster com um botão de play (toque carrega o vídeo).
type Mode = 'poster' | 'auto' | 'tap';

const HeroMedia = () => {
  // 'auto' = autoplay ambiente no desktop (loop, sem controles).
  // 'tap'  = o usuário tocou em "Reproduzir" → mostra controles e toca uma vez
  //          (acessível: dá pra pausar/parar — WCAG 2.2.2 Pause, Stop, Hide).
  const [mode, setMode] = useState<Mode>('poster');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as any).connection;
    const slow = !!conn && (conn.saveData || /(^|\b)(2g|slow-2g)\b/.test(conn.effectiveType || ''));

    if (!isDesktop || reduced || slow) return; // mobile/lento/reduced → fica no poster

    const load = () => setMode((m) => (m === 'poster' ? 'auto' : m));
    const ric = (window as any).requestIdleCallback;
    if (ric) {
      const id = ric(load, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(load, 1200);
    return () => window.clearTimeout(t);
  }, []);

  // Moldura tátil "tecla de teclado" (conceito 16): a barra de janela + o
  // inner-shadow (--key) vivem no CSS escopado (.hero-window). A ENGENHARIA de
  // carregamento abaixo é IDÊNTICA à anterior — só o tratamento visual mudou
  // (fundo escuro, sem drop-shadow, dentro da janela do produto).
  return (
    <div className="hero-window">
      <div className="hero-winbar" aria-hidden="true">
        <div className="hero-dots"><i></i><i></i><i></i></div>
        <div className="hero-cmd">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#6a6b6c" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="#6a6b6c" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Gerar dossiê de homologação — UC 3009…</span>
        </div>
        <span className="hero-wintag">homologa · engine</span>
      </div>
      <div className="hero-window-body">
        {mode !== 'poster' ? (
          <video
            className="block w-full"
            autoPlay
            muted
            loop={mode === 'auto'}
            controls={mode === 'tap'}
            playsInline
            preload="auto"
            poster={POSTER}
            width={1280}
            height={598}
            aria-label="Demonstração: o Homologa Plus gerando a documentação técnica e validando a conformidade da homologação"
          >
            <source src={VIDEO_WEBM} type="video/webm" />
            <source src={VIDEO} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setMode('tap')}
            aria-label="Reproduzir a demonstração da Automação"
            className="group relative block w-full"
          >
            <img
              src={POSTER}
              alt="Tela da Automação do Homologa Plus gerando documentos e validando a conformidade"
              width={1280}
              height={598}
              className="block w-full"
              fetchPriority="high"
            />
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroMedia;
