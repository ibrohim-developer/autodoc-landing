"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  url: string;
  title: string;
  label: string;
  copiedLabel: string;
  className: string;
  children: ReactNode;
};

// Instagram has no share URL: touch devices open the system share sheet (which lists the app),
// everything else copies the link to paste into Instagram.
export function InstagramShareButton({ url, title, label, copiedLabel, className, children }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function share() {
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      // Rejects when the sheet is dismissed.
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied permission): nothing to report.
    }
  }

  return (
    <span className="relative block">
      <button type="button" aria-label={label} onClick={share} className={className}>
        {children}
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
      {copied && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-ink px-2.5 py-1 text-sm whitespace-nowrap text-white"
        >
          {copiedLabel}
        </span>
      )}
    </span>
  );
}
