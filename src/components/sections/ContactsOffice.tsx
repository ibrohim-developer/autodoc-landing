import type { ReactNode } from "react";
import Image from "next/image";
import { type Locale, useLocale, useTranslations } from "next-intl";
import decorGlass from "@/assets/images/directions/decor-glass.webp";
import officePhoto from "@/assets/images/contacts/office.png";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contacts, headOffice } from "@/content/navigation";

const titleId = "contacts-title";
const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const mapLanguages: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };

// Yandex map widget with a pin on the office. Needs no API key, but always draws its own blue pin.
function mapSrc(locale: Locale) {
  const point = `${headOffice.lon},${headOffice.lat}`;
  const params = new URLSearchParams({
    ll: point,
    z: "15",
    pt: point,
    lang: mapLanguages[locale],
  });
  return `https://yandex.uz/map-widget/v1/?${params}`;
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="@min-[500px]:odd:pr-6 @min-[500px]:even:pl-[60px]">
      <dt className="text-base/[22px] font-medium text-white/70">{label}</dt>
      <dd className="mt-[9px] text-[22px]/[20px] font-medium">{children}</dd>
    </div>
  );
}

// Breadcrumbs and the page title, then the map beside the head office card.
// The map and card run edge to edge; on small screens the card comes first.
// The details split into two columns on the card's own width, since it is narrowest just above lg.
export function ContactsOffice() {
  const t = useTranslations("Contacts");
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const locale = useLocale();

  return (
    <section aria-labelledby={titleId}>
      {/* The top padding clears the absolutely positioned header. */}
      <Container className="pt-[104px] sm:pt-[150px]">
        <Breadcrumbs items={[{ label: tNav("contacts") }]} />
        <SectionHeading as="h1" id={titleId} title={tNav("contacts")} className="mt-2.5" />
      </Container>

      <div className="mt-6 grid md:mt-[33px] lg:min-h-[703px] lg:grid-cols-2">
        <div className="@container relative isolate overflow-hidden bg-footer px-4 pt-10 pb-12 text-white sm:px-6 lg:col-start-2 lg:row-start-1 lg:px-16 lg:pt-[66px] lg:pb-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_100%_0%,rgb(47_138_61/0.5),transparent)]"
          />
          <Image
            src={decorGlass}
            alt=""
            aria-hidden="true"
            sizes="918px"
            className="pointer-events-none absolute top-[209px] left-[137px] -z-10 hidden h-auto w-[918px] max-w-none opacity-[0.07] lg:block"
          />

          <div className="relative size-[180px] overflow-hidden rounded-full bg-white/5 lg:size-[254px]">
            <Image
              src={officePhoto}
              alt={t("office.photoAlt")}
              fill
              sizes="(min-width: 1024px) 254px, 180px"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <h2 className="mt-8 text-[28px]/[34px] font-medium lg:mt-11 lg:text-[32px]/[38px]">{t("office.title")}</h2>

          <dl className="relative mt-8 grid gap-y-6 @min-[500px]:grid-cols-[250px_auto] @min-[500px]:gap-y-[33px] @min-[500px]:before:absolute @min-[500px]:before:inset-y-0 @min-[500px]:before:left-[250px] @min-[500px]:before:w-px @min-[500px]:before:bg-white/14 lg:mt-14">
            <Detail label={t("office.addressLabel")}>
              <span className="whitespace-pre-line">{t("office.address")}</span>
            </Detail>
            <Detail label={t("office.phoneLabel")}>
              <a href={contacts.phoneHref} className={focusRing}>
                {contacts.phone}
              </a>
            </Detail>
            <Detail label={tFooter("phoneLabel")}>
              <a href={contacts.phoneHref} className={focusRing}>
                {contacts.phone}
              </a>
            </Detail>
            <Detail label={tFooter("emailLabel")}>
              <a
                href={`mailto:${contacts.email}`}
                className="inline-block border-b-[1.5px] border-white pb-2.5 transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {contacts.email}
              </a>
            </Detail>
          </dl>
        </div>

        <div className="relative h-[360px] bg-placeholder sm:h-[440px] lg:col-start-1 lg:row-start-1 lg:h-auto">
          <iframe
            src={mapSrc(locale)}
            title={t("mapTitle")}
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
