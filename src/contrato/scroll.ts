import { useEffect, useRef, type RefObject } from 'react';
import type { ScrollFrame } from './types';

const listeners = new Set<(frame: ScrollFrame) => void>();
let lastFrame: ScrollFrame = { y: 0, target: 0, max: 1, progress: 0 };

export const getScrollFrame = () => lastFrame;

export function subscribeScroll(listener: (frame: ScrollFrame) => void) {
  listeners.add(listener);
  listener(lastFrame);
  return () => {
    listeners.delete(listener);
  };
}

function publish(frame: ScrollFrame) {
  lastFrame = frame;
  listeners.forEach((listener) => listener(frame));
}

const sectionSelector = (index: number) => `[data-section="${String(index + 1).padStart(2, '0')}"]`;

/**
 * Rolagem nativa do navegador em todos os dispositivos.
 *
 * A rolagem guiada (roda travada, salto animado de parada em parada) deixava a
 * página "pesada": não respondia na hora nem na velocidade do gesto. Aqui o
 * navegador rola, e o hook só publica a posição (uma vez por quadro) para as
 * revelações e a cena 3D.
 */
export function useFableScroll(total: number): { rootRef: RefObject<HTMLDivElement | null> } {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    const body = document.body;
    const previousFontSize = body.style.fontSize;

    html.classList.add('fable-active', 'fable-native');
    body.classList.add('fable-active');
    body.style.fontSize = '15px';

    let raf = 0;

    const update = () => {
      raf = 0;
      const max = Math.max(1, html.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const progress = Math.min(1, Math.max(0, y / max));
      publish({ y, target: y, max, progress });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const resize = new ResizeObserver(schedule);
    resize.observe(root);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.__fable = {
      total,
      scrollTo: (index) => {
        if (index === 0) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        else root.querySelector(sectionSelector(index))?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      },
    };
    update();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      html.classList.remove('fable-active', 'fable-native');
      body.classList.remove('fable-active');
      body.style.fontSize = previousFontSize;
      delete window.__fable;
    };
  }, [total]);

  return { rootRef };
}
