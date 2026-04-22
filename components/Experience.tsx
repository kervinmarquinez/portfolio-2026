const entries = [
  {
    period: "2023 — 2026",
    title: "Diseñador y Desarrollador Web",
    company: "SOMOS.plus",
    description:
      "Desarrollo web con WordPress, WooCommerce y React, desde proyectos estándar hasta soluciones complejas como el marketplace de la ACET o el e-commerce de Unicesped.com. Gestión directa con clientes y uso de IA generativa para acelerar flujos de trabajo y prototipado.",
  },
  {
    period: "2019 — 2022",
    title: "Marketing Assistant & Media Buyer",
    company: "IDB Mobile Technology",
    description:
      "Gestión de campañas de captación en Google Ads y DSPs con resultado directo: duplicar la facturación anual. Optimización de landing pages con principios UX y SEO para mejorar la conversión.",
  },
  {
    period: "2019",
    title: "Asistente de Marketing Digital",
    company: "Rocketfy",
    description:
      "Implementación de estrategias SEO en WordPress, investigación de palabras clave y optimización de contenidos para mejorar la visibilidad en buscadores.",
  },
  {
    period: "2017",
    title: "Community Manager",
    company: "Viveunaexperiencia.com",
    description:
      "Gestión de redes sociales, campañas en Facebook e Instagram Ads y diseño de contenido gráfico para aumentar la visibilidad y engagement de la marca.",
  },
];

export default function Experience() {
  return (
    <section id="cv" aria-labelledby="cv-heading" className="relative py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 id="cv-heading" className="sr-only">Experiencia</h2>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">
            Experiencia
          </span>
          <div className="flex-1 h-px bg-ink/10" />
          <span className="font-sans text-[10px] tracking-[0.2em] text-muted tabular-nums">
            02
          </span>
        </div>

        {/* Entries */}
        <div>
          {entries.map((entry, i) => (
            <div key={i}>
              {/* Top rule */}
              <div className="h-px bg-ink/8" />

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-4 md:gap-10 py-10 md:py-12">

                {/* Period */}
                <p className="font-sans text-xs tracking-[0.22em] text-muted uppercase pt-0.5 tabular-nums">
                  {entry.period}
                </p>

                {/* Title + Company */}
                <div>
                  <p className="font-sans text-base font-medium text-ink tracking-tight leading-snug">
                    {entry.title}
                  </p>
                  <p className="font-sans text-sm text-ink/60 mt-1">
                    {entry.company}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans text-base text-ink/60 leading-relaxed md:pt-0.5">
                  {entry.description}
                </p>

              </div>
            </div>
          ))}

          {/* Bottom rule */}
          <div className="h-px bg-ink/8" />
        </div>

      </div>
    </section>
  );
}
