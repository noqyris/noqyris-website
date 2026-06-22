// Invariant studio identity. Translatable copy (tagline/description aside,
// which feed manifest + OG + JSON-LD fallback) lives in the i18n dictionary:
// availability, location, social notes → dict.site.*
export const site = {
  name: "noqyris",
  url: "https://noqyris.com",
  email: "team@noqyris.com",
  tagline: "Independent software studio",
  description:
    "Independent software studio shipping its own SaaS products and building custom applications and AI systems for clients worldwide.",
  /** Public revenue/MRR shown on /changelog. Kept hidden while it's $0 — a zero
   *  reads as risk to prospective clients. Set a real string once it's worth
   *  showing (e.g. "$1,240 MRR") and the dashboard card appears automatically. */
  revenue: null as string | null,
  socials: [
    { key: "x", label: "X (Twitter)", handle: "@noqyris", url: "https://x.com/noqyris" },
    { key: "github", label: "GitHub", handle: "@noqyris", url: "https://github.com/noqyris" },
    { key: "linkedin", label: "LinkedIn", handle: "noqyris", url: "https://www.linkedin.com/company/noqyris" },
    { key: "youtube", label: "YouTube", handle: "@noqyris", url: "https://www.youtube.com/@noqyris" },
    { key: "instagram", label: "Instagram", handle: "@noqyris", url: "https://www.instagram.com/noqyris" },
    { key: "tiktok", label: "TikTok", handle: "@noqyris", url: "https://www.tiktok.com/@noqyris" },
    { key: "producthunt", label: "Product Hunt", handle: "@noqyris", url: "https://www.producthunt.com/@noqyris" },
  ],
} as const;

export type SocialKey = (typeof site.socials)[number]["key"];

export function mailto(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
