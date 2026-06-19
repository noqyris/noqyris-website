"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";

export function CopyEmail({
  lang,
  inverted = false,
}: {
  lang: Locale;
  inverted?: boolean;
}) {
  const dict = getDictionary(lang);
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t(dict.copyEmail.aria, { email: site.email })}
      className={
        inverted
          ? "text-display-md cursor-pointer break-all transition-opacity hover:opacity-60"
          : "text-display-md cursor-pointer break-all transition-colors hover:text-accent"
      }
    >
      <span aria-hidden="true">
        {copied ? dict.copyEmail.copied : site.email}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? dict.copyEmail.srCopied : ""}
      </span>
    </button>
  );
}
