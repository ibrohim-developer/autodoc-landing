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

// Corners the design cuts with a wide curve; the rest keep a small radius.
export type Corner = "tl" | "tr" | "bl" | "br";

export type HistoryTile = (
  | ({ kind: "photo" } & HistoryPhoto)
  | { kind: "milestone"; key: MilestoneKey }
  | { kind: "brand" }
  | { kind: "app" }
) & { curves?: Corner[] };

// Each column stacks two tiles; `tall` says which of them takes the larger share of the height.
export type HistoryColumn = { top: HistoryTile; bottom: HistoryTile; tall: "top" | "bottom" };

// The design's photos could not be exported yet: these are stand-ins from the rest of the site.
export const historyIntroPhotos: [HistoryPhoto, HistoryPhoto] = [
  { key: "office", image: poster },
  { key: "meeting", image: meeting },
];

// Read left to right in chronological order.
export const historyColumns: HistoryColumn[] = [
  {
    top: { kind: "photo", key: "team", image: team, curves: ["bl"] },
    bottom: { kind: "brand", curves: ["tl", "tr"] },
    tall: "top",
  },
  {
    top: { kind: "milestone", key: "founding" },
    bottom: { kind: "photo", key: "reception", image: reception, curves: ["tl", "tr"] },
    tall: "bottom",
  },
  {
    top: { kind: "photo", key: "checkpoint", image: railway, curves: ["br"] },
    bottom: { kind: "milestone", key: "firstProject", curves: ["tr"] },
    tall: "top",
  },
  {
    top: { kind: "milestone", key: "partnership", curves: ["bl"] },
    bottom: { kind: "photo", key: "registration", image: registration, curves: ["tl", "tr"] },
    tall: "top",
  },
  {
    top: { kind: "photo", key: "leadership", image: news2, position: "62% 50%", curves: ["br"] },
    bottom: { kind: "milestone", key: "infrastructure", curves: ["tr"] },
    tall: "bottom",
  },
  {
    top: { kind: "milestone", key: "expansion", curves: ["bl"] },
    bottom: { kind: "app", curves: ["bl"] },
    tall: "top",
  },
  {
    top: { kind: "photo", key: "people", image: news3, curves: ["br"] },
    bottom: { kind: "milestone", key: "holding", curves: ["tr"] },
    tall: "bottom",
  },
];
