import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadersList } from "@/components/sections/LeadersList";
import { leaders } from "@/content/leaders";
import { anchors } from "@/content/navigation";

export function Leaders() {
  const t = useTranslations("Leaders");

  return (
    <section id={anchors.leaders} className="mt-16 lg:mt-20">
      <Container>
        <SectionHeading title={t("title")} />
        <LeadersList
          leaders={leaders.map((leader) => ({
            key: leader.key,
            name: t(`people.${leader.key}.name`),
            role: t(`people.${leader.key}.role`),
            photo: leader.photo,
          }))}
        />
      </Container>
    </section>
  );
}
