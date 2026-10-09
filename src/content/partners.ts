import type { StaticImageData } from "next/image";
import iiv from "@/assets/images/partners/iiv.svg";
import ovir from "@/assets/images/partners/ovir.png";
import transportMinistry from "@/assets/images/partners/transport-ministry.svg";
import temirYol from "@/assets/images/partners/temir-yol.svg";
import worldpay from "@/assets/images/partners/worldpay.svg";
import asbt from "@/assets/images/partners/asbt.svg";
import cyberpark from "@/assets/images/partners/cyberpark.svg";

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
