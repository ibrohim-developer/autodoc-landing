"use client";

import { useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";

type Leader = {
  key: string;
  name: string;
  role: string;
  photo: StaticImageData;
};

// Card widths from the Figma frame: the active card is 329px wide, the others 237px. They are used as
// flex-grow weights, so the row keeps those proportions at any container width.
const ACTIVE_GROW = 329;
const IDLE_GROW = 237;
const GAP_PX = 14; // matches lg:gap-x-3.5
const PHOTO_RATIO = 447 / 329;

export function LeadersList({ leaders }: { leaders: Leader[] }) {
  const [active, setActive] = useState(0);

  // Every photo slot is as tall as the active photo, so the row height stays fixed while the cards
  // resize and the photos stay aligned along the bottom.
  const totalGrow = ACTIVE_GROW + IDLE_GROW * (leaders.length - 1);
  const slotHeight = `calc((100cqw - ${GAP_PX * (leaders.length - 1)}px) * ${(ACTIVE_GROW / totalGrow) * PHOTO_RATIO})`;

  return (
    <ul
      onMouseLeave={() => setActive(0)}
      style={{ "--photo-slot": slotHeight } as CSSProperties}
      className="@container mt-8 grid grid-cols-2 gap-x-3 gap-y-8 lg:mt-[42px] lg:flex lg:gap-x-3.5"
    >
      {leaders.map((leader, index) => (
        <li
          key={leader.key}
          onMouseEnter={() => setActive(index)}
          // flex-grow has no effect while the list is a grid on small screens
          style={{ flexGrow: index === active ? ACTIVE_GROW : IDLE_GROW }}
          className="lg:min-w-0 lg:basis-0 lg:transition-[flex-grow] lg:duration-500 lg:ease-out motion-reduce:transition-none"
        >
          <div className="lg:flex lg:h-(--photo-slot) lg:items-end">
            <Image
              src={leader.photo}
              alt={leader.name}
              sizes="(min-width: 1440px) 336px, (min-width: 1024px) 24vw, 50vw"
              placeholder="blur"
              className="aspect-[329/447] h-auto w-full rounded-card object-cover"
            />
          </div>
          <h3 className="mt-4 text-[18px]/[20px] font-medium text-ink lg:text-[22px]/[20px]">{leader.name}</h3>
          <p className="mt-[9px] text-sm text-muted sm:text-base/[19px]">{leader.role}</p>
        </li>
      ))}
    </ul>
  );
}
