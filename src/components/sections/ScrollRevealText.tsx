"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
  // Drives the reveal from outside (0–1) instead of the block's own scroll position.
  progress?: number;
};

// Colors words from muted to black as the block scrolls through the viewport.
export function ScrollRevealText({ paragraphs, className, paragraphClassName, progress }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const words = paragraphs.map((text) => text.split(/\s+/));
  const total = words.reduce((count, list) => count + list.length, 0);
  const [ownRevealed, setRevealed] = useState(0);
  const controlled = progress !== undefined;
  const revealed = controlled ? Math.round(progress * total) : ownRevealed;

  useEffect(() => {
    const element = ref.current;
    if (!element || controlled) return;

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        setRevealed(total);
        return;
      }
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Starts when the block's top passes 85% of the viewport, ends when its bottom passes 45%.
      const start = viewport * 0.85;
      const end = viewport * 0.45;
      const progress = (start - rect.top) / (rect.height + start - end);
      setRevealed(Math.round(Math.min(1, Math.max(0, progress)) * total));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [total, controlled]);

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
                    "transition-colors duration-300",
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
