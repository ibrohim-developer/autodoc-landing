import Image from "next/image";
import { useTranslations } from "next-intl";
import reception from "@/assets/images/position/reception.webp";
import team from "@/assets/images/position/team.webp";
import railway from "@/assets/images/position/railway.webp";
import meeting from "@/assets/images/position/meeting.webp";
import { Container } from "@/components/ui/Container";
import { anchors } from "@/content/navigation";
import { ScrollRevealText } from "./ScrollRevealText";

const photoSizes = "(min-width: 1440px) 323px, (min-width: 1024px) 23vw, 50vw";

export function Position() {
  const t = useTranslations("Position");

  return (
    <section id={anchors.about} className="mt-16 lg:mt-20">
      <Container className="lg:flex lg:gap-[26px]">
        <div className="lg:w-[607px] lg:shrink">
          <h2 className="text-[18px]/[21px] text-brand">{t("eyebrow")}</h2>
          <ScrollRevealText
            paragraphs={[t("lead"), t("body")]}
            className="mt-[38px] space-y-7 md:space-y-[43px]"
            paragraphClassName="text-[22px]/[28px] font-semibold md:text-[30px]/[35px]"
          />
        </div>
        {/* Staggered at lg+, a plain two-column grid below. */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:mt-0 lg:w-[727px] lg:min-w-0 lg:shrink lg:gap-x-[10.2%] lg:pr-2.5">
          <div className="flex flex-col gap-3 lg:gap-[88px] lg:pt-[88px]">
            <Image
              src={reception}
              alt={t("photos.reception")}
              sizes={photoSizes}
              placeholder="blur"
              className="aspect-[321/442] h-auto w-full rounded-card object-cover"
            />
            <div className="relative aspect-[321/120] overflow-hidden rounded-t-card">
              <Image
                src={railway}
                alt={t("photos.railway")}
                fill
                sizes={photoSizes}
                placeholder="blur"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:gap-[75px] lg:pt-[11px]">
            <Image
              src={team}
              alt={t("photos.team")}
              sizes={photoSizes}
              placeholder="blur"
              className="aspect-[322/441] h-auto w-full rounded-card object-cover"
            />
            <Image
              src={meeting}
              alt={t("photos.meeting")}
              sizes={photoSizes}
              placeholder="blur"
              className="aspect-[323/184] h-auto w-full rounded-card object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
