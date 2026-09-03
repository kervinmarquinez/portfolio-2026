import { useTranslations } from "next-intl";

type Entry = {
  period: string;
  title: string;
  company: string;
  description: string;
};

export default function Experience() {
  const t = useTranslations("experience");
  const entries = t.raw("items") as Entry[];

  return (
    <section id="cv" aria-labelledby="cv-heading" className="relative py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 id="cv-heading" className="sr-only">{t("heading")}</h2>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">
            {t("label")}
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
