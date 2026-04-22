"use client";

import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kervinmarquinez/" },
];

export default function Contact() {
  const { ref, visible } = useReveal(0.1);

  const reveal = (delay: number) => ({
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${delay}ms`,
    },
    className:
      "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
  });

  return (
    <section id="contacto" aria-labelledby="contacto-heading" className="relative py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Section label */}
        <div {...reveal(0)} className={`${reveal(0).className} flex items-center gap-4 mb-12 md:mb-16`} style={reveal(0).style}>
          <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">
            Contacto
          </span>
          <div className="flex-1 h-px bg-ink/10" />
          <span className="font-sans text-[10px] tracking-[0.2em] text-muted tabular-nums">
            04
          </span>
        </div>

        {/* Main heading */}
        <div
          {...reveal(80)}
          className={`${reveal(80).className} mb-6`}
          style={reveal(80).style}
        >
          <h2 id="contacto-heading" className="font-display font-semibold italic text-6xl sm:text-7xl md:text-8xl xl:text-[9rem] text-ink leading-[0.92] tracking-tight">
            ¿Hablamos?
          </h2>
        </div>

        {/* Subline */}
        <p
          {...reveal(160)}
          className={`${reveal(160).className} font-sans text-base text-ink/60 max-w-xs leading-relaxed mb-20 md:mb-28`}
          style={reveal(160).style}
        >
          Disponibilidad inmediata para incorporación full-time.
          Abierto a proyectos freelance.
        </p>

        {/* Divider */}
        <div
          {...reveal(220)}
          className={`${reveal(220).className} h-px bg-ink/10 mb-10 md:mb-12`}
          style={reveal(220).style}
        />

        {/* Bottom row: contact info + socials */}
        <div
          {...reveal(280)}
          className={`${reveal(280).className} flex flex-col sm:flex-row sm:items-end justify-between gap-8`}
          style={reveal(280).style}
        >

          {/* Email + Phone */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-3">
                Email
              </p>
              <a
                href="mailto:hola@adriankervin.com"
                aria-label="Enviar email a hola@adriankervin.com"
                className="group inline-flex items-center gap-2 font-display italic text-2xl md:text-3xl text-ink hover:text-ink/55 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
              >
                hola@adriankervin.com
                <span aria-hidden="true" className="text-base text-ink/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  ↗
                </span>
              </a>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase mb-3">
                Teléfono
              </p>
              <a
                href="tel:+34652183967"
                aria-label="Llamar al +34 652 18 39 67"
                className="group inline-flex items-center gap-2 font-display italic text-2xl md:text-3xl text-ink hover:text-ink/55 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
              >
                +34 652 18 39 67
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3 sm:items-end">
            <p className="font-sans text-[10px] tracking-[0.22em] text-muted uppercase">
              Redes
            </p>
            <div className="flex items-center gap-6">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-sans text-sm tracking-wide text-ink/60 hover:text-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
                >
                  <span className="relative overflow-hidden inline-flex flex-col h-[1.1em]">
                    <span className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-full">
                      {label}
                    </span>
                    <span aria-hidden="true" className="absolute top-0 left-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0">
                      {label}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
