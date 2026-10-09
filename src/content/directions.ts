import type { StaticImageData } from "next/image";
import iconIt from "@/assets/images/directions/icon-it.svg";
import iconPayments from "@/assets/images/directions/icon-payments.svg";
import iconFinance from "@/assets/images/directions/icon-finance.svg";
import iconTransport from "@/assets/images/directions/icon-transport.svg";
import iconInfrastructure from "@/assets/images/directions/icon-infrastructure.svg";
import iconAi from "@/assets/images/directions/icon-ai.svg";
import iconEdo from "@/assets/images/directions/icon-edo.svg";
import registration from "@/assets/images/directions/project-registration.webp";
import software from "@/assets/images/directions/project-software.png";
import cloud from "@/assets/images/directions/project-cloud.png";
import users from "@/assets/images/icons/users.svg";
import exchange from "@/assets/images/icons/exchange.svg";
import integrations from "@/assets/images/icons/integrations.svg";

export type DirectionKey = "it" | "payments" | "finance" | "transport" | "infrastructure" | "ai" | "edo";
export type ProjectKey = "registration" | "software" | "cloud";
export type ProjectStatKey = "users" | "operations" | "integrations";

export const directions: { key: DirectionKey; icon: StaticImageData }[] = [
  { key: "it", icon: iconIt },
  { key: "payments", icon: iconPayments },
  { key: "finance", icon: iconFinance },
  { key: "transport", icon: iconTransport },
  { key: "infrastructure", icon: iconInfrastructure },
  { key: "ai", icon: iconAi },
  { key: "edo", icon: iconEdo },
];

export const projectImages: Record<ProjectKey, StaticImageData> = { registration, software, cloud };

// Cutout images that sit on a gradient tile instead of filling it.
export const projectCutouts: ProjectKey[] = ["software"];

// Title box widths from the design, so each title wraps where the mockup does.
export const projectTitleWidths: Record<ProjectKey, string> = {
  registration: "max-w-[369px]",
  software: "max-w-[610px]",
  cloud: "max-w-[530px]",
};

export const projectStats: { key: ProjectStatKey; icon: StaticImageData }[] = [
  { key: "users", icon: users },
  { key: "operations", icon: exchange },
  { key: "integrations", icon: integrations },
];

// Real projects per direction are not in the design yet: every direction shows the same three sample projects.
export const directionProjects: ProjectKey[] = ["registration", "software", "cloud"];
