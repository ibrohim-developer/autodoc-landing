"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";

// Eases wheel scrolling so the page glides to a stop instead of halting with the wheel.
// Touch keeps the device's native scrolling, and reduced-motion users get plain scrolling.
// Scroll position stays native, so sticky elements and scroll-linked effects work unchanged.
const options: LenisOptions = {
  // Pause while a dialog has locked the page's overflow; dialogs scroll themselves (data-lenis-prevent).
  autoToggle: true,
  // Let scrollable boxes inside the page scroll before the page does.
  allowNestedScroll: true,
  // Drop leftover glide when a link leads to another page.
  stopInertiaOnNavigate: true,
};

export function SmoothScroll() {
  return <ReactLenis root options={options} />;
}
