import Image from "next/image";
import { useTranslations } from "next-intl";
import play from "@/assets/images/icons/play.svg";
import { Videos } from "@/assets/video";
import { Container } from "@/components/ui/Container";
import { VideoPlayer } from "./VideoPlayer";

export function VideoShowcase() {
  const t = useTranslations("Video");

  return (
    <section className="mt-16 lg:mt-[123px]">
      <Container>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card md:aspect-[1360/603]">
          <VideoPlayer
            src={Videos.AutodocHolding}
            playLabel={t("play")}
            className="grid size-14 place-items-center rounded-full bg-brand transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:size-[74px]"
          >
            <Image src={play} alt="" className="h-6 w-auto md:h-8" />
          </VideoPlayer>
        </div>
      </Container>
    </section>
  );
}
