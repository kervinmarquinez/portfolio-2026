"use client";

/* DAILY NOOK COFFEE — Caso de estudio.
   Textos (proto personas, benchmark, tiers) e imágenes extraídos del archivo de Figma del proyecto. */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FIGMA_URL = "https://www.figma.com/design/uR3frLWZPkfsv93hBhQG7V/Daily-Nook-Coffee?m=auto&t=OpfeoTcLa55pv1GW-1";
const YEAR = "2026";

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

const meta = [
  { label: "Contexto", value: "Proyecto final · Curso UX/UI (La Hauss)" },
  { label: "Año", value: YEAR },
  { label: "Rol", value: "UX/UI · Investigación · Prototipado" },
  { label: "Herramientas", value: "Figma" },
];

const personas = [
  {
    name: "Sofía Cortés",
    tag: "Marketing Manager · 34 años · Madrid",
    quote: "No quiero café para despertar. Quiero café para parar.",
    perfil: "Perfeccionista e introvertida. Valora la estética minimalista, la sostenibilidad y la calidad sobre la cantidad. Su café es el único momento sagrado del día.",
    objetivos: "Escapar del ruido urbano y la hiperconexión, sentirse cuidada sin ser invadida y disfrutar del café como un placer, no como combustible.",
    frustraciones: "Hoteles masivos y ruidosos, horarios de desayuno estrictos y las actividades turísticas forzadas con aglomeraciones.",
  },
  {
    name: "Mateo Gusto",
    tag: "Ingeniero de software · 29 años · Madrid",
    quote: "Vengo a entender la ciencia detrás de la magia.",
    perfil: "Un coffee nerd metódico y autodidacta. Perfecciona su pour-over los fines de semana y conoce la teoría del tueste, pero nunca ha pisado una finca.",
    objetivos: "Validar su conocimiento con la práctica: tostar su propio café, entender el proceso y hablar con quien cultiva el grano.",
    frustraciones: "Tours turísticos superficiales, cafés mal extraídos que presumen de especialidad y la falta de transparencia sobre el origen del producto.",
  },
];

const benchmark = [
  {
    number: "01",
    name: "Finca Rosa Blanca",
    url: "fincarosablanca.com",
    positivo: "Diseño minimalista y limpio con buen uso del espacio. Identifica con claridad cada tier y su precio, usa migas de pan y filtros, y muestra un resumen de la reserva.",
    negativo: "El motor de reservas externo rompe la coherencia visual, las migas de pan no son clicables y el calendario no deja claro el estado de cada fecha.",
  },
  {
    number: "02",
    name: "Aquiares",
    url: "aquiares.com",
    positivo: "Hero que comunica rápido quiénes son y qué ofrecen, diseño limpio y el estado de la reserva visible en todo momento. Permite volver al paso anterior.",
    negativo: "Redirige a una página externa que rompe el flujo, faltan migas de pan, la jerarquía de botones es confusa y no hay información de las habitaciones.",
  },
  {
    number: "03",
    name: "Hacienda Venecia",
    url: "haciendavenecia.com",
    positivo: "CTA relevante desde el inicio, fotos de la estancia, modales con información y las características principales mostradas de forma visual.",
    negativo: "Formulario de reserva muy pobre y sin motor de reservas, faltan migas de pan, mezcla idiomas y la información de la reserva no permanece visible.",
  },
];

const tiers = [
  {
    pack: "Pack Essential",
    name: "El Ritual de la Pausa",
    stay: "La Casita del Jardín",
    price: "329,99 €",
    desc: "Desconexión absoluta en una cabaña íntima de adobe: café de filtro que preparas tú mismo (V60) y rituales sensoriales en tu corredor privado.",
  },
  {
    pack: "Pack Premium",
    name: "La Alquimia del Origen",
    stay: "El Loft del Beneficio",
    price: "559,99 €",
    desc: "Inmersión sensorial en un loft histórico del antiguo secadero: máquina de espresso, micro-lotes y experiencias guiadas como el Origin Tour y el Sunset Cupping.",
  },
  {
    pack: "Pack Master",
    name: "El Legado del Maestro",
    stay: "La Casona del Patrón",
    price: "849,99 €",
    desc: "Maestría total en una suite con chimenea y terraza panorámica: máquina La Marzocco GS3, los cafés más raros y experiencias 100% privadas, incluido tostar tu propio lote.",
  },
];

