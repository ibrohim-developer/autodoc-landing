import Image from "next/image";
import { useTranslations } from "next-intl";
import projectArrow from "@/assets/images/directions/project-arrow.svg";
import markBadge from "@/assets/images/brand/mark-badge.svg";
import { projectImages, projectStats, type ProjectKey } from "@/content/directions";
import { cn } from "@/lib/cn";

type Props = {
  project: ProjectKey;
  // "compact" sits beside the direction tabs on the home page. "wide" spans the projects page:
  // one-line title, a longer clamped description, stats pinned to the bottom with the arrow beside them.
  layout?: "compact" | "wide";
};

// Cards switch layout on their own width: stacked below 640px, image beside the content from 640px,
// and the full design (stats in one row with dividers, arrow on the right) from 940px.
// The wide arrow moves next to the stats only from 1100px, where the row has room for it.
export function ProjectCard({ project, layout = "compact" }: Props) {
  const t = useTranslations("Directions");
  const wide = layout === "wide";

  return (
    <article className="@container rounded-card bg-white p-3.5">
      <div className="flex flex-col gap-5 @min-[640px]:flex-row @min-[640px]:gap-[30px]">
        <Image
          src={projectImages[project]}
          alt={t(`projects.${project}.imageAlt`)}
          sizes="(min-width: 688px) 246px, 100vw"
          placeholder="blur"
          className="aspect-[16/10] h-auto w-full rounded-card object-cover @min-[640px]:size-[246px] @min-[640px]:shrink-0"
        />
        <div
          className={cn(
            "relative min-w-0 flex-1 @min-[640px]:pt-[7.5px]",
            wide && "@min-[640px]:flex @min-[640px]:flex-col @min-[940px]:pb-[9px]",
          )}
        >
          <div className={cn("flex items-center gap-4", wide && "@min-[940px]:gap-5")}>
            <Image src={markBadge} alt="" className="shrink-0" />
            <h3
              className={cn(
                "text-[20px]/[22px] font-semibold text-ink @min-[640px]:text-[22px]/[24px]",
                !wide && "max-w-[369px]",
              )}
            >
              {t(`projects.${project}.title`)}
            </h3>
            <a
              href="#"
              aria-label={t("open")}
              className={cn(
                "ml-auto shrink-0 self-start rounded-md transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                wide
                  ? "@min-[1100px]:absolute @min-[1100px]:right-[25px] @min-[1100px]:bottom-3"
                  : "@min-[940px]:absolute @min-[940px]:top-[97px] @min-[940px]:right-[17px]",
              )}
            >
              <Image src={projectArrow} alt="" />
            </a>
          </div>
          <p
            className={cn(
              "mt-4 text-base/[19px] text-muted",
              wide ? "line-clamp-3 max-w-[900px] @min-[940px]:mt-7" : "max-w-[479px] @min-[940px]:mt-[32.5px]",
            )}
          >
            {t(`projects.${project}.description`)}
          </p>
          <ul
            className={cn(
              "mt-6 grid grid-cols-3 gap-3 @max-[440px]:grid-cols-1 @min-[940px]:flex @min-[940px]:gap-0",
              wide ? "@min-[640px]:mt-auto @min-[640px]:pt-6" : "@min-[940px]:mt-[35px]",
            )}
          >
            {projectStats.map((stat) => (
              <li
                key={stat.key}
                className="flex flex-col gap-2 @max-[440px]:flex-row @max-[440px]:items-center @max-[440px]:gap-4 @min-[940px]:flex-row @min-[940px]:gap-[19px] @min-[940px]:not-first:ml-[26px] @min-[940px]:not-first:border-l @min-[940px]:not-first:border-black/11 @min-[940px]:not-first:pl-[26px]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-card bg-brand-soft @min-[940px]:mt-1">
                  <Image src={stat.icon} alt="" />
                </span>
                <span>
                  <span className="block text-[20px]/[35px] font-bold text-ink">
                    {t(`projects.${project}.stats.${stat.key}.value`)}
                  </span>
                  <span className="block text-base/[19px] text-muted">
                    {t(`projects.${project}.stats.${stat.key}.label`)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
