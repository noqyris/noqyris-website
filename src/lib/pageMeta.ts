import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { localePath, ogLocale } from "@/i18n/config";

/**
 * Build per-page, per-locale metadata with correct canonical + hreflang
 * alternates. `path` is the locale-agnostic root path (e.g. "/services").
 *
 * OG images are NOT set here: English pages auto-inherit their colocated
 * opengraph-image.tsx (Next injects the hashed URL), and the /sr subtree
 * inherits the default SR card at app/sr/opengraph-image.tsx. Per-page SR OG
 * routes can still be colocated later to mirror the per-page EN set.
 */
export function buildMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  /** When true, title is used verbatim (no "%s — noqyris" template). */
  absoluteTitle?: boolean;
  /** Accepted for call-site clarity; image wiring is handled by Next. */
  ogImage?: string;
  ogAlt?: string;
}): Metadata {
  const { lang, path, title, description, absoluteTitle } = opts;
  const selfUrl = localePath(path, lang);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: selfUrl,
      languages: {
        en: localePath(path, "en"),
        "sr-Latn": localePath(path, "sr"),
        "x-default": localePath(path, "en"),
      },
    },
    openGraph: {
      url: selfUrl,
      locale: ogLocale[lang],
    },
  };
}
