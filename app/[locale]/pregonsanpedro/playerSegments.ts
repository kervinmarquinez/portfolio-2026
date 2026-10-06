import type { Note, Segment } from "./playerLogic";

// MP4 final en Cloudflare R2 (H.264 1080p a 3,3 Mbps, faststart y fotograma clave
// al inicio de cada bucle). Si se cambia el vídeo, hay que revisar las marcas de abajo.
export const PREGON_VIDEO_URL = "https://pub-361d9295f454479a9ec3f4dcebb764de.r2.dev/Pregon-Final-web.mp4";

// Portada del reproductor antes de empezar: fotograma del título (segundo 1,5 del vídeo).
export const PREGON_POSTER_URL = "/images/pregon-poster.webp";

// TODO: subtítulos en WebVTT (p. ej. "/videos/pregon.es.vtt"). Vacío = sin botón de subtítulos.
export const PREGON_CAPTIONS_URL = "";

// Segundo en que empieza la parte de cada personaje (el nombre que se ve arriba a
// la izquierda). Mismo orden que `caseStudy.pregon.player.chapters` en messages.
export const chapterStarts: number[] = [
  0,   // El Marqués del Duero
  211, // 3:31 · San Pedro de Alcántara
  406, // 6:46 · El padre
];

// Escenas en bucle mientras habla el pregonero, en segundos. Mismo orden que
// `caseStudy.pregon.player.loops` en messages. La parte del padre no tiene bucles.
export const segments: Segment[] = [
  // El Marqués del Duero
  { loopStart: 30, loopEnd: 34 },   // 0:30 → 0:34
  { loopStart: 74, loopEnd: 82 },   // 1:14 → 1:22
  { loopStart: 133, loopEnd: 140 }, // 2:13 → 2:20
  { loopStart: 183, loopEnd: 186 }, // 3:03 → 3:06
  { loopStart: 196, loopEnd: 200 }, // 3:16 → 3:20
  // San Pedro de Alcántara
  { loopStart: 233, loopEnd: 234 }, // 3:53 → 3:54
  { loopStart: 263, loopEnd: 266 }, // 4:23 → 4:26
  { loopStart: 293, loopEnd: 296 }, // 4:53 → 4:56
  { loopStart: 347, loopEnd: 351 }, // 5:47 → 5:51
];

// Incisos del pregonero que aparecen y desaparecen sin detener el vídeo.
// Mismo orden que `caseStudy.pregon.player.notes` en messages.
export const notes: Note[] = [
  { start: 116, end: 118 }, // 1:56 → 1:58
  { start: 120, end: 122 }, // 2:00 → 2:02
  { start: 378, end: 381 }, // 6:18 → 6:21
];
