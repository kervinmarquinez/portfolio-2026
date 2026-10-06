import { describe, expect, it } from "vitest";
import { LOOP_EPSILON, activeChapter, activeNote, next, seek, start, step, type PlayerState, type Segment } from "./playerLogic";

const segments: Segment[] = [
  { loopStart: 10, loopEnd: 15 },
  { loopStart: 30, loopEnd: 36 },
];

const playing = (index: number): PlayerState => ({ status: "playing", index });
const waiting = (index: number): PlayerState => ({ status: "waiting", index });

describe("start", () => {
  it("empieza desde el principio hacia la primera pregunta", () => {
    expect(start()).toEqual({ state: playing(0), seekTo: 0 });
  });
});

describe("step", () => {
  it("no cambia nada antes del bucle", () => {
    expect(step(playing(0), 5, segments)).toEqual({ state: playing(0) });
  });

  it("entra en espera al llegar al inicio del bucle", () => {
    expect(step(playing(0), 10, segments)).toEqual({ state: waiting(0) });
  });

  it("dentro del bucle sigue esperando sin saltar", () => {
    expect(step(waiting(0), 12, segments)).toEqual({ state: waiting(0) });
  });

  it("vuelve al inicio del bucle justo antes de su final", () => {
    expect(step(waiting(0), 15 - LOOP_EPSILON, segments)).toEqual({ state: waiting(0), seekTo: 10 });
  });

  it("si el tiempo salta más allá del bucle (pestaña inactiva), vuelve a él", () => {
    expect(step(playing(0), 25, segments)).toEqual({ state: waiting(0), seekTo: 10 });
    expect(step(waiting(0), 25, segments)).toEqual({ state: waiting(0), seekTo: 10 });
  });

  it("tras la última pregunta deja correr el vídeo hasta el final", () => {
    expect(step(playing(2), 40, segments)).toEqual({ state: playing(2) });
  });

  it("no hace nada en reposo ni al terminar", () => {
    expect(step({ status: "idle" }, 12, segments)).toEqual({ state: { status: "idle" } });
    expect(step({ status: "ended" }, 12, segments)).toEqual({ state: { status: "ended" } });
  });
});

describe("next", () => {
  it("sale del bucle desde su final y avanza a la siguiente pregunta", () => {
    expect(next(waiting(0), segments)).toEqual({ state: playing(1), seekTo: 15 });
  });

  it("desde la última pregunta pasa al tramo final", () => {
    expect(next(waiting(1), segments)).toEqual({ state: playing(2), seekTo: 36 });
  });

  it("fuera de un bucle no hace nada", () => {
    expect(next(playing(0), segments)).toEqual({ state: playing(0) });
    expect(next({ status: "idle" }, segments)).toEqual({ state: { status: "idle" } });
  });
});

describe("seek", () => {
  it("antes del primer bucle avanza hacia la primera pregunta", () => {
    expect(seek(0, segments)).toEqual(playing(0));
    expect(seek(9.9, segments)).toEqual(playing(0));
  });

  it("dentro de un bucle queda esperando en esa pregunta", () => {
    expect(seek(10, segments)).toEqual(waiting(0));
    expect(seek(33, segments)).toEqual(waiting(1));
  });

  it("entre dos bucles avanza hacia la siguiente pregunta", () => {
    expect(seek(15, segments)).toEqual(playing(1));
    expect(seek(20, segments)).toEqual(playing(1));
  });

  it("tras el último bucle deja correr el vídeo hasta el final", () => {
    expect(seek(36, segments)).toEqual(playing(2));
    expect(seek(50, segments)).toEqual(playing(2));
  });

  it("si cae en el margen final de un bucle, cuenta como pasado", () => {
    expect(seek(15 - LOOP_EPSILON, segments)).toEqual(playing(1));
  });
});

describe("activeNote", () => {
  const notes = [
    { start: 20, end: 22 },
    { start: 24, end: 26 },
  ];

  it("devuelve el inciso visible en ese momento", () => {
    expect(activeNote(20, notes)).toBe(0);
    expect(activeNote(25.5, notes)).toBe(1);
  });

  it("fuera de los incisos no hay ninguno", () => {
    expect(activeNote(19.9, notes)).toBe(-1);
    expect(activeNote(22, notes)).toBe(-1);
    expect(activeNote(30, notes)).toBe(-1);
  });
});

describe("activeChapter", () => {
  const starts = [0, 211];

  it("devuelve el tramo que ha empezado más recientemente", () => {
    expect(activeChapter(0, starts)).toBe(0);
    expect(activeChapter(210.9, starts)).toBe(0);
    expect(activeChapter(211, starts)).toBe(1);
    expect(activeChapter(500, starts)).toBe(1);
  });

  it("antes del primer tramo no hay ninguno", () => {
    expect(activeChapter(5, [10, 20])).toBe(-1);
  });
});
