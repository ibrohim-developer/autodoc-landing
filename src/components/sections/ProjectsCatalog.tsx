import Image from "next/image";
import { useTranslations } from "next-intl";
import decorGlass from "@/assets/images/directions/decor-glass.webp";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { directions, type Direction } from "@/content/directions";
import { ProjectCard } from "./ProjectCard";
import { ProjectsTabs } from "./ProjectsTabs";

const titleId = "projects-title";

function ProjectsPanel({ direction }: { direction: Direction }) {
  return (
    <ul className="flex flex-col gap-[15px]">
      {direction.projects.map((project) => (
        <li key={project.key}>
          <ProjectCard project={project} icon={direction.icon} layout="wide" />
        </li>
      ))}
    </ul>
  );
}

export function ProjectsCatalog() {
  const t = useTranslations("Projects");
  const tDirections = useTranslations("Directions");

  return (
    <section>
      <Container>
        {/* The top padding clears the absolutely positioned header. */}
        <div className="relative pt-[104px] sm:pt-[150px]">
          <Image
            src={decorGlass}
            alt=""
            sizes="979px"
            className="pointer-events-none absolute top-[127px] right-[-220px] -z-10 hidden h-auto w-[979px] max-w-none opacity-20 lg:block"
          />
          <Breadcrumbs items={[{ label: t("breadcrumb") }]} />
          <SectionHeading as="h1" id={titleId} title={tDirections("title")} className="mt-2.5" />
          <div className="mt-6 md:mt-[33px]">
            <ProjectsTabs
              labelledBy={titleId}
              categories={directions.map((direction) => ({
                key: direction.key,
                label: t(`categories.${direction.key}`),
              }))}
              panels={directions.map((direction) => (
                <ProjectsPanel key={direction.key} direction={direction} />
              ))}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
