import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { BlogArticle, BlogArticleFallback } from "@/components/sections/BlogArticle";
import { BlogIntro } from "@/components/sections/BlogIntro";
import { OtherPosts } from "@/components/sections/OtherPosts";
import { Feedback } from "@/components/sections/Feedback";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { blogPosts, getBlogPost } from "@/content/blog";
import { blogPostPath } from "@/content/navigation";
import { localeAlternates, ogLocale } from "@/i18n/metadata";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

type Params = PageProps<"/[locale]/blog/[id]">["params"];

// Every known post is prerendered; unknown ids render the 404 page.
export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[id]">): Promise<Metadata> {
  const { locale, id } = await params;
  const post = getBlogPost(id);
  if (!hasLocale(routing.locales, locale) || !post) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const title = t(`posts.${post.key}.title`);
  const description = t(`posts.${post.key}.excerpt`);

  return {
    title: `${title} — Autodoc`,
    description,
    alternates: localeAlternates(blogPostPath(post.id), locale),
    openGraph: {
      type: "article",
      siteName: "Autodoc",
      title,
      description,
      locale: ogLocale(locale),
      publishedTime: post.date,
      images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: title }],
    },
  };
}

// Links into this route share one App Shell, so everything that depends on the id
// streams behind Suspense and the shell (header, intro, footer) renders instantly.
export default function BlogPostPage({ params }: PageProps<"/[locale]/blog/[id]">) {
  return (
    <>
      <Header variant="page" />
      <main className="overflow-x-clip">
        {/* The top padding clears the absolutely positioned header. */}
        <Container className="pt-[104px] sm:pt-[150px]">
          <BlogIntro variant="post" />
        </Container>
        <Suspense fallback={<BlogArticleFallback />}>
          <Post params={params} />
        </Suspense>
        <Feedback />
      </main>
      <Footer />
    </>
  );
}

async function Post({ params }: { params: Params }) {
  const { locale, id } = await params;
  const post = getBlogPost(id);
  if (!hasLocale(routing.locales, locale) || !post) notFound();
  const url = new URL(getPathname({ href: blogPostPath(post.id), locale }), siteUrl).href;

  return (
    <>
      <BlogArticle post={post} url={url} />
      <OtherPosts currentId={post.id} />
    </>
  );
}
