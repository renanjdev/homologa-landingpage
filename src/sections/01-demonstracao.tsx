import React, { useEffect, useRef, useState } from 'react';
import type { SectionProps } from '../contrato/types';
import { LineReveal } from '../contrato/reveal';
import { buildWhatsAppLink } from '../utils/whatsapp';

const demoLink = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');

export default function Demonstracao({ id }: SectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMounted, setVideoMounted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        videoRef.current?.pause();
        setVideoMounted(false);
        setVideoPlaying(false);
      }
    };

    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (!videoMounted || reducedMotion) return;
    void videoRef.current?.play().catch(() => setVideoPlaying(false));
  }, [reducedMotion, videoMounted]);

  const toggleVideo = () => {
    if (reducedMotion) return;
    if (!videoMounted) {
      setVideoMounted(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.ended) video.currentTime = 0;
      void video.play().catch(() => setVideoPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="fable-container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 31rem), 1fr))',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 6.5rem)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 14, minWidth: 0, paddingBlock: 'clamp(1rem, 4vh, 4rem)' }}>
        <p className="fable-label">Automação documental para energia solar</p>
        <LineReveal
          as="h1"
          section={id}
          className="fable-display"
          lines={[
            <>Documentação pronta.</>,
            <><span className="fable-accent">Validada</span> antes do protocolo.</>,
          ]}
        />
        <LineReveal
          as="p"
          section={id}
          className="fable-copy"
          lines={[
            <>A partir dos dados do projeto, o Homologa Plus dimensiona e gera memorial, diagramas, planta e formulários.</>,
            <>Tudo no padrão da distribuidora, com a conformidade verificada antes do protocolo.</>,
          ]}
        />
        <div className="fable-actions" style={{ marginTop: 'clamp(1.75rem, 4vh, 3rem)' }}>
          <a
            className="fable-button"
            href={demoLink}
            onClick={() => window.fbq?.('track', 'Contact')}
          >
            Agendar demonstração <span aria-hidden="true">↗</span>
          </a>
          <button
            className="fable-button fable-button--ghost"
            type="button"
            onClick={() => window.__fable?.scrollTo(1)}
          >
            Ver a documentação
          </button>
        </div>
      </div>

      <div
        className="fable-panel"
        style={{
          position: 'relative',
          zIndex: 8,
          minWidth: 0,
          minHeight: 'clamp(24rem, 52vw, 43rem)',
          borderRadius: 'clamp(1rem, 2vw, 2rem)',
          isolation: 'isolate',
        }}
      >
        {videoMounted && !reducedMotion ? (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            poster="/automacao-demo-poster.jpg"
            aria-label="Demonstração da automação documental do Homologa Plus"
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onEnded={() => setVideoPlaying(false)}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              minHeight: 'inherit',
              objectFit: 'cover',
              opacity: 0.9,
            }}
          >
            <source src="/automacao-demo.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/automacao-demo-poster.jpg"
            alt="Tela da automação documental do Homologa Plus"
            decoding="async"
            fetchPriority="high"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              minHeight: 'inherit',
              objectFit: 'cover',
              opacity: 0.9,
            }}
          />
        )}
        <button
          type="button"
          onClick={toggleVideo}
          disabled={reducedMotion}
          aria-label={reducedMotion ? 'Vídeo desativado pela preferência de movimento reduzido' : videoPlaying ? 'Pausar demonstração em vídeo' : 'Reproduzir demonstração em vídeo'}
          style={{
            position: 'absolute',
            zIndex: 4,
            top: 'clamp(1rem, 2vw, 1.75rem)',
            right: 'clamp(1rem, 2vw, 1.75rem)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.55rem',
            minHeight: '2.75rem',
            border: '1px solid color-mix(in srgb, var(--fable-paper) 24%, transparent)',
            borderRadius: '999px',
            padding: '0.55rem 0.85rem',
            background: 'color-mix(in srgb, var(--fable-void) 78%, transparent)',
            color: reducedMotion ? 'var(--fable-muted)' : 'var(--fable-paper)',
            font: 'inherit',
            fontSize: '0.75rem',
            fontWeight: 620,
            cursor: reducedMotion ? 'not-allowed' : 'pointer',
            backdropFilter: 'blur(0.75rem)',
          }}
        >
          <span aria-hidden="true">{videoPlaying ? 'Ⅱ' : '▶'}</span>
          {reducedMotion ? 'Movimento reduzido' : videoPlaying ? 'Pausar' : 'Ver em movimento'}
        </button>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(112deg, color-mix(in srgb, var(--fable-void) 54%, transparent), transparent 48%, color-mix(in srgb, var(--fable-void) 44%, transparent))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 'clamp(1rem, 2vw, 1.75rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <span
            className="fable-label"
            style={{
              margin: 0,
              padding: '0.55rem 0.75rem',
              border: '1px solid color-mix(in srgb, var(--fable-paper) 20%, transparent)',
              background: 'color-mix(in srgb, var(--fable-void) 70%, transparent)',
              color: 'var(--fable-paper)',
            }}
          >
            {videoPlaying ? 'Demonstração em execução' : 'Demonstração pronta'}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '29rem' }}>
            {['dimensionamento elétrico', 'padrão da distribuidora', 'validação normativa'].map((signal) => (
              <span
                key={signal}
                style={{
                  padding: '0.55rem 0.75rem',
                  border: '1px solid color-mix(in srgb, var(--fable-accent) 60%, transparent)',
                  background: 'color-mix(in srgb, var(--fable-void) 75%, transparent)',
                  color: 'var(--fable-paper)',
                  fontFamily: '"Cascadia Code", "JetBrains Mono", ui-monospace, monospace',
                  fontSize: 'var(--fable-label)',
                  fontWeight: 620,
                  letterSpacing: '0.08em',
                  lineHeight: 1.25,
                  textTransform: 'uppercase',
                }}
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
