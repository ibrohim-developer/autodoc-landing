import Image from "next/image";
import { useTranslations } from "next-intl";
import chevronBrand from "@/assets/images/icons/chevron-right-brand-pill.svg";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/content/blog";
import { anchors, routes } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { PostCard } from "./PostCard";

const latestPosts = blogPosts.slice(0, 4);

export function News() {
  const t = useTranslations("News");

  return (
    <section id={anchors.news} className="mt-16 lg:mt-[76px]">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading title={t("title")} />
          <Link
            href={routes.blog}
            className="flex h-[37px] min-w-[179px] items-center justify-between gap-3 rounded-pill bg-brand/8 px-[18px] text-base text-brand transition-colors hover:bg-brand/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {t("more")}
            <Image src={chevronBrand} alt="" />
          </Link>
        </div>
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:mt-[42px] xl:grid-cols-4">
          {latestPosts.map((post) => (
            <li key={post.id} className="w-[280px] shrink-0 snap-start sm:w-auto">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