const checkoutSteps = [
  {
    number: "01",
    crumb: "Pack y fechas",
    title: "Pack y fechas",
    body: "El usuario ve el pack seleccionado y puede cambiarlo, elegir las fechas de entrada y salida y el número de huéspedes.",
  },
  {
    number: "02",
    crumb: "Extras",
    title: "Extras",
    body: "Añade servicios y experiencias adicionales para personalizar la estancia antes de pasar al pago.",
  },
  {
    number: "03",
    crumb: "Pago",
    title: "Pago",
    body: "Introduce los datos de pago para formalizar la reserva, con el resumen del pedido siempre a la vista.",
  },
  {
    number: "04",
    crumb: "Confirmación",
    title: "Thank you page",
    body: "Una página de confirmación cierra el flujo y resume la reserva con todos sus detalles.",
  },
];

const devices = [
  { src: "/images/daily-nook-proto-movil.webp", alt: "Daily Nook Coffee — vista móvil", w: 1400, h: 1738 },
  { src: "/images/daily-nook-proto-tablet.webp", alt: "Daily Nook Coffee — vista tablet", w: 1400, h: 1738 },
  { src: "/images/daily-nook-proto-escritorio.webp", alt: "Daily Nook Coffee — vista escritorio", w: 1400, h: 1738 },
];

