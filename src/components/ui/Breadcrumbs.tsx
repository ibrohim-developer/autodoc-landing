import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Crumb = { label: string; href?: string };

// Starts at the home page. A crumb without a href is the current page.
// "light" is for breadcrumbs over a dark hero photo.
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const t = useTranslations("Nav");
  const crumbs: Crumb[] = [{ label: t("home"), href: "/" }, ...items];

  return (
    <nav aria-label={t("breadcrumbLabel")}>
      <ol className="flex flex-wrap text-base/[19px] text-muted">
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            {index > 0 && <li aria-hidden="true">/</li>}
            <li aria-current={crumb.href ? undefined : "page"}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className={cn(
                    "rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                    tone === "dark" ? "hover:text-ink focus-visible:outline-brand" : "hover:text-white focus-visible:outline-white",
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                crumb.label
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
