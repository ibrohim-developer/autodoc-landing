import type { StaticImageData } from "next/image";
import office from "@/assets/images/about/office.webp";
import building from "@/assets/images/about/building.webp";
import inspectionCenter from "@/assets/images/about/inspection-center.webp";
import facade from "@/assets/images/about/facade.webp";
import inspection from "@/assets/images/about/inspection.webp";
import team from "@/assets/images/about/team.webp";
import inspectionTeam from "@/assets/images/about/inspection-team.webp";
import openOffice from "@/assets/images/about/open-office.webp";

// Copy lives in messages under `About.milestones.<key>` and `About.photos.<key>`.
export type MilestoneKey = "founding" | "firstProject" | "partnership" | "infrastructure" | "expansion" | "holding";

export type HistoryPhotoKey =
  | "office"
  | "building"
  | "inspectionCenter"
  | "facade"
  | "inspection"
  | "team"
  | "inspectionTeam"
  | "openOffice";

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

export const historyIntroPhotos: [HistoryPhoto, HistoryPhoto] = [
  { key: "office", image: office },
  { key: "building", image: building },
];

// Read left to right in chronological order.
export const historyColumns: HistoryColumn[] = [
  {
    top: { kind: "photo", key: "inspectionCenter", image: inspectionCenter, curves: ["bl"] },
    bottom: { kind: "brand", curves: ["tl", "tr"] },
    tall: "top",
  },
  {
    top: { kind: "milestone", key: "founding", curves: ["br"] },
    bottom: { kind: "photo", key: "facade", image: facade, curves: ["tr"] },
    tall: "bottom",
  },
  {
    top: { kind: "photo", key: "inspection", image: inspection, curves: ["br"] },
    bottom: { kind: "milestone", key: "firstProject", curves: ["tr"] },
    tall: "top",
  },
  {
    top: { kind: "milestone", key: "partnership", curves: ["bl"] },
    bottom: { kind: "photo", key: "team", image: team, curves: ["tl", "tr"] },
    tall: "top",
  },
  {
    top: { kind: "photo", key: "inspectionTeam", image: inspectionTeam, curves: ["br"] },
    bottom: { kind: "milestone", key: "infrastructure", curves: ["tr"] },
    tall: "bottom",
  },
  {
    top: { kind: "milestone", key: "expansion", curves: ["br"] },
    bottom: { kind: "app", curves: ["bl"] },
    tall: "top",
  },
  {
    top: { kind: "photo", key: "openOffice", image: openOffice, curves: ["br"] },
    bottom: { kind: "milestone", key: "holding", curves: ["tr"] },
    tall: "bottom",
  },
];
