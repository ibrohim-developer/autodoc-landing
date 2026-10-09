import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/content/blog";
import { PostCard } from "./PostCard";
import { PostsCarousel } from "./PostsCarousel";

const titleId = "other-posts-title";

export function OtherPosts({ currentId }: { currentId: string }) {
  const t = useTranslations("Blog");
  const posts = blogPosts.filter((post) => post.id !== currentId);

  return (
    <section aria-labelledby={titleId} className="mt-16 lg:mt-[100px]">
      <Container>
        <PostsCarousel
          heading={<SectionHeading id={titleId} title={t("others")} />}
          prevLabel={t("prev")}
          nextLabel={t("next")}
        >
          {posts.map((post) => (
            <li
              key={post.id}
              className="w-[280px] shrink-0 snap-start sm:w-[calc((100%-14px)/2)] lg:w-[calc((100%-28px)/3)] xl:w-[calc((100%-42px)/4)]"
            >
              <PostCard post={post} />
            </li>
          ))}
        </PostsCarousel>
      </Container>
    </section>
  );
}
