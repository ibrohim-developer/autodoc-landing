"use client";

import { useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  playLabel: string;
  closeLabel: string;
  className?: string;
  children: ReactNode;
};

function youTubeEmbed(src: string) {
  const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

export function VideoDialog({ src, playLabel, closeLabel, className, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const embed = youTubeEmbed(src);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" aria-label={playLabel} onClick={show} className={className}>
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-label={playLabel}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(92vw,1200px)] overflow-visible bg-transparent p-0 backdrop:bg-black/80"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-card bg-black">
          {/* The player only exists while open, so closing stops playback. */}
          {open &&
            (embed ? (
              <iframe
                src={embed}
                title={playLabel}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full"
              />
            ) : (
              <video src={src} controls autoPlay playsInline className="size-full" />
            ))}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={closeLabel}
          className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
