"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import playIcon from "@/assets/images/icons/play.svg";
import type { Reel } from "@/content/reels";

// A scroll-snap row of reels; on wide screens the next card peeks in at the edge.
// Each card opens one shared dialog that plays the clip with sound.
export function ReelsGallery({ reels }: { reels: Reel[] }) {
  const t = useTranslations("Blog.reels");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  function open(index: number) {
    flushSync(() => setCurrent(index));
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    // The click allows sound; if playback is still blocked, the play button stays up.
    video.play().catch(() => {});
  }

  const close = () => dialogRef.current?.close();

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

      {/* Sized to fit the screen at the design's 493×614 shape. The close button sits outside the
          video's top-right corner, so the dialog leaves its overflow visible. */}
      <dialog
        ref={dialogRef}
        aria-label={t("video", { number: current + 1 })}
        data-lenis-prevent
        onClose={() => videoRef.current?.pause()}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(493px,calc(100vw-2rem),calc((100dvh-8rem)*0.803))] overflow-visible bg-transparent p-0 backdrop:bg-black/74"
      >
        <div className="relative aspect-[493/614] overflow-hidden rounded-card bg-placeholder">
          <video
            ref={videoRef}
            src={reels[current]?.src}
            poster={reels[current]?.poster?.src}
            preload="none"
            playsInline
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="absolute inset-0 size-full object-cover"
          />
          {!playing && (
            <span className="absolute inset-0 grid place-items-center">
              <button
                type="button"
                aria-label={t("play")}
                onClick={() => videoRef.current?.play().catch(() => {})}
                className="grid size-16 place-items-center rounded-full bg-brand transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-[79px]"
              >
                <Image src={playIcon} alt="" className="h-[26px] w-auto sm:h-[34px]" />
              </button>
            </span>
          )}
        </div>
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
