import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ShowMoreList } from "@/components/ui/ShowMoreList";
import { blogPosts } from "@/content/blog";
import { BlogIntro } from "./BlogIntro";
import { PostCard } from "./PostCard";

export function BlogCatalog() {
  const t = useTranslations("Blog");

  return (
    <section>
      {/* The top padding clears the absolutely positioned header. */}
      <Container className="pt-[104px] sm:pt-[150px]">
        <BlogIntro variant="list" />
        <ShowMoreList
          items={blogPosts.map((post) => ({ key: post.id, node: <PostCard post={post} /> }))}
          pageSize={8}
          moreLabel={t("more")}
          className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:mt-3 xl:grid-cols-4"
        />
      </Container>
    </section>
  );
}
