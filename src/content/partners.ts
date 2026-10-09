import type { StaticImageData } from "next/image";
import iiv from "@/assets/images/partners/iiv.svg";
import ovir from "@/assets/images/partners/ovir.png";
import transportMinistry from "@/assets/images/partners/transport-ministry.svg";
import temirYol from "@/assets/images/partners/temir-yol.svg";
import worldpay from "@/assets/images/partners/worldpay.svg";
import asbt from "@/assets/images/partners/asbt.svg";
import cyberpark from "@/assets/images/partners/cyberpark.svg";
import dyhxxColor from "@/assets/images/partners/catalog/dyhxx.png";
import temirYolColor from "@/assets/images/partners/catalog/temir-yol.png";
import worldpayColor from "@/assets/images/partners/catalog/worldpay.png";
import expressPay from "@/assets/images/partners/catalog/express-pay.png";
import aloqabank from "@/assets/images/partners/catalog/aloqabank.png";
import universalbank from "@/assets/images/partners/catalog/universalbank.png";
import smartbank from "@/assets/images/partners/catalog/smartbank.png";
import uztelecom from "@/assets/images/partners/catalog/uztelecom.png";
import asbtColor from "@/assets/images/partners/catalog/asbt.png";
import cyberparkColor from "@/assets/images/partners/catalog/cyberpark.png";
import { trustLogos, type TrustKey } from "./trust";

export type PartnerKey = "iiv" | "ovir" | "transportMinistry" | "temirYol" | "worldpay" | "asbt" | "cyberpark";

// Logos of the partner strip under the hero, at their design size.
// ovir.png is a 2x render with the design's 40% opacity and grayscale already applied.
export const partners: { key: PartnerKey; logo: StaticImageData; width: number; height: number }[] = [
  { key: "iiv", logo: iiv, width: 102, height: 102 },
  { key: "ovir", logo: ovir, width: 99, height: 101 },
  { key: "transportMinistry", logo: transportMinistry, width: 120, height: 95 },
  { key: "temirYol", logo: temirYol, width: 99, height: 98 },
  { key: "worldpay", logo: worldpay, width: 166, height: 31 },
  { key: "asbt", logo: asbt, width: 142, height: 82 },
  { key: "cyberpark", logo: cyberpark, width: 158, height: 65 },
];

export type PartnerCardKey =
  | "iiv"
  | "dyhxx"
  | "ovir"
  | "transportMinistry"
  | "temirYol"
  | "paynet"
  | "worldpay"
  | "expressPay"
  | "aloqabank"
  | "universalbank"
  | "smartbank"
  | "uztelecom"
  | "orient"
  | "asbt"
  | "cyberpark";

// The government and payment logos already used by the home page's "trusted by" cards.
const trust = Object.fromEntries(trustLogos.map((item) => [item.key, item])) as Record<
  TrustKey,
  (typeof trustLogos)[number]
>;

// Full-colour logos of the partners page cards: government bodies first, then companies.
// Emblems are 350px squares; wordmarks are 2x renders centred on a shared 372x110 canvas.
const emblem = { width: 119, height: 119 };
const wordmark = { width: 220, height: 65 };

export const partnerCards: { key: PartnerCardKey; logo: StaticImageData; width: number; height: number }[] = [
  trust.iiv,
  { key: "dyhxx", logo: dyhxxColor, ...emblem },
  trust.ovir,
  trust.transportMinistry,
  { key: "temirYol", logo: temirYolColor, ...emblem },
  trust.paynet,
  { key: "worldpay", logo: worldpayColor, ...wordmark },
  { key: "expressPay", logo: expressPay, ...wordmark },
  { key: "aloqabank", logo: aloqabank, ...wordmark },
  { key: "universalbank", logo: universalbank, ...wordmark },
  { key: "smartbank", logo: smartbank, ...wordmark },
  { key: "uztelecom", logo: uztelecom, ...wordmark },
  trust.orient,
  { key: "asbt", logo: asbtColor, ...wordmark },
  { key: "cyberpark", logo: cyberparkColor, ...wordmark },
];
