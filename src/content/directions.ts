import type { StaticImageData } from "next/image";
import iconIt from "@/assets/images/directions/icon-it.svg";
import iconPayments from "@/assets/images/directions/icon-payments.svg";
import iconFinance from "@/assets/images/directions/icon-finance.svg";
import iconTransport from "@/assets/images/directions/icon-transport.svg";
import iconInfrastructure from "@/assets/images/directions/icon-infrastructure.svg";
import iconAi from "@/assets/images/directions/icon-ai.svg";
import iconEdo from "@/assets/images/directions/icon-edo.svg";
import registration from "@/assets/images/directions/project-registration.webp";
import users from "@/assets/images/icons/users.svg";
import exchange from "@/assets/images/icons/exchange.svg";
import integrations from "@/assets/images/icons/integrations.svg";

export type DirectionKey = "it" | "payments" | "finance" | "transport" | "infrastructure" | "ai" | "edo";
export type ProjectKey = "registration";
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

export const projectImages: Record<ProjectKey, StaticImageData> = { registration };

export const projectStats: { key: ProjectStatKey; icon: StaticImageData }[] = [
  { key: "users", icon: users },
  { key: "operations", icon: exchange },
  { key: "integrations", icon: integrations },
];

// Real projects per direction are not in the design yet: every direction shows the sample project three times.
export const directionProjects: ProjectKey[] = ["registration", "registration", "registration"];
