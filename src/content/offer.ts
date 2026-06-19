// The studio's offer architecture — entry offer, guarantees, and the
// response promise. Every figure and promise here is a real commitment:
// EDIT the numbers to match what you can actually stand behind, then keep
// them honest. (Research basis: published pricing + risk reversal +
// fast-response promises are the strongest verified trust levers for a
// studio without case studies yet.)

import type { Locale } from "@/i18n/config";

export interface Offer {
  responsePromise: string;
  entryOffer: {
    name: string;
    price?: string;
    length: string;
    tagline: string;
    description: string;
    deliverables: { title: string; body: string }[];
    guarantee: string;
  };
  guarantees: { title: string; body: string }[];
}

/** Published reply promise — shown on every contact surface. */
const responsePromise =
  "You'll hear back within one business day — usually within a few hours.";

/** Fixed-scope paid entry offer: the de-risked first step. */
const entryOffer = {
  name: "Roadmap Sprint",
  length: "5 days",
  tagline: "A build-ready plan in one week — yours to take anywhere.",
  description:
    "Before committing to a full build, buy one week of focused product thinking. You bring the idea or the problem; the sprint turns it into a plan any competent team could execute — mine or anyone else's.",
  deliverables: [
    {
      title: "Written product spec",
      body: "The v1 cut in plain language: what ships, what waits, and why.",
    },
    {
      title: "Architecture & stack plan",
      body: "Data model, integrations, and infrastructure — sized for where you'll be in a year, not a pitch deck.",
    },
    {
      title: "A quote & timeline",
      body: "A real quote and a real date for the full build — no estimate ranges that double later.",
    },
    {
      title: "Risk register",
      body: "The three things most likely to sink the project, and the plan for each.",
    },
  ],
  guarantee:
    "If the sprint doesn't end with a plan you could hand to any developer and build from, you don't pay.",
};

/** Risk-reversal block — specific, verifiable promises. */
const guarantees = [
  {
    title: "A reply within one business day",
    body: "Every inquiry gets a personal answer within one business day — usually within a few hours, and always from the person who'll do the work.",
  },
  {
    title: "Working software every week",
    body: "A demo of the real product every single week of the build — on a staging URL you can open, click, and share. No slide-deck progress reports.",
  },
  {
    title: "You own everything",
    body: "Code, infrastructure, documentation, accounts — fully yours on final payment, with a documented handover. No license-back clauses, no hostage repositories.",
  },
  {
    title: "No-risk first step",
    body: "The Roadmap Sprint is guaranteed: if it doesn't end in a build-ready plan, you don't pay. And the first conversation costs nothing.",
  },
];

const offerEn: Offer = { responsePromise, entryOffer, guarantees };

// Serbian offer — translated by the i18n pass (prices/name stay; length,
// taglines, descriptions, deliverables, guarantees translate). Falls back
// to English until translated.
const offerSr: Offer = {
  responsePromise:
    "Javljam vam se u roku od jednog radnog dana — obično u roku od nekoliko sati.",
  entryOffer: {
    name: "Roadmap Sprint",
    length: "5 dana",
    tagline:
      "Plan spreman za izradu za nedelju dana — vaš je i možete ga poneti bilo kuda.",
    description:
      "Pre nego što se obavežete na celu izradu, kupite nedelju fokusiranog razmišljanja o proizvodu. Vi donosite ideju ili problem; sprint to pretvara u plan koji bilo koji kompetentan tim može da izvede — moj ili bilo čiji drugi.",
    deliverables: [
      {
        title: "Pisana specifikacija proizvoda",
        body: "Verzija v1 jednostavnim jezikom: šta ide u isporuku, šta čeka i zašto.",
      },
      {
        title: "Plan arhitekture i stacka",
        body: "Model podataka, integracije i infrastruktura — dimenzionisani za to gde ćete biti za godinu dana, a ne za pitch deck.",
      },
      {
        title: "Ponuda i rokovi",
        body: "Prava ponuda i pravi datum za celu izradu — bez procena u rasponu koje se kasnije udvostruče.",
      },
      {
        title: "Registar rizika",
        body: "Tri stvari koje najverovatnije mogu da potope projekat, i plan za svaku.",
      },
    ],
    guarantee:
      "Ako se sprint ne završi planom koji biste mogli da predate bilo kom developeru i da iz njega gradite, ne plaćate.",
  },
  guarantees: [
    {
      title: "Odgovor u roku od jednog radnog dana",
      body: "Svaki upit dobija lični odgovor u roku od jednog radnog dana — obično u roku od nekoliko sati, i uvek od osobe koja će raditi posao.",
    },
    {
      title: "Softver koji radi svake nedelje",
      body: "Demo pravog proizvoda svake nedelje izrade — na staging URL-u koji možete da otvorite, kliknete i podelite. Bez izveštaja o napretku u vidu slajdova.",
    },
    {
      title: "Vlasništvo nad svime",
      body: "Kod, infrastruktura, dokumentacija, nalozi — u potpunosti vaši po završnoj uplati, uz dokumentovanu primopredaju. Bez klauzula o povratnoj licenci, bez taoca u repozitorijumima.",
    },
    {
      title: "Prvi korak bez rizika",
      body: "Roadmap Sprint ima garanciju: ako se ne završi planom spremnim za izradu, ne plaćate. A prvi razgovor ne košta ništa.",
    },
  ],
};

const offerByLocale: Record<Locale, Offer> = { en: offerEn, sr: offerSr };

export function getOffer(lang: Locale): Offer {
  return offerByLocale[lang];
}
