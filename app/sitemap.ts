import type { MetadataRoute } from "next";
import { localizedAlternates, SITE_URL } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const paths = ["/", "/dailynookcoffee", "/alfonsolopezabogado"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const { languages } = localizedAlternates(path, routing.defaultLocale);
    return routing.locales.map((locale) => ({
      url: languages[locale],
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
