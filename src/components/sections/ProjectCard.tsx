import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import projectArrow from "@/assets/images/directions/project-arrow.svg";
import markBadge from "@/assets/images/brand/mark-badge.svg";
import {
  projectStatIcons,
  type Project,
  type ProjectImageAltKey,
  type ProjectStatKey,
  type ProjectStatMessageKey,
} from "@/content/directions";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  // The direction's icon fills the image tile for projects without a photo.
  icon: StaticImageData;
  // "compact" sits beside the direction tabs on the home page, with the description clamped to three lines.
  // "wide" spans the projects page: full description, stats pinned to the bottom with the arrow beside them.
  layout?: "compact" | "wide";
};

const tileClass =
  "flex aspect-[16/10] w-full shrink-0 justify-center overflow-hidden rounded-card bg-linear-to-b from-[#1c271d] to-[#296a32] @min-[640px]:size-[246px]";

// Cards switch layout on their own width: stacked below 640px, image beside the content from 640px,
// and the full design (stats in one row with dividers, arrow on the right) from 940px.
// The wide arrow moves to the bottom right only from 1100px, where the stats row has room for it;
// without stats, the content keeps that corner clear so a long description can't run under the arrow.
export function ProjectCard({ project, icon, layout = "compact" }: Props) {
  const t = useTranslations("Directions");
  const wide = layout === "wide";
  const { key, image } = project;
  const stats: ProjectStatKey[] = project.stats ?? [];
  const imageAlt = image ? t(`projects.${key}.imageAlt` as ProjectImageAltKey) : "";
  const statText = (stat: ProjectStatKey, field: "value" | "label") =>
    t(`projects.${key}.stats.${stat}.${field}` as ProjectStatMessageKey);

  return (
    <article className="@container rounded-card bg-white p-3.5">
      <div className="flex flex-col gap-5 @min-[640px]:flex-row @min-[640px]:gap-[30px]">
        {!image ? (
          <div className={cn(tileClass, "items-center")}>
            <span className="grid size-[104px] place-items-center rounded-[28px] bg-white/8 ring-1 ring-white/15">
              <span
                aria-hidden="true"
                className="size-14 bg-accent mask-contain mask-center mask-no-repeat"
                style={{ maskImage: `url(${icon.src})`, WebkitMaskImage: `url(${icon.src})` }}
              />
            </span>
          </div>
        ) : image.cutout ? (
          <div className={cn(tileClass, "items-end pt-[19px]")}>
            <Image src={image.src} alt={imageAlt} className="h-full max-h-[227px] w-auto object-contain" />
          </div>
        ) : (
          <Image
            src={image.src}
            alt={imageAlt}
            sizes="(min-width: 688px) 246px, 100vw"
            placeholder="blur"
            className="aspect-[16/10] h-auto w-full rounded-card object-cover @min-[640px]:size-[246px] @min-[640px]:shrink-0"
          />
        )}
        <div
          className={cn(
            "relative min-w-0 flex-1 @min-[640px]:pt-[7.5px]",
            wide && "@min-[640px]:flex @min-[640px]:flex-col @min-[940px]:pb-[9px]",
            wide && stats.length === 0 && "@min-[1100px]:pb-[66px]",
          )}
        >
          <div className={cn("flex items-center gap-4", wide && "@min-[940px]:gap-5")}>
            <Image src={markBadge} alt="" className="shrink-0" />
            <h3 className="text-[20px]/[22px] font-semibold text-ink @min-[640px]:text-[22px]/[24px]">
              {t(`projects.${key}.title`)}
            </h3>
            <a
              href="#"
              aria-label={t("open")}
              className={cn(
                "ml-auto shrink-0 self-start rounded-md transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                !wide && "@min-[940px]:absolute @min-[940px]:top-[97px] @min-[940px]:right-[17px]",
                wide && "@min-[1100px]:absolute @min-[1100px]:right-[25px] @min-[1100px]:bottom-3",
              )}
            >
              <Image src={projectArrow} alt="" />
            </a>
          </div>
          <p
            className={cn(
              "mt-4 text-base/[19px] text-muted",
              wide ? "max-w-[900px] @min-[940px]:mt-7" : "line-clamp-3 max-w-[479px] @min-[940px]:mt-[32.5px]",
            )}
          >
            {t(`projects.${key}.description`)}
          </p>
          {stats.length > 0 && (
            <ul
              className={cn(
                "mt-6 grid grid-cols-3 gap-3 @max-[440px]:grid-cols-1 @min-[940px]:flex @min-[940px]:gap-0",
                wide ? "@min-[640px]:mt-auto @min-[640px]:pt-6" : "@min-[940px]:mt-[35px]",
              )}
            >
              {stats.map((stat) => (
                <li
                  key={stat}
                  className="flex flex-col gap-2 @max-[440px]:flex-row @max-[440px]:items-center @max-[440px]:gap-4 @min-[940px]:flex-row @min-[940px]:gap-[19px] @min-[940px]:not-first:ml-[26px] @min-[940px]:not-first:border-l @min-[940px]:not-first:border-black/11 @min-[940px]:not-first:pl-[26px]"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-card bg-brand-soft @min-[940px]:mt-1">
                    <Image src={projectStatIcons[stat]} alt="" />
                  </span>
                  <span>
                    <span className="block text-[20px]/[35px] font-bold text-ink">
                      {statText(stat, "value")}
                    </span>
                    <span className="block text-base/[19px] text-muted">{statText(stat, "label")}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
