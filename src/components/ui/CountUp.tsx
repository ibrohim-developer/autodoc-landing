"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = {
  value: string;
  // Seconds.
  duration?: number;
};

// Counts the leading number of `value` up from zero the first time it scrolls into view.
// The server render and reduced-motion users get the final value.
export function CountUp({ value, duration = 0.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^(\d+)(.*)$/.exec(value);
  const digits = match?.[1] ?? "";
  const rest = match ? match[2] : value;
  const target = Number(digits);
  const inView = useInView(ref, { once: true, amount: "all" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    const show = (latest: number) => {
      element.textContent = String(Math.round(latest));
    };
    if (!inView) {
      show(0);
      return;
    }
    const animation = animate(0, target, { duration, ease: "easeOut", onUpdate: show });
    return () => animation.stop();
  }, [target, duration, inView, reducedMotion]);

  if (!match) return value;

  return (
    <>
      <span className="sr-only">{digits}</span>
      <span ref={ref} aria-hidden="true">
        {target}
      </span>
      {rest}
    </>
  );
}
