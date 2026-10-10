import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { vacancies } from "@/content/vacancies";
import { ApplyButton, ResumeDialogProvider } from "./ResumeDialog";

const titleId = "vacancies-title";

export function Vacancies() {
  const t = useTranslations("Career.vacancies");
  const positions = vacancies.map((vacancy) => ({ key: vacancy.key, label: t(`items.${vacancy.key}.title`) }));

  return (
    <section aria-labelledby={titleId} className="mt-16 lg:mt-20">
      <Container>
        <SectionHeading id={titleId} title={t("title")} />
        <ResumeDialogProvider positions={positions}>
          <ul className="mt-8 grid gap-[15px] sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3.5">
            {vacancies.map((vacancy) => {
              const requirements = t.raw(`items.${vacancy.key}.requirements`) as string[];
              return (
                <li key={vacancy.key}>
                  <article className="flex h-full flex-col rounded-card bg-white px-5 pt-5 pb-[29px]">
                    <ul className="flex flex-wrap gap-[3px] text-base/[19px] text-white">
                      <li className="rounded-pill bg-brand px-4 py-1.5">{t(`categories.${vacancy.category}`)}</li>
                      <li className="rounded-pill bg-muted px-4 py-1.5">{t(`employment.${vacancy.employment}`)}</li>
                    </ul>
                    <h3 className="mt-[15px] text-[24px]/[29px] font-semibold text-ink">
                      {t(`items.${vacancy.key}.title`)}
                    </h3>
                    <p className="mt-2 text-[18px]/[20px] font-medium text-muted">
                      {t("city", { city: t(`items.${vacancy.key}.city`) })}
                    </p>
                    <p className="mt-[15px] text-[18px]/[20px] text-black">{t(`items.${vacancy.key}.description`)}</p>
                    <div className="-mx-[3px] mt-[26px] mb-[19px] rounded-card bg-brand/8 pt-3.5 pr-4 pb-[19px] pl-[19px]">
                      <h4 className="text-[20px]/[20px] font-semibold text-black">{t("requirements")}</h4>
                      <ul className="mt-[19px] list-disc pl-[17px] text-[18px]/[20px] text-black">
                        {requirements.map((requirement) => (
                          <li key={requirement}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                    <ApplyButton position={vacancy.key} className="mt-auto" />
                  </article>
                </li>
              );
            })}
          </ul>
        </ResumeDialogProvider>
      </Container>
    </section>
  );
}
