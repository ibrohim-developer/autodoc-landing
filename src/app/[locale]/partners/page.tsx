import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { PartnersHero } from "@/components/sections/PartnersHero";
import { PartnersCatalog } from "@/components/sections/PartnersCatalog";
import { Feedback } from "@/components/sections/Feedback";
import { Footer } from "@/components/layout/Footer";
import { routes } from "@/content/navigation";
import { localeAlternates, ogLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Partners" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(routes.partners, locale),
    openGraph: {
      type: "website",
      siteName: "Autodoc",
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: ogLocale(locale),
    },
  };
}

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PartnersHero />
        <PartnersCatalog />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
