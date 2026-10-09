"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/assets/images/brand/logo.svg";
import decorGlass from "@/assets/images/directions/decor-glass.webp";
import wordmark from "@/assets/images/menu/wordmark.svg";
import { Container } from "@/components/ui/Container";
import { anchors, contacts, homeSection, navLinks, socials } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  icon: StaticImageData;
  // Colour of the trigger: "light" over the hero photo, "dark" on the page background.
  tone?: "light" | "dark";
};

const focusRing = "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

// Full-screen menu. The native modal dialog traps focus, closes on Escape and
// returns focus to the trigger; globals.css locks the page scroll while it is open.
export function MainMenu({ icon, tone = "light" }: Props) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const show = () => {
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={show}
        className={cn(
          "flex h-[37px] items-center gap-2.5 rounded-pill border px-3 text-base transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-w-[114px] sm:gap-[23px] sm:pr-[13px] sm:pl-[14px]",
          tone === "light"
            ? "border-white text-white hover:bg-white/10 focus-visible:outline-white"
            : "border-ink text-ink hover:bg-ink/5 focus-visible:outline-brand",
        )}
      >
        {t("Header.menu")}
        <Image src={icon} alt="" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t("Header.menu")}
        className="m-0 size-full max-h-none max-w-none overflow-x-hidden overflow-y-auto bg-footer p-0 text-white opacity-0 transition-[opacity,display,overlay] duration-300 ease-out transition-discrete backdrop:bg-transparent open:opacity-100 starting:open:opacity-0"
      >
        <div className="relative isolate flex min-h-full flex-col overflow-hidden">
          <Image
            src={decorGlass}
            alt=""
            aria-hidden="true"
            sizes="1053px"
            className="pointer-events-none absolute top-[62px] left-[calc(50%-109px)] -z-10 hidden h-auto w-[1053px] max-w-none opacity-5 lg:block"
          />

          <Container>
            <div className="mt-4 flex h-[60px] items-center justify-between gap-3 sm:mt-[39px] sm:h-[77px]">
              <Link href={homeSection(anchors.top)} aria-label={t("Header.home")} onClick={close} className={cn("block min-w-0 shrink", focusRing)}>
                <Image src={logo} alt="" className="w-[150px] sm:w-[214px]" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={t("Header.closeMenu")}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-placeholder text-ink transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-10 lg:mt-[68px] lg:flex-row lg:justify-between lg:gap-8">
              <nav aria-label={t("Footer.navLabel")} className="lg:pl-[15px]">
                <ul className="grid gap-y-4 sm:grid-flow-col sm:grid-cols-[minmax(0,325px)_auto] sm:grid-rows-5 sm:gap-x-8 sm:gap-y-[38px]">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className={cn("text-xl/[26px] font-medium uppercase transition-colors hover:text-white/60 sm:text-2xl/[30px]", focusRing)}
                      >
                        {t(`Nav.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/14 pt-8 lg:-mt-2 lg:w-[404px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pb-2.5 lg:pl-[53px]">
                <p className="text-base/[20px] text-white/60">{t("Footer.phoneLabel")}</p>
                <a href={contacts.phoneHref} className={cn("mt-2.5 inline-block text-2xl/[28px] font-medium", focusRing)}>
                  {contacts.phone}
                </a>
                <p className="mt-6 text-base/[20px] text-white/60">{t("Footer.emailLabel")}</p>
                <a
                  href={`mailto:${contacts.email}`}
                  className={cn("mt-2.5 inline-block text-2xl/[28px] font-medium transition-colors hover:text-white/70", focusRing)}
                >
                  {contacts.email}
                </a>
                <ul className="mt-8 flex gap-2.5 lg:mt-[103px]">
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
                {/* The header hides this button on phones, so the menu offers it instead. */}
                <a
                  href={`#${anchors.contact}`}
                  onClick={close}
                  className="mt-8 flex h-11 items-center justify-center rounded-pill bg-white text-base font-medium text-ink transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:hidden"
                >
                  {t("Header.contact")}
                </a>
              </div>
            </div>
          </Container>

          <div aria-hidden="true" className="mx-auto mt-auto w-full max-w-[1440px] pt-10">
            <Image src={wordmark} alt="" className="mx-auto h-auto w-[84.4%]" />
          </div>
        </div>
      </dialog>
    </>
  );
}
