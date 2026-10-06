"use client";

/* Reproductor interactivo del pregón: el vídeo avanza solo y, cuando habla el
   pregonero, la escena se queda en bucle hasta que el visitante pulsa continuar.
   Los incisos son frases suyas que aparecen un momento sin detener el vídeo.
   La lógica de estados vive en playerLogic.ts; aquí solo se conecta con el <video>. */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { activeChapter, activeNote, next as nextQuestion, seek, start, step, type PlayerState, type StepResult } from "./playerLogic";
import { PREGON_CAPTIONS_URL, PREGON_POSTER_URL, PREGON_VIDEO_URL, chapterStarts, notes, segments } from "./playerSegments";

type Chapter = { character: string };
type Text = { text: string };

const controlButton =
  "w-8 h-8 md:w-9 md:h-9 rounded-full text-paper flex items-center justify-center hover:bg-paper/15 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper";

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function Icon({ name }: { name: "play" | "pause" | "sound" | "muted" | "captions" | "expand" | "collapse" }) {
  const paths = {
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
    pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" stroke="none" />,
    sound: <><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" /></>,
    muted: <><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" /><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" /></>,
    captions: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 10.5a2 2 0 1 0 0 3M16.5 10.5a2 2 0 1 0 0 3" /></>,
    expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
    collapse: <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />,
  };
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      {paths[name]}
    </svg>
  );
}

