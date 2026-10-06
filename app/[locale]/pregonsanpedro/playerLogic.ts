/* Lógica del reproductor interactivo, sin React.
   El vídeo avanza hasta el bucle de cada pregunta y se queda repitiéndolo
   hasta que el visitante pide la siguiente pregunta. */

export type Segment = {
  /** Segundo en el que empieza el bucle de espera (la pregunta ya se ha hecho). */
  loopStart: number;
  /** Segundo en el que termina el bucle; al pedir la siguiente pregunta se sigue desde aquí. */
  loopEnd: number;
};

export type PlayerState =
  | { status: "idle" }
  /** `index` es la pregunta hacia la que avanza el vídeo (== segments.length en el tramo final). */
  | { status: "playing"; index: number }
  | { status: "waiting"; index: number }
  | { status: "ended" };

export type StepResult = { state: PlayerState; seekTo?: number };

/** Margen para volver al inicio del bucle antes de que se pinte el frame posterior a loopEnd. */
export const LOOP_EPSILON = 0.05;

export function start(): StepResult {
  return { state: { status: "playing", index: 0 }, seekTo: 0 };
}

/** Se llama en cada frame con el tiempo actual del vídeo. */
export function step(state: PlayerState, time: number, segments: Segment[]): StepResult {
  if (state.status !== "playing" && state.status !== "waiting") return { state };

  const segment = segments[state.index];
  if (!segment) return { state };

  if (time >= segment.loopEnd - LOOP_EPSILON) {
    return { state: { status: "waiting", index: state.index }, seekTo: segment.loopStart };
  }
  if (state.status === "playing" && time >= segment.loopStart) {
    return { state: { status: "waiting", index: state.index } };
  }
  return { state };
}

/** Estado que corresponde a un salto manual con la barra de progreso. */
export function seek(time: number, segments: Segment[]): PlayerState {
  const index = segments.findIndex((s) => time < s.loopEnd - LOOP_EPSILON);
  if (index === -1) return { status: "playing", index: segments.length };
  return time >= segments[index].loopStart
    ? { status: "waiting", index }
    : { status: "playing", index };
}

/** Sale del bucle actual y continúa el vídeo hacia la siguiente pregunta. */
export function next(state: PlayerState, segments: Segment[]): StepResult {
  if (state.status !== "waiting") return { state };
  return {
    state: { status: "playing", index: state.index + 1 },
    seekTo: segments[state.index].loopEnd,
  };
}

/** Inciso: una frase del pregonero que se muestra un momento sin detener el vídeo. */
export type Note = { start: number; end: number };

/** Índice del inciso visible en `time`, o -1 si no hay ninguno. */
export function activeNote(time: number, notes: Note[]): number {
  return notes.findIndex((n) => time >= n.start && time < n.end);
}

/** Índice del tramo (personaje en pantalla) que corresponde a `time`, según los segundos en que empieza cada uno. */
export function activeChapter(time: number, starts: number[]): number {
  let index = -1;
  starts.forEach((start, i) => {
    if (time >= start) index = i;
  });
  return index;
}
