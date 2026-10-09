import type { StaticImageData } from "next/image";
import news1 from "@/assets/images/news/news-1.webp";
import news2 from "@/assets/images/news/news-2.webp";
import news3 from "@/assets/images/news/news-3.webp";
import news4 from "@/assets/images/news/news-4.webp";

// Copy lives in messages under `Blog.posts.<key>`: title, excerpt and body paragraphs.
export type BlogKey = "registration" | "eidGreeting";

export type BlogPost = { id: string; key: BlogKey; image: StaticImageData; date: string };

// Newest first. Real posts are not in the design yet: the sample copy repeats across the list.
export const blogPosts: BlogPost[] = [
  { id: "1", key: "registration", image: news1, date: "2026-10-05" },
  { id: "2", key: "eidGreeting", image: news2, date: "2026-10-05" },
  { id: "3", key: "registration", image: news3, date: "2026-10-05" },
  { id: "4", key: "registration", image: news4, date: "2026-10-05" },
  { id: "5", key: "registration", image: news1, date: "2026-10-05" },
  { id: "6", key: "eidGreeting", image: news2, date: "2026-10-05" },
  { id: "7", key: "registration", image: news3, date: "2026-10-05" },
  { id: "8", key: "registration", image: news4, date: "2026-10-05" },
  { id: "9", key: "registration", image: news1, date: "2026-10-05" },
  { id: "10", key: "eidGreeting", image: news2, date: "2026-10-05" },
  { id: "11", key: "registration", image: news3, date: "2026-10-05" },
  { id: "12", key: "registration", image: news4, date: "2026-10-05" },
];

export function getBlogPost(id: string) {
  return blogPosts.find((post) => post.id === id);
}
