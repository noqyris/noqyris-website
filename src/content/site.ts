// Invariant studio identity. Translatable copy (tagline/description aside,
// which feed manifest + OG + JSON-LD fallback) lives in the i18n dictionary:
// availability, location, social notes → dict.site.*
export const site = {
  name: "noqyris",
  url: "https://noqyris.com",
  email: "contact@noqyris.com",
  tagline: "Independent software studio",
  description:
    "Independent software studio shipping its own SaaS products and building custom applications and AI systems for clients worldwide.",
  founder: "Djordje Subotic",
  founderInitials: "DS",
  /** Optional /public path to a real founder photo — research says a real
   *  face beats a monogram; drop one in when ready. */
  founderImage: undefined as string | undefined,
  /** Optional hero background video — base path under /public, no extension
   *  (expects <base>.mp4, <base>.webm, <base>-poster.jpg). null = the dark
   *  canvas. See docs/AI-ASSETS.md. e.g. "/hero/hero" */
  heroVideo: null as string | null,
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
