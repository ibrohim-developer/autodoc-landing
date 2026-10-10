"use client";

import type { ReactNode } from "react";
import { useTabs } from "@/components/ui/useTabs";
import { cn } from "@/lib/cn";

type Props = {
  categories: { key: string; label: string }[];
  panels: ReactNode[];
  labelledBy: string;
};

export function ProjectsTabs({ categories, panels, labelledBy }: Props) {
  const { active, setActive, onKeyDown, tabRef, tabId, panelId } = useTabs(categories.length);

  return (
    <>
      {/* One scrolling row on phones; from md wraps within the design's narrower block (two rows on desktop). */}
      <div
        role="tablist"
        aria-labelledby={labelledBy}
        onKeyDown={onKeyDown}
        className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:max-w-[960px] md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
      >
        {categories.map((category, index) => {
          const selected = index === active;
          return (
            <button
              key={category.key}
              ref={tabRef(index)}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "flex h-[38px] shrink-0 snap-start items-center rounded-pill px-[26px] text-base/4 font-medium whitespace-nowrap transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                selected ? "bg-brand text-white" : "bg-[#f2f2f2] text-ink hover:bg-[#e9e9e9]",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {panels.map((panel, index) => (
        <div
          key={categories[index].key}
          id={panelId(index)}
          role="tabpanel"
          aria-labelledby={tabId(index)}
          hidden={index !== active}
          className="mt-6 md:mt-[30px]"
        >
          {panel}
        </div>
      ))}
    </>
  );
}
