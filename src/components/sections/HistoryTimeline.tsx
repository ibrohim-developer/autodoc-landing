import Image from "next/image";
import { useTranslations } from "next-intl";
import mark from "@/assets/images/about/mark.svg";
import wordmark from "@/assets/images/about/wordmark.svg";
import logoDark from "@/assets/images/brand/logo-dark.svg";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  historyColumns,
  historyIntroPhotos,
  type Corner,
  type HistoryPhoto,
  type HistoryTile,
  type MilestoneKey,
} from "@/content/history";
import { cn } from "@/lib/cn";
import { PinnedHorizontalScroll } from "./PinnedHorizontalScroll";

const titleId = "history-title";

// Sizes are design pixels times `--u`, which PinnedHorizontalScroll fits to the viewport height.
const tall = "flex-[429_1_0]";
const short = "flex-[333_1_0]";
const columnWidth = "w-[calc(var(--u)*374)]";
const photoSizes = "(min-width: 1024px) 470px, 340px";

// Every tile has a small radius; the corners it lists in `curves` get the design's wide curve.
const curveClasses: Record<Corner, string> = {
  tl: "rounded-tl-[calc(var(--u)*80)]",
  tr: "rounded-tr-[calc(var(--u)*80)]",
  bl: "rounded-bl-[calc(var(--u)*80)]",
  br: "rounded-br-[calc(var(--u)*80)]",
};

function tileShape(curves: Corner[] = []) {
  return cn("rounded-[calc(var(--u)*12)]", ...curves.map((corner) => curveClasses[corner]));
}

// Green fading into the page colour and back, mirrored on every other card.
const milestoneBackgrounds = [
  "bg-[linear-gradient(35deg,var(--color-brand)_0%,var(--color-page)_24%,var(--color-page)_50%,var(--color-brand)_100%)]",
  "bg-[linear-gradient(215deg,var(--color-brand)_0%,var(--color-page)_25%,var(--color-page)_50%,var(--color-brand)_100%)]",
];

function Photo({ photo, sizes, className }: { photo: HistoryPhoto; sizes: string; className?: string }) {
  const t = useTranslations("About.photos");

  return (
    <div className={cn("relative min-h-0 overflow-hidden bg-placeholder", className)}>
      <Image
        src={photo.image}
        alt={t(photo.key)}
        fill
        sizes={sizes}
        placeholder="blur"
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  );
}

function Milestone({ id, background, className }: { id: MilestoneKey; background: string; className?: string }) {
  const t = useTranslations("About.milestones");

  return (
    <article
      className={cn(
        "px-[calc(var(--u)*35)] pt-[calc(var(--u)*53)] pb-[calc(var(--u)*30)] text-ink",
        background,
        className,
      )}
    >
      <p className="text-[length:calc(var(--u)*45)] leading-[calc(var(--u)*35)] font-bold text-black">
        {t(`${id}.year`)}
      </p>
      <h3 className="mt-[calc(var(--u)*17)] text-[length:max(14px,calc(var(--u)*18))] leading-[1.19] text-brand">
        {t(`${id}.title`)}
      </h3>
      <p className="mt-[calc(var(--u)*17)] text-[length:max(14px,calc(var(--u)*16))] leading-[1.25] font-medium">
        {t(`${id}.text`)}
      </p>
    </article>
  );
}

function BrandCard({ className }: { className?: string }) {
  const t = useTranslations("About");

  return (
    <div
      role="img"
      aria-label={t("brandLabel")}
      className={cn(
        "flex min-h-0 flex-col items-center justify-center gap-[calc(var(--u)*39)] bg-[linear-gradient(160deg,#1b201b,#2d803a)]",
        className,
      )}
    >
      <Image src={mark} alt="" className="h-auto w-[calc(var(--u)*159)]" />
      <Image src={wordmark} alt="" className="h-auto w-[calc(var(--u)*267)]" />
    </div>
  );
}