export default function InteractivePlayer() {
  const t = useTranslations("caseStudy.pregon.player");
  const chapters = t.raw("chapters") as Chapter[];
  const loops = t.raw("loops") as Text[];
  const noteTexts = t.raw("notes") as Text[];

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stateRef = useRef<PlayerState>({ status: "idle" });
  const [state, setState] = useState<PlayerState>({ status: "idle" });
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const apply = useCallback((result: StepResult) => {
    const video = videoRef.current;
    if (video && result.seekTo !== undefined) video.currentTime = result.seekTo;
    if (result.state !== stateRef.current) {
      stateRef.current = result.state;
      setState(result.state);
    }
  }, []);

  const running = state.status === "playing" || state.status === "waiting";

  // Comprobación por frame: requestVideoFrameCallback salta al inicio del bucle
  // en el frame exacto; requestAnimationFrame como alternativa.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !running) return;
    const hasVideoFrames = "requestVideoFrameCallback" in video;
    let handle = 0;
    const tick = () => {
      apply(step(stateRef.current, video.currentTime, segments));
      schedule();
    };
    const schedule = () => {
      handle = hasVideoFrames ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
    };
    schedule();
    return () => {
      if (hasVideoFrames) video.cancelVideoFrameCallback(handle);
      else cancelAnimationFrame(handle);
    };
  }, [running, apply]);

  // El vídeo puede cargar sus metadatos antes de que React enlace onLoadedMetadata.
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= HTMLMediaElement.HAVE_METADATA) setDuration(video.duration);
  }, []);

  useEffect(() => {
    const track = videoRef.current?.textTracks[0];
    if (track) track.mode = captions ? "showing" : "hidden";
  }, [captions]);

  // Pantalla completa sobre todo el reproductor (no solo el <video>) para conservar
  // la tarjeta de la pregunta. En iPhone no existe la API y el botón no se muestra.
  useEffect(() => {
    setCanFullscreen(document.fullscreenEnabled);
    const onChange = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else containerRef.current?.requestFullscreen().catch(() => {});
  };

  const play = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleStart = () => {
    apply(start());
    play();
    containerRef.current?.focus();
  };

  const handleNext = () => {
    apply(nextQuestion(stateRef.current, segments));
    play();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    else video.pause();
  };

  const handleSeek = (to: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = to;
    setTime(to);
    apply({ state: seek(to, segments) });
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!running) return;
    // Las flechas sobre la barra de progreso mueven la barra, no pasan de pregunta.
    if (e.target instanceof HTMLInputElement && e.key.startsWith("Arrow")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === " " && e.target === containerRef.current) {
      e.preventDefault();
      togglePlay();
    } else if ((e.key === "f" || e.key === "F") && canFullscreen) {
      toggleFullscreen();
    }
  };

  if (!PREGON_VIDEO_URL) {
    return (
      <div className="relative w-full aspect-video rounded-sm ring-1 ring-ink/[0.07] bg-surface flex items-center justify-center">
        <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase">{t("unavailable")}</p>
      </div>
    );
  }

  const index = state.status === "playing" || state.status === "waiting" ? state.index : -1;
  const current = loops[index];
  const chapter = running ? chapters[activeChapter(time, chapterStarts)] : undefined;
  const note = running && state.status !== "waiting" ? noteTexts[activeNote(time, notes)] : undefined;
  // Debajo del vídeo hasta xl (con textos largos no cabe encima); superpuesta en
  // pantallas grandes y en pantalla completa, sin llegar nunca a la barra de reproducción.
  const cardPosition = fullscreen
    ? "absolute top-16 left-6 max-w-sm max-h-[calc(100%-9rem)] overflow-y-auto shadow-2xl"
    : "mt-4 xl:mt-0 xl:absolute xl:top-16 xl:left-6 xl:max-w-sm xl:max-h-[calc(100%-9rem)] xl:overflow-y-auto xl:shadow-2xl";
  const percent = (value: number) => `${duration ? (value / duration) * 100 : 0}%`;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={t("videoLabel")}
      className={`relative focus:outline-none ${fullscreen ? "bg-ink flex items-center justify-center" : ""}`}
    >
      <div className={`relative w-full overflow-hidden bg-ink ${fullscreen ? "h-full" : "aspect-video rounded-sm ring-1 ring-ink/[0.07]"}`}>
        <video
          ref={videoRef}
          src={PREGON_VIDEO_URL}
          poster={PREGON_POSTER_URL}
          preload="metadata"
          playsInline
          onClick={running ? togglePlay : undefined}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onEnded={() => apply({ state: { status: "ended" } })}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          className={`w-full h-full ${fullscreen ? "object-contain" : "object-cover"}`}
        >
          {PREGON_CAPTIONS_URL && <track kind="subtitles" srcLang="es" label="Español" src={PREGON_CAPTIONS_URL} />}
        </video>

        {/* Inicio */}
        {state.status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 md:gap-4 pb-3 sm:pb-6 md:pb-10 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent">
            <button
              type="button"
              onClick={handleStart}
              className="group inline-flex items-center gap-2 sm:gap-3 bg-paper text-ink rounded-full pl-4 pr-1.5 py-1.5 sm:pl-6 sm:pr-2 sm:py-2 font-sans text-[10px] sm:text-xs tracking-[0.18em] uppercase hover:bg-paper/90 active:scale-[0.98] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {t("start")}
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-ink text-paper flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Icon name="play" />
              </span>
            </button>
            <p className="hidden sm:block font-sans text-[10px] tracking-[0.22em] text-paper/70 uppercase">{t("soundHint")}</p>
          </div>
        )}

        {/* Personaje de la escena */}
        {chapter && (
          <p className="absolute top-3 left-3 md:top-4 md:left-4 bg-ink/60 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-3 md:py-1.5 font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-paper uppercase tabular-nums">
            {chapter.character}
          </p>
        )}

        {/* Barra de reproducción */}
        {running && (
          <div className="absolute inset-x-0 bottom-0 px-3 md:px-4 pb-1.5 md:pb-2 pt-10 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent">
            <div className="group/bar relative h-4 flex items-center">
              <div className="relative w-full h-1 group-hover/bar:h-1.5 rounded-full bg-paper/25 overflow-hidden transition-[height] duration-200">
                <span className="absolute inset-y-0 left-0 bg-paper" style={{ width: percent(time) }} />
                {/* Tramos de bucle: dónde espera cada pregunta */}
                {duration > 0 && segments.map((segment, i) => (
                  <span
                    key={i}
                    className="absolute inset-y-0 bg-accent"
                    style={{ left: percent(segment.loopStart), width: percent(segment.loopEnd - segment.loopStart) }}
                  />
                ))}
              </div>
              <span
                aria-hidden="true"
                className="absolute w-3 h-3 -ml-1.5 rounded-full bg-paper scale-0 group-hover/bar:scale-100 transition-transform duration-200"
                style={{ left: percent(time) }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={time}
                onChange={(e) => handleSeek(Number(e.target.value))}
                aria-label={t("progress")}
                aria-valuetext={t("progressValue", { current: formatTime(time), total: formatTime(duration) })}
                className="absolute inset-0 w-full h-full opacity-0"
              />
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button type="button" onClick={togglePlay} aria-label={paused ? t("play") : t("pause")} className={controlButton}>
                <Icon name={paused ? "play" : "pause"} />
              </button>
              <p className="font-sans text-[10px] md:text-[11px] tracking-[0.12em] text-paper/80 tabular-nums">
                {formatTime(time)} <span className="text-paper/40">/ {formatTime(duration)}</span>
              </p>
              <div className="flex-1" />
              <button type="button" onClick={toggleMute} aria-label={muted ? t("unmute") : t("mute")} className={controlButton}>
                <Icon name={muted ? "muted" : "sound"} />
              </button>
              {PREGON_CAPTIONS_URL && (
                <button
                  type="button"
                  onClick={() => setCaptions((c) => !c)}
                  aria-label={captions ? t("captionsOff") : t("captionsOn")}
                  aria-pressed={captions}
                  className={`${controlButton} ${captions ? "ring-1 ring-paper/70" : ""}`}
                >
                  <Icon name="captions" />
                </button>
              )}
              {canFullscreen && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? t("exitFullscreen") : t("fullscreen")}
                  className={controlButton}
                >
                  <Icon name={fullscreen ? "collapse" : "expand"} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Final */}
        {state.status === "ended" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-ink/70 px-6 text-center">
            <p className="font-display font-semibold italic text-3xl md:text-4xl text-paper">{t("endedHeading")}</p>
            <button
              type="button"
              onClick={handleStart}
              className="bg-paper text-ink rounded-full px-6 py-3 font-sans text-xs tracking-[0.18em] uppercase hover:bg-paper/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {t("restart")}
            </button>
          </div>
        )}
      </div>

      <div aria-live="polite">
        {/* Bucle: habla el pregonero y la escena espera */}
        {state.status === "waiting" && current && (
          <div className={`${cardPosition} bg-paper rounded-sm ring-1 ring-ink/[0.07] px-6 py-6 animate-fade-in`}>
            <p className="font-sans text-[10px] tracking-[0.22em] text-accent uppercase mb-3">{t("waitingLabel")}</p>
            <p className="font-display italic text-lg md:text-xl text-ink leading-snug mb-6">“{current.text}”</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleNext}
                className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-5 pr-2 py-2 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-ink/85 active:scale-[0.98] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                {t("next")}
                <span className="w-7 h-7 rounded-full bg-paper/[0.12] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <span aria-hidden="true" className="text-sm leading-none">→</span>
                </span>
              </button>
              <span aria-hidden="true" className="hidden md:inline font-sans text-[10px] tracking-[0.18em] text-muted uppercase">{t("nextShortcut")}</span>
            </div>
          </div>
        )}

        {/* Inciso: aparece y desaparece sin detener el vídeo */}
        {note && (
          <div className={`${cardPosition} bg-paper rounded-sm ring-1 ring-ink/[0.07] px-6 py-5 animate-fade-in`}>
            <p className="font-sans text-[10px] tracking-[0.22em] text-accent uppercase mb-2">{t("waitingLabel")}</p>
            <p className="font-display italic text-lg md:text-xl text-ink leading-snug">“{note.text}”</p>
          </div>
        )}
      </div>
    </div>
  );
}
