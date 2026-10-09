import { Container } from "@/components/ui/Container";
import { blogPosts } from "@/content/blog";
import { BlogIntro } from "./BlogIntro";
import { PostCard } from "./PostCard";

export function BlogCatalog() {
  return (
    <section>
      {/* The top padding clears the absolutely positioned header. */}
      <Container className="pt-[104px] sm:pt-[150px]">
        <BlogIntro variant="list" />
        <ul className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:mt-3 xl:grid-cols-4">
          {blogPosts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
