import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Crumb = { label: string; href?: string };

// Starts at the home page. A crumb without a href is the current page.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
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
                  className="rounded-sm transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
