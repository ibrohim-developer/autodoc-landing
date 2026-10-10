import Image from "next/image";
import { useTranslations } from "next-intl";
import calendar from "@/assets/images/icons/calendar.svg";
import facebook from "@/assets/images/icons/facebook-ink.svg";
import instagram from "@/assets/images/icons/instagram-ink.svg";
import telegram from "@/assets/images/icons/telegram-ink.svg";
import { Container } from "@/components/ui/Container";
import type { BlogPost } from "@/content/blog";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/formatDate";
import { InstagramShareButton } from "./InstagramShareButton";

type Props = {
  post: BlogPost;
  // Absolute URL of this post, for the share links.
  url: string;
};

const column = "mx-auto mt-8 max-w-[648px] lg:mt-[50px]";

const shareButton =
  "grid size-[42px] place-items-center rounded-full bg-white inset-ring inset-ring-black/10 transition-colors hover:bg-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function BlogArticle({ post, url }: Props) {
  const t = useTranslations("Blog");
  const title = t(`posts.${post.key}.title`);
  const body: string[] = t.raw(`posts.${post.key}.body`);
  const shareLinks = [
    {
      name: "Telegram",
      icon: telegram,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    { name: "Facebook", icon: facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <Container>
      <article className={column}>
        <Image
          src={post.image}
          alt={title}
          sizes="(min-width: 688px) 648px, 100vw"
          placeholder="blur"
          preload
          className="aspect-[648/358] h-auto w-full rounded-card object-cover"
        />
        <h1 className="mt-6 max-w-[540px] text-[22px]/[26px] font-medium text-ink sm:text-[24px]/[28px]">{title}</h1>
        <div className="mt-5 flex flex-col gap-[18px] text-base/[24px] text-ink sm:text-[18px]/[27px] lg:text-[20px]/[29px]">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 lg:mt-[50px]">
          <div className="flex items-center gap-4">
            <p className="text-[18px]/[22px] font-medium text-ink">{t("share")}</p>
            <ul className="flex gap-2.5">
              <li>
                <InstagramShareButton
                  url={url}
                  title={title}
                  label={t("shareOn", { network: "Instagram" })}
                  copiedLabel={t("linkCopied")}
                  className={shareButton}
                >
                  <Image src={instagram} alt="" />
                </InstagramShareButton>
              </li>
              {shareLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("shareOn", { network: link.name })}
                    className={shareButton}
                  >
                    <Image src={link.icon} alt="" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <span className="flex items-center gap-2 text-[18px]/[22px] text-muted-2">
            <Image src={calendar} alt="" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
        </footer>
      </article>
    </Container>
  );
}

// Shown while a client navigation streams the post in.
export function BlogArticleFallback() {
  return (
    <Container>
      <div aria-hidden="true" className={cn(column, "animate-pulse")}>
        <div className="aspect-[648/358] rounded-card bg-placeholder/60" />
        <div className="mt-6 h-[52px] max-w-[540px] rounded-md bg-placeholder/60" />
        <div className="mt-5 h-[200px] rounded-md bg-placeholder/40" />
      </div>
    </Container>
  );
}
