"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Slot({ children }: { children: string }) {
  return (
    <span className="relative overflow-hidden inline-flex flex-col h-[1.1em]">
      <span className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Locale-less base for the home page ("" for the default locale, "/en" otherwise).
  const homeBase = locale === routing.defaultLocale ? "" : `/${locale}`;

  const navLinks = [
    { label: t("nav.projects"), href: "#proyectos" },
    { label: t("nav.experience"), href: "#cv" },
    { label: t("nav.about"), href: "#sobre-mi" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    if (isHome) {
      scrollTo(href);
    } else {
      window.location.href = `${homeBase}/${href}`;
    }
  }

  const anchorHref = (href: string) => (isHome ? href : `${homeBase}/${href}`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        menuOpen
          ? "bg-paper border-b border-ink/8"
          : scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-ink/8 shadow-[0_1px_0_0_rgba(10,10,10,0.06)]"
          : "bg-paper/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            href="/"
            aria-label={t("logoAria")}
            className="group flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
          >
            <span className="font-display font-semibold italic text-lg md:text-xl tracking-tight text-ink transition-opacity group-hover:opacity-55">
              Adrián Kervin
            </span>
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.22em] text-muted uppercase mt-0.5">
              {t("logoTagline")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={t("navAria")} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={anchorHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group font-sans text-sm tracking-wide text-ink/70 hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
              >
                <Slot>{link.label}</Slot>
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1Ajo6b73EaxWEV5FK30hh3FzddZ1DDJho/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-sans text-sm tracking-wide text-ink/70 hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
            >
              <Slot>{t("cv")}</Slot>
            </a>

            <LangSwitch pathname={pathname} locale={locale} label={t("langAria")} />

            {/* CTA */}
            <a
              href={anchorHref("#contacto")}
              onClick={(e) => handleNavClick(e, "#contacto")}
              className="font-sans text-sm font-medium border border-ink text-ink px-5 py-2 rounded-full hover:bg-ink hover:text-paper transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              {t("cta")}
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2.5 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-[opacity,transform] duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? "max-h-80 pb-6" : "max-h-0"}`}
        >
          <nav aria-label={t("mobileNavAria")} className="flex flex-col gap-5 pt-4 border-t border-ink/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={anchorHref(link.href)}
                onClick={(e) => { handleNavClick(e, link.href); setMenuOpen(false); }}
                className="group font-sans text-sm tracking-wide text-ink/60 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
              >
                <Slot>{link.label}</Slot>
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1Ajo6b73EaxWEV5FK30hh3FzddZ1DDJho/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="group font-sans text-sm tracking-wide text-ink/60 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
            >
              <Slot>{t("cv")}</Slot>
            </a>
            <LangSwitch pathname={pathname} locale={locale} label={t("langAria")} onNavigate={() => setMenuOpen(false)} />
            <a
              href={anchorHref("#contacto")}
              onClick={(e) => { handleNavClick(e, "#contacto"); setMenuOpen(false); }}
              className="font-sans text-sm font-medium border border-ink text-ink px-5 py-2.5 rounded-full text-center hover:bg-ink hover:text-paper transition-colors duration-300 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              {t("cta")}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function LangSwitch({
  pathname,
  locale,
  label,
  onNavigate,
}: {
  pathname: string;
  locale: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-2 font-sans text-sm tracking-wide"
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="text-ink/20">/</span>}
          {loc === locale ? (
            <span aria-current="true" className="text-ink font-medium">
              {loc.toUpperCase()}
            </span>
          ) : (
            // Explicit `locale` keeps the prefix so next-intl updates the
            // NEXT_LOCALE cookie; the default locale then settles back to "/".
            <Link
              href={pathname}
              locale={loc}
              hrefLang={loc}
              onClick={onNavigate}
              className="text-ink/50 hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
            >
              {loc.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
