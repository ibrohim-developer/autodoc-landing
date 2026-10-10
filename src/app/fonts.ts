import localFont from "next/font/local";

export const sfPro = localFont({
  src: [
    { path: "../assets/fonts/sf-pro-display/SFProDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/sf-pro-display/SFProDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/sf-pro-display/SFProDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/sf-pro-display/SFProDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});
