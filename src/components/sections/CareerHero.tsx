import { useTranslations } from "next-intl";
import background from "@/assets/images/career/hero.webp";
import { anchors, homeSection } from "@/content/navigation";
import { PageHero } from "./PageHero";

export function CareerHero() {
  const t = useTranslations("Career.hero");
  const tNav = useTranslations("Nav");

  return (
    <PageHero
      image={background}
      imageClassName="object-[70%_center]"
      breadcrumb={tNav("career")}
      title={t("title")}
      subtitle={t("subtitle")}
      cta={{ label: t("cta"), href: homeSection(anchors.about) }}
    />
  );
}
