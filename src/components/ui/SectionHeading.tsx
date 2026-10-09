import { cn } from "@/lib/cn";

type Props = {
  title: string;
  eyebrow?: string;
  // "p" keeps the look where another element is the page's h1.
  as?: "h2" | "h1" | "p";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({ title, eyebrow, as: Heading = "h2", tone = "dark", className, id }: Props) {
  return (
    <div className={className}>
      {eyebrow && <p className="mb-2.5 text-[18px]/[normal] font-normal text-brand">{eyebrow}</p>}
      <Heading
        id={id}
        className={cn(
          "text-[28px]/[34px] font-semibold md:text-[32px]/[38px] xl:text-[36px]/[43px]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </Heading>
    </div>
  );
}
