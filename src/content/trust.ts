import type { StaticImageData } from "next/image";
import iiv from "@/assets/images/trust/iiv.svg";
import ovir from "@/assets/images/trust/ovir.svg";
import transportMinistry from "@/assets/images/trust/transport-ministry.svg";
import paynet from "@/assets/images/trust/paynet.svg";
import orient from "@/assets/images/trust/orient.svg";

export type TrustKey = "iiv" | "ovir" | "transportMinistry" | "paynet" | "orient";

// Logos of the "trusted by" cards, at their design size.
export const trustLogos: { key: TrustKey; logo: StaticImageData; width: number; height: number }[] = [
  { key: "iiv", logo: iiv, width: 131, height: 131 },
  { key: "ovir", logo: ovir, width: 124, height: 127 },
  { key: "transportMinistry", logo: transportMinistry, width: 143, height: 119 },
  { key: "paynet", logo: paynet, width: 204, height: 47 },
  { key: "orient", logo: orient, width: 226, height: 45 },
];
