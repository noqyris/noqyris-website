import type { ChangelogEntry } from "./types";
import type { Locale } from "@/i18n/config";

// Append new entries at the TOP. Real history only — never backfill.
const changelogEn: ChangelogEntry[] = [
  {
    date: "2026-06-11",
    tag: "site",
    title: "noqyris.com launched",
    body: "The studio site goes live — products, services, and this changelog, all built in public from day one.",
  },
  // Products hidden for now — restore this entry when products go public.
  // {
  //   date: "2026-06-11",
  //   tag: "product",
  //   title: "First products in development",
  //   body: "Relayform enters private beta; Briefcast and Stackpilot are in active development.",
  // },
  {
    date: "2026-06-03",
    tag: "studio",
    title: "Studio founded",
    body: "noqyris opens as an independent software studio: own SaaS products, plus custom applications and AI systems for clients.",
  },
];

// Serbian changelog — titles/bodies translated by the i18n pass; dates/tags
// stay. Falls back to English until translated.
const changelogSr: ChangelogEntry[] = [
  {
    date: "2026-06-11",
    tag: "site",
    title: "noqyris.com je pokrenut",
    body: "Sajt studija je uživo — proizvodi, usluge i ovaj changelog, sve građeno u javnosti od prvog dana.",
  },
  // Products hidden for now — restore this entry when products go public.
  // {
  //   date: "2026-06-11",
  //   tag: "product",
  //   title: "Prvi proizvodi u izradi",
  //   body: "Relayform ulazi u privatnu betu; Briefcast i Stackpilot su u aktivnoj izradi.",
  // },
  {
    date: "2026-06-03",
    tag: "studio",
    title: "Studio osnovan",
    body: "noqyris počinje kao nezavisni softverski studio: sopstveni SaaS proizvodi, uz aplikacije po meri i AI sisteme za klijente.",
  },
];

const changelogByLocale: Record<Locale, ChangelogEntry[]> = {
  en: changelogEn,
  sr: changelogSr,
};

export function getChangelog(lang: Locale): ChangelogEntry[] {
  return changelogByLocale[lang];
}

/** Locale-invariant — used by sitemap lastmod + feed. */
export const changelogDates = changelogEn.map((e) => e.date);
