"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useDismiss } from "./useDismiss";

type Props = {
  chevron: StaticImageData;
  // Text colour of the trigger: "light" over the hero photo, "dark" on the page background.
  tone?: "light" | "dark";
};

export function LanguageSwitcher({ chevron, tone = "light" }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex items-center gap-1 rounded-md px-1 py-1 text-lg/[normal] uppercase transition focus-visible:outline-2",
          tone === "light"
            ? "text-white hover:text-white/80 focus-visible:outline-white"
            : "text-ink hover:text-ink/70 focus-visible:outline-brand",
        )}
      >
        <span className="sr-only">{t("Header.language")} </span>
        {locale}
        <Image src={chevron} alt="" className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          id={listId}
          aria-label={t("Header.language")}
          className="absolute top-full right-0 z-20 mt-3 min-w-[160px] overflow-hidden rounded-card bg-white p-1.5 shadow-lg"
        >
          {routing.locales.map((option) => (
            <li key={option}>
              <button
                type="button"
                lang={option}
                aria-current={option === locale ? "true" : undefined}
                onClick={() => {
                  setOpen(false);
                  if (option !== locale) router.replace(pathname, { locale: option, scroll: false });
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-base text-ink transition hover:bg-pill focus-visible:outline-2 focus-visible:outline-brand",
                  option === locale && "font-semibold",
                )}
              >
                {t(`Locale.${option}`)}
                <span className="text-sm text-muted-2 uppercase">{option}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
