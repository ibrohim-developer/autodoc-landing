import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/assets/images/brand/logo.svg";
import logoDark from "@/assets/images/brand/logo-dark.svg";
import chevronDown from "@/assets/images/icons/chevron-down.svg";
import chevronDownInk from "@/assets/images/icons/chevron-down-ink.svg";
import menuIcon from "@/assets/images/icons/menu.svg";
import menuIconInk from "@/assets/images/icons/menu-ink.svg";
import { Container } from "@/components/ui/Container";
import { anchors, homeSection } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MainMenu } from "./MainMenu";

// "hero" floats over the dark hero photo; "page" sits on the light page background.
type Props = { variant?: "hero" | "page" };

export function Header({ variant = "hero" }: Props) {
  const t = useTranslations("Header");
  const onHero = variant === "hero";

  return (
    <header className="absolute inset-x-0 top-0 z-30 pt-4 sm:pt-[39px]">
      <Container>
        <div
          className={cn(
            "flex h-[60px] items-center justify-between gap-3 rounded-pill pr-3 pl-3 inset-ring backdrop-blur-md backdrop-saturate-150 sm:h-[77px] sm:pr-6 sm:pl-5",
            onHero ? "bg-[#262626]/20 inset-ring-white/25" : "bg-[#262626]/5 inset-ring-white/60",
          )}
        >
          <Link
            href={homeSection(anchors.top)}
            aria-label={t("home")}
            className={cn(
              "block min-w-0 shrink rounded-md focus-visible:outline-2 focus-visible:outline-offset-4",
              onHero ? "focus-visible:outline-white" : "focus-visible:outline-brand",
            )}
          >
            <Image src={onHero ? logo : logoDark} alt="" className="w-[150px] sm:w-[190px]" />
          </Link>
          <div className="flex shrink-0 items-center gap-3">
            <LanguageSwitcher chevron={onHero ? chevronDown : chevronDownInk} tone={onHero ? "light" : "dark"} />
            <a
              href={`#${anchors.contact}`}
              className={cn(
                "hidden h-[37px] min-w-[156px] items-center justify-center rounded-pill px-4 text-base transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:ml-2.5 sm:flex",
                onHero
                  ? "bg-page text-ink hover:bg-white focus-visible:outline-white"
                  : "bg-brand text-white hover:bg-[#287634] focus-visible:outline-brand",
              )}
            >
              {t("contact")}
            </a>
            <MainMenu icon={onHero ? menuIcon : menuIconInk} tone={onHero ? "light" : "dark"} />
          </div>
        </div>
      </Container>
    </header>
  );
}
