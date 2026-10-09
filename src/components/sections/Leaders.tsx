import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leaders } from "@/content/leaders";
import { anchors } from "@/content/navigation";

export function Leaders() {
  const t = useTranslations("Leaders");

  return (
    <section id={anchors.leaders} className="mt-16 lg:mt-20">
      <Container>
        <SectionHeading title={t("title")} />
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 lg:mt-[42px] lg:grid-cols-4 lg:gap-x-3.5">
          {leaders.map((leader) => (
            <li key={leader.key}>
              <Image
                src={leader.photo}
                alt={t(`people.${leader.key}.name`)}
                sizes="(min-width: 1440px) 329px, (min-width: 1024px) 24vw, 50vw"
                placeholder="blur"
                className="aspect-[329/447] h-auto w-full rounded-card object-cover"
              />
              <h3 className="mt-4 text-[18px]/[20px] font-medium text-ink lg:text-[22px]/[20px]">
                {t(`people.${leader.key}.name`)}
              </h3>
              <p className="mt-[9px] text-sm text-muted sm:text-base/[19px]">{t(`people.${leader.key}.role`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
