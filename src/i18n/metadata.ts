import type { Locale } from "next-intl";
import { getPathname } from "./navigation";
import { routing } from "./routing";

// Canonical and hreflang links for a page that exists in every locale.
export function localeAlternates(href: string, locale: Locale) {
  const path = (target: Locale) => getPathname({ href, locale: target });

  return {
    canonical: path(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((target) => [target, path(target)])),
      "x-default": path(routing.defaultLocale),
    },
  };
}

const ogLocales: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };

export function ogLocale(locale: Locale) {
  return ogLocales[locale];
}
