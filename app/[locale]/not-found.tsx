"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-6 text-center">

      {/* Avatar circle */}
      <div className="mb-10">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-[1.5px] ring-ink/15 ring-offset-4 ring-offset-paper">
          <video
            src="/videos/404-page-avatar.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label={t("avatarAlt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h1 className="font-display font-semibold italic text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight text-ink mb-8 max-w-md">
        {t("title")}
      </h1>

      <Link
        href="/"
        className="font-sans text-sm font-medium border border-ink text-ink px-6 py-2.5 rounded-full hover:bg-ink hover:text-paper transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        {t("back")}
      </Link>

    </main>
  );
}
