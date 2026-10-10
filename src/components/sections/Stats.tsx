import Image from "next/image";
import { useTranslations } from "next-intl";
import glassPanels from "@/assets/images/stats/glass-panels.webp";
import avatarIiv from "@/assets/images/stats/avatar-iiv.svg";
import avatarTemirYol from "@/assets/images/stats/avatar-temir-yol.svg";
import avatarTransportMinistry from "@/assets/images/stats/avatar-transport-ministry.svg";
import avatarJusticeMinistry from "@/assets/images/stats/avatar-justice-ministry.png";
import avatarEmblem from "@/assets/images/stats/avatar-emblem.png";
import chevronRight from "@/assets/images/icons/chevron-right-ink.svg";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { anchors, routes } from "@/content/navigation";
import { Link } from "@/i18n/navigation";

const avatars = [
  { image: avatarIiv, width: 28, height: 28 },
  { image: avatarTemirYol, width: 27, height: 27 },
  { image: avatarTransportMinistry, width: 27, height: 22 },
  { image: avatarJusticeMinistry, width: 38, height: 38 },
  { image: avatarEmblem, width: 31, height: 31 },
];

const bars = [30, 55, 68, 85, 98];

export function Stats() {
  const t = useTranslations("Stats");

  return (
    <section id={anchors.stats} className="mt-16 lg:mt-20">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-[35px] grid gap-[18px] md:grid-cols-2 xl:grid-cols-[552fr_386fr_386fr]">
          <div className="relative isolate flex min-h-[280px] flex-col overflow-hidden rounded-card bg-[linear-gradient(60.29deg,#061001_14.35%,#2f8a3d_62.69%,#c7d510_95.77%)] px-6 pt-14 pb-[31px] text-white md:col-span-2 md:min-h-[308px] md:pt-[89px] md:pl-[30px] xl:col-span-1">
            <Image
              src={glassPanels}
              alt=""
              sizes="333px"
              className="absolute top-0 right-px -z-10 h-auto w-3/5 max-w-[333px] rounded-card opacity-45 md:w-[333px]"
            />
            <p className="text-[72px]/[31px] font-semibold md:text-[100px]/[43px]"><CountUp value={t("projects.value")} /></p>
            <p className="mt-[33px] text-[24px]/[29px] font-semibold">{t("projects.label")}</p>
            <p className="mt-0.5 text-[18px]/[21px]">{t("projects.caption")}</p>
            <Link
              href={routes.projects}
              className="mt-auto flex h-[39px] w-[193px] shrink-0 items-center justify-between rounded-pill bg-page pr-4 pl-[15px] text-base font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("projects.cta")}
              <Image src={chevronRight} alt="" />
            </Link>
          </div>

          <div className="flex min-h-[280px] flex-col rounded-card bg-white pt-10 pr-4 pb-[30px] pl-6 md:min-h-[308px] md:pt-[42px] md:pl-[38px]">
            <p className="text-[64px]/[34px] font-semibold text-ink md:text-[80px]/[43px]">
              <CountUp value={t("partners.value")} />
              <span className="text-plus">{t("partners.suffix")}</span>
            </p>
            <p className="mt-8 text-[24px]/[29px] font-semibold text-ink">{t("partners.label")}</p>
            <p className="mt-0.5 text-[18px]/[21px] text-muted">{t("partners.caption")}</p>
            <ul aria-hidden="true" className="mt-auto flex pt-8">
              {avatars.map((avatar, index) => (
                <li
                  key={index}
                  className="grid size-[53px] shrink-0 place-items-center rounded-full border border-[rgb(172_177_183/0.35)] bg-white not-first:-ml-[8.5px]"
                >
                  <Image src={avatar.image} alt="" width={avatar.width} height={avatar.height} />
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-card bg-white pt-10 pr-4 pb-[140px] pl-6 md:min-h-[308px] md:pt-[38px] md:pl-[37px]">
            <p className="text-[64px]/[34px] font-semibold text-ink md:text-[80px]/[43px]">
              <CountUp value={t("services.value")} />{" "}
              <span className="text-[44px]/[0] text-plus md:text-[55px]/[0]">{t("services.suffix")}</span>
            </p>
            <p className="mt-8 text-[24px]/[29px] font-semibold text-ink">{t("services.label")}</p>
            <p className="mt-0.5 text-[18px]/[21px] text-muted">{t("services.caption")}</p>
            <div aria-hidden="true" className="absolute right-6 bottom-0 left-6 flex items-end gap-[8.6px] md:left-10">
              {bars.map((height) => (
                <span key={height} className="w-11 rounded-t-[10px] bg-chart" style={{ height }} />
              ))}
              <span className="h-[114px] w-11 rounded-t-[10px] bg-[linear-gradient(30deg,#061001_0%,#2f8a3d_65.2%,#c0cf0b_100%)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
