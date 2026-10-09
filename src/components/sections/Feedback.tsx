import Image from "next/image";
import { useTranslations } from "next-intl";
import background from "@/assets/images/feedback/background.webp";
import watermark from "@/assets/images/feedback/watermark.svg";
import quotes from "@/assets/images/icons/quotes.svg";
import arrowRight from "@/assets/images/icons/arrow-right-white.svg";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { anchors } from "@/content/navigation";
import { FeedbackForm } from "./FeedbackForm";

export function Feedback() {
  const t = useTranslations("Feedback");

  return (
    <section id={anchors.contact} className="mt-16 lg:mt-[71px]">
      <Container>
        {/* Positioned so it paints above the Directions decor that reaches down here. */}
        <div className="relative isolate overflow-hidden rounded-card bg-forest p-4 pb-16 sm:p-6 sm:pb-24 lg:flex lg:items-start lg:justify-between lg:gap-8 lg:pt-[55px] lg:pr-20 lg:pb-[60px] lg:pl-[69px]">
          <Image src={background} alt="" fill sizes="(min-width: 1440px) 1360px, 100vw" className="-z-10 object-cover" />
          <Image
            src={watermark}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-4 -z-10 h-auto w-[calc(100%-2rem)] max-w-none translate-y-[4%] lg:top-[466px] lg:bottom-auto lg:left-[42px] lg:w-[965px] lg:translate-y-0"
          />

          <figure className="w-full max-w-[356px] shrink-0 rounded-card bg-white px-[19px] pt-[15px] pb-[29px] lg:mt-px lg:min-h-[256px]">
            <div className="flex gap-6">
              <div aria-hidden="true" className="size-[103px] shrink-0 rounded-card bg-placeholder" />
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

          <div className="mt-8 w-full lg:mt-0 lg:max-w-[580px]">
            <SectionHeading title={t("title")} tone="light" />
            <p className="mt-3 text-base text-white sm:text-[18px]/[21px]">{t("subtitle")}</p>
            <div className="mt-8">
              <FeedbackForm arrowIcon={arrowRight} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
