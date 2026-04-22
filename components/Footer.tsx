"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 py-8 border-t border-ink/8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <a
          href="/"
          aria-label="Adrián Kervin — Inicio"
          className="font-display italic text-sm text-ink/100 hover:text-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
        >
          Adrián Kervin
        </a>

        <p className="font-sans text-[10px] tracking-[0.18em] text-muted uppercase tabular-nums">
          Todos los derechos reservados © {year}
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] text-muted uppercase hover:text-ink/60 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
        >
          Volver arriba
          <span aria-hidden="true" className="group-hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
            ↑
          </span>
        </button>

      </div>
    </footer>
  );
}
