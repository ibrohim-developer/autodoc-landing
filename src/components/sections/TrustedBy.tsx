import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { anchors } from "@/content/navigation";
import { trustLogos } from "@/content/trust";
import { cn } from "@/lib/cn";

// The track moves by half its width, so each half holds the list twice to stay wider than the container.
// Only the first list is exposed to assistive tech.
const copies = [0, 1, 2, 3];

export function TrustedBy() {
  const t = useTranslations("Trust");

  return (
    <section id={anchors.partners} className="mt-16 lg:mt-[74px]">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,659px)] lg:gap-6">
          <SectionHeading title={t("title")} className="lg:pt-1.5" />
          <p className="max-w-[646px] text-[18px]/[22px] font-medium text-ink lg:text-[20px]/[22px]">{t("text")}</p>
        </div>
        <div className="mt-8 overflow-hidden motion-reduce:overflow-x-auto lg:mt-[35px]">
          <div className="flex w-max animate-marquee [animation-direction:reverse] [animation-duration:60s] hover:[animation-play-state:paused] motion-reduce:animate-none">
            {copies.map((copy) => (
              <ul key={copy} aria-hidden={copy > 0 || undefined} className={cn("flex gap-3 pr-3", copy > 0 && "motion-reduce:hidden")}>
                {trustLogos.map((item) => (
                  <li
                    key={item.key}
                    className="grid h-[140px] w-[200px] shrink-0 place-items-center rounded-card bg-white md:h-[177px] md:w-[252px]"
                  >
                    <Image
                      src={item.logo}
                      alt={copy > 0 ? "" : t(`logos.${item.key}`)}
                      width={item.width}
                      height={item.height}
                      className="max-md:scale-75"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
