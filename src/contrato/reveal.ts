import { createElement, useEffect, useMemo, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { subscribeScroll } from './scroll';
import type { SectionId } from './types';

// Posição da seção em relação à tela (0 = entrando pelo rodapé).
const sectionValue = (y: number, node: HTMLElement) =>
  (y + window.innerHeight * 0.92 - node.offsetTop) / (window.innerHeight * 0.5);

// Presença contínua em passos de 0,1 (antes 0,02): ~10 renders por passagem em
// vez de ~50. As transições CSS de quem consome suavizam os passos.
export function useSectionPresence(section: SectionId) {
  const [presence, setPresence] = useState(0);

  useEffect(() => {
    const node = document.querySelector<HTMLElement>(`[data-section="${section}"]`);
    if (!node) return;
    let previous = -1;
    return subscribeScroll((frame) => {
      const value = Math.round(Math.max(0, Math.min(1, sectionValue(frame.y, node))) * 10) / 10;
      if (value === previous) return;
      previous = value;
      setPresence(value);
    });
  }, [section]);

  return presence;
}

/**
 * Entrou/saiu da seção, com histerese. Só muda de estado 2 vezes por passagem
 * (antes: ~50 setState por revelação). A animação fica toda na transição CSS.
 */
export function useSectionEntered(section: SectionId) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = document.querySelector<HTMLElement>(`[data-section="${section}"]`);
    if (!node) return;
    let current = false;
    return subscribeScroll((frame) => {
      const value = sectionValue(frame.y, node);
      const next = current ? value > 0.05 : value > 0.35;
      if (next === current) return;
      current = next;
      setEntered(next);
    });
  }, [section]);

  return entered;
}

type LineRevealProps = {
  as?: ElementType;
  section: SectionId;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
};

export function LineReveal({ as = 'div', section, lines, className, lineClassName }: LineRevealProps) {
  const presence = useSectionEntered(section) ? 1 : 0;
  const children = useMemo(() => lines.map((line, index) => createElement(
    'span',
    { className: 'fable-line-mask', key: index },
    createElement('span', {
      className: lineClassName,
      style: {
        '--line-visible': presence,
        '--line-index': index,
      } as CSSProperties,
    }, line),
  )), [lineClassName, lines, presence]);

  return createElement(as, { className }, children);
}
