"use client";

import { useEffect } from "react";

/**
 * Sets the document-level <html lang> to the active locale. The root layout is
 * shared across the (en) and /sr route groups, so it can't know the locale at
 * the document level; this flips it client-side per locale (screen readers,
 * browser-translation prompts). Crawlers also get the hreflang alternates from
 * buildMetadata. Renders nothing.
 */
export function HtmlLang({ value }: { value: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = value;
    return () => {
      document.documentElement.lang = prev || "en";
    };
  }, [value]);

  return null;
}
