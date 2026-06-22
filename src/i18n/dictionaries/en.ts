// English dictionary — the source of truth for all UI chrome, page copy,
// form labels, OG strings, and localized site copy. Every user-facing string
// lives here as a key. `sr.ts` mirrors this shape exactly.
// Long-form structured content (service/product/changelog/offer data) lives
// in the per-locale content files under src/content/.

const en = {
  site: {
    tagline: "Independent software studio",
    description:
      "Independent software studio shipping its own SaaS products and building custom applications and AI systems for clients worldwide.",
    availability: "One build at a time — booking Q3 2026",
    location: "Based in Serbia (CET) — working worldwide",
    copyright: "© 2026 noqyris — Independent software studio",
    techChips: "Next.js · Vercel",
    socialNotes: {
      x: "Daily build updates",
      github: "Open source & experiments",
      linkedin: "Client work & milestones",
      youtube: "Product demos & dev logs",
      instagram: "Behind the scenes",
      tiktok: "Short-form build clips",
      producthunt: "Launches",
    },
    socialAria: "{name} on {label}",
  },

  nav: {
    products: "Products",
    services: "Services",
    process: "Process",
    changelog: "Changelog",
    about: "About",
    startProject: "Start a project",
    contact: "Contact",
    rss: "RSS",
    main: "Main",
    mobile: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "noqyris — home",
  },

  meta: {
    titleDefault: "noqyris — Software Studio for SaaS, Custom Apps & AI",
    titleTemplate: "%s — noqyris",
    skipToContent: "Skip to content",
  },

  hero: {
    eyebrow: "Independent software, built in the open",
    h1: { pre: "Software built to be", em: "depended on", post: "." },
    body: "{name} builds custom applications and AI systems for clients worldwide — and you work directly with the engineer who designs, builds, and ships it.",
    ctaPrimary: "Start a project",
    ctaSecondary: "Explore services →",
    openDashboard: "All numbers live — the open dashboard →",
    scroll: "Scroll",
    stats: [
      { value: "{services}", label: "Services, one process" },
      { value: "2026", label: "Founded" },
      { value: "Remote", label: "Working worldwide" },
    ],
  },

  trustBar: {
    aria: "What you can count on",
    signals: [
      "Reply within 1 business day",
      "No hourly billing, no surprises",
      "Risk-free Roadmap Sprint",
      "You own 100% of the code",
    ],
  },

  fork: {
    aria: "Two ways to work together",
    users: {
      eyebrow: "Follow along",
      title: "Follow the build",
      body: "Everything gets shipped in public — the numbers, the log, the lessons.",
      link: "See the changelog",
    },
    clients: {
      eyebrow: "For clients",
      title: "Work with noqyris",
      body: "Custom applications, SaaS builds, and AI systems — scoped, shipped, supported.",
      link: "See services",
    },
  },

  productStrip: {
    aria: "Products",
    eyebrow: "Products",
    h1: { pre: "Building ", em: "&", post: " shipping." },
    all: "All products →",
  },

  serviceIndex: {
    aria: "Services",
    eyebrow: "Services",
    h1: { pre: "From idea to ", em: "production", post: "." },
  },

  proof: {
    aria: "Proof",
    eyebrow: "Proof",
    h1: { pre: "Proof, not ", em: "promises", post: "." },
    emptyIntro:
      "No client case studies yet — noqyris is new, and inventing them isn't an option. So instead of asking for your trust, here's everything you can verify yourself.",
    items: [
      {
        label: "No surprises",
        body: "The full engagement — scoped, run, and shipped — public start to finish.",
        href: "/process",
      },
      {
        label: "Open by default",
        body: "Live, honest numbers and a dated log of everything shipped — in public.",
        href: "/changelog",
      },
      {
        label: "Direct accountability",
        body: "You work straight with the engineer who scopes, builds, and ships it — no account managers, one name on the work.",
        href: "/about",
      },
    ],
    firstResultPre: "Want to be the first named result here? ",
    firstResultLink: "Claim an early slot →",
    mailtoSubject: "Early client slot — noqyris.com",
  },

  changelogTeaser: {
    aria: "Changelog",
    eyebrow: "Now",
    h1: { pre: "Building in ", em: "public", post: "." },
    full: "Full changelog →",
  },

  followBuild: {
    aria: "Follow the build",
    eyebrow: "Follow the build",
    intro:
      "Everything noqyris ships is built in public — products, numbers, lessons.",
    h1: { pre: "Follow the ", em: "build", post: "." },
    openEyebrow: "Watch it happen",
    openIntro: "The numbers above move in public. Follow along anywhere:",
    changelogEyebrow: "Follow along",
    changelogIntro:
      "Don't want to check back? Every entry here gets posted where you already scroll.",
  },

  marquee: {
    home: "Booking new projects — Let's build —",
    homeAria: "Booking new projects — Let's build — email the studio",
    services: "SaaS — Custom applications — AI systems —",
    servicesAria: "SaaS — Custom applications — AI systems — email the studio",
  },

  cta: {
    aria: "Contact",
    h1: { pre: "Have something to", em: "build", post: "?" },
    start: "Start a project →",
    founderLine:
      "You'll talk directly to the team that builds it. {promise}",
  },

  entryOfferCard: {
    eyebrow: "The first step — low-risk & guaranteed",
    book: "Book the sprint",
    bookAria: "Book the {name}",
  },

  productsPage: {
    metaTitle: "SaaS Products, Built in Public",
    metaDescription:
      "SaaS products designed, built, and operated by noqyris — developer tools, AI tools, and infrastructure, built in public.",
    eyebrow: "Products",
    h1: { pre: "What gets", em: "shipped", post: "." },
    lede: "Products designed, built, and run end-to-end by one developer. Some in beta, some in the lab — all built in public.",
    listAria: "Product list",
  },

  productDetail: {
    featuresAria: "Features",
    whatItDoes: "What it does",
    comingSoon: "Coming soon",
    viewProduct: "View product →",
    visit: "Visit {name} →",
    bridgeAria: "Bridge",
    bridgePre: "Want something like this built for your business? ",
    bridgeLink: "Work with noqyris",
    bridgePost: ".",
    altScreenshot: "{name} screenshot",
  },

  servicesPage: {
    metaTitle: "Software Development Services",
    metaDescription:
      "SaaS development, custom applications, and AI solutions — scoped, shipped, and supported by an independent software studio.",
    eyebrow: "Services",
    h1: { pre: "What gets", em: "built", post: "for clients." },
    lede: "Independent software development that ships its own products — and applies the same standard to yours. Three services, one process, one team accountable.",
    listAria: "Service list",
    learnMore: "Learn more",
    startSmallAria: "The first step",
    startSmallEyebrow: "Not sure where to start?",
    startSmallH1: { pre: "Start ", em: "small", post: "." },
    processAria: "Process",
    processEyebrow: "How it works",
    processH1: { pre: "One process, every ", em: "build", post: "." },
    ownProductsPre: "The same process runs on noqyris's own products — ",
    ownProductsLink: "see what ships here",
    ownProductsPost: ".",
    sharedProcess: [
      {
        name: "Scope",
        body: "A short discovery sprint ends with a written spec, a fixed scope, and a price — before any code.",
      },
      {
        name: "Prototype",
        body: "A working slice of the core flow within the first two weeks, tested against the real problem.",
      },
      {
        name: "Ship",
        body: "Production build with infrastructure you own outright — deployed, monitored, documented.",
      },
      {
        name: "Support",
        body: "A defined support window after launch, then iterate per release or hand over cleanly.",
      },
    ],
  },

  serviceDetail: {
    eyebrow: "Service — 0{n}",
    whoForAria: "Who this is for",
    whoFor: "Who this is for",
    whatYouGetAria: "What you get",
    whatYouGet: "What you get",
    whatYouGetH1: { pre: "The work, ", em: "itemized", post: "." },
    processAria: "Process",
    process: "Process",
    processMorePre: "The full engagement — timelines, guarantees, handover — is public: ",
    processMoreLink: "read how an engagement works",
    processMorePost: ".",
    pricingAria: "Pricing",
    pricing: "Pricing",
    pricingH1: { pre: "Scoped, owned, ", em: "guaranteed", post: "." },
    faqAria: "Frequently asked questions",
    faq: "FAQ",
    moreAria: "More",
    moreProductsPre: "See what ships here — ",
    moreProductsLink: "browse the products",
    moreProductsPost: ".",
    start: "Start a project",
  },

  processPage: {
    metaTitle: "How an Engagement Works",
    metaDescription:
      "The noqyris process end to end: a reply within one business day, a low-risk Roadmap Sprint, weekly working-software demos, and a handover you own outright.",
    eyebrow: "Process",
    h1: { pre: "No surprises, by ", em: "design", post: "." },
    hero: "Hiring a studio you found on the internet is a trust exercise — so here is the entire engagement, end to end, before you spend a cent: what happens, when, what it costs, and what you can hold us to at every step.",
    start: "Start a project",
    timelineAria: "Engagement timeline",
    timelineEyebrow: "The engagement, end to end",
    phases: [
      {
        stage: "Day 0",
        name: "Your message",
        body: "You write — through the project form or plain email. You get a personal reply within one business day with an honest read: what we'd build, roughly what it costs, and whether we're the right fit at all. If not, we'll say so and suggest who is.",
      },
      {
        stage: "Day 1–3",
        name: "Scoping call or written review",
        body: "A free 30-minute call (or async, if you prefer writing) to dig into the problem: who has it, what you've tried, what \"done\" looks like. No pitch deck, no account manager — just the engineer you'd be working with, asking real questions.",
      },
      {
        stage: "Week 1",
        name: "{offer} — {length}",
        body: "{description} You leave with a written spec, an architecture plan, a clear quote, and a risk register. {guarantee}",
      },
      {
        stage: "Build weeks",
        name: "Working software, every week",
        body: "The build runs in weekly cycles. Every week ends with a demo of the real product on a staging URL you can open and share — never a status report. You see scope, budget, and progress in plain sight the whole way; questions get same-day answers.",
      },
      {
        stage: "Launch",
        name: "Ship & handover",
        body: "Production deployment, monitoring, documentation, and a recorded walkthrough. Everything — code, infrastructure, accounts — transfers to you completely on final payment. A 30-day fix window is included in every build.",
      },
      {
        stage: "After",
        name: "Iterate or walk away clean",
        body: "Continue per-release as real users show what's next, move to an in-house team with a documented handover, or both. There is no retainer you're locked into and no dependency by design.",
      },
    ],
    guaranteesAria: "Guarantees",
    guaranteesEyebrow: "What you can hold us to",
    guaranteesH1: { pre: "Guaranteed, in ", em: "writing", post: "." },
    pricingPre: "Every build is scoped and quoted in the Roadmap Sprint — see ",
    pricingSep: ", ",
    pricingLastSep: ", and ",
    pricingPost: ". ",
    whoAria: "Who you work with",
    whoEyebrow: "Who you work with",
    founderNote:
      "End to end, the engineer who scopes your project is the one who builds, ships, and answers for it. Nothing gets lost between departments, because there are none.",
  },

  startPage: {
    metaTitle: "Start a Project — SaaS, Apps & AI",
    metaDescription:
      "Tell noqyris what you're building — SaaS, custom application, or AI solution — and get a personal reply within one business day.",
    eyebrow: "Start a project",
    h1: { pre: "Tell us what you're ", em: "building", post: "." },
    briefAria: "Project brief",
    founderNote:
      "Your email reaches the team directly, not a CRM. We design, build, and ship every project ourselves — what you read here is who you work with.",
    whatNext: "What happens next",
    steps: [
      {
        name: "You write",
        body: "The form below builds a short brief and opens it in your own mail app. Two minutes, no account, nothing stored here.",
      },
      {
        name: "We reply — within a day",
        body: "A personal answer within one business day, usually within hours: an honest read on fit, rough shape, and the right next step. If we're not the right fit, we'll say so and point you somewhere better.",
      },
      {
        name: "We scope it",
        body: "A free 30-minute call or a written review — then, if it makes sense, the {offer}: a focused {length}, ending in a build-ready plan and a clear quote.",
      },
    ],
    plainEmailPre: "Prefer plain email? Write to ",
    plainEmailMid: " — same team, same promise. Want the full picture first? Read ",
    plainEmailLink: "how an engagement works",
    plainEmailPost: ".",
  },

  // Live open-startup numbers, rendered at the top of /changelog (the /open
  // page was folded in). Only these keys are consumed by ChangelogView.
  openPage: {
    metricsAria: "Studio metrics",
    numbers: "The numbers",
    stats: [
      { value: "{services}", label: "Services offered" },
      { value: "{changelog}", label: "Changelog entries shipped" },
      { value: "2026", label: "Building in public since" },
    ],
    mrrLabel: "Monthly recurring revenue",
    mrrNote:
      "This number is real, and it stays real. It gets published from the first dollar — the climb is the whole point of building in public.",
  },

  aboutPage: {
    metaTitle: "About — Independent Software Studio",
    metaDescription:
      "The story, principles, and standards behind noqyris — an independent software studio shipping its own SaaS products and building custom apps and AI systems for clients.",
    eyebrow: "About",
    h1: { pre: "One studio, one ", em: "standard", post: "." },
    lead: "{name} is an independent software studio that ships its own SaaS products under its own name and builds custom applications and AI systems for clients worldwide.",
    para2:
      "Products and client work are one practice. The tooling, infrastructure, and judgment sharpened by running real products go straight into client projects — and client problems keep the products honest.",
    howWeWork: "How it works",
    principles: [
      {
        title: "Ship, then polish",
        body: "Working software in front of real users beats a perfect plan. Every project — noqyris's own or a client's — gets something real into production early.",
      },
      {
        title: "Own what you build",
        body: "Clients own their code, infrastructure, and data outright. Products respect the same rule: full export, honest pricing, no lock-in.",
      },
      {
        title: "Build in public",
        body: "Progress, numbers, and lessons get shared as they happen. It keeps the studio honest and the work visible.",
      },
    ],
    stackLinks: "Stack & links",
    stackChips: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Postgres",
      "Claude & GPT APIs",
      "Vercel",
      "AWS",
    ],
    curiousPre: "Curious what the studio ships? ",
    curiousProducts: "Browse the products",
    curiousMid: " or ",
    curiousChangelog: "follow the changelog",
    curiousPost: ".",
  },

  changelogPage: {
    metaTitle: "Changelog — Building in Public",
    metaDescription:
      "Everything noqyris ships, in public — product releases, studio updates, live numbers, and site changes, newest first. Built in the open since 2026.",
    eyebrow: "Changelog",
    h1: { pre: "Building in ", em: "public", post: "." },
    hero: "Everything the studio ships — product releases, studio updates, and site changes. Real history only, newest first.",
    rss: "Subscribe via RSS",
    entriesAria: "Changelog entries",
    followEyebrow: "Follow along",
    followIntro:
      "Every release here also goes out on the channels below — follow once, never miss one.",
  },

  notFound: {
    h1: { pre: "Nothing ", em: "here", post: "." },
    body: "The page moved, never existed, or is still being built in public.",
    backHome: "Back home",
  },

  form: {
    name: "Your name",
    email: "Your email",
    company: "Company",
    optional: "optional",
    building: "What are you building?",
    budget: "Budget",
    budgetHint: "a real range helps us scope it right",
    timeline: "Timeline",
    description: "What should exist that doesn't yet?",
    descriptionHint: "a few sentences is plenty (max {max} characters)",
    namePlaceholder: "Ada Lovelace",
    emailPlaceholder: "ada@example.com",
    companyPlaceholder: "Analytical Engines Ltd",
    descriptionPlaceholder:
      "The problem, who has it, and what you've tried so far. Links welcome.",
    typeOptions: [
      "SaaS product",
      "Custom application",
      "AI solution",
      "Roadmap Sprint",
      "Not sure yet",
    ],
    budgetOptions: [
      "Under $5,000",
      "$5,000 – $15,000",
      "$15,000 – $40,000",
      "$40,000+",
      "Not sure yet",
    ],
    timelineOptions: ["As soon as possible", "Within 1–3 months", "Flexible"],
    send: "Send the brief",
    sending: "Sending…",
    sent: "Thanks — your brief is in. We'll reply within one business day.",
    error: "That didn't send. Copy the brief above, or write straight to",
    copyInstead: "Copy the brief instead",
    copied: "Copied",
    sentHint:
      "Your mail app should open with the brief ready to send. If nothing happened, copy it above or write straight to",
    footerHelper:
      "Your brief comes straight to our inbox — nothing else is stored. ",
    briefName: "Name",
    briefCompany: "Company",
    briefLooking: "Looking for",
    briefBudget: "Budget",
    briefTimeline: "Timeline",
    briefAbout: "About the project:",
    briefEmpty: "—",
    briefTo: "To",
    briefSubject: "Subject",
    mailtoSubject: "Project inquiry",
  },

  badge: {
    status: { live: "Live", beta: "Beta", building: "Building" },
    tag: { product: "product", studio: "studio", site: "site" },
  },

  copyEmail: {
    copied: "Copied — talk soon.",
    aria: "Copy email address {email}",
    srCopied: "Email address copied",
  },

  contactSubject: "Project inquiry — noqyris.com",

  og: {
    home: {
      alt: "noqyris — Software Studio for SaaS, Custom Apps & AI",
      title: "SaaS products, custom apps & AI —",
      em: "shipping.",
      subtitle: "Independent software, built in the open",
    },
    products: {
      alt: "Products by noqyris",
      title: "What gets",
      em: "shipped.",
      subtitle: "SaaS products, built in public",
    },
    services: {
      alt: "Software development services by noqyris",
      title: "What gets",
      em: "built",
      subtitle: "SaaS · Custom applications · AI solutions",
    },
    process: {
      alt: "How an engagement with noqyris works",
      title: "No surprises, by",
      em: "design.",
      subtitle: "The process, pricing & guarantees — public",
    },
    start: {
      alt: "Start a project with noqyris",
      title: "Tell us what you're",
      em: "building.",
      subtitle: "A reply within one business day",
    },
    changelog: {
      alt: "noqyris changelog — building in public",
      title: "Building in",
      em: "public.",
      subtitle: "The noqyris changelog",
    },
    about: {
      alt: "About noqyris, an independent software studio",
      title: "One studio, one",
      em: "standard.",
      subtitle: "About noqyris",
    },
    serviceFallback: "Services",
    serviceSubtitle: "Software development services",
    productFallback: "Products",
  },

  feed: {
    channelDescription:
      "Everything noqyris ships, in public: product releases, studio updates, and site changes.",
  },
};

export default en;
