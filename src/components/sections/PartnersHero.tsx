import { useTranslations } from "next-intl";
// Stand-in until the design's handshake photo is exported from Figma.
import background from "@/assets/images/feedback/background.webp";
import { anchors } from "@/content/navigation";
import { PageHero } from "./PageHero";

export function PartnersHero() {
  const t = useTranslations("Partners.hero");
  const tNav = useTranslations("Nav");

  return (
    <PageHero
      image={background}
      imageClassName="-scale-x-100 object-left"
      scrim
      breadcrumb={tNav("partners")}
      title={t("title")}
      subtitle={t("subtitle")}
      cta={{ label: t("cta"), href: `#${anchors.contact}` }}
    />
  );
}
