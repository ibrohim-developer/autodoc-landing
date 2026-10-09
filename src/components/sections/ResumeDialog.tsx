"use client";

import { createContext, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import successIllustration from "@/assets/images/career/success.webp";
import chevronDown from "@/assets/images/icons/chevron-down-ink.svg";
import chevronRight from "@/assets/images/icons/chevron-right-ink.svg";
import { anchors, homeSection } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { isValidPhone } from "@/lib/phone";

type Position = { key: string; label: string };
type Field = "name" | "phone" | "resume";
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = ["name", "phone", "resume"];
const OTHER_POSITION = "other";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILES = ".pdf,.doc,.docx";

const ResumeDialogContext = createContext<(position: string) => void>(() => {});

// One dialog for the whole list: each card's button opens it with its own position selected.
export function ResumeDialogProvider({ positions, children }: { positions: Position[]; children: ReactNode }) {
  const t = useTranslations("Career.resume");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState(positions[0]?.key ?? OTHER_POSITION);
  const [errors, setErrors] = useState<Errors>({});
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  const open = (key: string) => {
    setPosition(key);
    setErrors({});
    setSent(false);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  function validate(data: FormData): Errors {
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = t("errors.required");
    const phone = String(data.get("phone") ?? "").trim();
    if (!phone) next.phone = t("errors.required");
    else if (!isValidPhone(phone)) next.phone = t("errors.phone");
    const file = data.get("resume");
    if (!(file instanceof File) || file.size === 0) next.resume = t("errors.resume");
    else if (file.size > MAX_FILE_SIZE) next.resume = t("errors.fileSize");
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validate(new FormData(form));
    setErrors(next);

    const firstInvalid = FIELD_ORDER.find((field) => next[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // UI only: nothing is sent until a backend is connected.
    form.reset();
    setFileName("");
    setSent(true);
  }

  const fieldClass = (field?: Field) =>
    cn(
      "w-full rounded-card bg-field px-5 text-[18px]/[21px] text-ink placeholder:text-muted outline-none transition",
      "focus-visible:ring-2 focus-visible:ring-brand",
      field && errors[field] && "ring-2 ring-red-400",
    );
  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`resume-${field}-error`} className="mt-1.5 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;
  const a11y = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `resume-${field}-error` : undefined,
  });

  return (
    <ResumeDialogContext value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={sent ? "resume-success-title" : "resume-title"}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className={cn(
          "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] overflow-y-auto rounded-card bg-page p-0 text-ink backdrop:bg-black/75",
          sent ? "max-w-[530px]" : "max-w-[663px]",
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label={t("close")}
          className="absolute top-4 right-4 grid size-[46px] place-items-center rounded-full bg-field text-ink transition hover:bg-[#e4e1e1] focus-visible:outline-2 focus-visible:outline-brand sm:top-[19px] sm:right-5"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {sent ? (
          <div role="status" className="flex flex-col items-center px-5 pt-16 pb-6 text-center sm:px-[27px] sm:pt-[83px] sm:pb-[42px]">
            <Image src={successIllustration} alt="" sizes="222px" className="h-auto w-[222px]" />
            <p id="resume-success-title" className="mt-[27px] text-[28px]/[34px] font-bold sm:text-[36px]/[43px]">
              {t("success.title")}
            </p>
            <p className="mt-3 text-[18px]/[21px] text-muted">{t("success.text")}</p>
            <Link
              href={homeSection(anchors.top)}
              className="mt-[38px] flex h-[62px] w-full items-center justify-center rounded-card bg-brand text-[18px] font-medium text-white transition hover:bg-[#287634] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t("success.home")}
            </Link>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="px-5 pt-16 pb-6 sm:px-[41px] sm:pt-[42px] sm:pb-[52px]">
            <h2 id="resume-title" className="pr-12 text-[30px]/[34px] font-bold sm:text-[42px]/[43px]">
              {t("title")}
            </h2>
            <p className="mt-2.5 text-[18px]/[21px] text-muted">{t("subtitle")}</p>

            <div className="mt-[22px] flex flex-col gap-2.5 sm:mt-[43px]">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="resume-name" className="sr-only">{t("fields.name")}</label>
                  <input id="resume-name" name="name" type="text" autoComplete="name" placeholder={t("fields.name")} className={cn(fieldClass("name"), "h-[63px]")} {...a11y("name")} />
                  {errorText("name")}
                </div>
                <div>
                  <label htmlFor="resume-phone" className="sr-only">{t("fields.phone")}</label>
                  <input id="resume-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t("fields.phone")} className={cn(fieldClass("phone"), "h-[63px]")} {...a11y("phone")} />
                  {errorText("phone")}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="resume-position" className="sr-only">{t("fields.position")}</label>
                <select
                  id="resume-position"
                  name="position"
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                  className="h-[63px] w-full cursor-pointer appearance-none rounded-card bg-field pr-14 pl-5 text-[18px]/[21px] font-medium text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {positions.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                  <option value={OTHER_POSITION}>{t("fields.otherPosition")}</option>
                </select>
                <Image src={chevronDown} alt="" className="pointer-events-none absolute top-1/2 right-[34px] w-3.5 -translate-y-1/2" />
              </div>
              <div>
                <label htmlFor="resume-about" className="sr-only">{t("fields.about")}</label>
                <textarea id="resume-about" name="about" rows={4} placeholder={t("fields.about")} className={cn(fieldClass(), "block h-[130px] resize-none pt-[21px] pb-4")} />
              </div>
              <div>
                <label
                  className={cn(
                    "flex h-[63px] cursor-pointer items-center justify-between gap-4 rounded-card bg-field px-5 text-[18px]/[21px] transition has-focus-visible:ring-2 has-focus-visible:ring-brand",
                    errors.resume && "ring-2 ring-red-400",
                  )}
                >
                  <input
                    name="resume"
                    type="file"
                    accept={ACCEPTED_FILES}
                    className="sr-only"
                    onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
                    {...a11y("resume")}
                  />
                  <span className={cn("min-w-0 truncate", fileName ? "text-ink" : "text-muted")}>
                    {fileName || t("fields.resume")}
                  </span>
                  <span className="shrink-0 text-brand">{t("fields.upload")}</span>
                </label>
                {errorText("resume")}
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 flex h-[63px] w-full items-center justify-center rounded-card bg-brand text-[18px] font-medium text-white transition hover:bg-[#287634] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t("submit")}
            </button>
          </form>
        )}
      </dialog>
    </ResumeDialogContext>
  );
}

export function ApplyButton({ position, className }: { position: string; className?: string }) {
  const t = useTranslations("Career.resume");
  const open = useContext(ResumeDialogContext);

  return (
    <button
      type="button"
      onClick={() => open(position)}
      className={cn(
        "group flex h-[41px] w-full items-center justify-center gap-4 rounded-pill bg-pill text-[18px] font-medium text-black transition-colors hover:bg-[#ebebeb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
    >
      {t("open")}
      <Image src={chevronRight} alt="" className="h-[11px] w-auto transition-transform group-hover:translate-x-1" />
    </button>
  );
}
