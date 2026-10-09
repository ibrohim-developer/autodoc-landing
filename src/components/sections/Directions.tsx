import Image from "next/image";
import { useTranslations } from "next-intl";
import decorGlass from "@/assets/images/directions/decor-glass.webp";
import chevronBrand from "@/assets/images/icons/chevron-right-brand.svg";
import chevronMuted from "@/assets/images/icons/chevron-right-muted.svg";
import chevronWhite from "@/assets/images/icons/chevron-right-white.svg";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { directionProjects, directions } from "@/content/directions";
import { anchors, routes } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { DirectionsTabs } from "./DirectionsTabs";
import { ProjectCard } from "./ProjectCard";

function DirectionPanel() {
  const t = useTranslations("Directions");

  return (
    <>
      <ul className="flex flex-col gap-[15px]">
        {directionProjects.map((project, index) => (
          <li key={index}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <Link
        href={routes.projects}
        className="mt-[26px] flex h-[50px] items-center justify-center gap-[13px] rounded-pill bg-brand-tint text-base/4 font-semibold text-brand transition-colors hover:bg-[#dcebdf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {t("viewAll")}
        <Image src={chevronBrand} alt="" />
      </Link>
    </>
  );
}

export function Directions() {
  const t = useTranslations("Directions");

  return (
    <section id={anchors.directions} className="mt-16 lg:mt-20">
      <Container>
        <div className="relative">
          <Image
            src={decorGlass}
            alt=""
            sizes="1042px"
            className="pointer-events-none absolute top-[614px] left-[-461px] -z-10 hidden h-auto w-[1042px] max-w-none opacity-20 xl:block"
          />
          <SectionHeading title={t("title")} />
          <div className="mt-[37px]">
            <DirectionsTabs
              categories={directions.map((direction) => ({
                key: direction.key,
                label: t(`categories.${direction.key}`),
                icon: direction.icon,
              }))}
              panels={directions.map((direction) => (
                <DirectionPanel key={direction.key} />
              ))}
              chevron={chevronMuted}
              chevronActive={chevronWhite}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
