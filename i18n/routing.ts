import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Spanish stays at "/", English lives under "/en".
  localePrefix: "as-needed",
});
