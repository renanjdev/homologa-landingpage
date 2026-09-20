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
    let touchStartY = 0;
    let touchTriggered = false;
    let activeAnchorIndex = 0;
    let anchors: number[] = [];
    let sectionAnchors: number[] = [];
    let wheelIntent = 0;
    let wheelDirection = 0;
    let wheelGestureConsumed = false;
    let wheelGestureTimer = 0;
    let lastTickTime = performance.now();
    let lastProgress = -1;
    let lastRenderedY = Number.NaN;
    let lastPublishedY = Number.NaN;

    const clamp = (value: number) => Math.max(0, Math.min(max, value));
    const nearestAnchorIndex = (value: number) => anchors.reduce((nearest, anchor, index) => (
      Math.abs(anchor - value) < Math.abs(anchors[nearest] - value) ? index : nearest
    ), 0);

    const measure = () => {
      const previousTarget = target;
      max = Math.max(1, root.scrollHeight - window.innerHeight);
      const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-section]'));
      const rootTop = root.getBoundingClientRect().top;
      const navHeight = document.querySelector<HTMLElement>('.fable-nav')?.getBoundingClientRect().height ?? 0;
      const anchorInset = navHeight + Math.min(24, window.innerHeight * 0.03);
      const candidates: number[] = [];

      sectionAnchors = sections.map((section) => {
        const sectionStart = clamp(section.offsetTop);
        candidates.push(sectionStart);
        section.querySelectorAll<HTMLElement>('[data-scroll-anchor]').forEach((anchor) => {
          candidates.push(clamp(anchor.getBoundingClientRect().top - rootTop - anchorInset));
        });
        return sectionStart;
      });

      anchors = candidates
        .sort((a, b) => a - b)
        .filter((anchor, index, values) => index === 0 || anchor - values[index - 1] >= 96);
      activeAnchorIndex = anchors.length ? nearestAnchorIndex(previousTarget) : 0;
      target = anchors[activeAnchorIndex] ?? clamp(previousTarget);
      current = clamp(current);
    };

    const moveToAnchor = (index: number) => {
      if (!anchors.length) return;
      activeAnchorIndex = Math.max(0, Math.min(index, anchors.length - 1));
      target = anchors[activeAnchorIndex] ?? target;
    };

    const moveToSection = (index: number) => {
      const sectionTarget = sectionAnchors[Math.max(0, Math.min(index, sectionAnchors.length - 1))];
      if (sectionTarget === undefined || !anchors.length) return;
      activeAnchorIndex = nearestAnchorIndex(sectionTarget);
      target = anchors[activeAnchorIndex] ?? sectionTarget;
    };

    const stepAnchor = (direction: number) => {
      moveToAnchor(activeAnchorIndex + Math.sign(direction));
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1;
      const delta = event.deltaY * multiplier;
      const direction = Math.sign(delta);
      if (!direction) return;

      window.clearTimeout(wheelGestureTimer);
      wheelGestureTimer = window.setTimeout(() => {
        wheelIntent = 0;
        wheelDirection = 0;
        wheelGestureConsumed = false;
      }, 220);

      if (wheelGestureConsumed) return;
      if (direction !== wheelDirection) {
        wheelIntent = 0;
        wheelDirection = direction;
      }

      wheelIntent += Math.abs(delta);
      if (wheelIntent < 32) return;
      wheelGestureConsumed = true;
      stepAnchor(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
      touchStartY = touchY;
      touchTriggered = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY ?? touchY;
      touchY = nextY;
      event.preventDefault();
      const delta = touchStartY - nextY;
      if (!touchTriggered && Math.abs(delta) >= 42) {
        touchTriggered = true;
        stepAnchor(Math.sign(delta));
      }
    };

    const onTouchEnd = () => {
      touchTriggered = false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const targetElement = event.target;
      if (
        targetElement instanceof HTMLInputElement
        || targetElement instanceof HTMLTextAreaElement
        || targetElement instanceof HTMLSelectElement
        || (targetElement instanceof HTMLElement && targetElement.isContentEditable)
      ) return;

      const direction = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' '
        ? (event.key === ' ' && event.shiftKey ? -1 : 1)
        : event.key === 'ArrowUp' || event.key === 'PageUp'
          ? -1
          : 0;
      if (!direction && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      if (event.key === 'Home') moveToAnchor(0);
      else if (event.key === 'End') moveToAnchor(anchors.length - 1);
      else stepAnchor(direction);
    };

    const scrollTo = (index: number) => {
      const section = root.querySelector<HTMLElement>(`[data-section="${String(index + 1).padStart(2, '0')}"]`);
      if (!section) return;
      moveToSection(index);
      current = target;
      root.style.transform = `translate3d(0, ${-current}px, 0)`;
      lastRenderedY = current;
      const nextProgress = max > 0 ? current / max : 0;
      publish({ y: current, target, max, progress: nextProgress });
      lastPublishedY = current;
    };

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - lastTickTime);
      lastTickTime = now;
      const smoothing = 1 - Math.exp(-elapsed / 140);
      current += (target - current) * smoothing;
      if (Math.abs(target - current) < 0.05) current = target;
      if (!Number.isFinite(lastRenderedY) || Math.abs(current - lastRenderedY) > 0.05) {
        root.style.transform = `translate3d(0, ${-current}px, 0)`;
        lastRenderedY = current;
      }
      const nextProgress = max > 0 ? current / max : 0;
      document.documentElement.style.setProperty('--fable-progress', nextProgress.toFixed(4));
      const frame = { y: current, target, max, progress: nextProgress };
      lastFrame = frame;
      if (!Number.isFinite(lastPublishedY) || Math.abs(current - lastPublishedY) > 0.25) {
        publish(frame);
        lastPublishedY = current;
      }
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
    window.addEventListener('touchend', onTouchEnd, { passive: true });
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
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(wheelGestureTimer);
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
