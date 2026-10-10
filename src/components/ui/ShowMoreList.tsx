"use client";

import { useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import chevronBrand from "@/assets/images/icons/chevron-right-brand.svg";

type Props = {
  items: { key: string; node: ReactNode }[];
  pageSize: number;
  moreLabel: string;
  // Classes for the `<ul>`.
  className?: string;
};

// Shows the first page of items; the button reveals one more page at a time.
// Hidden items stay in the HTML, so every link is there for crawlers from the start.
export function ShowMoreList({ items, pageSize, moreLabel, className }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [count, setCount] = useState(pageSize);

  // Focus moves to the first revealed item so keyboard users carry on from there.
  function showMore() {
    const firstNew = count;
    flushSync(() => setCount(count + pageSize));
    listRef.current?.children[firstNew]?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
  }

  return (
    <>
      <ul ref={listRef} className={className}>
        {items.map((item, index) => (
          <li key={item.key} hidden={index >= count}>
            {item.node}
          </li>
        ))}
      </ul>
      {count < items.length && (
        <button
          type="button"
          onClick={showMore}
          className="mx-auto mt-[31px] flex h-[50px] items-center gap-3.5 rounded-pill bg-brand-tint pr-[22px] pl-[35px] text-base/4 font-semibold text-brand transition-colors hover:bg-[#dcebdf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {moreLabel}
          <Image src={chevronBrand} alt="" />
        </button>
      )}
    </>
  );
}
