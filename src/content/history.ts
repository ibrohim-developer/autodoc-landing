import type { StaticImageData } from "next/image";
import poster from "@/assets/images/video/poster.webp";
import meeting from "@/assets/images/position/meeting.webp";
import railway from "@/assets/images/position/railway.webp";
import team from "@/assets/images/position/team.webp";
import reception from "@/assets/images/position/reception.webp";
import news2 from "@/assets/images/news/news-2.webp";
import news3 from "@/assets/images/news/news-3.webp";
import registration from "@/assets/images/directions/project-registration.webp";

// Copy lives in messages under `About.milestones.<key>` and `About.photos.<key>`.
export type MilestoneKey = "founding" | "firstProject" | "partnership" | "infrastructure" | "expansion" | "holding";

export type HistoryPhotoKey =
  | "office"
  | "meeting"
  | "team"
  | "reception"
  | "people"
  | "registration"
  | "leadership"
  | "checkpoint";

export type HistoryPhoto = { key: HistoryPhotoKey; image: StaticImageData; position?: string };

export type HistoryTile =
  | ({ kind: "photo" } & HistoryPhoto)
  | { kind: "milestone"; key: MilestoneKey }
  | { kind: "brand" }
  | { kind: "app" };

// Each column stacks two tiles; `tall` says which of them takes the larger share of the height.
export type HistoryColumn = { top: HistoryTile; bottom: HistoryTile; tall: "top" | "bottom" };

// The design's photos could not be exported yet: these are stand-ins from the rest of the site.
export const historyIntroPhotos: [HistoryPhoto, HistoryPhoto] = [
  { key: "office", image: poster },
  { key: "meeting", image: meeting },
];

// Read left to right in chronological order.
export const historyColumns: HistoryColumn[] = [
  { top: { kind: "photo", key: "team", image: team }, bottom: { kind: "brand" }, tall: "top" },
  {
    top: { kind: "milestone", key: "founding" },
    bottom: { kind: "photo", key: "reception", image: reception },
    tall: "bottom",
  },
  {
    top: { kind: "photo", key: "checkpoint", image: railway },
    bottom: { kind: "milestone", key: "firstProject" },
    tall: "top",
  },
  {
    top: { kind: "milestone", key: "partnership" },
    bottom: { kind: "photo", key: "registration", image: registration },
    tall: "top",
  },
  {
    top: { kind: "photo", key: "leadership", image: news2, position: "62% 50%" },
    bottom: { kind: "milestone", key: "infrastructure" },
    tall: "bottom",
  },
  { top: { kind: "milestone", key: "expansion" }, bottom: { kind: "app" }, tall: "top" },
  {
    top: { kind: "photo", key: "people", image: news3 },
    bottom: { kind: "milestone", key: "holding" },
    tall: "bottom",
  },
];
