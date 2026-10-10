import Image from "next/image";
import { useTranslations } from "next-intl";
import background from "@/assets/images/hero/background.webp";
import govServices from "@/assets/images/hero/feature-gov-services.png";
import analytics from "@/assets/images/hero/feature-analytics.png";
import infrastructure from "@/assets/images/hero/feature-infrastructure.png";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

// The PNGs are 2x renders; width/height are the design sizes.
const features = [
  { key: "govServices", image: govServices, width: 69, height: 74, imageClass: "bottom-0", labelClass: "ml-[73px]" },
  { key: "analytics", image: analytics, width: 76, height: 80, imageClass: "top-0", labelClass: "ml-[94px]" },
  { key: "infrastructure", image: infrastructure, width: 56, height: 80, imageClass: "top-[3px]", labelClass: "ml-[73px]" },
] as const;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-forest lg:min-h-[735px]">
      <div className="absolute inset-y-0 right-0 left-[max(0px,calc(50%-720px))] -z-10 mask-[linear-gradient(to_right,transparent,black_min(240px,calc(50vw-720px)))]">
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-left"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-forest/80 to-forest/30 lg:hidden" />
      <Container className="flex flex-1 flex-col pt-[120px] pb-12 sm:pt-[164px] lg:pt-[202px] lg:pb-[50px]">
        <h1 className="max-w-[526px] text-[30px]/[34px] font-bold text-white md:text-[36px]/[40px] lg:text-[42px]/[43px]">
          {t("title")}
        </h1>
        <p className="mt-[27px] max-w-[439px] text-base text-white lg:text-[18px]/[normal]">{t("subtitle")}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-auto lg:grid-cols-[repeat(3,237px)] lg:pt-10">
          {features.map((feature) => (
            <li
              key={feature.key}
              className="relative flex min-h-[80px] items-center overflow-hidden rounded-card bg-page"
            >
              <Image
                src={feature.image}
                alt=""
                width={feature.width}
                height={feature.height}
                className={cn("absolute left-0", feature.imageClass)}
              />
              <span
                className={cn(
                  "mr-3 max-w-[150px] min-w-0 py-2 text-[18px]/[normal] font-medium text-ink sm:max-md:text-[15px]/[normal]",
                  feature.labelClass,
                )}
              >
                {t(`features.${feature.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
