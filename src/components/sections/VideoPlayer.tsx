"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  playLabel: string;
  className?: string;
  children: ReactNode;
};

export function VideoPlayer({ src, playLabel, className, children }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [needsClick, setNeedsClick] = useState(false);

  // Plays while at least half the video is on screen and pauses once it scrolls out either way.
  // Browsers only autoplay muted video. With reduced motion, or when autoplay is blocked
  // (iOS Low Power Mode), the play button appears instead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    wantsPlay.current = !matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5) video.pause();
        else if (!wantsPlay.current) setNeedsClick(true);
        else
          video.play().catch((error: DOMException) => {
            if (error.name === "NotAllowedError") setNeedsClick(true);
          });
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const play = () => {
    wantsPlay.current = true;
    videoRef.current?.play().catch(() => {});
  };

  return (
    <>
      {/* Only metadata loads up front; the #t offset makes iOS Safari paint a frame before playback.
          Scaled 1% so the frame covers sub-pixel gaps at the rounded edges, which would otherwise
          show the element's background as a hairline border. */}
      <video
        ref={videoRef}
        src={`${src}#t=0.1`}
        preload="metadata"
        loop
        playsInline
        aria-label={playLabel}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full scale-101 bg-placeholder object-cover"
      />
      {needsClick && !playing && (
        <div className="absolute inset-0 grid place-items-center">
          <button type="button" aria-label={playLabel} onClick={play} className={className}>
            {children}
          </button>
        </div>
      )}
    </>
  );
}
