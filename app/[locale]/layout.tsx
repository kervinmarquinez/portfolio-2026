import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { routing } from "@/i18n/routing";
import { localizedAlternates, ogLocale, SITE_URL } from "@/i18n/metadata";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const alternates = localizedAlternates("/", locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: t("template"),
    },
    description: t("description"),
    keywords: [
      "Adrián Kervin",
      "Desarrollo Web",
      "Estrategia UX",
      "Web Development",
      "UX Strategy",
      "Frontend",
      "Portfolio",
      "Next.js",
      "React",
    ],
    authors: [{ name: "Adrián Kervin", url: SITE_URL }],
    creator: "Adrián Kervin",
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: alternates.canonical,
      siteName: "Adrián Kervin",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/images/og-image.webp",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      images: ["/images/og-image.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html lang={locale} className={`${cormorant.variable} ${syne.variable}`}>
      <body className="cursor-none">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:font-sans focus:text-sm focus:rounded-full focus:outline-none"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
