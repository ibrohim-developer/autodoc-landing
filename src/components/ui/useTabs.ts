"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

// State for a tab list with roving focus: arrow keys move to the previous/next tab (wrapping),
// Home and End jump to the first and last tab.
export function useTabs(count: number) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent) {
    const last = count - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return {
    active,
    setActive,
    onKeyDown,
    tabRef: (index: number) => (node: HTMLButtonElement | null) => {
      tabs.current[index] = node;
    },
    tabId: (index: number) => `${baseId}-tab-${index}`,
    panelId: (index: number) => `${baseId}-panel-${index}`,
  };
}
