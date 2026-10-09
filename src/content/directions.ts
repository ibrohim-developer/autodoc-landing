import type { StaticImageData } from "next/image";
import iconIt from "@/assets/images/directions/icon-it.svg";
import iconPayments from "@/assets/images/directions/icon-payments.svg";
import iconFinance from "@/assets/images/directions/icon-finance.svg";
import iconTransport from "@/assets/images/directions/icon-transport.svg";
import iconInfrastructure from "@/assets/images/directions/icon-infrastructure.svg";
import iconAi from "@/assets/images/directions/icon-ai.svg";
import iconEdo from "@/assets/images/directions/icon-edo.svg";
import registration from "@/assets/images/directions/project-registration.webp";
import safeService from "@/assets/images/directions/project-safe-service.png";
import development from "@/assets/images/directions/project-development.png";
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
    image?: HasPhoto<K> extends true ? { src: StaticImageData; cutout?: boolean } : never;
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
      { key: "sms", stats: ["delivery"] },
    ],
  },
  { key: "payments", icon: iconPayments, projects: [{ key: "payments" }, { key: "cashRegisters" }] },
  { key: "finance", icon: iconFinance, projects: [{ key: "cashCollection" }, { key: "accounting" }] },
  {
    key: "transport",
    icon: iconTransport,
    projects: [{ key: "registration", image: { src: registration } }, { key: "corridor" }],
  },
  { key: "infrastructure", icon: iconInfrastructure, projects: [{ key: "dataCenter" }] },
  { key: "ai", icon: iconAi, projects: [{ key: "lochinKoz" }, { key: "faceId" }] },
  {
    key: "edo",
    icon: iconEdo,
    projects: [
      { key: "safeService", image: { src: safeService, cutout: true }, stats: ["users", "services"] },
      { key: "appeals" },
      { key: "kiosks" },
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
