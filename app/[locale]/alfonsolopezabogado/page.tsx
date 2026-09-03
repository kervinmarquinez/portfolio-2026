import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, ogLocale } from "@/i18n/metadata";
import CaseStudy from "./CaseStudy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.alfonso" });
  const alternates = localizedAlternates("/alfonsolopezabogado", locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: alternates.canonical,
      title: `${t("title")} — Adrián Kervin`,
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
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CaseStudy />;
}
