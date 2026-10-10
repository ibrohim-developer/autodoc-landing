import Image from "next/image";
import { useTranslations } from "next-intl";
import calendar from "@/assets/images/icons/calendar.svg";
import chevronInk from "@/assets/images/icons/chevron-right-ink-small.svg";
import type { BlogPost } from "@/content/blog";
import { blogPostPath } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/formatDate";

// The "details" link stretches over the card, so the whole card opens the post.
export function PostCard({ post }: { post: BlogPost }) {
  const t = useTranslations("Blog");
  const title = t(`posts.${post.key}.title`);

  return (
    <article className="group relative flex h-full min-h-[371px] flex-col overflow-hidden rounded-card bg-white">
      <Image
        src={post.image}
        alt={title}
        sizes="(min-width: 1440px) 330px, (min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
        placeholder="blur"
        className="h-[185px] w-full object-cover"
      />
      <div className="flex flex-1 flex-col pb-[19px] pl-3.5 pr-3.5 sm:pr-[18px]">
        <h3 className="mt-[11px] line-clamp-3 max-w-[304px] text-[20px]/[20px] font-medium text-ink">{title}</h3>
        <p className="mt-[7px] line-clamp-2 max-w-[292px] text-base/[19px] text-muted">{t(`posts.${post.key}.excerpt`)}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          <span className="flex items-center gap-2 text-base text-muted">
            <Image src={calendar} alt="" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <Link
            href={blogPostPath(post.id)}
            aria-label={`${t("details")}: ${title}`}
            className="flex h-[39px] shrink-0 items-center justify-between gap-3 rounded-pill bg-pill px-3.5 text-base font-medium text-ink transition-colors group-hover:bg-[#ececec] after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-[145px] sm:pr-[19px] sm:pl-[17.5px]"
          >
            {t("details")}
            <Image src={chevronInk} alt="" />
          </Link>
        </div>
      </div>
    </article>
  );
}
