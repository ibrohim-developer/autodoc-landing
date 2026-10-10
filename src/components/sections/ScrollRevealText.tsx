"use client";

import { useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useScroll, type UseScrollOptions } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
  // Drives the reveal from another element, e.g. the column a sticky block rides in;
  // a stuck block never moves through the viewport, so its own position can't.
  target?: RefObject<HTMLElement | null>;
  offset?: UseScrollOptions["offset"];
};

// Colors words from muted to black as the block scrolls through the viewport.
// Reduced-motion users get all words black straight away.
export function ScrollRevealText({ paragraphs, className, paragraphClassName, target, offset }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const words = paragraphs.map((text) => text.split(/\s+/));
  const total = words.reduce((count, list) => count + list.length, 0);
  const [revealed, setRevealed] = useState(0);
  // By default starts when the block's top passes 85% of the viewport, ends when its bottom passes 45%.
  const { scrollYProgress } = useScroll({
    target: target ?? ref,
    offset: offset ?? ["start 0.85", "end 0.45"],
  });
  useMotionValueEvent(scrollYProgress, "change", (progress) => setRevealed(Math.round(progress * total)));

  let index = 0;
  return (
    <div ref={ref} className={className}>
      {paragraphs.map((text, paragraphIndex) => (
        <p key={paragraphIndex} className={paragraphClassName}>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words[paragraphIndex].map((word, wordIndex) => {
              const position = index++;
              return (
                <span
                  key={wordIndex}
                  className={cn(
                    "transition-colors duration-300 motion-reduce:text-black",
                    position < revealed ? "text-black" : "text-muted",
                  )}
                >
                  {wordIndex > 0 ? " " : ""}
                  {word}
                </span>
              );
            })}
          </span>
        </p>
      ))}
    </div>
  );
}
