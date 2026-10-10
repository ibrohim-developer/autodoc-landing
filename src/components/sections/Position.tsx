import Image from "next/image";
import { useTranslations } from "next-intl";
import entrance from "@/assets/images/position/entrance.webp";
import aerial from "@/assets/images/position/aerial.webp";
import parking from "@/assets/images/position/parking.webp";
import pavilion from "@/assets/images/position/pavilion.webp";
import inspectors from "@/assets/images/position/inspectors.webp";
import inspection from "@/assets/images/position/inspection.webp";
import building from "@/assets/images/position/building.webp";
import bays from "@/assets/images/position/bays.webp";
import { anchors } from "@/content/navigation";
import { PositionScroll } from "./PositionScroll";

// Two staggered columns. On desktop the text stays put while these scroll past,
// so their combined height sets how long it stays. The sources are 16:9 stills,
// so `focus` keeps the subject in frame when `aspect` crops them.
const columns = [
  [
    { image: entrance, key: "entrance", aspect: "aspect-[321/442]", focus: "object-[30%_50%]" },
    { image: aerial, key: "aerial", aspect: "aspect-[321/240]", focus: "object-center" },
    { image: pavilion, key: "pavilion", aspect: "aspect-square", focus: "object-[60%_50%]" },
    { image: parking, key: "parking", aspect: "aspect-[485/566]", focus: "object-center" },
  ],
  [
    { image: inspectors, key: "inspectors", aspect: "aspect-[322/441]", focus: "object-[52%_50%]" },
    { image: inspection, key: "inspection", aspect: "aspect-[323/184]", focus: "object-center" },
    { image: building, key: "building", aspect: "aspect-[13/12]", focus: "object-center" },
    { image: bays, key: "bays", aspect: "aspect-[322/441]", focus: "object-right" },
  ],
] as const;

type Photo = (typeof columns)[number][number];

// A wide still cropped into a taller box is drawn at the box's height, so it has to be fetched
// wider than the box itself or `object-cover` upscales it and it goes soft.
function photoSizes({ image, aspect }: Photo) {
  const [width, height] = aspect.match(/\d+/g)?.map(Number) ?? [1, 1];
  const scale = Math.max(1, image.width / image.height / (width / height));
  const at = (size: number) => Math.ceil(size * scale);
  return `(min-width: 1440px) ${at(323)}px, (min-width: 1024px) ${at(23)}vw, ${at(50)}vw`;
}

export function Position() {
  const t = useTranslations("Position");
  const photo = (item: Photo) => (
    <Image
      key={item.key}
      src={item.image}
      alt={t(`photos.${item.key}`)}
      sizes={photoSizes(item)}
      placeholder="blur"
      className={`${item.aspect} ${item.focus} h-auto w-full rounded-card object-cover`}
    />
  );

  return (
    <section id={anchors.about} className="mt-16 lg:mt-20">
      <PositionScroll
        eyebrow={t("eyebrow")}
        paragraphs={[t("lead"), t("body")]}
        columns={[columns[0].map(photo), columns[1].map(photo)]}
      />
    </section>
  );
}
