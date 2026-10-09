import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustLogos } from "@/content/trust";

const titleId = "partners-title";

// The full-colour logos of the home page's "trusted by" strip, each with its name and what it is.
export function PartnersCatalog() {
  const t = useTranslations("Partners");

  return (
    <section aria-labelledby={titleId} className="mt-16 lg:mt-20">
      <Container>
        <SectionHeading id={titleId} title={t("title")} />
        <ul className="mt-8 grid gap-[11px] gap-y-[13px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {trustLogos.map((item) => (
            <li
              key={item.key}
              className="flex min-h-[256px] flex-col items-center rounded-card bg-white px-4 pt-[30px] pb-[30px] text-center"
            >
              <div className="grid h-[119px] w-full place-items-center">
                <Image
                  src={item.logo}
                  alt=""
                  width={item.width}
                  height={item.height}
                  className="max-h-[119px] w-auto max-w-full object-contain"
                />
              </div>
              <h3 className="mt-6 text-[24px]/[29px] font-semibold text-ink">{t(`items.${item.key}.name`)}</h3>
              <p className="mt-1 text-base/[19px] text-muted">{t(`items.${item.key}.caption`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