// A phone outline with a sketch of the app screen, until the design's mockup can be exported.
function AppCard({ className }: { className?: string }) {
  const t = useTranslations("About.photos");

  return (
    <div
      role="img"
      aria-label={t("app")}
      className={cn(
        "flex min-h-0 justify-center overflow-hidden bg-[linear-gradient(170deg,#1c271d,var(--color-brand))] pt-[calc(var(--u)*31)]",
        className,
      )}
    >
      <div className="flex w-[calc(var(--u)*224)] flex-col gap-[calc(var(--u)*12)] rounded-t-[calc(var(--u)*34)] border-[calc(var(--u)*7)] border-b-0 border-[#0b0f0b] bg-page px-[calc(var(--u)*14)] pt-[calc(var(--u)*12)]">
        <div className="mx-auto h-[calc(var(--u)*16)] w-[calc(var(--u)*64)] rounded-full bg-[#0b0f0b]" />
        <Image src={logoDark} alt="" className="mt-[calc(var(--u)*6)] h-auto w-[calc(var(--u)*110)]" />
        <div className="h-[calc(var(--u)*70)] rounded-[calc(var(--u)*12)] bg-brand" />
        <div className="grid grid-cols-2 gap-[calc(var(--u)*8)]">
          <div className="h-[calc(var(--u)*56)] rounded-[calc(var(--u)*10)] bg-brand-tint" />
          <div className="h-[calc(var(--u)*56)] rounded-[calc(var(--u)*10)] bg-brand-tint" />
        </div>
        <div className="h-[calc(var(--u)*56)] rounded-[calc(var(--u)*10)] bg-brand-tint" />
      </div>
    </div>
  );
}

function Tile({ tile, size, background }: { tile: HistoryTile; size: string; background: string }) {
  const className = cn(size, tileShape(tile.curves));

  switch (tile.kind) {
    case "photo":
      return <Photo photo={tile} sizes={photoSizes} className={className} />;
    case "milestone":
      return <Milestone id={tile.key} background={background} className={className} />;
    case "brand":
      return <BrandCard className={className} />;
    case "app":
      return <AppCard className={className} />;
  }
}

// "History of the holding": a wide strip of milestones and photos that scrolls sideways.
// Below lg it is a swipeable row under the title.
export function HistoryTimeline() {
  const t = useTranslations("About");
  const tNav = useTranslations("Nav");
  const [introWide, introNarrow] = historyIntroPhotos;
  let milestoneIndex = 0;

  const heading = (
    <div className="px-4 pt-[104px] sm:px-6 sm:pt-[150px] xl:px-10 group-data-pinned/pin:absolute group-data-pinned/pin:top-[calc(var(--u)*8)] group-data-pinned/pin:left-[calc(var(--u)*40)] group-data-pinned/pin:z-10 group-data-pinned/pin:w-[calc(var(--u)*540)] group-data-pinned/pin:p-0">
      <Breadcrumbs items={[{ label: tNav("about") }]} />
      <p className="mt-8 text-[18px]/[21px] text-brand group-data-pinned/pin:mt-[calc(var(--u)*93)] group-data-pinned/pin:text-[length:max(15px,calc(var(--u)*18))]">
        {t("eyebrow")}
      </p>
      <h1
        id={titleId}
        className="mt-3 max-w-[512px] text-[26px]/[30px] font-bold text-black sm:text-[34px]/[35px] group-data-pinned/pin:mt-[calc(var(--u)*22)] group-data-pinned/pin:max-w-none group-data-pinned/pin:text-[length:calc(var(--u)*34)] group-data-pinned/pin:leading-[calc(var(--u)*35)]"
      >
        {t("title")}
      </h1>
    </div>
  );

  return (
    <PinnedHorizontalScroll heading={heading} labelledBy={titleId}>
      <div
        className={cn(
          "flex shrink-0 snap-start flex-col gap-[calc(var(--u)*12)] group-data-pinned/pin:w-[calc(var(--u)*966)] group-data-pinned/pin:flex-row group-data-pinned/pin:items-end",
          columnWidth,
        )}
      >
        <Photo
          photo={introWide}
          sizes="(min-width: 1024px) 730px, 340px"
          className={cn(
            tall,
            tileShape(["tl", "tr"]),
            "group-data-pinned/pin:h-[calc(var(--u)*333)] group-data-pinned/pin:w-[calc(var(--u)*580)] group-data-pinned/pin:flex-none",
          )}
        />
        <Photo
          photo={introNarrow}
          sizes={photoSizes}
          className={cn(
            short,
            tileShape(["tl", "tr"]),
            "group-data-pinned/pin:h-[calc(var(--u)*333)] group-data-pinned/pin:w-[calc(var(--u)*374)] group-data-pinned/pin:flex-none",
          )}
        />
      </div>

      {historyColumns.map((column, index) => (
        <div key={index} className={cn("flex shrink-0 snap-start flex-col gap-[calc(var(--u)*12)]", columnWidth)}>
          {(["top", "bottom"] as const).map((slot) => {
            const tile = column[slot];
            const background = milestoneBackgrounds[tile.kind === "milestone" ? milestoneIndex++ % 2 : 0];
            return <Tile key={slot} tile={tile} size={column.tall === slot ? tall : short} background={background} />;
          })}
        </div>
      ))}
    </PinnedHorizontalScroll>
  );
}
