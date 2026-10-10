import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  // Uzbek lives at "/", Russian at "/ru", English at "/en".
  localePrefix: "as-needed",
  localeDetection: false,
});
