import Image from "next/image";
import { useTranslations } from "next-intl";
import poster from "@/assets/images/video/poster.webp";
import play from "@/assets/images/icons/play.svg";
import { Container } from "@/components/ui/Container";
import { showreelUrl } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { VideoDialog } from "./VideoDialog";

const circle = "grid size-14 place-items-center rounded-full bg-brand md:size-[74px]";

export function VideoShowcase() {
  const t = useTranslations("Video");
  const icon = <Image src={play} alt="" className="h-6 w-auto md:h-8" />;

  return (
    <section className="mt-16 lg:mt-[123px]">
      <Container>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card md:aspect-[1360/603]">
          <Image
            src={poster}
            alt={t("poster")}
            fill
            sizes="(min-width: 1440px) 1360px, 100vw"
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute inset-0 grid place-items-center">
            {showreelUrl ? (
              <VideoDialog
                src={showreelUrl}
                playLabel={t("play")}
                closeLabel={t("close")}
                className={cn(
                  circle,
                  "transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                )}
              >
                {icon}
              </VideoDialog>
            ) : (
              <div aria-hidden="true" className={circle}>
                {icon}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
