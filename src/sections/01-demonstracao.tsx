import React, { useEffect, useRef, useState } from 'react';
import type { SectionProps } from '../contrato/types';
import { LineReveal } from '../contrato/reveal';
import { Pause, Play } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';
import EsteiraConcessionarias from './esteira-concessionarias';

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
      className="fable-container demonstracao__layout"
      style={{
        display: 'grid',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 6.5rem)',
      }}
    >
      <style>{`
        .demonstracao__layout { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); }
        @media (max-width: 75rem) { .demonstracao__layout { grid-template-columns: minmax(0, 1fr); } }
      `}</style>
      <div className="fable-display-fit" style={{ position: 'relative', zIndex: 14, minWidth: 0, paddingBlock: 'clamp(1rem, 4vh, 4rem)' }}>
        <LineReveal
          as="h1"
          section={id}
          className="fable-display"
          lines={[
            <>Automação de</>,
            <>documentos para</>,
            <>homologação</>,
            <span className="fable-accent">fotovoltaica.</span>,
          ]}
        />
        <LineReveal
          as="p"
          section={id}
          className="fable-copy"
          lines={[
            <>Cadastre a usina uma vez: diagrama unifilar, memorial descritivo, planta de localização e os formulários da sua distribuidora saem prontos.</>,
            <>Antes do protocolo, o sistema confere a conformidade e aponta o que impediria a aprovação, com a norma citada.</>,
          ]}
        />
        <div className="fable-actions" style={{ marginTop: 'clamp(1.75rem, 4vh, 3rem)' }}>
          <a
            className="fable-button"
            href={demoLink}
            onClick={() => window.fbq?.('track', 'Contact')}
          >
            Agendar demonstração
          </a>
          <button
            className="fable-button fable-button--ghost"
            type="button"
            onClick={() => window.__fable?.scrollTo(1)}
          >
            Ver os documentos gerados
          </button>
        </div>
      </div>

      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.75rem)' }}>
      <div
        className="fable-panel"
        style={{
          position: 'relative',
          zIndex: 8,
          minWidth: 0,
          minHeight: 0,
          aspectRatio: '16 / 11',
          height: 'auto',
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
              minHeight: 0,
              objectFit: 'contain',
              background: 'var(--fable-void)',
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
              minHeight: 0,
              objectFit: 'contain',
              background: 'var(--fable-void)',
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
          {videoPlaying
            ? <Pause aria-hidden="true" size={14} strokeWidth={2} />
            : <Play aria-hidden="true" size={14} strokeWidth={2} />}
          {reducedMotion ? 'Movimento reduzido' : videoPlaying ? 'Pausar' : 'Ver em movimento'}
        </button>
      </div>
      {/* Logo abaixo da demonstração, ainda na primeira tela: mostra para
          quais distribuidoras o pacote é gerado. */}
      <EsteiraConcessionarias />
      </div>
    </div>
  );
}
