"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import chevronLeft from "@/assets/images/icons/chevron-left-ink.svg";
import chevronRight from "@/assets/images/icons/chevron-right-ink.svg";

type Props = {
  heading: ReactNode;
  prevLabel: string;
  nextLabel: string;
  // `<li>` items sized by the caller.
  children: ReactNode;
};

const arrow =
  "grid size-12 place-items-center rounded-full bg-black/5 transition hover:bg-black/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-40";

// A scroll-snap row: swipe on touch, the arrows step one card at a time.
export function PostsCarousel({ heading, prevLabel, nextLabel, children }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setEdges({
        start: list.scrollLeft <= 1,
        end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 1,
      });
    // Also fires once on observe, which sets the initial state.
    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, []);

  function step(direction: 1 | -1) {
    const list = listRef.current;
    const card = list?.firstElementChild;
    if (!list || !(card instanceof HTMLElement)) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: smooth ? "smooth" : "auto" });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {heading}
        <div className="flex shrink-0 gap-2.5">
          <button type="button" aria-label={prevLabel} disabled={edges.start} onClick={() => step(-1)} className={arrow}>
            <Image src={chevronLeft} alt="" />
          </button>
          <button type="button" aria-label={nextLabel} disabled={edges.end} onClick={() => step(1)} className={arrow}>
            <Image src={chevronRight} alt="" />
          </button>
        </div>
      </div>
      <ul
        ref={listRef}
        className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 sm:pb-0 xl:mt-[42px]"
      >
        {children}
      </ul>
    </>
  );
}
