"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  heading: ReactNode;
  children: ReactNode;
  labelledBy: string;
};

// Pinning needs room for the whole track height; smaller screens swipe the track instead.
const pinQuery = "(min-width: 1024px) and (min-height: 600px)";

// Extra scroll, as a share of the panel height, that keeps the finished track on screen
// before the page carries on down.
const endHold = 0.6;

// While pinned, the panel sticks to the viewport and vertical scrolling moves the track sideways.
// The section is made taller by the track's overflow plus a pause at the end, then the page carries on down.
// Children style themselves for the pinned layout with `group-data-pinned/pin:*`.
export function PinnedHorizontalScroll({ heading, children, labelledBy }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(pinQuery);
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const mover = moverRef.current;
    const track = trackRef.current;
    if (!pinned || !section || !panel || !mover || !track) return;

    let distance = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = distance ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)) : 0;
      mover.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - panel.clientWidth);
      section.style.height = `${panel.offsetHeight * (1 + endHold) + distance}px`;
      update();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(panel);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      section.style.height = "";
      mover.style.transform = "";
    };
  }, [pinned]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={labelledBy}
      data-pinned={pinned ? "" : undefined}
      className="group/pin relative [--u:0.9px] lg:[--u:clamp(0.72px,calc((100svh_-_160px)/774),1.25px)]"
    >
      <div
        ref={panelRef}
        className="group-data-pinned/pin:sticky group-data-pinned/pin:top-0 group-data-pinned/pin:h-svh group-data-pinned/pin:overflow-hidden group-data-pinned/pin:pt-[130px]"
      >
        <div ref={moverRef} className="relative group-data-pinned/pin:w-max group-data-pinned/pin:will-change-transform">
          {heading}
          <div
            ref={trackRef}
            className="mt-6 flex h-[calc(var(--u)*774)] snap-x snap-mandatory scroll-px-4 gap-[calc(var(--u)*12)] overflow-x-auto px-4 [scrollbar-width:none] sm:mt-[33px] sm:scroll-px-6 sm:px-6 group-data-pinned/pin:mt-0 group-data-pinned/pin:snap-none group-data-pinned/pin:overflow-visible group-data-pinned/pin:pr-[calc(var(--u)*40)] group-data-pinned/pin:pl-0"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
