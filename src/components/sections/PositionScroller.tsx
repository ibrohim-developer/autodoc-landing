"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollRevealText } from "./ScrollRevealText";

type Props = {
  id: string;
  eyebrow: string;
  paragraphs: string[];
  children: ReactNode;
};

// Space left under the last card when the gallery stops scrolling.
const END_GAP = 80;

// At lg+ the section pins to the viewport while the photo gallery scrolls up past the text,
// then releases into normal page scroll once the last card is in view.
export function PositionScroller({ id, eyebrow, paragraphs, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  // Reveal progress while pinned; null hands the text back to its own scroll tracking.
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const gallery = galleryRef.current;
    if (!section || !frame || !gallery) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let travel = 0;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      if (!travel) return;
      const top = section.getBoundingClientRect().top;
      const shift = Math.min(travel, Math.max(0, -top));
      gallery.style.transform = `translate3d(0, ${-shift}px, 0)`;
      // Words start coloring as the section enters and finish together with the gallery.
      const start = window.innerHeight * 0.85;
      setProgress(Math.min(1, Math.max(0, (start - top) / (start + travel))));
    };
    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const measure = () => {
      // offsetTop/offsetHeight ignore the transform, so this is the gallery's resting layout.
      const overflow = gallery.offsetTop + gallery.offsetHeight + END_GAP - window.innerHeight;
      travel = desktop.matches && !reducedMotion.matches ? Math.max(0, Math.round(overflow)) : 0;
      if (travel) {
        frame.dataset.pinned = "";
        section.style.height = `${window.innerHeight + travel}px`;
      } else {
        delete frame.dataset.pinned;
        section.style.height = "";
        gallery.style.transform = "";
        setProgress(null);
      }
      schedule();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(gallery);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    reducedMotion.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      reducedMotion.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className="mt-16 lg:mt-0">
      <div
        ref={frameRef}
        className="relative lg:pt-20 data-pinned:sticky data-pinned:top-0 data-pinned:h-screen data-pinned:overflow-hidden"
      >
        <Container className="lg:flex lg:gap-[26px]">
          <div className="lg:w-[607px] lg:shrink">
            <h2 className="text-[18px]/[21px] text-brand">{eyebrow}</h2>
            <ScrollRevealText
              paragraphs={paragraphs}
              progress={progress ?? undefined}
              className="mt-[38px] space-y-7 md:space-y-[43px]"
              paragraphClassName="text-[22px]/[28px] font-semibold md:text-[30px]/[35px]"
            />
          </div>
          <div
            ref={galleryRef}
            className="mt-12 lg:mt-0 lg:w-[727px] lg:min-w-0 lg:shrink lg:will-change-transform"
          >
            {children}
          </div>
        </Container>
      </div>
    </section>
  );
}
