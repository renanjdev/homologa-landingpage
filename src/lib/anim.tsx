import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * Animações sem dependência externa (substitui o Framer Motion / `motion/react`).
 *
 * Por quê: o bundle do motion pesava ~131KB e era carregado no caminho crítico
 * (MotionConfig no App.tsx). Aqui replicamos os padrões usados na base só com
 * IntersectionObserver + transições CSS — muito mais leve.
 *
 * Acessibilidade: `prefers-reduced-motion` é respeitado em dois níveis — este
 * módulo não aplica transform/opacidade quando o usuário pediu menos movimento,
 * e o index.css ainda zera as durações globalmente como rede de segurança.
 */

const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'; // ease-out suave (sem bounce)

/* prefers-reduced-motion (resolvido no mount; reativo a mudanças) */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

type InViewOpts = { once?: boolean; margin?: string; amount?: number };

/**
 * Revela quando o elemento entra na viewport (substitui `whileInView`).
 * `margin` mapeia direto para o rootMargin (ex.: framer `margin: "-100px"`).
 * Sem IntersectionObserver → mostra de imediato (degrada com segurança).
 */
export function useInView<T extends Element = HTMLElement>(
  opts?: InViewOpts,
): [React.RefObject<T>, boolean] {
  const { once = true, margin = '0px', amount = 0 } = opts ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin: margin, threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin, amount]);

  return [ref, inView];
}

type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** deslocamento inicial (px) — equivalente ao initial.y / initial.x do framer */
  y?: number;
  x?: number;
  /** escala inicial (1 = sem escala) */
  scale?: number;
  /** duração em segundos (igual ao transition.duration do framer) */
  duration?: number;
  /** delay em segundos (igual ao transition.delay) */
  delay?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  /** 'inview' (whileInView) ou 'mount' (initial+animate ao montar) */
  trigger?: 'inview' | 'mount';
  [key: string]: unknown;
};

/**
 * Reveal genérico: fade + deslocamento/escala, disparado por viewport ou no mount.
 * Substitui `<motion.X initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} .../>`.
 */
export function Reveal({
  as = 'div',
  children,
  className,
  style,
  y = 0,
  x = 0,
  scale = 1,
  duration = 0.6,
  delay = 0,
  once = true,
  margin = '0px',
  amount = 0,
  trigger = 'inview',
  ...rest
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLElement>({ once, margin, amount });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shown = reduced || (trigger === 'mount' ? mounted : inView);
  const hasTransform = x !== 0 || y !== 0 || scale !== 1;

  const animStyle: CSSProperties = reduced
    ? {}
    : {
        opacity: shown ? 1 : 0,
        transform: hasTransform
          ? shown
            ? 'translate3d(0,0,0) scale(1)'
            : `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          : undefined,
        transition: `opacity ${duration}s ${EASE}${
          hasTransform ? `, transform ${duration}s ${EASE}` : ''
        }`,
        transitionDelay: delay ? `${delay}s` : undefined,
        willChange: shown ? undefined : 'opacity, transform',
      };

  return createElement(
    as,
    { ref, className, style: { ...animStyle, ...style }, ...rest },
    children,
  );
}

/**
 * Progresso de rolagem da página (0..1). Substitui useScroll + useSpring.
 * Throttle por rAF; suavização fica por conta de uma transição CSS no consumidor.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

/**
 * Presença com entrada E saída (substitui AnimatePresence para modais/drawers).
 * Mantém o elemento montado durante a animação de saída.
 *
 * - `mounted`: renderize o elemento enquanto for true.
 * - `show`: aplique as classes de estado visível/oculto (transição CSS faz o resto).
 */
export function usePresence(
  open: boolean,
  durationMs = 200,
): { mounted: boolean; show: boolean } {
  const [mounted, setMounted] = useState(open);
  const [show, setShow] = useState(open);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let timer = 0;
    if (open) {
      setMounted(true);
      // dois frames: garante que o estado inicial (oculto) pinte antes de animar p/ visível
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShow(true));
      });
    } else {
      setShow(false);
      timer = window.setTimeout(() => setMounted(false), durationMs);
    }
    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (timer) clearTimeout(timer);
    };
  }, [open, durationMs]);

  return { mounted, show };
}
