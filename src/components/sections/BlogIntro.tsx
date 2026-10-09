import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/content/navigation";

// Breadcrumbs and the "Blog" title. On a post the breadcrumb links back to the list,
// and the title steps down from h1 since the post's own title is the page heading.
export function BlogIntro({ variant }: { variant: "list" | "post" }) {
  const t = useTranslations("Blog");
  const onPost = variant === "post";

  return (
    <>
      <Breadcrumbs items={[{ label: t("title"), href: onPost ? routes.blog : undefined }]} />
      <SectionHeading as={onPost ? "p" : "h1"} title={t("title")} className="mt-2.5" />
    </>
  );
}
