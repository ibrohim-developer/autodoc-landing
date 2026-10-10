import type { StaticImageData } from "next/image";

// Short videos from the company's Instagram page, shown on the blog.
// Each card shows a poster; clicking opens a modal with the Instagram embed.
export type Reel = {
  id: string;
  /** Full Instagram reel URL (used to build the embed) */
  url: string;
  poster?: StaticImageData;
};

export const reels: Reel[] = [
  // ── first four ("на начало") ──
  { id: "1", url: "https://www.instagram.com/reel/DcQ8QJ4hAaC/" },
  { id: "2", url: "https://www.instagram.com/reel/Dca1QEWB71X/" },
  { id: "3", url: "https://www.instagram.com/reel/DeMbgPho0b7/" },
  { id: "4", url: "https://www.instagram.com/reel/DeCQZBWB9QZ/" },
  // ── the rest ("дальше") ──
  { id: "5", url: "https://www.instagram.com/reel/DcN8nX9BUoa/" },
  { id: "6", url: "https://www.instagram.com/reel/DdysCuWIp3q/" },
  { id: "7", url: "https://www.instagram.com/reel/Ddv8ckHhoT3/" },
  { id: "8", url: "https://www.instagram.com/reel/DdrHRXsBN0P/" },
  { id: "9", url: "https://www.instagram.com/reel/DdG0-CJBc_e/" },
  { id: "10", url: "https://www.instagram.com/reel/DcQjxXmhHnh/" },
  { id: "11", url: "https://www.instagram.com/reel/Dcduvh0BIle/" },
];
