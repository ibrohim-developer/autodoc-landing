"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTabs } from "@/components/ui/useTabs";
import { cn } from "@/lib/cn";

type Category = {
  key: string;
  label: string;
  icon: StaticImageData;
};

type Props = {
  categories: Category[];
  panels: ReactNode[];
  chevron: StaticImageData;
  chevronActive: StaticImageData;
};

export function DirectionsTabs({ categories, panels, chevron, chevronActive }: Props) {
  const { active, setActive, onKeyDown, tabRef, tabId, panelId } = useTabs(categories.length);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:gap-[41px]">
      <div
        role="tablist"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:-mx-6 md:scroll-px-6 md:px-6 xl:mx-0 xl:w-[338px] xl:shrink-0 xl:flex-col xl:overflow-visible xl:px-0 xl:pb-0"
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
                "group flex min-h-[63px] shrink-0 snap-start items-center gap-3.5 rounded-card py-2 pr-5 pl-3.5 text-left text-base/4 font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                "max-xl:max-w-[260px] xl:w-full",
                selected ? "bg-accent text-white" : "bg-white text-ink hover:bg-white/70",
              )}
            >
              <span
                className={cn(
                  "grid size-[30px] shrink-0 place-items-center rounded-md",
                  selected ? "bg-white text-accent" : "bg-accent text-white",
                )}
              >
                {/* The icons ship in one colour; a mask lets them follow the tile's text colour. */}
                <span
                  aria-hidden="true"
                  className="size-[22px] bg-current mask-contain mask-center mask-no-repeat"
                  style={{ maskImage: `url(${category.icon.src})`, WebkitMaskImage: `url(${category.icon.src})` }}
                />
              </span>
              <span className="min-w-0 flex-1">{category.label}</span>
              <Image
                src={selected ? chevronActive : chevron}
                alt=""
                className="hidden shrink-0 transition-transform group-hover:translate-x-0.5 xl:block"
              />
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
          className="min-w-0 flex-1"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
