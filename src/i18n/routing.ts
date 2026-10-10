import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru"],
  defaultLocale: "uz",
  // Uzbek lives at "/", Russian at "/ru".
  localePrefix: "as-needed",
  localeDetection: false,
});
