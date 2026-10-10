import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/assets/images/brand/logo-footer.svg";
import watermark from "@/assets/images/footer/watermark.svg";
import { Container } from "@/components/ui/Container";
import { anchors, contacts, homeSection, navLinks, socials } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tHeader = useTranslations("Header");

  return (
    <footer className="mt-20 overflow-hidden rounded-t-card bg-footer text-white lg:mt-[134px]">
      <Container>
        <div className="relative isolate">
          <Image
            src={watermark}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 -z-10 h-auto w-full max-w-none lg:top-[308px] lg:right-auto lg:bottom-auto lg:left-[594px] lg:w-[770px]"
          />

          <div className="flex flex-col items-start gap-8 pt-10 pb-8 lg:h-[188px] lg:flex-row lg:gap-0 lg:pt-11 lg:pb-0">
            <Link href={homeSection(anchors.top)} aria-label={tHeader("home")} className={cn("shrink-0 lg:mt-px", focusRing)}>
              <Image src={logo} alt="" />
            </Link>
            <nav aria-label={t("navLabel")} className="lg:mt-2 lg:ml-16 xl:ml-[157px]">
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-8 gap-y-4 lg:grid-cols-[repeat(4,auto)] lg:grid-rows-2 lg:gap-x-10 lg:gap-y-10 xl:grid-cols-[178px_239px_165px_auto] xl:gap-x-0">
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className={cn("text-[18px]/[22px] font-medium transition-colors hover:text-white/70", focusRing)}>
                      {tNav(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={`#${anchors.contact}`}
              className="flex h-[37px] min-w-[156px] items-center justify-center rounded-pill bg-page px-4 text-base font-medium text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:ml-auto"
            >
              {tHeader("contact")}
            </a>
          </div>

          <div className="flex flex-col gap-6 border-t border-white/14 py-7 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-12 lg:h-[122px] lg:gap-0 lg:pt-[29px] lg:pb-0">
            <div className="lg:w-[270px]">
              <p className="text-base/[22px] font-medium text-white/70">{t("phoneLabel")}</p>
              <a href={contacts.phoneHref} className={cn("mt-[9px] inline-block text-[22px]/[20px] font-medium", focusRing)}>
                {contacts.phone}
              </a>
            </div>
            <div>
              <p className="text-base/[22px] font-medium text-white/70">{t("emailLabel")}</p>
              <a
                href={`mailto:${contacts.email}`}
                className="mt-[9px] inline-block border-b-[1.5px] border-white pb-2.5 text-[22px]/[20px] font-medium transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {contacts.email}
              </a>
            </div>
            <ul className="flex gap-2 sm:ml-auto lg:-mt-[3px]">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    aria-label={social.name}
                    className="grid size-[49px] place-items-center rounded-full bg-white/5 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Image src={social.icon} alt="" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/14 pt-7 pb-8 sm:flex-row lg:pt-[29px]">
            {(["privacy", "terms"] as const).map((key) => (
              <button
                key={key}
                type="button"
                className="flex h-10 items-center justify-center rounded-[40px] bg-[rgb(124_125_131/0.08)] px-[15px] text-[18px]/[18.9px] whitespace-nowrap tracking-[-0.7px] text-white/39 transition-colors hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-[265px]"
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
