import { createElement, useEffect, useMemo, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { subscribeScroll } from './scroll';
import type { SectionId } from './types';

export function useSectionPresence(section: SectionId) {
  const [presence, setPresence] = useState(0);

  useEffect(() => {
    const node = document.querySelector<HTMLElement>(`[data-section="${section}"]`);
    if (!node) return;
    let previous = -1;
    return subscribeScroll((frame) => {
      const enter = window.innerHeight * 0.92;
      const value = Math.max(0, Math.min(1, (frame.y + enter - node.offsetTop) / (window.innerHeight * 0.5)));
      if (Math.abs(previous - value) <= 0.02) return;
      previous = value;
      setPresence(value);
    });
  }, [section]);

  return presence;
}

type LineRevealProps = {
  as?: ElementType;
  section: SectionId;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
};

export function LineReveal({ as = 'div', section, lines, className, lineClassName }: LineRevealProps) {
  const presence = useSectionPresence(section);
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
