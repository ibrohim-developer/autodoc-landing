import type { Locale } from "next-intl";
import { getPathname } from "./navigation";
import { routing } from "./routing";

// Canonical and hreflang links for a page that exists in every locale.
export function localeAlternates(href: string, locale: Locale) {
  const path = (target: Locale) => getPathname({ href, locale: target });

  return {
    canonical: path(locale),
    languages: { uz: path("uz"), ru: path("ru"), "x-default": path(routing.defaultLocale) },
  };
}

export function ogLocale(locale: Locale) {
  return locale === "uz" ? "uz_UZ" : "ru_RU";
}
