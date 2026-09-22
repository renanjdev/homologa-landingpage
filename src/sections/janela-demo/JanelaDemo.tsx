import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Pause, Play, ShieldCheck } from 'lucide-react';
import './janela-demo.css';

// Cortes exatos de public/automacao-loop.mp4 (627 quadros, 20,9 s, montado a partir da gravação da Automação).
// Uma legenda por ato, cada uma parada de 4 a 10 s para dar tempo de ler. Remedir se o loop for reeditado.
const TRECHOS = [
  { inicio: 0, tela: 'Automação · Conformidade', ato: '01 Validar', legenda: 'Projeto validado: 17 regras conferidas' },
  { inicio: 4.0, tela: 'Gerar documentos', ato: '02 Gerar', legenda: 'Formulário, unifilar, blocos e planta gerados', tag: 'Acelerado' },
  { inicio: 7.9, tela: 'Gerar documentos', ato: '02 Gerar', legenda: 'Formulário, unifilar, blocos e planta gerados' },
  { inicio: 10.4, tela: 'Documentos do pedido', ato: '03 Conferir', legenda: 'Unifilar, blocos e planta prontos para conferir' },
] as const;
// O poster e um quadro do ato 03 (o unifilar): antes do primeiro quadro tocado, legenda e titulo seguem ele.
const TRECHO_DO_POSTER = 3;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const trechoEm = (t: number) => TRECHOS.reduce((atual, trecho, i) => (t >= trecho.inicio ? i : atual), 0);

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };
const economizaDados = () => Boolean((navigator as NavigatorWithConnection).connection?.saveData);
const preloaderAtivo = () => Boolean(document.querySelector('.fable-preloader'));

export default function JanelaDemo() {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const trechoRef = useRef(TRECHO_DO_POSTER);
  const pausedByUser = useRef(false);
  const [estatico, setEstatico] = useState(() =>
    typeof window !== 'undefined' && (window.matchMedia(REDUCED_MOTION).matches || economizaDados()),
  );
  // Comeca falso: durante o render o preloader ainda nao esta no DOM; a checagem real e no efeito, depois do commit.
  const [pronto, setPronto] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trecho, setTrecho] = useState<number>(TRECHO_DO_POSTER);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION);
    const sync = () => {
      const agora = preference.matches || economizaDados();
      setEstatico(agora);
      if (agora) {
        videoRef.current?.pause();
        setPlaying(false);
        trechoRef.current = TRECHO_DO_POSTER;
        setTrecho(TRECHO_DO_POSTER);
      }
    };
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  // Nao toca atras do preloader: o ato 01 se perderia e o download disputaria o carregamento.
  useEffect(() => {
    if (pronto) return;
    const observer = new MutationObserver(() => {
      if (!preloaderAtivo()) setPronto(true);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    if (!preloaderAtivo()) setPronto(true);
    return () => observer.disconnect();
  }, [pronto]);

  // Toca so com a moldura na tela; fora dela pausa sem contar como pausa do usuario.
  useEffect(() => {
    if (estatico || !pronto) return;
    const figure = figureRef.current;
    const video = videoRef.current;
    if (!figure || !video || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !pausedByUser.current) void video.play().catch(() => setPlaying(false));
      if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.35 });
    io.observe(figure);
    return () => io.disconnect();
  }, [estatico, pronto]);

  // Sempre o currentTime do video: em alguns navegadores o mediaTime do requestVideoFrameCallback
  // nao zera quando o loop recomeca, e a barra passava de 100% e a legenda ficava presa no ultimo ato.
  const pintar = (video: HTMLVideoElement) => {
    const t = video.currentTime;
    if (video.duration) {
      const fracao = Math.min(1, Math.max(0, t / video.duration));
      progressRef.current?.style.setProperty('transform', `scaleX(${fracao.toFixed(4)})`);
    }
    const proximo = trechoEm(t);
    if (proximo !== trechoRef.current) {
      trechoRef.current = proximo;
      setTrecho(proximo);
    }
  };

  // Legenda e progresso no quadro exato (requestVideoFrameCallback); timeupdate (~4 Hz) como reserva.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playing || typeof video.requestVideoFrameCallback !== 'function') return;
    let handle = 0;
    const tick = () => {
      pintar(video);
      handle = video.requestVideoFrameCallback(tick);
    };
    handle = video.requestVideoFrameCallback(tick);
    return () => video.cancelVideoFrameCallback(handle);
  }, [playing]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      void video.play().catch(() => setPlaying(false));
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  // A rolagem guiada da landing captura Espaco/Enter na janela; aqui a tecla e do botao.
  const protegerTecla = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') event.stopPropagation();
  };

  const atual = TRECHOS[estatico ? TRECHO_DO_POSTER : trecho];

  return (
    <figure ref={figureRef} className="jd-window">
      <div className="jd-bar">
        <span className="jd-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <p className="jd-field" aria-hidden="true">
          <ShieldCheck size={13} strokeWidth={1.75} />
          <span className="jd-crumb">Projetos</span>
          <span className="jd-crumb jd-sep">/</span>
          <b>{atual.tela}</b>
        </p>
        {estatico ? (
          <span className="jd-tag">
            Imagem estática
            <span className="jd-sr">: animação desativada</span>
          </span>
        ) : (
          <button type="button" className="jd-play" onClick={toggle} onKeyDown={protegerTecla}>
            {playing ? <Pause aria-hidden="true" size={14} strokeWidth={2} /> : <Play aria-hidden="true" size={14} strokeWidth={2} />}
            <span>{playing ? 'Pausar' : 'Reproduzir'}</span>
            <span className="jd-sr"> a demonstração em loop</span>
          </button>
        )}
        {!estatico && <span ref={progressRef} className="jd-progress" aria-hidden="true" />}
      </div>
      <div className="jd-stage">
        {estatico ? (
          <img
            className="jd-media"
            src="/automacao-loop-poster.jpg"
            width={1280}
            height={720}
            alt=""
            decoding="async"
          />
        ) : (
          <video
            ref={videoRef}
            className="jd-media"
            muted
            loop
            playsInline
            preload="metadata"
            width={1280}
            height={720}
            poster="/automacao-loop-poster.jpg"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => pintar(event.currentTarget)}
          >
            <source src="/automacao-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption className="jd-caption">
        <span className="jd-sr">
          {estatico
            ? 'Diagrama unifilar gerado pelo Homologa Plus, em prévia ao lado da lista dos documentos do pedido.'
            : 'Demonstração em loop, sem som: o projeto é validado, os documentos são gerados (trecho acelerado) e o diagrama unifilar, o diagrama de blocos e a planta de localização aparecem prontos para conferir.'}
        </span>
        <span className="jd-caption__ato" aria-hidden="true">{atual.ato}</span>
        <span className="jd-caption__texto" aria-hidden="true">{atual.legenda}</span>
        {'tag' in atual && <span className="jd-caption__tag" aria-hidden="true">{atual.tag}</span>}
      </figcaption>
    </figure>
  );
}
