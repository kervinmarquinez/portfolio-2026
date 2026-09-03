"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { brTags } from "@/components/richText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

type MetaItem = { label: string; value: string };
type StrategyItem = { number: string; title: string; body: string };

export default function CaseStudy() {
  const t = useTranslations("caseStudy.alfonso");
  const tc = useTranslations("caseStudy.common");

  const meta = t.raw("meta") as MetaItem[];
  const strategyItems = t.raw("strategy.items") as StrategyItem[];

  const hero     = useReveal(0.01);
  const metaRow  = useReveal(0.05);
  const mock1    = useReveal(0.05);
  const s1       = useReveal(0.08);
  const s2       = useReveal(0.08);
  const mock2    = useReveal(0.05);
  const s3       = useReveal(0.08);
  const s4       = useReveal(0.08);
  const bottom   = useReveal(0.08);

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

        {/* ── Mockup 1 — Hero full-width ───────────────────── */}
        <section aria-label={tc("mainMockupAria")} className="px-6 pb-20 md:pb-28">
          <div
            ref={mock1.ref}
            style={reveal(0, mock1.visible).style}
            className={`${reveal(0, mock1.visible).className} max-w-6xl mx-auto`}
          >
            <div className="relative w-full aspect-[16/9] rounded-sm ring-1 ring-ink/[0.07] overflow-hidden">
              <Image
                src="/images/alfonso-lopez-abogado-proyecto.webp"
                alt={t("mainMockupAlt")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── I — El Reto ──────────────────────────────────── */}
        <section aria-labelledby="s1-heading" className="px-6 pb-24 md:pb-36">
          <div ref={s1.ref} className="max-w-6xl mx-auto">

            {/* Section separator */}
            <div
              style={reveal(0, s1.visible).style}
              className={`${reveal(0, s1.visible).className} flex items-center gap-4 mb-10`}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">I</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-20">

            <div style={reveal(80, s1.visible).style} className={reveal(80, s1.visible).className}>
              <h2
                id="s1-heading"
                className="font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight"
              >
                {t.rich("challenge.heading", brTags)}
              </h2>
            </div>

            <div style={reveal(100, s1.visible).style} className={reveal(100, s1.visible).className}>
              {/* Pull quote */}
              <p className="font-display italic text-2xl md:text-3xl text-ink/80 leading-[1.4] mb-8 border-l-2 border-accent/50 pl-6">
                &ldquo;{t("challenge.quote")}&rdquo;
              </p>
              <p className="font-sans text-base text-ink/60 leading-[1.85]">
                {t("challenge.body")}
              </p>
            </div>

            </div>{/* end grid */}
          </div>
        </section>

        {/* ── II — La Estrategia ───────────────────────────── */}
        <section aria-labelledby="s2-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">

            <div ref={s2.ref} className="mb-14 md:mb-16">
              <div
                style={reveal(0, s2.visible).style}
                className={`${reveal(0, s2.visible).className} flex items-center gap-4 mb-2`}
              >
                <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">II</p>
                <div className="flex-1 h-px bg-ink/10" />
              </div>
              <h2
                id="s2-heading"
                style={reveal(80, s2.visible).style}
                className={`${reveal(80, s2.visible).className} font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mt-4`}
              >
                {t.rich("strategy.heading", brTags)}
              </h2>
            </div>

            <p
              style={reveal(160, s2.visible).style}
              className={`${reveal(160, s2.visible).className} font-sans text-base text-ink/60 leading-[1.85] max-w-2xl mb-16`}
            >
              {t("strategy.intro")}
            </p>

            {/* 3-column strategy grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden">
              {strategyItems.map(({ number, title, body }, i) => (
                <div
                  key={number}
                  style={reveal(i * 80, s2.visible).style}
                  className={`${reveal(i * 80, s2.visible).className} bg-paper px-8 py-10`}
                >
                  <p className="font-display font-semibold italic text-[3rem] leading-none text-ink/100 tabular-nums mb-6">
                    {number}
                  </p>
                  <h3 className="font-display font-semibold italic text-xl text-ink mb-4 leading-snug">
                    {title}
                  </h3>
                  <p className="font-sans text-ink/60 leading-[1.8]">{body}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Mockup 2 — Desktop + Mobile ──────────────────── */}
        <section aria-label={t("mockup2.sectionAria")} className="px-6 pb-20 md:pb-28">
          <div
            ref={mock2.ref}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end"
          >
            {/* Desktop */}
            <div
              style={reveal(0, mock2.visible).style}
              className={`${reveal(0, mock2.visible).className} aspect-[16/10] rounded-sm ring-1 ring-ink/[0.07] overflow-hidden bg-ink`}
            >
              <video
                src="/videos/mockup-alfonso-desktop.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Mobile */}
            <div
              style={reveal(120, mock2.visible).style}
              className={`${reveal(120, mock2.visible).className} relative w-full md:w-40 aspect-[9/16] rounded-sm ring-1 ring-ink/[0.07] overflow-hidden`}
            >
              <Image
                src="/images/mockup-alfonso-abogado-mobile.webp"
                alt={t("mockup2.mobileAlt")}
                fill
                className="object-cover object-top"
                sizes="160px"
              />
            </div>
          </div>
        </section>

        {/* ── III — El Desarrollo ──────────────────────────── */}
        <section aria-labelledby="s3-heading" className="px-6 pb-24 md:pb-36">
          <div ref={s3.ref} className="max-w-6xl mx-auto">

            {/* Section separator */}
            <div
              style={reveal(0, s3.visible).style}
              className={`${reveal(0, s3.visible).className} flex items-center gap-4 mb-10`}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">III</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-20">

            <div style={reveal(80, s3.visible).style} className={reveal(80, s3.visible).className}>
              <h2
                id="s3-heading"
                className="font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight"
              >
                {t("development.heading")}
              </h2>
            </div>

            <div style={reveal(100, s3.visible).style} className={reveal(100, s3.visible).className}>
              <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                {t("development.p1")}
              </p>
              <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                {t("development.p2")}
              </p>
              <p className="font-sans text-base text-ink/60 leading-[1.85]">
                {t("development.p3")}
              </p>
            </div>

            </div>{/* end grid */}
          </div>
        </section>


        {/* ── IV — El Resultado ────────────────────────────── */}
        <section aria-labelledby="s4-heading" className="px-6 pb-24 md:pb-36">
          <div ref={s4.ref} className="max-w-6xl mx-auto">

            <div
              style={reveal(0, s4.visible).style}
              className={`${reveal(0, s4.visible).className} flex items-center gap-4 mb-12`}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">IV</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            <h2
              id="s4-heading"
              style={reveal(80, s4.visible).style}
              className={`${reveal(80, s4.visible).className} font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mt-4 mb-12 md:mb-16`}
            >
              {t.rich("result.heading", brTags)}
            </h2>

            <div
              style={reveal(160, s4.visible).style}
              className={`${reveal(160, s4.visible).className} max-w-2xl`}
            >
              <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                {t("result.p1")}
              </p>
              <p className="font-sans text-base text-ink/60 leading-[1.85]">
                {t("result.p2")}
              </p>
            </div>

          </div>
        </section>

        {/* ── Project link + Back ──────────────────────────── */}
        <section aria-label={tc("projectNavAria")} className="px-6 pb-20 md:pb-28">
          <div ref={bottom.ref} className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-ink/8 pt-12">

            <a
              href="https://alfonsolopezabogado.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-2 py-2 font-sans text-xs tracking-[0.18em] uppercase hover:bg-ink/85 active:scale-[0.98] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              style={reveal(0, bottom.visible).style}
            >
              {t("liveCta")}
              <span className="w-8 h-8 rounded-full bg-paper/[0.12] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <span aria-hidden="true" className="text-sm leading-none">↗</span>
              </span>
            </a>

            <Link
              href="/#proyectos"
              style={reveal(80, bottom.visible).style}
              className={`${reveal(80, bottom.visible).className} inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] text-muted uppercase hover:text-ink transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm`}
            >
              <span aria-hidden="true">←</span>
              {tc("backLong")}
            </Link>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
