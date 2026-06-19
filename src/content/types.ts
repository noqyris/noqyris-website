export type ProductStatus = "live" | "beta" | "building";

export interface ProductMetric {
  value: string;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  category: string;
  /** Traction slots — omit until real numbers exist; never fake them. */
  metrics?: ProductMetric[];
  features: { title: string; body: string }[];
  stack: string[];
  /** External app link; absent renders "Coming soon". */
  url?: string;
  /** 0–360, drives the generated gradient cover. */
  accentHue: number;
  /** Future: /public path to a screenshot; replaces the gradient cover. */
  image?: string;
  featured?: boolean;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ProcessStep {
  name: string;
  body: string;
}

export interface ServicePricing {
  /** Short at-a-glance pricing line, e.g. "Scoped in the Sprint" — no hard
   *  numbers on the marketing site by choice; scoping/quoting happens privately
   *  in the Roadmap Sprint. */
  from: string;
  timeline: string;
  note: string;
}

export interface Service {
  slug: string;
  /** Short name used in nav rows and cards. */
  name: string;
  /** Keyword-bearing page H1; `em` is the serif-italic phrase. */
  h1: { pre: string; em: string; post?: string };
  /** One-liner for index rows and cards. */
  summary: string;
  /** Lede paragraph, naturally contains the target keyword. */
  lede: string;
  audience: string[];
  deliverables: { title: string; body: string }[];
  stack: string[];
  process: ProcessStep[];
  faqs: ServiceFaq[];
  pricing: ServicePricing;
  seo: { title: string; description: string };
}

export type ChangelogTag = "product" | "studio" | "site";

export interface ChangelogEntry {
  date: string; // YYYY-MM-DD
  tag: ChangelogTag;
  title: string;
  body?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
