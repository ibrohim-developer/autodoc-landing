import Image from "next/image";
import { useTranslations } from "next-intl";
import background from "@/assets/images/feedback/background.webp";
import manager from "@/assets/images/feedback/manager.webp";
import quotes from "@/assets/images/icons/quotes.svg";
import arrowRight from "@/assets/images/icons/arrow-right-white.svg";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { anchors } from "@/content/navigation";
import { FeedbackForm } from "./FeedbackForm";

export function Feedback() {
  const t = useTranslations("Feedback");

  return (
    // Full-bleed band: the background spans the viewport, the content stays on the container grid.
    // Positioned so it paints above the Directions decor that reaches down here.
    <section id={anchors.contact} className="relative isolate mt-16 bg-forest lg:mt-[71px]">
      <Image src={background} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <Container className="py-10 sm:py-14 lg:flex lg:items-start lg:justify-between lg:gap-8 lg:pt-[67px] lg:pb-[68px]">
        <figure className="w-full max-w-[356px] shrink-0 rounded-card bg-white px-[19px] pt-[15px] pb-[29px] lg:min-h-[256px]">
          <div className="flex gap-6">
            <Image src={manager} alt="" className="size-[103px] shrink-0 rounded-card object-cover" />
            <figcaption>
              <p className="max-w-[162px] text-[24px]/[24px] font-medium text-ink">{t("manager.name")}</p>
              <p className="mt-[18px] max-w-[174px] text-base/[19px] text-muted-2">{t("manager.role")}</p>
            </figcaption>
          </div>
          <blockquote className="relative mt-[42px] max-w-[282px] text-[20px]/[22px] font-medium text-ink">
            <Image src={quotes} alt="" className="absolute -top-[35px] left-[261px] max-sm:left-auto max-sm:right-0" />
            <p className="relative">{t("manager.quote")}</p>
          </blockquote>
        </figure>

        <div className="mt-8 w-full lg:mt-[15px] lg:max-w-[580px]">
          <SectionHeading title={t("title")} tone="light" />
          <p className="mt-3 text-base text-white sm:text-[18px]/[21px]">{t("subtitle")}</p>
          <div className="mt-8">
            <FeedbackForm arrowIcon={arrowRight} />
          </div>
        </div>
      </Container>
    </section>
  );
}
