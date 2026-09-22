import React, { useEffect, useState } from 'react';

export function FablePreloader() {
  const [value, setValue] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(100);
      const timer = window.setTimeout(() => setMounted(false), 900);
      return () => window.clearTimeout(timer);
    }
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - started;
      const next = Math.min(100, Math.round((elapsed / 1450) * 100));
      setValue(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else setLeaving(true);
    };
    raf = requestAnimationFrame(tick);
    const unmount = window.setTimeout(() => setMounted(false), 2350);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(unmount);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div data-preloader className={`fable-preloader ${leaving ? 'is-leaving' : ''}`}>
      <div className="fable-preloader-inner">
        <div className="fable-preloader-count">
          <strong>{String(value).padStart(3, '0')}</strong>
          <span>Preparando o dossiê técnico</span>
        </div>
        <p className="fable-copy" style={{ marginTop: '1.25rem' }}>
          Carregando a experiência Homologa Plus.
        </p>
        <div className="fable-preloader-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${value / 100})` }} />
        </div>
      </div>
    </div>
  );
}
