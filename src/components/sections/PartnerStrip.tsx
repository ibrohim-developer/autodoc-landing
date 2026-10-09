import Image from "next/image";
import { useTranslations } from "next-intl";
import { partners } from "@/content/partners";
import { cn } from "@/lib/cn";

// The track moves by half its width, so each half has to be wider than the widest screen (2560px):
// each half holds the list twice. Only the first list is exposed to assistive tech.
const copies = [0, 1, 2, 3];

export function PartnerStrip() {
  const t = useTranslations("PartnerStrip");

  return (
    <section aria-label={t("label")} className="h-[120px] border-b border-line md:h-[185px]">
      <div className="h-full overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex h-full w-max animate-marquee [animation-duration:90s] hover:[animation-play-state:paused] motion-reduce:animate-none">
          {copies.map((copy) => (
            <ul key={copy} aria-hidden={copy > 0 || undefined} className={cn("flex", copy > 0 && "motion-reduce:hidden")}>
              {partners.map((partner) => (
                <li
                  key={partner.key}
                  className="flex h-full w-[150px] shrink-0 items-center justify-center border-l border-line md:w-[213px]"
                >
                  <Image
                    src={partner.logo}
                    alt={t(`logos.${partner.key}`)}
                    width={partner.width}
                    height={partner.height}
                    className="max-md:max-h-16 max-md:w-auto max-md:max-w-[120px]"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
