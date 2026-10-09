import Image from "next/image";
import { useTranslations } from "next-intl";
import background from "@/assets/images/career/advantages-bg.webp";
import iconProjects from "@/assets/images/career/icon-projects.webp";
import iconTeam from "@/assets/images/career/icon-team.webp";
import iconGrowth from "@/assets/images/career/icon-growth.webp";
import iconEnvironment from "@/assets/images/career/icon-environment.webp";
import iconFuture from "@/assets/images/career/icon-future.webp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { advantages } from "@/content/vacancies";

const icons = {
  projects: iconProjects,
  team: iconTeam,
  growth: iconGrowth,
  environment: iconEnvironment,
  future: iconFuture,
};

// The glass blocks photo fills the whole section; the bottom padding leaves them visible below the cards.
export function CareerAdvantages() {
  const t = useTranslations("Career.advantages");

  return (
    <section className="relative isolate mt-16 overflow-hidden pt-[52px] pb-[200px] sm:pb-[260px] lg:mt-20 lg:pb-[308px]">
      <Image src={background} alt="" fill sizes="100vw" className="-z-10 object-cover object-bottom" />
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} className="max-w-[420px]" />
          <p className="max-w-[497px] text-[18px]/[21px] font-medium text-ink lg:mt-10 lg:text-[20px]/[22px]">
            {t("text")}
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3">
          {advantages.map((key) => (
            <li key={key} className="flex min-h-[282px] flex-col rounded-card bg-white pt-[13px] pr-2 pl-[19px] pb-[30px]">
              <Image src={icons[key]} alt="" sizes="128px" className="-ml-[7px] size-[128px] object-contain" />
              <h3 className="mt-[7px] text-[24px]/[29px] font-semibold text-ink">{t(`items.${key}.title`)}</h3>
              <p className="mt-[15px] text-[18px]/[20px] font-medium text-muted">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
