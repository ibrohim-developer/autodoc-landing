"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, scroll, useMotionValue } from "motion/react";

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
// `--inset` is where the header's Container starts its content, so pinned text can line up with the navbar.
export function PinnedHorizontalScroll({ heading, children, labelledBy }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const x = useMotionValue(0);

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
    const track = trackRef.current;
    if (!pinned || !section || !panel || !track) return;

    let distance = 0;
    // How far the page has scrolled past the section's top.
    let scrolled = 0;

    const update = () => x.set(-Math.min(distance, Math.max(0, scrolled)));
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - panel.clientWidth);
      section.style.height = `${panel.offsetHeight * (1 + endHold) + distance}px`;
      update();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(panel);
    const stopScroll = scroll(
      (_progress, { y }) => {
        scrolled = y.current - y.targetOffset;
        update();
      },
      { target: section },
    );
    return () => {
      stopScroll();
      observer.disconnect();
      section.style.height = "";
      x.set(0);
    };
  }, [pinned, x]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={labelledBy}
      data-pinned={pinned ? "" : undefined}
      className="group/pin relative [--inset:24px] [--u:0.9px] lg:[--u:clamp(0.72px,calc((100svh_-_160px)/774),1.25px)] xl:[--inset:max(40px,calc((100cqw_-_1440px)/2_+_40px))]"
    >
      <div
        ref={panelRef}
        className="@container group-data-pinned/pin:sticky group-data-pinned/pin:top-0 group-data-pinned/pin:h-svh group-data-pinned/pin:overflow-hidden group-data-pinned/pin:pt-[130px]"
      >
        <motion.div style={{ x }} className="relative group-data-pinned/pin:w-max group-data-pinned/pin:will-change-transform">
          {heading}
          <div
            ref={trackRef}
            className="mt-6 flex h-[calc(var(--u)*774)] snap-x snap-mandatory scroll-px-4 gap-[calc(var(--u)*12)] overflow-x-auto px-4 [scrollbar-width:none] sm:mt-[33px] sm:scroll-px-6 sm:px-6 group-data-pinned/pin:mt-0 group-data-pinned/pin:snap-none group-data-pinned/pin:overflow-visible group-data-pinned/pin:pr-[calc(var(--u)*40)] group-data-pinned/pin:pl-0"
          >
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
