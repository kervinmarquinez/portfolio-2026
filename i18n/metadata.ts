import { routing } from "./routing";

export const SITE_URL = "https://adriankervin.com";

export const ogLocale: Record<string, string> = {
  es: "es_ES",
  en: "en_US",
};

/**
 * Builds `{ canonical, languages }` alternates for a route.
 * `path` is the locale-less pathname with a leading slash ("/", "/dailynookcoffee").
 * The default locale (es) has no prefix; others live under "/<locale>".
 */
export function localizedAlternates(path: string, locale: string) {
  const suffix = path === "/" ? "" : path;
  const url = (loc: string) =>
    loc === routing.defaultLocale
      ? `${SITE_URL}${suffix || "/"}`
      : `${SITE_URL}/${loc}${suffix}`;

  return {
    canonical: url(locale),
    languages: {
      es: url("es"),
      en: url("en"),
      "x-default": url(routing.defaultLocale),
    },
  };
}