export default function CaseStudy() {
  const hero        = useReveal(0.01);
  const metaRow     = useReveal(0.05);
  const mock1       = useReveal(0.05);
  const concepto    = useReveal(0.08);
  const research    = useReveal(0.06);
  const mockDevices = useReveal(0.05);
  const design      = useReveal(0.06);
  const result      = useReveal(0.08);
  const bottom      = useReveal(0.08);

  const [lightbox, setLightbox] = useState<{ src: string; alt: string; w: number; h: number } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [lightbox]);

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
              Proyectos
            </Link>

            {/* Section label */}
            <div
              ref={hero.ref}
              className="flex items-center gap-4 mb-12 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
            >
              <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">Caso de Estudio</span>
              <div className="flex-1 h-px bg-ink/10" />
              <span className="font-sans text-[10px] tracking-[0.2em] text-muted tabular-nums">01</span>
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
              Donde el café de especialidad<br />
              se vive sin prisa,<br className="hidden sm:block" /> entre cafetales.
            </h1>

            <p
              className="font-sans text-base md:text-lg text-ink/55 leading-relaxed max-w-xl
                         transition-[opacity,transform] duration-[900ms] delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(24px)" }}
            >
              Daily Nook Coffee · The Nook Grounds — un resort para amantes del café de especialidad
              ambientado en las haciendas cafeteras de Colombia.
            </p>

          </div>
        </section>

        {/* ── Meta strip ───────────────────────────────────── */}
        <section aria-label="Ficha del proyecto" className="px-6 pb-20 md:pb-28">
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
        <section aria-label="Mockup principal del proyecto" className="px-6 pb-20 md:pb-28">
          <div
            ref={mock1.ref}
            style={reveal(0, mock1.visible).style}
            className={`${reveal(0, mock1.visible).className} max-w-6xl mx-auto`}
          >
            <div className="relative w-full aspect-[16/9] rounded-sm ring-1 ring-ink/[0.07] overflow-hidden bg-surface">
              <Image
                src="/images/daily-nook-coffee-proyecto.webp"
                alt="Daily Nook Coffee — vista general del prototipo"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── I — El Concepto ──────────────────────────────── */}
        <section aria-labelledby="s1-heading" className="px-6 pb-24 md:pb-36">
          <div ref={concepto.ref} className="max-w-6xl mx-auto">

            <div
              style={reveal(0, concepto.visible).style}
              className={`${reveal(0, concepto.visible).className} flex items-center gap-4 mb-10`}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">I</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-20">

              <div style={reveal(80, concepto.visible).style} className={reveal(80, concepto.visible).className}>
                <h2
                  id="s1-heading"
                  className="font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight"
                >
                  El<br />Concepto
                </h2>
              </div>

              <div style={reveal(100, concepto.visible).style} className={reveal(100, concepto.visible).className}>
                <p className="font-display italic text-2xl md:text-3xl text-ink/80 leading-[1.4] mb-8 border-l-2 border-accent/50 pl-6">
                  &ldquo;El reto: convertir una pasión —el café de especialidad— en un lugar donde quedarse a vivirla.&rdquo;
                </p>
                <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                  Daily Nook Coffee es mi <strong className="font-medium text-ink/80">proyecto final del Curso Especialista en UX/UI de La Hauss</strong>.
                  El encargo: diseñar el sitio de un complejo pensado para ser vivido, con estancias por niveles, un proceso
                  de reserva sencillo y un concepto que quede claro desde el primer scroll.
                </p>
                <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                  Elegí orientarlo a quienes el café no les sabe a rutina, sino a ritual. Así surgió <strong className="font-medium text-ink/80">The Nook Grounds</strong>:
                  una hacienda cafetera centenaria de Colombia reinventada como santuario de <em>slow living</em>, levantada entre
                  cafetales, donde el huésped no solo se aloja —cata, aprende y vive el café de especialidad de principio a fin.
                </p>
                <p className="font-sans text-base text-ink/60 leading-[1.85]">
                  Para cumplir con los requisitos del briefing diseñé las vistas obligatorias —cabecera y pie, home, la
                  categoría de tiers, el artículo de la estancia y el checkout de reserva— y las entregué como prototipo
                  navegable en sus tres versiones: móvil, tablet y escritorio, sin obligar al usuario a registrarse para reservar.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── II — La Investigación ────────────────────────── */}
        <section aria-labelledby="s2-heading" className="px-6 pb-24 md:pb-36">
          <div className="max-w-6xl mx-auto">

            <div ref={research.ref} className="mb-14 md:mb-16">
              <div
                style={reveal(0, research.visible).style}
                className={`${reveal(0, research.visible).className} flex items-center gap-4 mb-2`}
              >
                <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">II</p>
                <div className="flex-1 h-px bg-ink/10" />
              </div>
              <h2
                id="s2-heading"
                style={reveal(80, research.visible).style}
                className={`${reveal(80, research.visible).className} font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mt-4`}
              >
                La Investigación
              </h2>
            </div>

            <p
              style={reveal(160, research.visible).style}
              className={`${reveal(160, research.visible).className} font-sans text-base text-ink/60 leading-[1.85] max-w-2xl mb-14`}
            >
              Antes de diseñar una sola pantalla, dediqué tiempo a entender a quién le hablaba y contra qué competía.
              Esta fase definió dos proto personas, un benchmark de tres referentes y el mapa de sitio que ordena toda la navegación.
            </p>

            {/* Proto personas */}
            <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-5">Proto personas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-16">
              {personas.map((p, i) => (
                <div
                  key={i}
                  style={reveal(i * 80, research.visible).style}
                  className={`${reveal(i * 80, research.visible).className} bg-paper px-8 py-10`}
                >
                  <h3 className="font-display font-semibold italic text-2xl text-ink mb-1 leading-snug">{p.name}</h3>
                  <p className="font-sans text-sm text-ink/50 mb-6">{p.tag}</p>
                  <p className="font-display italic text-lg text-ink/80 leading-snug mb-7 border-l-2 border-accent/50 pl-4">
                    “{p.quote}”
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-1.5">Perfil</p>
                  <p className="font-sans text-ink/60 leading-[1.8] mb-5">{p.perfil}</p>
                  <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-1.5">Objetivos</p>
                  <p className="font-sans text-ink/60 leading-[1.8] mb-5">{p.objetivos}</p>
                  <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-1.5">Frustraciones</p>
                  <p className="font-sans text-ink/60 leading-[1.8]">{p.frustraciones}</p>
                </div>
              ))}
            </div>

            {/* Benchmark */}
            <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-5">Benchmark</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-16">
              {benchmark.map((b, i) => (
                <div
                  key={b.number}
                  style={reveal(i * 80, research.visible).style}
                  className={`${reveal(i * 80, research.visible).className} bg-paper px-8 py-10`}
                >
                  <p className="font-display font-semibold italic text-[3rem] leading-none text-ink tabular-nums mb-6">
                    {b.number}
                  </p>
                  <h3 className="font-display font-semibold italic text-xl text-ink mb-1 leading-snug">{b.name}</h3>
                  <p className="font-sans text-xs text-ink/40 mb-5">{b.url}</p>
                  <p className="font-sans text-[10px] tracking-[0.22em] text-success uppercase mb-1.5">A favor</p>
                  <p className="font-sans text-ink/60 leading-[1.8] mb-5">{b.positivo}</p>
                  <p className="font-sans text-[10px] tracking-[0.22em] text-accent uppercase mb-1.5">A evitar</p>
                  <p className="font-sans text-ink/60 leading-[1.8]">{b.negativo}</p>
                </div>
              ))}
            </div>

            {/* Mapa de sitio */}
            <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-5">Mapa de sitio</p>
            <button
              type="button"
              onClick={() => setLightbox({ src: "/images/daily-nook-mapa-sitio.webp", alt: "Daily Nook Coffee — mapa de sitio", w: 4984, h: 6731 })}
              aria-label="Ampliar imagen: mapa de sitio"
              className="group/img block max-w-sm mx-auto overflow-hidden rounded-sm ring-1 ring-ink/[0.07] bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <Image
                src="/images/daily-nook-mapa-sitio.webp"
                alt="Daily Nook Coffee — mapa de sitio"
                width={4984}
                height={6731}
                className="w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </button>

          </div>
        </section>

        {/* ── III — El Diseño ──────────────────────────────── */}
        <section aria-labelledby="s3-heading" className="px-6 pb-24 md:pb-36">
          <div ref={design.ref} className="max-w-6xl mx-auto">

            <div
              style={reveal(0, design.visible).style}
              className={`${reveal(0, design.visible).className} flex items-center gap-4 mb-2`}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">III</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>
            <h2
              id="s3-heading"
              style={reveal(80, design.visible).style}
              className={`${reveal(80, design.visible).className} font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mt-4 mb-8`}
            >
              El Diseño
            </h2>

            {/* Sistema visual — dos columnas: texto / guía entera */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-20">
              <div
                style={reveal(160, design.visible).style}
                className={reveal(160, design.visible).className}
              >
                <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                  Con la investigación clara, construí un sistema visual que respira el origen del café: tonos tierra y verde
                  cafetal, una tipografía editorial con carácter y una iconografía cálida y artesanal.
                </p>
                <p className="font-sans text-base text-ink/60 leading-[1.85]">
                  La guía de estilos reúne color, tipografía e iconos. A partir de ella monté una librería de componentes
                  —navegación, tarjetas, calendario, formularios y los iconos de servicios— para mantener la coherencia
                  de la home al checkout.
                </p>
              </div>
              <div
                style={reveal(220, design.visible).style}
                className={reveal(220, design.visible).className}
              >
                <Image
                  src="/images/daily-nook-guia.webp"
                  alt="Daily Nook Coffee — guía de estilos: color, tipografía e iconos"
                  width={1041}
                  height={1459}
                  className="w-full h-auto rounded-sm ring-1 ring-ink/[0.07]"
                  sizes="(max-width: 768px) 100vw, 576px"
                />
              </div>
            </div>

            {/* Los tiers */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-20 mb-10">
              <h3 className="font-display font-semibold italic text-2xl md:text-3xl text-ink leading-tight">Los tiers</h3>
              <p className="font-sans text-base text-ink/60 leading-[1.85]">
                Tres packs que escalan según la inmersión en el mundo del café —del silencio absoluto al dominio del oficio—.
                Cada nivel sube de alojamiento, equipo barista y experiencias, y se puede reservar sin necesidad de registrarse.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-20">
              {tiers.map((t) => (
                <div key={t.pack} className="bg-paper px-8 py-10 flex flex-col">
                  <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-3">{t.pack}</p>
                  <h4 className="font-display font-semibold italic text-2xl text-ink leading-snug mb-1">{t.name}</h4>
                  <p className="font-sans text-sm text-ink/50 mb-5">{t.stay}</p>
                  <p className="font-sans text-ink/60 leading-[1.8] mb-6 flex-1">{t.desc}</p>
                  <p className="font-sans text-sm text-ink/80">
                    <span className="text-muted">desde</span> <span className="font-medium text-ink">{t.price}</span> / noche
                  </p>
                </div>
              ))}
            </div>

            {/* El checkout */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-20 mb-10">
              <h3 className="font-display font-semibold italic text-2xl md:text-3xl text-ink leading-tight">El checkout</h3>
              <p className="font-sans text-base text-ink/60 leading-[1.85]">
                La reserva se resuelve en cuatro pasos, sin obligar al usuario a registrarse y con migas de pan presentes en
                todo momento para que siempre sepa dónde está y pueda volver atrás. El objetivo: el menor número de fricciones
                entre el deseo y la reserva.
              </p>
            </div>

            {/* Migas de pan */}
            <nav aria-label="Pasos del checkout" className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
              {checkoutSteps.map((s, i) => (
                <span key={s.number} className="flex items-center gap-x-3">
                  <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-muted">{s.crumb}</span>
                  {i < checkoutSteps.length - 1 && <span aria-hidden="true" className="text-ink/25">›</span>}
                </span>
              ))}
            </nav>

            {/* 4 pasos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden">
              {checkoutSteps.map((s) => (
                <div key={s.number} className="bg-paper px-7 py-9 flex flex-col">
                  <p className="font-display font-semibold italic text-[3rem] leading-none text-ink tabular-nums mb-6">{s.number}</p>
                  <h4 className="font-display font-semibold italic text-xl text-ink mb-3 leading-snug">{s.title}</h4>
                  <p className="font-sans text-ink/60 leading-[1.8]">{s.body}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Mockup — Prototipo responsive (3 dispositivos) ── */}
        <section aria-label="Vistas responsive del prototipo" className="px-6 pb-24 md:pb-36">
          <div ref={mockDevices.ref} className="max-w-6xl mx-auto">
            <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-5">
              Prototipo responsive · móvil, tablet y escritorio
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {devices.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setLightbox(m)}
                  aria-label={`Ampliar imagen: ${m.alt}`}
                  style={reveal(i * 100, mockDevices.visible).style}
                  className={`${reveal(i * 100, mockDevices.visible).className} group/img block w-full overflow-hidden rounded-sm ring-1 ring-ink/[0.07] bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2`}
                >
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={m.w}
                    height={m.h}
                    className="w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 380px"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── IV — El Prototipo ────────────────────────────── */}
        <section aria-labelledby="s4-heading" className="px-6 pb-24 md:pb-36">
          <div ref={result.ref} className="max-w-6xl mx-auto">

            <div
              style={reveal(0, result.visible).style}
              className={`${reveal(0, result.visible).className} flex items-center gap-4 mb-12`}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">IV</p>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            <h2
              id="s4-heading"
              style={reveal(80, result.visible).style}
              className={`${reveal(80, result.visible).className} font-display font-semibold italic text-3xl md:text-4xl text-ink leading-tight mt-4 mb-12 md:mb-16`}
            >
              Un prototipo<br />
              para vivir el café.
            </h2>

            <div
              style={reveal(160, result.visible).style}
              className={`${reveal(160, result.visible).className} max-w-2xl`}
            >
              <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
                El resultado es un prototipo navegable en Figma en sus tres versiones —móvil, tablet y escritorio—,
                coherente de la home al pago.
              </p>
              <p className="font-sans text-base text-ink/60 leading-[1.85]">
                Más allá de las pantallas, este proyecto me obligó a pensar como diseñador de producto: partir de una
                investigación real, justificar cada decisión con el mapa de sitio y cuidar que la experiencia —igual que una
                buena taza de café— se disfrute sin prisa. Es el cierre del Curso Especialista en UX/UI de La Hauss y la
                pieza con la que mejor explico cómo trabajo.
              </p>
            </div>

          </div>
        </section>

        {/* ── Prototype link + Back ────────────────────────── */}
        <section aria-label="Navegación del proyecto" className="px-6 pb-20 md:pb-28">
          <div ref={bottom.ref} className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-ink/8 pt-12">

            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-2 py-2 font-sans text-xs tracking-[0.18em] uppercase hover:bg-ink/85 active:scale-[0.98] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              style={reveal(0, bottom.visible).style}
            >
              Ver prototipo en Figma
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
              Volver a proyectos
            </Link>

          </div>
        </section>

      </main>
      <Footer />

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/92 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar imagen ampliada"
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
