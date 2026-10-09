import Image, { type StaticImageData } from "next/image";
import chevronRight from "@/assets/images/icons/chevron-right-white.svg";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import type { NavHref } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  image: StaticImageData;
  // Positions the photo, e.g. where it is anchored as narrower screens crop it.
  imageClassName?: string;
  // Darkens the left side at every width, for photos that are bright behind the text.
  scrim?: boolean;
  breadcrumb: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: NavHref };
};

const ctaClass =
  "group mt-8 inline-flex h-[51px] items-center gap-7 rounded-card border border-white pr-7 pl-[23px] text-[20px] font-medium text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Full-bleed photo hero of the inner pages (vacancies, partners) with breadcrumbs, title and one outlined button.
export function PageHero({ image, imageClassName = "object-center", scrim = false, breadcrumb, title, subtitle, cta }: Props) {
  const ctaContent = (
    <>
      {cta.label}
      <Image src={chevronRight} alt="" className="h-[11px] w-auto transition-transform group-hover:translate-x-1" />
    </>
  );

  return (
    <section className="relative isolate overflow-hidden bg-forest lg:min-h-[796px]">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className={cn("-z-10 object-cover", imageClassName)}
      />
      {/* The photo is already dark on the left at desktop widths; narrower crops need help. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-linear-to-r from-forest/85 to-forest/20",
          scrim ? "lg:via-forest/40 lg:via-45%" : "lg:hidden",
        )}
      />
      {/* The top padding clears the absolutely positioned header. */}
      <Container className="pt-[104px] pb-16 sm:pt-[150px] lg:pb-20">
        <Breadcrumbs tone="light" items={[{ label: breadcrumb }]} />
        <h1 className="mt-16 max-w-[420px] text-[30px]/[34px] font-bold text-white md:text-[36px]/[40px] lg:mt-[83px] lg:max-w-[440px] lg:text-[42px]/[43px]">
          {title}
        </h1>
        <p className="mt-[25px] max-w-[439px] text-base text-white lg:text-[18px]/[21px]">{subtitle}</p>
        {/* A bare hash scrolls within this page, so it skips the locale-aware Link. */}
        {typeof cta.href === "string" && cta.href.startsWith("#") ? (
          <a href={cta.href} className={ctaClass}>
            {ctaContent}
          </a>
        ) : (
          <Link href={cta.href} className={ctaClass}>
            {ctaContent}
          </Link>
        )}
      </Container>
    </section>
  );
}
