"use client";

/* PREGÓN HERMANDAD SAN PEDRO DE ALCÁNTARA 2026 — Caso de estudio.
   Vídeo con IA en el que tres personajes conversan en directo con el pregonero. */

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { brTags, richTags } from "@/components/richText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractivePlayer from "./InteractivePlayer";

// Grabación del pregón (RTV Marbella, publicada por OSP); arranca en 35:06, cuando se proyecta la pieza.
const RTV_YOUTUBE_ID = "Fi2Zxp8o5EI";
const RTV_START_SECONDS = 35 * 60 + 6;

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const reveal = (delay = 0, visible = false) => ({
  style: {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transitionDelay: `${delay}ms`,
  },
  className: "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
});

// Structural image data; alt text comes from messages.
type Asset = { src: string; w: number; h: number };
const still = (name: string): Asset => ({ src: `/images/pregon-${name}.webp`, w: 1920, h: 1080 });
const frames = (character: string) => [1, 2, 3, 4].map((n) => still(`${character}-frame-${n}`));
const characterAssets = [
  { sheet: { src: "/images/pregon-marques-character-sheet.webp", w: 2400, h: 1350 }, frames: frames("marques") },
  { sheet: { src: "/images/pregon-san-pedro-character-sheet.webp", w: 2400, h: 962 }, frames: frames("san-pedro") },
  { sheet: { src: "/images/pregon-padre-character-sheet.webp", w: 2400, h: 1028 }, frames: frames("padre") },
];
const settingAssets = ["san-pedro-alcantara", "el-palancar", "plaza-iglesia"].map((place) =>
  [1, 2, 3].map((n) => still(`escenario-${place}-${n}`))
);

type MetaItem = { label: string; value: string };
type HowStep = { number: string; text: string };
type Character = {
  number: string;
  name: string;
  role: string;
  who: string[];
  approach: string[];
  sheetAlt: string;
  frameAlts: string[];
};
type Setting = { number: string; name: string; body: string; alts: string[] };
type ProcessStep = { number: string; title: string; body: string };
type Tool = { name: string; desc: string };
type Lightbox = { src: string; alt: string; w: number; h: number };

/** Separador con numeral romano + título a la izquierda y cita + texto a la derecha. */
function SectionIntro({
  id,
  numeral,
  heading,
  quote,
  children,
}: {
  id: string;
  numeral: string;
  heading: ReactNode;
  quote: string;
  children?: ReactNode;
}) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref}>
      <div
        style={reveal(0, visible).style}
        className={`${reveal(0, visible).className} flex items-center gap-4 mb-10`}
      >
        <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">{numeral}</p>
        <div className="flex-1 h-px bg-ink/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-20">
        <div style={reveal(80, visible).style} className={reveal(80, visible).className}>
          <h2 id={id} className="font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight">
            {heading}
          </h2>
        </div>
        <div style={reveal(100, visible).style} className={reveal(100, visible).className}>
          <p className="font-display italic text-2xl md:text-3xl text-ink/80 leading-[1.4] border-l-2 border-accent/50 pl-6">
            &ldquo;{quote}&rdquo;
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
}

function Placeholder({ label, w, h }: { label: string; w: number; h: number }) {
  const tp = useTranslations("caseStudy.pregon");
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: `${w} / ${h}` }}
      className="w-full rounded-sm ring-1 ring-ink/[0.07] bg-surface flex flex-col items-center justify-center gap-1.5 px-4 text-center"
    >
      <span className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase">{label}</span>
      <span className="font-sans text-[10px] tracking-[0.18em] text-ink/30 uppercase">{tp("placeholderLabel")}</span>
    </div>
  );
}

function GalleryImage({
  asset,
  alt,
  sizes,
  onOpen,
}: {
  asset: Asset;
  alt: string;
  sizes: string;
  onOpen: (lightbox: Lightbox) => void;
}) {
  const tc = useTranslations("caseStudy.common");
  const { src, w, h } = asset;
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt, w, h })}
      aria-label={tc("enlargeImageAria", { name: alt })}
      className="group/img block w-full overflow-hidden rounded-sm ring-1 ring-ink/[0.07] bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.03]"
        sizes={sizes}
      />
    </button>
  );
}

