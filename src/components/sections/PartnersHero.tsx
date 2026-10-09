import { useTranslations } from "next-intl";
import background from "@/assets/images/partners/hero.webp";
import { anchors } from "@/content/navigation";
import { PageHero } from "./PageHero";

export function PartnersHero() {
  const t = useTranslations("Partners.hero");
  const tNav = useTranslations("Nav");

  return (
    <PageHero
      image={background}
      imageClassName="object-[70%_center]"
      breadcrumb={tNav("partners")}
      title={t("title")}
      subtitle={t("subtitle")}
      cta={{ label: t("cta"), href: `#${anchors.contact}` }}
    />
  );
}
