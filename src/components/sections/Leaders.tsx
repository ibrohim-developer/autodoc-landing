import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leaders } from "@/content/leaders";
import { anchors } from "@/content/navigation";

// On desktop the first card is expanded by default; hovering (or focusing) another
// card expands it instead and shrinks the first one back to the normal width.
export function Leaders() {
  const t = useTranslations("Leaders");

  return (
    <section id={anchors.leaders} className="mt-16 lg:mt-20">
      <Container>
        <SectionHeading title={t("title")} />
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 lg:mt-[42px] lg:flex lg:gap-x-3.5 lg:[&:has(>li:hover)>li:not(:hover)]:grow lg:[&:has(>li:focus-within)>li:not(:focus-within)]:grow">
          {leaders.map((leader) => (
            <li
              key={leader.key}
              tabIndex={0}
              className="min-w-0 outline-none transition-[flex-grow] duration-500 ease-out lg:basis-0 lg:grow lg:first:grow-[2] lg:hover:!grow-[2] lg:focus-within:!grow-[2]"
            >
              <div className="relative aspect-[329/447] overflow-hidden rounded-card lg:aspect-auto lg:h-[447px]">
                <Image
                  src={leader.photo}
                  alt={t(`people.${leader.key}.name`)}
                  fill
                  sizes="(min-width: 1440px) 680px, (min-width: 1024px) 48vw, 50vw"
                  placeholder="blur"
                  className="object-cover object-top"
                />
              </div>
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
