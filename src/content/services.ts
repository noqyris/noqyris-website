import type { Service } from "./types";
import type { Locale } from "@/i18n/config";

// Real copy, not placeholder — edit freely. Components render whatever is
// here; adding a fourth service is one more object + nothing else.
const servicesEn: Service[] = [
  {
    slug: "saas-development",
    name: "SaaS development",
    h1: { pre: "SaaS development, from idea to", em: "launch", post: "." },
    summary:
      "Product scoping, MVP build, launch, and iteration — by a studio that ships its own SaaS.",
    lede: "End-to-end SaaS development services for founders who need a product, not a slide deck. noqyris designs, builds, and launches SaaS products as a daily practice — the same process that powers the studio's own products is what you hire.",
    audience: [
      "Founders with a validated idea who need a real MVP in weeks",
      "Companies spinning out an internal tool into a sellable product",
      "Early-stage teams whose prototype needs to become production software",
    ],
    deliverables: [
      {
        title: "Product scoping & architecture",
        body: "A cut-to-the-bone v1 scope, a data model that won't need rewriting at 1,000 users, and an honest estimate before any code is written.",
      },
      {
        title: "Full-stack build",
        body: "Auth, billing, dashboards, admin, emails — the unglamorous 80% of every SaaS, done right the first time.",
      },
      {
        title: "Launch infrastructure",
        body: "CI/CD, monitoring, error tracking, and a deployment setup a one-person company can actually operate.",
      },
      {
        title: "Post-launch iteration",
        body: "Analytics-informed releases after real users arrive, shipped week by week.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Stripe", "Vercel", "AWS"],
    process: [
      {
        name: "Scope",
        body: "The Roadmap Sprint ends with a written spec, a fixed scope for v1, and a price. No open-ended retainers.",
      },
      {
        name: "Prototype",
        body: "A clickable build of the core flow within the first two weeks — we validate the product before finishing it.",
      },
      {
        name: "Ship",
        body: "Production build with billing, auth, and infrastructure. You launch with software you own outright.",
      },
      {
        name: "Support",
        body: "A 30-day fix window after launch, then iterate per release or hand over cleanly — your call.",
      },
    ],
    faqs: [
      {
        question: "How is pricing structured?",
        answer:
          "One quote per scoped milestone. The Roadmap Sprint produces a written spec and a quote; you approve both before the build starts. No hourly billing, no surprise invoices.",
      },
      {
        question: "How long does an MVP take?",
        answer:
          "Most v1 builds ship in 4–8 weeks depending on scope. The Roadmap Sprint gives you a concrete date, and the weekly staging demos show you exactly where things stand.",
      },
      {
        question: "Who owns the code and IP?",
        answer:
          "You do, fully, on final payment — the repository, the infrastructure, and everything in them. No licenses back to the studio, no strings.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every build includes a 30-day fix window. After that you can continue per-release iteration, move to an in-house team with a documented handover, or both.",
      },
    ],
    // EDIT: set your real prices — published, honest, defensible.
    pricing: {
      from: "Scoped in the Sprint",
      timeline: "4–8 weeks to launch",
      note: "Scoped and quoted in the Roadmap Sprint — no hourly billing, no surprise invoices.",
    },
    seo: {
      title: "SaaS Development Services",
      description:
        "End-to-end SaaS development services: product scoping, MVP build, launch, and iteration — by a studio that ships its own SaaS.",
    },
  },
  {
    slug: "custom-applications",
    name: "Custom applications",
    h1: { pre: "Custom applications, built", em: "to spec", post: "." },
    summary:
      "Custom application development for businesses that have outgrown off-the-shelf software.",
    lede: "Custom application development for companies that have outgrown spreadsheets, no-code stacks, and off-the-shelf tools that almost fit. noqyris builds web applications, internal tools, and integrations shaped around how your business actually runs.",
    audience: [
      "Businesses running critical operations on spreadsheets or aging internal tools",
      "Teams gluing together five SaaS subscriptions that refuse to talk to each other",
      "Companies whose no-code solution just hit its ceiling",
    ],
    deliverables: [
      {
        title: "Internal tools & dashboards",
        body: "Operations consoles, approval flows, and reporting your team actually wants to open every morning.",
      },
      {
        title: "Customer-facing web apps",
        body: "Portals, booking systems, and client dashboards — fast, secure, and on-brand.",
      },
      {
        title: "Integrations & automation",
        body: "Your CRM, billing, and warehouse systems talking to each other without a human re-typing data between them.",
      },
      {
        title: "Legacy replacement",
        body: "A measured migration off the system nobody dares to touch — without stopping the business to do it.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Node.js", "REST/GraphQL"],
    process: [
      {
        name: "Scope",
        body: "We map the real workflow first — including the parts that live in someone's head — then spec the smallest system that removes the pain.",
      },
      {
        name: "Prototype",
        body: "A working slice of the core workflow early, tested with the people who will use it daily.",
      },
      {
        name: "Ship",
        body: "Production rollout in stages, with data migrated and the old system retired only when the new one has earned it.",
      },
      {
        name: "Support",
        body: "Documentation, training, and a support window — then the system is yours, with no forced dependency on the studio.",
      },
    ],
    faqs: [
      {
        question: "How is pricing structured?",
        answer:
          "Quoted per milestone, set after the Roadmap Sprint produces the spec. You know the full cost before committing to the build.",
      },
      {
        question: "What's a typical timeline?",
        answer:
          "Internal tools commonly ship in 3–6 weeks; larger systems are staged so something useful is in production within the first month.",
      },
      {
        question: "Who owns the code and IP?",
        answer:
          "You do — full ownership of source, infrastructure, and documentation on final payment.",
      },
      {
        question: "Can you work with our existing systems?",
        answer:
          "Yes. Most custom builds integrate with what you already run — accounting, CRM, ERP, or that one legacy database — rather than replacing everything at once.",
      },
    ],
    pricing: {
      from: "Scoped in the Sprint",
      timeline: "3–6 weeks for most tools",
      note: "Scoped and quoted in the Roadmap Sprint — you know the full cost before any build starts.",
    },
    seo: {
      title: "Custom Application Development",
      description:
        "Custom application development for businesses that have outgrown off-the-shelf software — web apps, internal tools, integrations.",
    },
  },
  {
    slug: "ai-solutions",
    name: "AI solutions",
    h1: { pre: "AI development that", em: "works", post: " in production." },
    summary:
      "LLM-powered applications, AI integrations, and automation that hold up in production.",
    lede: "AI development services for companies that want working software instead of a proof of concept that dies in a notebook. noqyris builds LLM-powered features, retrieval pipelines, and AI automation that ship inside real products — with the evaluation and guardrails production demands.",
    audience: [
      "Product teams adding AI features customers will actually pay for",
      "Operations teams drowning in manual document, email, or data processing",
      "Companies that tried a chatbot wrapper and need something deeper",
    ],
    deliverables: [
      {
        title: "LLM-powered features",
        body: "Summarization, extraction, generation, and copilot features built into your product with proper evaluation behind them.",
      },
      {
        title: "Retrieval & knowledge systems",
        body: "RAG pipelines over your documents and data, so answers stay grounded in your own knowledge.",
      },
      {
        title: "AI automation",
        body: "Agents and pipelines that process documents, triage inboxes, and handle the repetitive work your team shouldn't do by hand.",
      },
      {
        title: "Production hardening",
        body: "Evals, monitoring, cost controls, and fallbacks — the difference between a demo and a system you can put in front of customers.",
      },
    ],
    stack: ["Claude & GPT APIs", "RAG pipelines", "Vector DBs", "Next.js", "Python"],
    process: [
      {
        name: "Scope",
        body: "We identify where AI genuinely beats conventional code in your workflow — and say so plainly where it doesn't.",
      },
      {
        name: "Prototype",
        body: "A working pilot on your real data within weeks, with honest accuracy numbers attached.",
      },
      {
        name: "Ship",
        body: "Production integration with evaluation suites, monitoring, and cost ceilings built in from day one.",
      },
      {
        name: "Support",
        body: "Model updates, eval reruns, and tuning as providers evolve — offered per release, never as a forced retainer.",
      },
    ],
    faqs: [
      {
        question: "How is pricing structured?",
        answer:
          "After the Roadmap Sprint, a scoped pilot on your real data comes before any larger commitment — measurable results first. Production builds are then quoted per milestone like any other build.",
      },
      {
        question: "How do you keep our data safe?",
        answer:
          "Your data stays in your infrastructure wherever possible, provider data retention is turned off, and every pilot starts with a written data-handling agreement.",
      },
      {
        question: "Which models do you work with?",
        answer:
          "Provider-agnostic: Claude, GPT, and open-weight models — chosen per task on quality, latency, and cost, with fallbacks so you're never locked to one vendor.",
      },
      {
        question: "What if AI is the wrong tool for our problem?",
        answer:
          "Then you'll hear that in the first call. A scoped automation or a plain application is often cheaper and more reliable — and building the right thing is the whole point.",
      },
    ],
    pricing: {
      from: "Starts with a pilot",
      timeline: "2–4 weeks to a working pilot",
      note: "Every AI build starts with a pilot on your real data, scoped in the Roadmap Sprint, with measured accuracy numbers attached. Production builds are quoted per milestone after that.",
    },
    seo: {
      title: "AI Development & Integration Services",
      description:
        "AI development services: LLM-powered applications, AI integrations, and automation built into real products — not demos.",
    },
  },
];

// Serbian services — translated by the i18n pass.
const servicesSr: Service[] = [
  {
    slug: "saas-development",
    name: "Razvoj SaaS-a",
    h1: { pre: "Razvoj SaaS-a, od ideje do", em: "lansiranja", post: "." },
    summary:
      "Definisanje proizvoda, izrada MVP-a, lansiranje i iteracija — od studija koji isporučuje sopstveni SaaS.",
    lede: "Kompletne usluge razvoja SaaS-a za osnivače kojima treba proizvod, a ne prezentacija. noqyris svakodnevno dizajnira, gradi i lansira SaaS proizvode — isti proces koji pokreće sopstvene proizvode studija je ono što angažujete.",
    audience: [
      "Osnivači sa validiranom idejom kojima treba pravi MVP za nekoliko nedelja",
      "Kompanije koje interni alat pretvaraju u proizvod koji se prodaje",
      "Timovi u ranoj fazi čiji prototip treba da postane produkcioni softver",
    ],
    deliverables: [
      {
        title: "Definisanje proizvoda i arhitektura",
        body: "Do kosti svedeni obim v1, model podataka koji neće morati da se prepisuje na 1.000 korisnika i poštena procena pre nego što se napiše ijedna linija koda.",
      },
      {
        title: "Full-stack izrada",
        body: "Autentifikacija, naplata, kontrolne table, admin, mejlovi — neglamuroznih 80% svakog SaaS-a, urađeno kako treba iz prve.",
      },
      {
        title: "Infrastruktura za lansiranje",
        body: "CI/CD, monitoring, praćenje grešaka i deployment postavka kojom jednočlana kompanija zaista može da upravlja.",
      },
      {
        title: "Iteracija nakon lansiranja",
        body: "Izdanja vođena analitikom nakon dolaska pravih korisnika, isporučivana iz nedelje u nedelju.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Stripe", "Vercel", "AWS"],
    process: [
      {
        name: "Obim",
        body: "Roadmap Sprint se završava pisanom specifikacijom, fiksnim obimom za v1 i cenom. Bez otvorenih ugovora na neodređeno.",
      },
      {
        name: "Prototip",
        body: "Klikabilna verzija ključnog toka u prve dve nedelje — proizvod validiramo pre nego što ga završimo.",
      },
      {
        name: "Isporuka",
        body: "Produkciona izrada sa naplatom, autentifikacijom i infrastrukturom. Lansirate sa softverom koji u potpunosti posedujete.",
      },
      {
        name: "Podrška",
        body: "Period od 30 dana za ispravke nakon lansiranja, zatim iteracija po izdanju ili čista primopredaja — vi odlučujete.",
      },
    ],
    faqs: [
      {
        question: "Kako je strukturirana cena?",
        answer:
          "Jedna ponuda po definisanoj prekretnici. Roadmap Sprint daje pisanu specifikaciju i ponudu; obe odobravate pre nego što izrada počne. Bez naplate po satu, bez iznenadnih računa.",
      },
      {
        question: "Koliko traje izrada MVP-a?",
        answer:
          "Većina v1 izrada se isporučuje za 4–8 nedelja u zavisnosti od obima. Roadmap Sprint vam daje konkretan datum, a nedeljne staging demonstracije vam tačno pokazuju gde se stvari nalaze.",
      },
      {
        question: "Ko ima vlasništvo nad kodom i IP-jem?",
        answer:
          "Vi, u potpunosti, nakon finalne uplate — repozitorijum, infrastruktura i sve u njima. Bez licenci nazad studiju, bez ikakvih uslova.",
      },
      {
        question: "Šta se dešava nakon lansiranja?",
        answer:
          "Svaka izrada uključuje period od 30 dana za ispravke. Nakon toga možete nastaviti iteraciju po izdanju, preći na interni tim uz dokumentovanu primopredaju, ili oboje.",
      },
    ],
    pricing: {
      from: "Definiše se u Sprintu",
      timeline: "4–8 nedelja do lansiranja",
      note: "Definisano i ponuđeno u Roadmap Sprintu — bez naplate po satu, bez iznenađenja na računu.",
    },
    seo: {
      title: "Usluge razvoja SaaS-a",
      description:
        "Kompletne usluge razvoja SaaS-a: definisanje proizvoda, izrada MVP-a, lansiranje i iteracija — od studija koji isporučuje sopstveni SaaS.",
    },
  },
  {
    slug: "custom-applications",
    name: "Aplikacije po meri",
    h1: { pre: "Aplikacije po meri, izrađene", em: "po specifikaciji", post: "." },
    summary:
      "Razvoj aplikacija po meri za firme koje su prerasle gotov softver.",
    lede: "Razvoj aplikacija po meri za kompanije koje su prerasle tabele, no-code rešenja i gotove alate koji skoro da odgovaraju. noqyris gradi veb aplikacije, interne alate i integracije oblikovane oko toga kako vaš posao zaista funkcioniše.",
    audience: [
      "Firme koje kritične operacije vode na tabelama ili zastarelim internim alatima",
      "Timovi koji lepe pet SaaS pretplata koje odbijaju da komuniciraju međusobno",
      "Kompanije čije je no-code rešenje upravo dostiglo svoj plafon",
    ],
    deliverables: [
      {
        title: "Interni alati i kontrolne table",
        body: "Operativne konzole, tokovi odobravanja i izveštavanje koje vaš tim zaista želi da otvori svako jutro.",
      },
      {
        title: "Veb aplikacije okrenute korisnicima",
        body: "Portali, sistemi za rezervacije i klijentske kontrolne table — brze, sigurne i u skladu sa brendom.",
      },
      {
        title: "Integracije i automatizacija",
        body: "Vaš CRM, naplata i magacinski sistemi koji komuniciraju međusobno, bez čoveka koji ponovo unosi podatke između njih.",
      },
      {
        title: "Zamena nasleđenih sistema",
        body: "Odmerena migracija sa sistema koji niko ne sme da dirne — bez zaustavljanja posla da bi se to uradilo.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Node.js", "REST/GraphQL"],
    process: [
      {
        name: "Obim",
        body: "Prvo mapiramo stvarni tok rada — uključujući i delove koji žive u nečijoj glavi — pa onda specifikujemo najmanji sistem koji rešava problem.",
      },
      {
        name: "Prototip",
        body: "Funkcionalni isečak ključnog toka rada rano, testiran sa ljudima koji će ga svakodnevno koristiti.",
      },
      {
        name: "Isporuka",
        body: "Produkciono uvođenje u fazama, sa migriranim podacima i starim sistemom koji se penzioniše tek kada novi to zasluži.",
      },
      {
        name: "Podrška",
        body: "Dokumentacija, obuka i period podrške — zatim je sistem vaš, bez prisilne zavisnosti od studija.",
      },
    ],
    faqs: [
      {
        question: "Kako je strukturirana cena?",
        answer:
          "Ponuda po prekretnici, određena nakon što Roadmap Sprint da specifikaciju. Znate punu cenu pre nego što se obavežete na izradu.",
      },
      {
        question: "Koji je tipičan vremenski okvir?",
        answer:
          "Interni alati se obično isporučuju za 3–6 nedelja; veći sistemi se faziraju tako da nešto korisno bude u produkciji već u prvom mesecu.",
      },
      {
        question: "Ko ima vlasništvo nad kodom i IP-jem?",
        answer:
          "Vi — potpuno vlasništvo nad izvornim kodom, infrastrukturom i dokumentacijom nakon finalne uplate.",
      },
      {
        question: "Možete li raditi sa našim postojećim sistemima?",
        answer:
          "Da. Većina izrada po meri se integriše sa onim što već koristite — računovodstvo, CRM, ERP ili ona jedna nasleđena baza — umesto da se sve zamenjuje odjednom.",
      },
    ],
    pricing: {
      from: "Definiše se u Sprintu",
      timeline: "3–6 nedelja za većinu alata",
      note: "Definisano i ponuđeno u Roadmap Sprintu — pun trošak znate pre nego što izrada počne.",
    },
    seo: {
      title: "Razvoj aplikacija po meri",
      description:
        "Razvoj aplikacija po meri za firme koje su prerasle gotov softver — veb aplikacije, interni alati, integracije.",
    },
  },
  {
    slug: "ai-solutions",
    name: "AI rešenja",
    h1: { pre: "AI razvoj koji", em: "radi", post: " u produkciji." },
    summary:
      "Aplikacije pokretane LLM-om, AI integracije i automatizacija koji opstaju u produkciji.",
    lede: "Usluge AI razvoja za kompanije koje žele softver koji radi, a ne proof of concept koji umire u notebook-u. noqyris gradi funkcije pokretane LLM-om, retrieval pipeline-ove i AI automatizaciju koji se isporučuju unutar pravih proizvoda — sa evaluacijom i zaštitnim mehanizmima koje produkcija zahteva.",
    audience: [
      "Timovi za proizvode koji dodaju AI funkcije koje će korisnici zaista platiti",
      "Operativni timovi koji se dave u ručnoj obradi dokumenata, mejlova ili podataka",
      "Kompanije koje su probale chatbot omotač i kojima treba nešto dublje",
    ],
    deliverables: [
      {
        title: "Funkcije pokretane LLM-om",
        body: "Sažimanje, ekstrakcija, generisanje i copilot funkcije ugrađene u vaš proizvod sa pravom evaluacijom iza njih.",
      },
      {
        title: "Retrieval i sistemi znanja",
        body: "RAG pipeline-ovi nad vašim dokumentima i podacima, tako da odgovori ostaju utemeljeni u vašem sopstvenom znanju.",
      },
      {
        title: "AI automatizacija",
        body: "Agenti i pipeline-ovi koji obrađuju dokumente, sortiraju sandučiće i obavljaju repetitivni posao koji vaš tim ne bi trebalo da radi ručno.",
      },
      {
        title: "Priprema za produkciju",
        body: "Evaluacije, monitoring, kontrola troškova i rezervni mehanizmi — razlika između demonstracije i sistema koji možete staviti pred korisnike.",
      },
    ],
    stack: ["Claude & GPT APIs", "RAG pipelines", "Vector DBs", "Next.js", "Python"],
    process: [
      {
        name: "Obim",
        body: "Identifikujemo gde AI istinski nadmašuje konvencionalni kod u vašem toku rada — i jasno to kažemo tamo gde nije tako.",
      },
      {
        name: "Prototip",
        body: "Funkcionalni pilot na vašim pravim podacima za nekoliko nedelja, sa poštenim brojkama o tačnosti.",
      },
      {
        name: "Isporuka",
        body: "Produkciona integracija sa evaluacionim paketima, monitoringom i gornjim granicama troškova ugrađenim od prvog dana.",
      },
      {
        name: "Podrška",
        body: "Ažuriranja modela, ponovna pokretanja evaluacija i podešavanje kako provajderi evoluiraju — nuđeno po izdanju, nikada kao prisilni ugovor.",
      },
    ],
    faqs: [
      {
        question: "Kako je strukturirana cena?",
        answer:
          "Nakon Roadmap Sprinta, definisan pilot na vašim pravim podacima dolazi pre svake veće obaveze — prvo merljivi rezultati. Produkcione izrade se zatim cene po prekretnici kao i svaka druga izrada.",
      },
      {
        question: "Kako čuvate naše podatke bezbednim?",
        answer:
          "Vaši podaci ostaju u vašoj infrastrukturi gde god je to moguće, čuvanje podataka kod provajdera je isključeno, a svaki pilot počinje pisanim sporazumom o rukovanju podacima.",
      },
      {
        question: "Sa kojim modelima radite?",
        answer:
          "Nezavisno od provajdera: Claude, GPT i modeli otvorenih težina — birani po zadatku na osnovu kvaliteta, latencije i cene, sa rezervnim mehanizmima tako da nikada niste vezani za jednog dobavljača.",
      },
      {
        question: "Šta ako je AI pogrešan alat za naš problem?",
        answer:
          "Onda ćete to čuti već na prvom pozivu. Definisana automatizacija ili obična aplikacija je često jeftinija i pouzdanija — a izgradnja prave stvari je čitava poenta.",
      },
    ],
    pricing: {
      from: "Počinje pilotom",
      timeline: "2–4 nedelje do funkcionalnog pilota",
      note: "Svaka AI izrada počinje pilotom na vašim pravim podacima, definisanim u Roadmap Sprintu, sa izmerenim brojkama o tačnosti. Produkcione izrade se zatim cene po prekretnici.",
    },
    seo: {
      title: "Usluge AI razvoja i integracije",
      description:
        "Usluge AI razvoja: aplikacije pokretane LLM-om, AI integracije i automatizacija ugrađeni u prave proizvode — ne demonstracije.",
    },
  },
];

const servicesByLocale: Record<Locale, Service[]> = {
  en: servicesEn,
  sr: servicesSr,
};

export function getServices(lang: Locale): Service[] {
  return servicesByLocale[lang];
}

export function getService(lang: Locale, slug: string): Service | undefined {
  return servicesByLocale[lang].find((s) => s.slug === slug);
}

/** Slugs are locale-invariant — used by generateStaticParams + sitemap. */
export const serviceSlugs = servicesEn.map((s) => s.slug);