export default function CaseStudy() {
  const t = useTranslations("caseStudy.pregon");
  const tc = useTranslations("caseStudy.common");

  const meta = t.raw("meta") as MetaItem[];
  const howSteps = t.raw("live.steps") as HowStep[];
  const characters = t.raw("characters.items") as Character[];
  const settings = t.raw("settings.items") as Setting[];
  const processSteps = t.raw("process.steps") as ProcessStep[];
  const tools = t.raw("tools.items") as Tool[];

  const hero    = useReveal(0.01);
  const metaRow = useReveal(0.05);
  const player  = useReveal(0.05);
  const bottom  = useReveal(0.08);

  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [lightbox]);

  const bodyText = "font-sans text-base text-ink/60 leading-[1.85]";
  const smallLabel = "font-sans text-[10px] tracking-[0.22em] text-muted uppercase";

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          aria-labelledby="case-heading"
          className="relative pt-36 md:pt-48 pb-16 md:pb-20 px-6 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto">

            {/* Back link */}
            <Link
              href="/#proyectos"
              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] text-muted uppercase hover:text-ink transition-colors duration-300 mb-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
            >
              <span aria-hidden="true">←</span>
              {tc("backShort")}
            </Link>

            {/* Section label */}
            <div
              ref={hero.ref}
              className="flex items-center gap-4 mb-12 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
            >
              <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">{tc("label")}</span>
              <div className="flex-1 h-px bg-ink/10" />
              <span className="font-sans text-[10px] tracking-[0.2em] text-muted tabular-nums">{t("index")}</span>
            </div>

            {/* Mega title */}
            <h1
              id="case-heading"
              className="font-display font-semibold italic leading-[0.88] tracking-tight text-ink
                         text-[13vw] sm:text-[11vw] md:text-[9vw] xl:text-[8.5vw]
                         mb-8 md:mb-10
                         transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(32px)" }}
            >
              {t.rich("title", brTags)}
            </h1>

            <p
              className="font-sans text-base md:text-lg text-ink/55 leading-relaxed max-w-xl
                         transition-[opacity,transform] duration-[900ms] delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(24px)" }}
            >
              {t("intro")}
            </p>

          </div>
        </section>

        {/* ── Meta strip ───────────────────────────────────── */}
        <section aria-label={tc("projectSheetAria")} className="px-6 pb-20 md:pb-28">
          <div
            ref={metaRow.ref}
            className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden"
          >
            {meta.map(({ label, value }, i) => (
              <dl
                key={label}
                style={reveal(i * 60, metaRow.visible).style}
                className={`${reveal(i * 60, metaRow.visible).className} bg-paper px-6 py-6`}
              >
                <dt className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-2">{label}</dt>
                <dd className="font-sans text-sm text-ink/80 leading-snug">{value}</dd>
              </dl>
            ))}
          </div>
        </section>

        {/* ── Vídeo interactivo ────────────────────────────── */}
        <section aria-label={t("player.sectionAria")} className="px-6 pb-24 md:pb-36">
          <div
            ref={player.ref}
            style={reveal(0, player.visible).style}
            className={`${reveal(0, player.visible).className} max-w-6xl mx-auto`}
          >
            <p className="font-sans text-xs md:text-sm tracking-[0.22em] text-muted uppercase leading-relaxed mb-6">{t("player.intro")}</p>
            <InteractivePlayer />
          </div>
        </section>

        {/* ── I — El Encargo ───────────────────────────────── */}
        <section aria-labelledby="s1-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <SectionIntro id="s1-heading" numeral="I" heading={t("assignment.heading")} quote={t("assignment.quote")}>
              <p className={`${bodyText} mb-6`}>{t("assignment.p1")}</p>
              <p className={bodyText}>{t("assignment.p2")}</p>
            </SectionIntro>
          </div>
        </section>

        {/* ── II — Diseñar para el directo ─────────────────── */}
        <section aria-labelledby="s2-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <SectionIntro id="s2-heading" numeral="II" heading={t("live.heading")} quote={t("live.quote")}>
              <p className={`${bodyText} mb-6`}>{t("live.p1")}</p>
              <p className={`${bodyText} mb-6`}>{t("live.p2")}</p>
              <p className={bodyText}>{t("live.p3")}</p>
            </SectionIntro>

            <p className={`${smallLabel} mt-16 mb-5`}>{t("live.howLabel")}</p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden">
              {howSteps.map((s) => (
                <li key={s.number} className="bg-paper px-7 py-9">
                  <p className="font-display font-semibold italic text-[3rem] leading-none text-ink tabular-nums mb-6">{s.number}</p>
                  <p className="font-display italic text-xl text-ink leading-snug">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── III — Los Personajes ─────────────────────────── */}
        <section aria-labelledby="s3-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <SectionIntro id="s3-heading" numeral="III" heading={t("characters.heading")} quote={t("characters.quote")}>
              <p className={`${bodyText} mb-6`}>{t("characters.p1")}</p>
              <p className={bodyText}>{t.rich("characters.p2", richTags)}</p>
            </SectionIntro>

            <div className="mt-20 md:mt-28 space-y-24 md:space-y-32">
              {characters.map((c, i) => {
                const assets = characterAssets[i];
                return (
                  <article key={c.number} aria-labelledby={`character-${c.number}`}>
                    <div className="flex items-baseline gap-5 mb-10 border-t border-ink/8 pt-10">
                      <span className="font-display font-semibold italic text-[3rem] leading-none text-ink tabular-nums">{c.number}</span>
                      <h3 id={`character-${c.number}`} className="font-display font-semibold italic text-2xl md:text-3xl text-ink leading-tight">
                        {c.name}<span className="text-ink/40">: {c.role}</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12">
                      <div>
                        <p className={`${smallLabel} mb-3`}>{t("characters.whoLabel")}</p>
                        {c.who.map((p, j) => (
                          <p key={j} className={`${bodyText} ${j < c.who.length - 1 ? "mb-6" : ""}`}>{p}</p>
                        ))}
                      </div>
                      <div>
                        <p className={`${smallLabel} mb-3`}>{t("characters.approachLabel")}</p>
                        {c.approach.map((p, j) => (
                          <p key={j} className={`${bodyText} ${j < c.approach.length - 1 ? "mb-6" : ""}`}>{p}</p>
                        ))}
                      </div>
                    </div>

                    <p className={`${smallLabel} mb-5`}>{t("characters.sheetLabel")}</p>
                    <div className="mb-10">
                      <GalleryImage
                        asset={assets.sheet}
                        alt={c.sheetAlt}
                        sizes="(max-width: 768px) 100vw, 1152px"
                        onOpen={setLightbox}
                      />
                    </div>

                    <p className={`${smallLabel} mb-5`}>{t("characters.framesLabel")}</p>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      {assets.frames.map((f, j) => (
                        <GalleryImage
                          key={j}
                          asset={f}
                          alt={c.frameAlts[j]}
                          sizes="(max-width: 768px) 50vw, 564px"
                          onOpen={setLightbox}
                        />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── IV — Los Escenarios ──────────────────────────── */}
        <section aria-labelledby="s4-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <SectionIntro id="s4-heading" numeral="IV" heading={t("settings.heading")} quote={t("settings.quote")}>
              <p className={bodyText}>{t("settings.intro")}</p>
            </SectionIntro>

            <div className="mt-20 md:mt-28 space-y-20 md:space-y-24">
              {settings.map((s, i) => (
                <article key={s.number} aria-labelledby={`setting-${s.number}`}>
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-20 mb-10 border-t border-ink/8 pt-10">
                    <div className="flex items-baseline gap-4 md:block">
                      <p className="font-display font-semibold italic text-[3rem] leading-none text-ink tabular-nums md:mb-4">{s.number}</p>
                      <h3 id={`setting-${s.number}`} className="font-display font-semibold italic text-2xl md:text-3xl text-ink leading-tight">{s.name}</h3>
                    </div>
                    <p className={`${bodyText} max-w-2xl`}>{s.body}</p>
                  </div>

                  <p className={`${smallLabel} mb-5`}>{t("settings.galleryLabel")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {settingAssets[i].map((a, j) => (
                      <GalleryImage
                        key={j}
                        asset={a}
                        alt={s.alts[j]}
                        sizes="(max-width: 640px) 100vw, 380px"
                        onOpen={setLightbox}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── V — El Proceso ───────────────────────────────── */}
        <section aria-labelledby="s5-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <SectionIntro id="s5-heading" numeral="V" heading={t("process.heading")} quote={t("process.quote")} />

            <ol className="mt-16 border-t border-ink/8 mb-10">
              {processSteps.map((s) => (
                <li
                  key={s.number}
                  className="grid grid-cols-[3rem_1fr] md:grid-cols-[80px_200px_1fr] gap-x-4 md:gap-x-12 gap-y-2 py-8 border-b border-ink/8"
                >
                  <p className="font-display font-semibold italic text-3xl leading-none text-ink tabular-nums">{s.number}</p>
                  <h3 className="font-display font-semibold italic text-xl text-ink leading-snug">{s.title}</h3>
                  <p className={`${bodyText} col-start-2 md:col-start-auto`}>{s.body}</p>
                </li>
              ))}
            </ol>

            <p className={`${bodyText} max-w-2xl`}>{t("process.note")}</p>
          </div>
        </section>

        {/* ── VI — Herramientas ────────────────────────────── */}
        <section aria-labelledby="s6-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <SectionIntro id="s6-heading" numeral="VI" heading={t("tools.heading")} quote={t("tools.quote")} />

            <dl className="mt-16 border-t border-ink/8">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-20 py-6 border-b border-ink/8"
                >
                  <dt className="font-display font-semibold italic text-xl text-ink leading-snug">{tool.name}</dt>
                  <dd className={bodyText}>{tool.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── VII — En directo ─────────────────────────────── */}
        <section aria-labelledby="s7-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">VII</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>
            <h2 id="s7-heading" className="font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mb-10">
              {t("onStage.heading")}
            </h2>

            <figure className="mb-12">
              {RTV_YOUTUBE_ID ? (
                <div className="relative w-full aspect-video rounded-sm ring-1 ring-ink/[0.07] overflow-hidden bg-ink">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${RTV_YOUTUBE_ID}?start=${RTV_START_SECONDS}`}
                    title={t("onStage.videoTitle")}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <Placeholder label={t("onStage.videoTitle")} w={16} h={9} />
              )}
              <figcaption className="mt-3 font-sans text-xs text-ink/40">{t("onStage.credit")}</figcaption>
            </figure>

            <p className={`${bodyText} max-w-2xl mb-24 md:mb-32`}>{t("onStage.p1")}</p>

            <h2 className="font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mb-12 md:mb-16">
              {t.rich("onStage.closingHeading", brTags)}
            </h2>
            <div className="max-w-2xl">
              <p className={`${bodyText} mb-6`}>{t("onStage.closingP1")}</p>
              <p className={bodyText}>{t("onStage.closingP2")}</p>
            </div>
          </div>
        </section>

        {/* ── Back ───────────────────────────────────────── */}
        <section aria-label={tc("projectNavAria")} className="px-6 pb-20 md:pb-28">
          <div ref={bottom.ref} className="max-w-6xl mx-auto border-t border-ink/8 pt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

              <Link
                href="/#proyectos"
                style={reveal(0, bottom.visible).style}
                className={`${reveal(0, bottom.visible).className} inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] text-muted uppercase hover:text-ink transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm`}
              >
                <span aria-hidden="true">←</span>
                {tc("backLong")}
              </Link>

            </div>

            <p className="mt-12 font-sans text-xs text-ink/40 leading-relaxed max-w-2xl">{t("sources")}</p>
          </div>
        </section>

      </main>
      <Footer />

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tc("enlargedImageAria")}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/92 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={tc("closeEnlargedAria")}
            autoFocus
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-paper/10 text-paper flex items-center justify-center hover:bg-paper/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
          >
            <span aria-hidden="true" className="text-2xl leading-none">×</span>
          </button>
          <Image
            src={lightbox.src}
            alt={lightbox.alt}
            width={lightbox.w}
            height={lightbox.h}
            className="w-auto h-auto max-w-[92vw] max-h-[88vh] object-contain rounded-sm shadow-2xl"
            sizes="92vw"
          />
        </div>
      )}
    </>
  );
}
