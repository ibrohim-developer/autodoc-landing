import type { StaticImageData } from "next/image";
import iconIt from "@/assets/images/directions/icon-it.svg";
import iconPayments from "@/assets/images/directions/icon-payments.svg";
import iconFinance from "@/assets/images/directions/icon-finance.svg";
import iconTransport from "@/assets/images/directions/icon-transport.svg";
import iconInfrastructure from "@/assets/images/directions/icon-infrastructure.svg";
import iconAi from "@/assets/images/directions/icon-ai.svg";
import iconEdo from "@/assets/images/directions/icon-edo.svg";
import safeService from "@/assets/images/directions/project-safe-service.png";
import development from "@/assets/images/directions/project-development.png";
import registration from "@/assets/images/projects/registration.webp";
import corridor from "@/assets/images/projects/corridor.webp";
import lochinKoz from "@/assets/images/projects/lochin-koz.webp";
import faceId from "@/assets/images/projects/face-id.webp";
import appeals from "@/assets/images/projects/appeals.webp";
import kiosks from "@/assets/images/projects/kiosks.webp";
import payments from "@/assets/images/projects/payments.webp";
import cashRegisters from "@/assets/images/projects/cash-registers.webp";
import cashCollection from "@/assets/images/projects/cash-collection.webp";
import accounting from "@/assets/images/projects/accounting.webp";
import dataCenter from "@/assets/images/projects/data-center.webp";
import users from "@/assets/images/icons/users.svg";
import integrations from "@/assets/images/icons/integrations.svg";
import checkBadge from "@/assets/images/icons/check-badge.svg";
import calendar from "@/assets/images/icons/calendar-brand.svg";
import message from "@/assets/images/icons/message.svg";
import type messages from "../../messages/ru.json";

type ProjectMessages = (typeof messages)["Directions"]["projects"];
type StatsOf<K extends ProjectKey> = ProjectMessages[K] extends { stats: infer S } ? keyof S & string : never;
type HasPhoto<K extends ProjectKey> = ProjectMessages[K] extends { imageAlt: string } ? true : false;

export type DirectionKey = "it" | "payments" | "finance" | "transport" | "infrastructure" | "ai" | "edo";
export type ProjectKey = keyof ProjectMessages;
export type ProjectStatKey = { [K in ProjectKey]: StatsOf<K> }[ProjectKey];

// Each project is tied to its messages: only a project with an alt text can have a photo,
// and it can list only the stats its messages define.
export type Project = {
  [K in ProjectKey]: {
    key: K;
    // Cutout images sit on the gradient tile instead of filling it. Projects without a photo show the direction icon there.
    // `position` is the photo's object-position, for the design's square crop of a wider frame.
    image?: HasPhoto<K> extends true ? { src: StaticImageData; cutout?: boolean; position?: string } : never;
    stats?: StatsOf<K>[];
  };
}[ProjectKey];

// The message keys the card builds from a project. The Project type guarantees they exist,
// but TypeScript can't follow that through a template string, so the card narrows to these.
export type ProjectImageAltKey = { [K in ProjectKey]: HasPhoto<K> extends true ? `projects.${K}.imageAlt` : never }[ProjectKey];
export type ProjectStatMessageKey = { [K in ProjectKey]: `projects.${K}.stats.${StatsOf<K>}.${"value" | "label"}` }[ProjectKey];

export type Direction = { key: DirectionKey; icon: StaticImageData; projects: Project[] };

export const directions: Direction[] = [
  {
    key: "it",
    icon: iconIt,
    projects: [
      { key: "development", image: { src: development }, stats: ["projects", "specialists", "years"] },
      { key: "sms", image: { src: kiosks }, stats: ["delivery"] },
    ],
  },
  {
    key: "payments",
    icon: iconPayments,
    projects: [
      { key: "payments", image: { src: payments } },
      { key: "cashRegisters", image: { src: cashRegisters } },
    ],
  },
  {
    key: "finance",
    icon: iconFinance,
    projects: [
      { key: "cashCollection", image: { src: cashCollection } },
      { key: "accounting", image: { src: accounting } },
    ],
  },
  {
    key: "transport",
    icon: iconTransport,
    projects: [
      { key: "registration", image: { src: registration, position: "86% 50%" } },
      { key: "corridor", image: { src: corridor, position: "38% 50%" } },
    ],
  },
  { key: "infrastructure", icon: iconInfrastructure, projects: [{ key: "dataCenter", image: { src: dataCenter } }] },
  {
    key: "ai",
    icon: iconAi,
    projects: [
      { key: "lochinKoz", image: { src: lochinKoz, position: "37% 50%" } },
      { key: "faceId", image: { src: faceId, position: "37% 50%" } },
    ],
  },
  {
    key: "edo",
    icon: iconEdo,
    projects: [
      { key: "safeService", image: { src: safeService, cutout: true }, stats: ["users", "services"] },
      { key: "appeals", image: { src: appeals, position: "0% 50%" } },
      { key: "kiosks", image: { src: kiosks } },
    ],
  },
];

export const projectStatIcons: Record<ProjectStatKey, StaticImageData> = {
  users,
  services: integrations,
  projects: checkBadge,
  specialists: users,
  years: calendar,
  delivery: message,
};
