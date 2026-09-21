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
 * Dois modos:
 * - guiado (mouse/trackpad em desktop): body travado, a roda avança de âncora em
 *   âncora com inércia interpolada.
 * - nativo (toque, sem hover, ou prefers-reduced-motion): rolagem do navegador.
 *   No celular o modo guiado impedia o gesto de arremesso e pulava trechos de
 *   conteúdo maiores que a tela. Os frames continuam publicados a partir do
 *   scroll da janela, então revelações, cena e barra própria seguem funcionando.
 */
// Sem estado React de progresso: re-renderizava a página inteira durante a
// rolagem. O progresso vive em --fable-progress e em subscribeScroll.
export function useVirtualScroll(total: number): {
  rootRef: RefObject<HTMLDivElement | null>;
} {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const guided = !reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      bodyOverflow: body.style.overflow,
      bodyFontSize: body.style.fontSize,
      htmlOverflow: html.style.overflow,
    };

    html.classList.add('fable-active');
    body.classList.add('fable-active');
    if (!guided) html.classList.add('fable-native');
    body.style.fontSize = '15px';

    // Variável só na barra própria: no <html> ela forçava recálculo de estilo
    // da página inteira a cada quadro de rolagem.
    const progressHost = document.querySelector<HTMLElement>('.fable-scrollbar') ?? html;
    let lastProgressText = '';
    const setProgressVar = (value: number) => {
      const text = value.toFixed(4);
      if (text === lastProgressText) return;
      lastProgressText = text;
      progressHost.style.setProperty('--fable-progress', text);
    };

    const restore = () => {
      html.classList.remove('fable-active', 'fable-native');
      body.classList.remove('fable-active');
      body.style.overflow = previous.bodyOverflow;
      body.style.fontSize = previous.bodyFontSize;
      html.style.overflow = previous.htmlOverflow;
      root.style.transform = '';
      progressHost.style.removeProperty('--fable-progress');
      delete window.__fable;
    };

    if (!guided) {
      let raf = 0;
      const update = () => {
        raf = 0;
        const max = Math.max(1, html.scrollHeight - window.innerHeight);
        const y = window.scrollY;
        const nextProgress = Math.min(1, Math.max(0, y / max));
        setProgressVar(nextProgress);
        publish({ y, target: y, max, progress: nextProgress });
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
        scrollTo: (index) => root.querySelector(sectionSelector(index))?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }),
      };
      update();
      return () => {
        cancelAnimationFrame(raf);
        resize.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        restore();
      };
    }

    const viewport = root.parentElement ?? root;
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
    let lastRenderedY = Number.NaN;
    let lastPublishedY = Number.NaN;

    const clamp = (value: number) => Math.max(0, Math.min(max, value));
    const nearestAnchorIndex = (value: number) => anchors.reduce((nearest, anchor, index) => (
      Math.abs(anchor - value) < Math.abs(anchors[nearest] - value) ? index : nearest
    ), 0);

    const render = (force = false) => {
      if (force || !Number.isFinite(lastRenderedY) || Math.abs(current - lastRenderedY) > 0.05) {
        root.style.transform = `translate3d(0, ${-current}px, 0)`;
        lastRenderedY = current;
      }
      const nextProgress = max > 0 ? current / max : 0;
      setProgressVar(nextProgress);
      const frame = { y: current, target, max, progress: nextProgress };
      lastFrame = frame;
      if (force || !Number.isFinite(lastPublishedY) || Math.abs(current - lastPublishedY) > 0.25) {
        publish(frame);
        lastPublishedY = current;
      }
    };

    // O loop só roda enquanto há movimento: parado, não consome CPU nem bateria.
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - lastTickTime);
      lastTickTime = now;
      const smoothing = 1 - Math.exp(-elapsed / 140);
      current += (target - current) * smoothing;
      const settled = Math.abs(target - current) < 0.05;
      if (settled) current = target;
      render(settled);
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf) return;
      lastTickTime = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const measure = () => {
      const previousTarget = target;
      // Posição livre (vinda de foco/Ctrl+F) não é reencaixada numa âncora quando
      // o layout muda (ex.: abrir um item do FAQ pelo teclado).
      const wasOnAnchor = !anchors.length || anchors.some((anchor) => Math.abs(anchor - previousTarget) < 1);
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
      target = wasOnAnchor ? anchors[activeAnchorIndex] ?? clamp(previousTarget) : clamp(previousTarget);
      current = clamp(current);
      wake();
    };

    const moveToAnchor = (index: number) => {
      if (!anchors.length) return;
      activeAnchorIndex = Math.max(0, Math.min(index, anchors.length - 1));
      target = anchors[activeAnchorIndex] ?? target;
      wake();
    };

    const moveToSection = (index: number) => {
      const sectionTarget = sectionAnchors[Math.max(0, Math.min(index, sectionAnchors.length - 1))];
      if (sectionTarget === undefined || !anchors.length) return;
      activeAnchorIndex = nearestAnchorIndex(sectionTarget);
      target = anchors[activeAnchorIndex] ?? sectionTarget;
    };

    // O passo parte da posição atual: fora de âncora, vai para a próxima âncora
    // no sentido pedido (sem pular a mais próxima nem dar passo de poucos px).
    const stepAnchor = (direction: number) => {
      if (!anchors.length) return;
      const from = target;
      const next = direction > 0
        ? anchors.findIndex((anchor) => anchor > from + 1)
        : anchors.length - 1 - [...anchors].reverse().findIndex((anchor) => anchor < from - 1);
      if (next < 0 || next >= anchors.length) return;
      moveToAnchor(next);
    };

    // Foco por Tab, Ctrl+F e âncoras fazem o navegador rolar o container
    // overflow:hidden por conta própria, fora da rolagem guiada. Absorve esse
    // deslocamento na posição virtual, sem salto visual, e zera o container.
    const onViewportScroll = () => {
      const delta = viewport.scrollTop;
      if (viewport.scrollLeft) viewport.scrollLeft = 0;
      if (!delta) return;
      viewport.scrollTop = 0;
      current = clamp(current + delta);
      target = current;
      activeAnchorIndex = anchors.length ? nearestAnchorIndex(current) : 0;
      render(true);
    };

    // Shift+Tab para um elemento acima (o container não rola para trás de 0) ou
    // foco que ficou sob a navbar: traz o elemento focado para a área visível.
    let focusRaf = 0;
    const onFocusIn = (event: FocusEvent) => {
      const el = event.target;
      if (!(el instanceof Element) || !root.contains(el)) return;
      // Clique de mouse não empurra a página; só foco por teclado.
      if (!el.matches(':focus-visible')) {
        requestAnimationFrame(onViewportScroll);
        return;
      }
      cancelAnimationFrame(focusRaf);
      focusRaf = requestAnimationFrame(() => {
        onViewportScroll();
        const rect = el.getBoundingClientRect();
        const navHeight = document.querySelector<HTMLElement>('.fable-nav')?.getBoundingClientRect().height ?? 0;
        let shift = 0;
        if (rect.top < navHeight + 8 || rect.height > window.innerHeight - navHeight - 48) shift = rect.top - navHeight - 24;
        else if (rect.bottom > window.innerHeight - 8) shift = rect.bottom - window.innerHeight + 24;
        if (!shift) return;
        current = clamp(current + shift);
        target = current;
        activeAnchorIndex = anchors.length ? nearestAnchorIndex(current) : 0;
        render(true);
      });
    };

    const insideDialog = (node: EventTarget | null) =>
      node instanceof Element && !!node.closest('[role="dialog"], [aria-modal="true"]');

    const onWheel = (event: WheelEvent) => {
      // Ctrl+roda é zoom; dentro de diálogo (cookies) a rolagem é dele.
      if (event.ctrlKey || insideDialog(event.target)) return;
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

    // Toque em notebook com tela sensível (o modo guiado só liga com mouse primário).
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
      touchStartY = touchY;
      touchTriggered = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (insideDialog(event.target)) return;
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
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      const targetElement = event.target;
      if (
        targetElement instanceof HTMLInputElement
        || targetElement instanceof HTMLTextAreaElement
        || targetElement instanceof HTMLSelectElement
        || (targetElement instanceof HTMLElement && targetElement.isContentEditable)
        || insideDialog(targetElement)
      ) return;
      // Espaço sobre botão/link é ativação, não rolagem.
      if (
        event.key === ' '
        && targetElement instanceof Element
        && targetElement.closest('button, a[href], summary, [role="button"], [role="tab"], [role="link"], [role="checkbox"], [role="switch"], [role="menuitem"], [role="option"]')
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
      const section = root.querySelector<HTMLElement>(sectionSelector(index));
      if (!section) return;
      moveToSection(index);
      current = target;
      render(true);
    };

    const resize = new ResizeObserver(measure);
    resize.observe(root);
    measure();
    window.addEventListener('resize', measure);
    viewport.addEventListener('scroll', onViewportScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    root.addEventListener('focusin', onFocusIn);
    window.__fable = { total, scrollTo };
    render(true);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener('resize', measure);
      viewport.removeEventListener('scroll', onViewportScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      root.removeEventListener('focusin', onFocusIn);
      cancelAnimationFrame(focusRaf);
      window.clearTimeout(wheelGestureTimer);
      restore();
    };
  }, [total]);

  return { rootRef };
}
