import Image from "next/image";
import { useTranslations } from "next-intl";
import chevronBrand from "@/assets/images/icons/chevron-right-brand.svg";
import instagram from "@/assets/images/icons/instagram-brand.svg";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contacts } from "@/content/navigation";
import { reels } from "@/content/reels";
import { ReelsGallery } from "./ReelsGallery";

const titleId = "reels-title";

// "Our page": videos from the company's Instagram, with a link to the profile.
export function BlogReels() {
  const t = useTranslations("Blog.reels");

  return (
    <section aria-labelledby={titleId} className="mt-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading id={titleId} title={t("title")} />
          <a
            href={contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[50px] w-[193px] items-center justify-between rounded-pill bg-brand-tint pr-[22px] pl-[18px] text-base/4 font-semibold text-brand transition-colors hover:bg-[#dcebdf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span className="flex items-center gap-[13px]">
              <Image src={instagram} alt="" />
              Instagram
            </span>
            <Image src={chevronBrand} alt="" />
          </a>
        </div>
        <ReelsGallery reels={reels} />
      </Container>
    </section>
  );
}
