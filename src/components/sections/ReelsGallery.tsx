"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import playIcon from "@/assets/images/icons/play.svg";
import type { Reel } from "@/content/reels";

// A scroll-snap row of reels; on wide screens the next card peeks in at the edge.
// Each card opens one shared dialog that shows the Instagram reel embed via iframe.
export function ReelsGallery({ reels }: { reels: Reel[] }) {
  const t = useTranslations("Blog.reels");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [current, setCurrent] = useState(0);
  // Only set the iframe src when the dialog is open to avoid loading all embeds.
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function open(index: number) {
    flushSync(() => {
      setCurrent(index);
      setIsLoading(true);
    });
    // Build the embed URL: strip query params and append /embed/
    const reel = reels[index];
    if (!reel) return;
    const cleanUrl = reel.url.replace(/\?.*$/, "");
    const embedUrl = cleanUrl.endsWith("/")
      ? `${cleanUrl}embed/`
      : `${cleanUrl}/embed/`;
    setIframeSrc(embedUrl);
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
    setIframeSrc(null);
    setIsLoading(false);
  }

  return (
    <>
      <ul className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 xl:mt-[23px]">
        {reels.map((reel, index) => (
          <li
            key={reel.id}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-48px)/2)] lg:w-[calc((100%-56px)/3)] xl:w-[calc((100%-44px)/4)]"
          >
            <button
              type="button"
              aria-label={t("open", { number: index + 1 })}
              onClick={() => open(index)}
              className="group relative block aspect-[329/410] w-full overflow-hidden rounded-card bg-placeholder focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-brand"
            >
              {reel.poster && (
                <Image
                  src={reel.poster}
                  alt=""
                  sizes="(min-width: 1280px) 330px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 78vw"
                  placeholder="blur"
                  className="absolute inset-0 size-full object-cover"
                />
              )}
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-[53px] place-items-center rounded-full bg-brand transition-transform group-hover:scale-110">
                  <Image src={playIcon} alt="" className="h-[23px] w-auto" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Modal with Instagram embed iframe. */}
      <dialog
        ref={dialogRef}
        aria-label={t("video", { number: current + 1 })}
        data-lenis-prevent
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(493px,calc(100vw-2rem),calc((100dvh-8rem)*0.803))] overflow-visible bg-transparent p-0 backdrop:bg-black/74"
      >
        <div className="relative aspect-[493/614] overflow-hidden rounded-card bg-placeholder">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 z-10 grid place-items-center">
              <div className="size-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            </div>
          )}
          {iframeSrc && (
            <iframe
              src={iframeSrc}
              title={t("video", { number: current + 1 })}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              className="absolute inset-0 size-full border-0"
            />
          )}
        </div>
        {reels[current] && (
          <a
            href={reels[current].url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -top-14 left-0 flex h-[46px] items-center rounded-full bg-field px-4 text-sm font-semibold text-ink transition hover:bg-[#e4e1e1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-top-[51px]"
          >
            {t("openInInstagram")}
          </a>
        )}
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={t("close")}
          className="absolute -top-14 right-0 grid size-[46px] place-items-center rounded-full bg-field text-ink transition hover:bg-[#e4e1e1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-top-[51px] sm:-right-14"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
