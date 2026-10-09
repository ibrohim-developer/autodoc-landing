import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { ContactsOffice } from "@/components/sections/ContactsOffice";
import { Feedback } from "@/components/sections/Feedback";
import { Footer } from "@/components/layout/Footer";
import { routes } from "@/content/navigation";
import { localeAlternates, ogLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contacts">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Contacts" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(routes.contacts, locale),
    openGraph: {
      type: "website",
      siteName: "Autodoc",
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: ogLocale(locale),
    },
  };
}

export default function ContactsPage() {
  return (
    <>
      <Header variant="page" />
      <main className="overflow-x-clip">
        <ContactsOffice />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
