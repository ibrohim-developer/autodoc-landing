import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { CareerHero } from "@/components/sections/CareerHero";
import { Stats } from "@/components/sections/Stats";
import { CareerAdvantages } from "@/components/sections/CareerAdvantages";
import { Vacancies } from "@/components/sections/Vacancies";
import { Feedback } from "@/components/sections/Feedback";
import { Footer } from "@/components/layout/Footer";
import { routes } from "@/content/navigation";
import { localeAlternates, ogLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/vacancies">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Career" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(routes.vacancies, locale),
    openGraph: {
      type: "website",
      siteName: "Autodoc",
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: ogLocale(locale),
    },
  };
}

export default function VacanciesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <CareerHero />
        <Stats />
        <CareerAdvantages />
        <Vacancies />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
