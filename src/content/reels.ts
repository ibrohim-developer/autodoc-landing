import type { StaticImageData } from "next/image";
import { Videos } from "@/assets/video";

// Short videos from the company's Instagram page, shown on the blog.
// The video only loads once its card is opened; until then the card shows the poster.
export type Reel = { id: string; src: string; poster?: StaticImageData };

// The design has grey placeholders only: the company video stands in for each reel,
// without posters, until the real clips and their covers arrive.
export const reels: Reel[] = [
  { id: "1", src: Videos.AutodocHolding },
  { id: "2", src: Videos.AutodocHolding },
  { id: "3", src: Videos.AutodocHolding },
  { id: "4", src: Videos.AutodocHolding },
  { id: "5", src: Videos.AutodocHolding },
  { id: "6", src: Videos.AutodocHolding },
];
