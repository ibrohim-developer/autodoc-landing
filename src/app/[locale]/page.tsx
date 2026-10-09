import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { Stats } from "@/components/sections/Stats";
import { Position } from "@/components/sections/Position";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Directions } from "@/components/sections/Directions";
import { Feedback } from "@/components/sections/Feedback";
import { Leaders } from "@/components/sections/Leaders";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { News } from "@/components/sections/News";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top" className="overflow-x-clip">
        <Hero />
        <PartnerStrip />
        <Stats />
        <Position />
        <VideoShowcase />
        <Directions />
        <Feedback />
        <Leaders />
        <TrustedBy />
        <News />
      </main>
      <Footer />
    </>
  );
}
