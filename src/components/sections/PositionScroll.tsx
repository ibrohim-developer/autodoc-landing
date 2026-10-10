"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type UseScrollOptions } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ScrollRevealText } from "./ScrollRevealText";

type Props = {
  eyebrow: string;
  paragraphs: string[];
  columns: [ReactNode, ReactNode];
};

const stickyQuery = "(min-width: 1024px)";
// Space kept around the stuck text; it never sits lower than `maxTop` from the viewport top.
const minGap = 24;
const maxTop = 120;
// While stuck, the reveal runs over the whole column and finishes as its bottom reaches the viewport's.
const stuckReveal: UseScrollOptions["offset"] = ["start 0.85", "end end"];
// The second photo column runs this many px ahead of the first at each end of the pass.
const drift = 60;

// At lg+ the text sticks while the photo columns scroll past, then leaves with the section once
// the photos run out. Only when the whole text block fits on screen; otherwise it scrolls normally.
export function PositionScroll({ eyebrow, paragraphs, columns }: Props) {
  const columnRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const sticky = stickyTop !== null;

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    const query = window.matchMedia(stickyQuery);
    const measure = () => {
      const free = window.innerHeight - block.offsetHeight;
      setStickyTop(query.matches && free >= minGap * 2 ? Math.min(maxTop, free / 2) : null);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(block);
    window.addEventListener("resize", measure);
    query.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      query.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const lead = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <Container className="lg:flex lg:gap-[26px]">
      <div ref={columnRef} className="lg:w-[607px] lg:shrink">
        <div ref={blockRef} style={sticky ? { position: "sticky", top: stickyTop } : undefined}>
          <h2 className="text-[18px]/[21px] text-brand">{eyebrow}</h2>
          <ScrollRevealText
            paragraphs={paragraphs}
            target={sticky ? columnRef : undefined}
            offset={sticky ? stuckReveal : undefined}
            className="mt-[38px] space-y-7 md:space-y-[43px]"
            paragraphClassName="text-[22px]/[28px] font-semibold md:text-[30px]/[35px]"
          />
        </div>
      </div>
      {/* Staggered at lg+, a plain two-column grid below. */}
      <div
        ref={galleryRef}
        className="mt-12 grid grid-cols-2 gap-3 lg:mt-0 lg:w-[727px] lg:min-w-0 lg:shrink lg:gap-x-[10.2%] lg:pr-2.5"
      >
        <div className="flex flex-col gap-3 lg:gap-[88px] lg:pt-[88px]">{columns[0]}</div>
        <motion.div
          style={sticky && !reduceMotion ? { y: lead } : undefined}
          className="flex flex-col gap-3 lg:gap-[75px] lg:pt-[11px]"
        >
          {columns[1]}
        </motion.div>
      </div>
    </Container>
  );
}
