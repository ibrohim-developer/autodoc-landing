import Image from "next/image";
import { useTranslations } from "next-intl";
import reception from "@/assets/images/position/reception.webp";
import team from "@/assets/images/position/team.webp";
import railway from "@/assets/images/position/railway.webp";
import meeting from "@/assets/images/position/meeting.webp";
import { anchors } from "@/content/navigation";
import { PositionScroller } from "./PositionScroller";

const photoSizes = "(min-width: 1440px) 323px, (min-width: 1024px) 23vw, 50vw";

export function Position() {
  const t = useTranslations("Position");

  return (
    <PositionScroller id={anchors.about} eyebrow={t("eyebrow")} paragraphs={[t("lead"), t("body")]}>
      {/* Staggered and spread out at lg+ so the gallery scrolls past the pinned text; a plain two-column grid below. */}
      <div className="grid grid-cols-2 gap-3 lg:gap-x-[10.2%] lg:pr-2.5">
        <div className="flex flex-col gap-3 lg:gap-[280px] lg:pt-[260px]">
          <Image
            src={reception}
            alt={t("photos.reception")}
            sizes={photoSizes}
            placeholder="blur"
            className="aspect-[321/442] h-auto w-full rounded-card object-cover"
          />
          <Image
            src={railway}
            alt={t("photos.railway")}
            sizes={photoSizes}
            placeholder="blur"
            className="aspect-[681/394] h-auto w-full rounded-card object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 lg:gap-[280px] lg:pt-[11px]">
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
    </PositionScroller>
  );
}
