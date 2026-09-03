import { useTranslations } from "next-intl";
import { brTags } from "./richText";
import { Squiggle } from "./RubberHoseDecor";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-6">

      <div className="relative flex flex-col items-center text-center max-w-2xl mx-auto w-full">



        {/* Avatar */}
        <div className="animate-fade-in delay-100 mb-10 relative">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-[1.5px] ring-ink/15 ring-offset-4 ring-offset-paper">
            <video
              src="/videos/avatar.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-label={t("avatarAlt")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-up delay-200 font-display font-semibold italic text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-ink mb-5">
          {t.rich("greeting", brTags)}
        </h1>



        {/* Subtitle */}
        <p className="animate-fade-up delay-300 font-display font-light text-xl sm:text-2xl md:text-3xl text-ink/80 leading-snug mb-6 max-w-xl">
          {t.rich("subtitle", brTags)}
        </p>

        {/* Description */}
        <p className="animate-fade-up delay-450 font-sans text-base text-ink/60 max-w-sm leading-relaxed mb-10">
          {t("description")}
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-600 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="#proyectos"
            className="w-full sm:w-auto text-center font-sans font-medium text-xs tracking-widest uppercase bg-ink text-paper px-8 py-4 rounded-full hover:bg-ink/85 transition-colors duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            {t("ctaProjects")}
          </a>
          <a
            href="#sobre-mi"
            className="w-full sm:w-auto text-center font-sans font-medium text-xs tracking-widest uppercase border border-ink/25 text-ink px-8 py-4 rounded-full hover:border-ink/60 hover:bg-ink/5 transition-colors duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            {t("ctaAbout")}
          </a>
        </div>

      </div>

    </section>
  );
}
