import { useEffect, useRef, useState, type RefObject } from 'react';
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

export function useVirtualScroll(total: number): {
  rootRef: RefObject<HTMLDivElement | null>;
  progress: number;
} {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      bodyOverflow: body.style.overflow,
      bodyFontSize: body.style.fontSize,
      htmlOverflow: html.style.overflow,
    };

    html.classList.add('fable-active');
    body.classList.add('fable-active');
    body.style.fontSize = '15px';

    if (reduced) {
      window.__fable = {
        total,
        scrollTo: (index) => document.querySelector(`[data-section="${String(index + 1).padStart(2, '0')}"]`)?.scrollIntoView({ behavior: 'smooth' }),
      };
      return () => {
        html.classList.remove('fable-active');
        body.classList.remove('fable-active');
        body.style.overflow = previous.bodyOverflow;
        body.style.fontSize = previous.bodyFontSize;
        html.style.overflow = previous.htmlOverflow;
        delete window.__fable;
      };
    }

    let current = 0;
    let target = 0;
    let max = 1;
    let raf = 0;
    let touchY = 0;
    let lastProgress = -1;

    const clamp = (value: number) => Math.max(0, Math.min(max, value));
    const measure = () => {
      max = Math.max(1, root.scrollHeight - window.innerHeight);
      target = clamp(target);
      current = clamp(current);
    };

    const move = (delta: number) => {
      target = clamp(target + delta);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      move(event.deltaY * 0.92);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY ?? touchY;
      const delta = touchY - nextY;
      touchY = nextY;
      event.preventDefault();
      move(delta * 1.15);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keyDelta: Record<string, number> = {
        ArrowDown: 120,
        ArrowUp: -120,
        PageDown: window.innerHeight * 0.82,
        PageUp: -window.innerHeight * 0.82,
        ' ': window.innerHeight * 0.82,
      };
      if (!(event.key in keyDelta) || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      event.preventDefault();
      move(keyDelta[event.key]);
    };

    const scrollTo = (index: number) => {
      const section = root.querySelector<HTMLElement>(`[data-section="${String(index + 1).padStart(2, '0')}"]`);
      if (!section) return;
      target = clamp(section.offsetTop);
      current += (target - current) * 0.18;
    };

    const tick = () => {
      current += (target - current) * 0.085;
      if (Math.abs(target - current) < 0.05) current = target;
      root.style.transform = `translate3d(0, ${-current}px, 0)`;
      const nextProgress = max > 0 ? current / max : 0;
      document.documentElement.style.setProperty('--fable-progress', nextProgress.toFixed(4));
      const frame = { y: current, target, max, progress: nextProgress };
      publish(frame);
      if (Math.abs(nextProgress - lastProgress) > 0.003) {
        setProgress(nextProgress);
        lastProgress = nextProgress;
      }
      raf = requestAnimationFrame(tick);
    };

    const resize = new ResizeObserver(measure);
    resize.observe(root);
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.__fable = { total, scrollTo };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      html.classList.remove('fable-active');
      body.classList.remove('fable-active');
      body.style.overflow = previous.bodyOverflow;
      body.style.fontSize = previous.bodyFontSize;
      html.style.overflow = previous.htmlOverflow;
      root.style.transform = '';
      document.documentElement.style.removeProperty('--fable-progress');
      delete window.__fable;
    };
  }, [total]);

  return { rootRef, progress };
}
