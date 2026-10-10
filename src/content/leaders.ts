import type { StaticImageData } from "next/image";
import fahriddinov from "@/assets/images/leaders/fahriddinov.webp";
import inogamov from "@/assets/images/leaders/inogamov.webp";
import umarov from "@/assets/images/leaders/umarov.webp";
import karimov from "@/assets/images/leaders/karimov.webp";
import sodiqov from "@/assets/images/leaders/sodiqov.webp";

export type LeaderKey = "fahriddinov" | "inogamov" | "umarov" | "karimov" | "sodiqov";

export const leaders: { key: LeaderKey; photo: StaticImageData }[] = [
  { key: "fahriddinov", photo: fahriddinov },
  { key: "inogamov", photo: inogamov },
  { key: "umarov", photo: umarov },
  { key: "karimov", photo: karimov },
  { key: "sodiqov", photo: sodiqov },
];
