"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.1) {
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

const stack = [
  {
    category: "Técnico",
    items: ["React", "Next.js", "HTML5 / CSS3 / Javascript", "WordPress / WooCommerce", "Tailwind CSS", "Git / GitHub"],
  },
  {
    category: "Diseño",
    items: ["Figma", "Adobe Suite", "Diseño UX/UI", "Prototipado", "Design Systems"],
  },
  {
    category: "IA & Herramientas",
    items: ["Claude Code", "Claude Design", "Flujos con IA"],
  },
  {
    category: "Idiomas",
    items: ["Español", "Inglés", "Tagalo"],
  },
];

export default function About() {
  const heading = useReveal(0.05);
  const grid    = useReveal(0.08);

  const col = (delay: number) => ({
    style: {
      opacity: grid.visible ? 1 : 0,
      transform: grid.visible ? "translateY(0)" : "translateY(28px)",
      transitionDelay: `${delay}ms`,
    },
    className: "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
  });

  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-heading" className="relative py-24 md:py-36 px-6 overflow-hidden">
      <h2 id="sobre-mi-heading" className="sr-only">Sobre Mí</h2>

      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-12 md:mb-16 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ opacity: heading.visible ? 1 : 0, transform: heading.visible ? "none" : "translateY(12px)" }}
          ref={heading.ref}
        >
          <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">Sobre Mí</span>
          <div className="flex-1 h-px bg-ink/10" />
          <span className="font-sans text-[10px] tracking-[0.2em] text-muted tabular-nums">03</span>
        </div>

        {/* ── Mega heading ─────────────────────────────── */}
        <h3
          className="font-display font-semibold italic leading-[0.88] tracking-tight text-ink mb-8 md:mb-10
                     text-[8vw] sm:text-[6.5vw] md:text-[5vw] xl:text-[4.5vw]
                     transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ opacity: heading.visible ? 1 : 0, transform: heading.visible ? "none" : "translateY(32px)" }}
        >
          Diseñador que aprendió<br />
          a programar. O programador<br />
          que no olvidó diseñar.<br />
          Depende del día.
        </h3>

        {/* Gold accent line */}
        <div
          className="h-px bg-accent/50 mb-14 md:mb-20 origin-left transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            opacity: heading.visible ? 1 : 0,
            transform: heading.visible ? "scaleX(1)" : "scaleX(0)",
            transitionDelay: "200ms",
          }}
        />

        {/* ── 2-column grid ────────────────────────────── */}
        <div
          ref={grid.ref}
          className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-0"
        >

          {/* Col 1 — Bio + Stack */}
          <div style={col(0).style} className={`${col(0).className} md:pr-14`}>
            <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase mb-8">
              Quién soy
            </p>
            <p className="font-sans text-base text-ink/60 leading-[1.85] mb-6">
              Llegué al desarrollo por la puerta del marketing. Desde 2017 en el mundo
              digital — primero estrategia, luego UX, luego código — ese recorrido me dejó
              algo que no sale en ningún repositorio: entender el producto desde el negocio,
              no solo desde la pantalla.
            </p>
            <p className="font-sans text-base text-ink/60 leading-[1.85] mb-10">
              Hoy desarrollo frontend con WordPress, WooCommerce y React, siempre desde una
              mirada UX. Aplico IA en mi flujo de trabajo de forma práctica — no como
              tendencia, sino porque me permite entregar más, mejor y en menos tiempo.
              Si mañana hay una herramienta mejor, la aprendo.
            </p>

            {/* Fun facts */}
            <div className="mb-10 space-y-3">
              <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase mb-6">
                Fun facts
              </p>
              <ul className="space-y-3 list-none">
                {[
                  "El café es sagrado. Intenta pedirme algo antes del primer sorbo.",
                  "Llevo jugando a videojuegos desde que era pequeño (dormía con mi Game Boy).",
                  "CrossFit para desconectar del código. Y para poder seguir mirando pantallas.",
                  "Al principio puedo parecer tímido. A la semana ya te estoy contando chistes malos.",
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.35em] w-1 h-1 rounded-full bg-accent shrink-0" />
                    <span className="font-sans text-sm text-ink/60 leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              {stack.map(({ category, items }) => (
                <div key={category}>
                  <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase mb-3">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="font-sans text-xs text-ink/60 px-3 py-1.5 rounded-full bg-ink/[0.04] ring-1 ring-ink/[0.07]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block bg-ink/8" />

          {/* Col 2 — Photo placeholders */}
          <div style={col(100).style} className={`${col(100).className} md:pl-14`}>
            <p className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase mb-8">
              Yo en imágenes🙂
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image src="/images/sobre-mi-1.jpg" alt="Adrián Kervin" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-8">
                <Image src="/images/sobre-mi-2.jpg" alt="Adrián Kervin" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden -mt-4">
                <Image src="/images/sobre-mi-3.jpeg" alt="Adrián Kervin" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-4">
                <Image src="/images/sobre-mi-4.jpeg" alt="Adrián Kervin" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
