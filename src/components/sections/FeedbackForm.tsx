"use client";

import { useState, type FormEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Field = "name" | "phone" | "topic" | "message" | "consent";
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = ["name", "phone", "topic", "message", "consent"];

// Accepts +998 XX XXX XX XX (any separators) or a 9-digit local number.
function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (digits.length === 12 && digits.startsWith("998")) || digits.length === 9;
}

export function FeedbackForm({ arrowIcon }: { arrowIcon: StaticImageData }) {
  const t = useTranslations("Feedback");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    for (const field of ["name", "topic", "message"] as const) {
      if (!String(data.get(field) ?? "").trim()) next[field] = t("errors.required");
    }
    const phone = String(data.get("phone") ?? "").trim();
    if (!phone) next.phone = t("errors.required");
    else if (!isValidPhone(phone)) next.phone = t("errors.phone");
    if (!data.get("consent")) next.consent = t("errors.consent");
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
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 text-white">
        <p className="text-[28px] leading-tight font-semibold">{t("success.title")}</p>
        <p className="text-lg text-white/80">{t("success.text")}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 rounded-card bg-white px-6 py-4 text-lg font-medium text-ink transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  const fieldClass = (field: Field) =>
    cn(
      "w-full rounded-card bg-white px-5 text-[18px]/[21px] text-ink placeholder:text-muted outline-none transition",
      "focus-visible:ring-2 focus-visible:ring-lime",
      errors[field] && "ring-2 ring-red-400",
    );
  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`feedback-${field}-error`} className="mt-1.5 text-sm text-red-200">
        {errors[field]}
      </p>
    ) : null;
  const a11y = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `feedback-${field}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-2.5">
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div>
          <label htmlFor="feedback-name" className="sr-only">{t("fields.name")}</label>
          <input id="feedback-name" name="name" type="text" autoComplete="name" placeholder={t("fields.name")} className={cn(fieldClass("name"), "h-[63px]")} {...a11y("name")} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="feedback-phone" className="sr-only">{t("fields.phone")}</label>
          <input id="feedback-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t("fields.phone")} className={cn(fieldClass("phone"), "h-[63px]")} {...a11y("phone")} />
          {errorText("phone")}
        </div>
      </div>
      <div>
        <label htmlFor="feedback-topic" className="sr-only">{t("fields.topic")}</label>
        <input id="feedback-topic" name="topic" type="text" placeholder={t("fields.topic")} className={cn(fieldClass("topic"), "h-[63px]")} {...a11y("topic")} />
        {errorText("topic")}
      </div>
      <div>
        <label htmlFor="feedback-message" className="sr-only">{t("fields.message")}</label>
        <textarea id="feedback-message" name="message" rows={4} placeholder={t("fields.message")} className={cn(fieldClass("message"), "block h-[130px] resize-none pt-[21px] pb-4")} {...a11y("message")} />
        {errorText("message")}
      </div>

      <div className="mt-[21px] grid items-center gap-5 sm:grid-cols-2 sm:gap-2.5">
        <div>
          <label className="group flex cursor-pointer items-center gap-5 text-[18px]/[21px] text-white">
            <input name="consent" type="checkbox" className="sr-only" {...a11y("consent")} />
            <span
              aria-hidden="true"
              className="grid size-5 shrink-0 place-items-center rounded-md border border-white transition-colors group-has-checked:bg-white group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-white"
            >
              <svg viewBox="0 0 12 10" className="hidden w-3 text-brand group-has-checked:block" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 5l3.5 3.5L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="max-w-[187px]">{t("fields.consent")}</span>
          </label>
          {errorText("consent")}
        </div>
        <button
          type="submit"
          className="group flex h-[63px] w-full items-center justify-center gap-5 rounded-card border border-white text-[20px] font-medium text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t("submit")}
          <Image src={arrowIcon} alt="" className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
