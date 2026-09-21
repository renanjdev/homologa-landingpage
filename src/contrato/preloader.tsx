import React, { useEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const LOAD_WAIT_TIMEOUT = 1500;
const SAFETY_TIMEOUT = 2500;
const LEAVE_UNMOUNT_DELAY = 500;

const linear = (t: number) => t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function waitForLoadAndFonts(timeoutMs: number): Promise<void> {
  const loadPromise =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
  const fontsPromise = document.fonts?.ready ? document.fonts.ready.then(() => undefined) : Promise.resolve();
  const readyPromise = Promise.all([loadPromise, fontsPromise]).then(() => undefined);
  const timeoutPromise = new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs));
  return Promise.race([readyPromise, timeoutPromise]);
}

export function FablePreloader() {
  const [value, setValue] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);
  const lastIntRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setValue(100);
      const timer = window.setTimeout(() => setMounted(false), 300);
      return () => window.clearTimeout(timer);
    }

    let cancelled = false;
    let finished = false;
    let raf = 0;

    const setIntValue = (v: number) => {
      const rounded = Math.round(v);
      if (rounded !== lastIntRef.current) {
        lastIntRef.current = rounded;
        setValue(rounded);
      }
    };

    const startLeave = () => {
      setLeaving(true);
      window.setTimeout(() => {
        if (!cancelled) setMounted(false);
      }, LEAVE_UNMOUNT_DELAY);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setIntValue(100);
      startLeave();
    };

    const animate = (from: number, to: number, duration: number, ease: (t: number) => number, onDone?: () => void) => {
      const started = performance.now();
      const step = (now: number) => {
        if (cancelled || finished) return;
        const t = Math.min(1, (now - started) / duration);
        setIntValue(from + (to - from) * ease(t));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else if (onDone) {
          onDone();
        }
      };
      raf = requestAnimationFrame(step);
    };

    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) finish();
    }, SAFETY_TIMEOUT);

    if (document.readyState === 'complete') {
      animate(0, 100, 450, linear, finish);
    } else {
      animate(0, 90, 600, easeOutCubic, () => {
        waitForLoadAndFonts(LOAD_WAIT_TIMEOUT).then(() => {
          if (cancelled || finished) return;
          animate(90, 100, 250, linear, finish);
        });
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(safetyTimer);
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
