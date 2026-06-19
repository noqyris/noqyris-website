import type { Product } from "./types";
import type { Locale } from "@/i18n/config";

// PLACEHOLDER DATA — replace the objects below with real products.
// The UI needs no changes: `metrics` renders only when present (never fake
// numbers), `url` absent renders "Coming soon", `image` set replaces the
// generated gradient cover with a real screenshot.
const productsEn: Product[] = [
  {
    slug: "relayform",
    name: "Relayform",
    tagline: "Form backends for static sites, minus the setup.",
    description:
      "Point any HTML form at a Relayform endpoint and get submissions, spam filtering, and notifications — no server, no SDK, no lock-in.",
    status: "beta",
    category: "Developer tools",
    features: [
      {
        title: "Drop-in endpoint",
        body: "One URL per form. Works with plain HTML, React, or any static site generator.",
      },
      {
        title: "Spam handled",
        body: "Honeypots, rate limits, and content filtering on by default — no captcha required.",
      },
      {
        title: "Routed anywhere",
        body: "Submissions land in email, Slack, or a webhook the moment they arrive.",
      },
      {
        title: "Own your data",
        body: "Full export at any time. Delete means delete.",
      },
    ],
    stack: ["Next.js", "Postgres", "Vercel"],
    accentHue: 96,
    featured: true,
  },
  {
    slug: "briefcast",
    name: "Briefcast",
    tagline: "AI summaries of every meeting you skipped.",
    description:
      "Connects to your calendar and recordings, then delivers a tight, structured brief of what was decided, who owns what, and what can be ignored.",
    status: "building",
    category: "AI tools",
    features: [
      {
        title: "Decision-first briefs",
        body: "Decisions, owners, and deadlines up top — small talk filtered out.",
      },
      {
        title: "Delivered where you work",
        body: "Briefs arrive in email, Slack, or Notion — no new inbox to check.",
      },
      {
        title: "Only what you connect",
        body: "Nothing is shared or summarized outside the meetings you explicitly connect.",
      },
    ],
    stack: ["Next.js", "LLM pipeline", "Postgres"],
    accentHue: 270,
  },
  {
    slug: "stackpilot",
    name: "Stackpilot",
    tagline: "Uptime and dependency monitoring for small SaaS teams.",
    description:
      "One dashboard that watches your endpoints, cron jobs, and third-party dependencies — and tells you what broke before your customers do.",
    status: "building",
    category: "Infrastructure",
    features: [
      {
        title: "Everything on one screen",
        body: "Endpoints, queues, crons, and vendor status — a single pane your whole team understands.",
      },
      {
        title: "Alerts that mean it",
        body: "Smart thresholds and grouping, so a page means something is actually wrong.",
      },
      {
        title: "Built for small teams",
        body: "Five-minute setup, sane defaults, priced for companies without an SRE department.",
      },
    ],
    stack: ["Next.js", "Timescale", "Workers"],
    accentHue: 160,
  },
];

// Serbian products — translated by the i18n pass (taglines/descriptions/
// features/categories; names + slugs stay). Falls back to English data.
const productsSr: Product[] = [
  {
    slug: "relayform",
    name: "Relayform",
    tagline: "Form backend za statične sajtove, bez podešavanja.",
    description:
      "Uperite bilo koju HTML formu na Relayform endpoint i dobijate prijave, filtriranje spama i obaveštenja — bez servera, bez SDK-a, bez zaključavanja.",
    status: "beta",
    category: "Alati za programere",
    features: [
      {
        title: "Endpoint koji se samo ubaci",
        body: "Jedan URL po formi. Radi sa običnim HTML-om, React-om ili bilo kojim generatorom statičnih sajtova.",
      },
      {
        title: "Spam rešen",
        body: "Honeypot zamke, ograničenja brzine i filtriranje sadržaja uključeni su podrazumevano — bez captcha.",
      },
      {
        title: "Usmereno bilo gde",
        body: "Prijave stižu na email, u Slack ili na webhook istog trenutka kad pristignu.",
      },
      {
        title: "Vaši podaci su vaši",
        body: "Pun izvoz u svakom trenutku. Brisanje znači brisanje.",
      },
    ],
    stack: ["Next.js", "Postgres", "Vercel"],
    accentHue: 96,
    featured: true,
  },
  {
    slug: "briefcast",
    name: "Briefcast",
    tagline: "AI sažeci svakog sastanka koji ste preskočili.",
    description:
      "Povezuje se sa vašim kalendarom i snimcima, a zatim isporučuje zbijen, strukturiran prikaz toga šta je odlučeno, ko je za šta zadužen i šta se može ignorisati.",
    status: "building",
    category: "AI alati",
    features: [
      {
        title: "Sažeci sa odlukama na prvom mestu",
        body: "Odluke, zaduženi i rokovi na vrhu — ćaskanje je odfiltrirano.",
      },
      {
        title: "Isporučeno tamo gde radite",
        body: "Sažeci stižu na email, u Slack ili Notion — nema novog inboxa za proveru.",
      },
      {
        title: "Samo ono što povežete",
        body: "Ništa se ne deli niti sažima izvan sastanaka koje izričito povežete.",
      },
    ],
    stack: ["Next.js", "LLM pipeline", "Postgres"],
    accentHue: 270,
  },
  {
    slug: "stackpilot",
    name: "Stackpilot",
    tagline: "Praćenje dostupnosti i zavisnosti za male SaaS timove.",
    description:
      "Jedan dashboard koji nadgleda vaše endpointe, cron poslove i eksterne zavisnosti — i kaže vam šta je puklo pre nego što to primete vaši korisnici.",
    status: "building",
    category: "Infrastruktura",
    features: [
      {
        title: "Sve na jednom ekranu",
        body: "Endpointi, redovi, cron poslovi i status dobavljača — jedan prikaz koji razume ceo vaš tim.",
      },
      {
        title: "Upozorenja koja nešto znače",
        body: "Pametni pragovi i grupisanje, tako da poziv znači da nešto zaista nije u redu.",
      },
      {
        title: "Napravljeno za male timove",
        body: "Podešavanje za pet minuta, razumne podrazumevane vrednosti, cena za kompanije bez SRE odeljenja.",
      },
    ],
    stack: ["Next.js", "Timescale", "Workers"],
    accentHue: 160,
  },
];

const productsByLocale: Record<Locale, Product[]> = {
  en: productsEn,
  sr: productsSr,
};

export function getProducts(lang: Locale): Product[] {
  return productsByLocale[lang];
}

export function getProduct(lang: Locale, slug: string): Product | undefined {
  return productsByLocale[lang].find((p) => p.slug === slug);
}

export const productSlugs = productsEn.map((p) => p.slug);
