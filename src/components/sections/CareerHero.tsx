import Image from "next/image";
import { useTranslations } from "next-intl";
import background from "@/assets/images/career/hero.webp";
import chevronRight from "@/assets/images/icons/chevron-right-white.svg";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { anchors, homeSection } from "@/content/navigation";
import { Link } from "@/i18n/navigation";

export function CareerHero() {
  const t = useTranslations("Career.hero");
  const tNav = useTranslations("Nav");

  return (
    <section className="relative isolate overflow-hidden bg-forest lg:min-h-[810px]">
      <Image
        src={background}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover object-[70%_center]"
      />
      {/* The photo is already dark on the left at desktop widths; narrower crops need help. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-forest/85 to-forest/20 lg:hidden" />
      {/* The top padding clears the absolutely positioned header. */}
      <Container className="pt-[104px] pb-16 sm:pt-[150px] lg:pb-20">
        <Breadcrumbs tone="light" items={[{ label: tNav("career") }]} />
        <h1 className="mt-16 max-w-[420px] text-[30px]/[34px] font-bold text-white md:text-[36px]/[40px] lg:mt-[83px] lg:text-[42px]/[43px]">
          {t("title")}
        </h1>
        <p className="mt-[25px] max-w-[439px] text-base text-white lg:text-[18px]/[21px]">{t("subtitle")}</p>
        <Link
          href={homeSection(anchors.about)}
          className="group mt-8 inline-flex h-[51px] items-center gap-7 rounded-card border border-white pr-7 pl-[29px] text-[20px] font-medium text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t("cta")}
          <Image src={chevronRight} alt="" className="h-[11px] w-auto transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
