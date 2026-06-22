// Serbian dictionary (sr-Latn) — mirrors the shape of en.ts exactly.
// Only string values are translated; every key, array length, order,
// placeholder, and serif-em split is preserved.

const sr = {
  site: {
    tagline: "Nezavisni softverski studio",
    description:
      "Nezavisni softverski studio koji isporučuje sopstvene SaaS proizvode i gradi aplikacije po meri i AI sisteme za klijente širom sveta.",
    availability: "Jedan projekat u jednom trenutku — zakazujem za Q3 2026",
    location: "Sa sedištem u Srbiji (CET) — radim širom sveta",
    copyright: "© 2026 noqyris — Nezavisni softverski studio",
    techChips: "Next.js · Vercel",
    socialNotes: {
      x: "Dnevne novosti o gradnji",
      github: "Open source i eksperimenti",
      linkedin: "Rad sa klijentima i prekretnice",
      youtube: "Demonstracije proizvoda i dev logovi",
      instagram: "Iza kulisa",
      tiktok: "Kratki klipovi o gradnji",
      producthunt: "Lansiranja",
    },
    socialAria: "{name} na {label}",
  },

  nav: {
    products: "Proizvodi",
    services: "Usluge",
    process: "Proces",
    changelog: "Changelog",
    about: "O studiju",
    startProject: "Pokreni projekat",
    contact: "Kontakt",
    rss: "RSS",
    main: "Glavno",
    mobile: "Mobilno",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    home: "noqyris — početna",
  },

  meta: {
    titleDefault: "noqyris — Softverski studio za SaaS, aplikacije po meri i AI",
    titleTemplate: "%s — noqyris",
    skipToContent: "Pređi na sadržaj",
  },

  hero: {
    eyebrow: "Nezavisni softver, građen u javnosti",
    h1: { pre: "Softver na koji možete da se", em: "oslonite", post: "." },
    body: "{name} gradi aplikacije po meri i AI sisteme za klijente širom sveta — a vi sarađujete direktno sa inženjerom koji ga osmišljava, gradi i isporučuje.",
    ctaPrimary: "Pokreni projekat",
    ctaSecondary: "Istraži usluge →",
    openDashboard: "Svi brojevi uživo — otvorena kontrolna tabla →",
    scroll: "Skroluj",
    stats: [
      { value: "{services}", label: "Usluge, jedan proces" },
      { value: "2026", label: "Osnovano" },
      { value: "Remote", label: "Radim širom sveta" },
    ],
  },

  trustBar: {
    aria: "Na šta možete da računate",
    signals: [
      "Odgovor u roku od 1 radnog dana",
      "Bez naplate po satu, bez iznenađenja",
      "Roadmap Sprint bez rizika",
      "Vlasništvo nad 100% koda",
    ],
  },

  fork: {
    aria: "Dva načina za saradnju",
    users: {
      eyebrow: "Prati uz nas",
      title: "Prati gradnju",
      body: "Sve se gradi u javnosti — brojevi, dnevnik, lekcije.",
      link: "Pogledaj changelog",
    },
    clients: {
      eyebrow: "Za klijente",
      title: "Sarađujte sa noqyris",
      body: "Aplikacije po meri, SaaS gradnje i AI sistemi — definisani, isporučeni, podržani.",
      link: "Pogledaj usluge",
    },
  },

  productStrip: {
    aria: "Proizvodi",
    eyebrow: "Proizvodi",
    h1: { pre: "Gradnja ", em: "i", post: " isporuka." },
    all: "Svi proizvodi →",
  },

  serviceIndex: {
    aria: "Usluge",
    eyebrow: "Usluge",
    h1: { pre: "Od ideje do ", em: "produkcije", post: "." },
  },

  proof: {
    aria: "Dokazi",
    eyebrow: "Dokazi",
    h1: { pre: "Dokazi, ne ", em: "obećanja", post: "." },
    emptyIntro:
      "Još nema studija slučaja sa klijentima — noqyris je nov, i izmišljanje ne dolazi u obzir. Zato, umesto traženja poverenja na reč, evo svega što možete sami da proverite.",
    items: [
      {
        label: "Bez iznenađenja",
        body: "Cela saradnja — definisana, vođena i isporučena — javno od početka do kraja.",
        href: "/process",
      },
      {
        label: "Otvoreno podrazumevano",
        body: "Žive, iskrene brojke i datiran dnevnik svega isporučenog — u javnosti.",
        href: "/changelog",
      },
      {
        label: "Direktna odgovornost",
        body: "Radite direktno sa inženjerom koji definiše obim, gradi i isporučuje — bez account managera, jedno ime na poslu.",
        href: "/about",
      },
    ],
    firstResultPre: "Želite da budete prvi imenovani rezultat ovde? ",
    firstResultLink: "Rezervišite rani termin →",
    mailtoSubject: "Rani klijentski termin — noqyris.com",
  },

  changelogTeaser: {
    aria: "Changelog",
    eyebrow: "Sada",
    h1: { pre: "Gradnja u ", em: "javnosti", post: "." },
    full: "Ceo changelog →",
  },

  followBuild: {
    aria: "Prati gradnju",
    eyebrow: "Prati gradnju",
    intro:
      "Sve što noqyris isporučuje gradi se u javnosti — proizvodi, brojevi, lekcije.",
    h1: { pre: "Prati ", em: "gradnju", post: "." },
    openEyebrow: "Gledaj kako se dešava",
    openIntro: "Brojevi iznad se kreću u javnosti. Pratite bilo gde:",
    changelogEyebrow: "Pratite uz nas",
    changelogIntro:
      "Ne želite stalno da proveravate? Svaki unos ovde objavljuje se tamo gde već skrolujete.",
  },

  marquee: {
    home: "Zakazujem nove projekte — Hajde da gradimo —",
    homeAria: "Zakazujem nove projekte — Hajde da gradimo — pišite studiju",
    services: "SaaS — Aplikacije po meri — AI sistemi —",
    servicesAria: "SaaS — Aplikacije po meri — AI sistemi — pišite studiju",
  },

  cta: {
    aria: "Kontakt",
    h1: { pre: "Imate nešto da", em: "izgradite", post: "?" },
    start: "Pokreni projekat →",
    founderLine:
      "Razgovaraćete direktno sa timom koji to gradi. {promise}",
  },

  entryOfferCard: {
    eyebrow: "Prvi korak — bez rizika i sa garancijom",
    book: "Zakaži sprint",
    bookAria: "Zakaži {name}",
  },

  productsPage: {
    metaTitle: "SaaS proizvodi, građeni u javnosti",
    metaDescription:
      "SaaS proizvodi koje noqyris osmišljava, gradi i održava — alati za programere, AI alati i infrastruktura, građeni u javnosti.",
    eyebrow: "Proizvodi",
    h1: { pre: "Ono što se", em: "isporučuje", post: "." },
    lede: "Proizvodi koje jedan developer osmišljava, gradi i održava od početka do kraja. Neki u beti, neki u laboratoriji — svi građeni u javnosti.",
    listAria: "Lista proizvoda",
  },

  productDetail: {
    featuresAria: "Funkcionalnosti",
    whatItDoes: "Šta radi",
    comingSoon: "Uskoro",
    viewProduct: "Pogledaj proizvod →",
    visit: "Poseti {name} →",
    bridgeAria: "Most",
    bridgePre: "Želite ovako nešto izgrađeno za vaš biznis? ",
    bridgeLink: "Sarađujte sa noqyris",
    bridgePost: ".",
    altScreenshot: "{name} snimak ekrana",
  },

  servicesPage: {
    metaTitle: "Usluge razvoja softvera",
    metaDescription:
      "Razvoj SaaS-a, aplikacije po meri i AI rešenja — definisani, isporučeni i podržani od strane nezavisnog softverskog studija.",
    eyebrow: "Usluge",
    h1: { pre: "Šta se", em: "gradi", post: "za klijente." },
    lede: "Nezavisan razvoj softvera koji isporučuje sopstvene proizvode — i primenjuje isti standard na vaše. Tri usluge, jedan proces, jedan tim odgovoran.",
    listAria: "Lista usluga",
    learnMore: "Saznaj više",
    startSmallAria: "Prvi korak",
    startSmallEyebrow: "Niste sigurni odakle da počnete?",
    startSmallH1: { pre: "Počnite ", em: "malo", post: "." },
    processAria: "Proces",
    processEyebrow: "Kako to funkcioniše",
    processH1: { pre: "Jedan proces, svaka ", em: "gradnja", post: "." },
    ownProductsPre: "Isti proces stoji i iza noqyris proizvoda — ",
    ownProductsLink: "pogledajte šta ovde nastaje",
    ownProductsPost: ".",
    sharedProcess: [
      {
        name: "Definisanje obima",
        body: "Kratki discovery sprint se završava pisanom specifikacijom, fiksnim obimom i cenom — pre ijednog reda koda.",
      },
      {
        name: "Prototip",
        body: "Funkcionalni isečak glavnog toka u prve dve nedelje, testiran na stvarnom problemu.",
      },
      {
        name: "Isporuka",
        body: "Produkciona izrada sa infrastrukturom koju potpuno posedujete — postavljena, nadgledana, dokumentovana.",
      },
      {
        name: "Podrška",
        body: "Definisan period podrške nakon lansiranja, zatim iteracija po izdanju ili čista primopredaja.",
      },
    ],
  },

  serviceDetail: {
    eyebrow: "Usluga — 0{n}",
    whoForAria: "Za koga je ovo",
    whoFor: "Za koga je ovo",
    whatYouGetAria: "Šta dobijate",
    whatYouGet: "Šta dobijate",
    whatYouGetH1: { pre: "Posao, ", em: "po stavkama", post: "." },
    processAria: "Proces",
    process: "Proces",
    processMorePre: "Cela saradnja — rokovi, garancije, primopredaja — je javna: ",
    processMoreLink: "pročitajte kako saradnja funkcioniše",
    processMorePost: ".",
    pricingAria: "Cenovnik",
    pricing: "Cenovnik",
    pricingH1: { pre: "Definisano, vaše, ", em: "sa garancijom", post: "." },
    faqAria: "Često postavljana pitanja",
    faq: "FAQ",
    moreAria: "Više",
    moreProductsPre: "Pogledajte šta ovde nastaje — ",
    moreProductsLink: "pregledajte proizvode",
    moreProductsPost: ".",
    start: "Pokreni projekat",
  },

  processPage: {
    metaTitle: "Kako saradnja funkcioniše",
    metaDescription:
      "Proces noqyris od početka do kraja: odgovor u roku od jednog radnog dana, Roadmap Sprint bez rizika, nedeljne demonstracije softvera u radu i primopredaja koju posedujete.",
    eyebrow: "Proces",
    h1: { pre: "Bez iznenađenja, ", em: "po dizajnu", post: "." },
    hero: "Angažovati studio koji ste našli na internetu je vežba poverenja — zato je ovde cela saradnja, od početka do kraja, pre nego što potrošite ijedan cent: šta se dešava, kada, koliko košta i za šta nas možete držati odgovornim u svakom koraku.",
    start: "Pokreni projekat",
    timelineAria: "Vremenska linija saradnje",
    timelineEyebrow: "Saradnja, od početka do kraja",
    phases: [
      {
        stage: "Dan 0",
        name: "Vaša poruka",
        body: "Pišete — kroz formu za projekat ili običan email. Dobijate lični odgovor u roku od jednog radnog dana sa iskrenom procenom: šta bismo izgradili, otprilike koliko košta i da li smo uopšte pravi izbor. Ako nismo, reći ćemo to i predložiti ko jeste.",
      },
      {
        stage: "Dan 1–3",
        name: "Poziv za definisanje obima ili pisani pregled",
        body: "Besplatan poziv od 30 minuta (ili asinhrono, ako više volite pisanje) da uđemo u problem: ko ga ima, šta ste probali, kako izgleda „gotovo\". Bez pitch deck-a, bez account managera — samo inženjer sa kojim biste radili, koji postavlja prava pitanja.",
      },
      {
        stage: "Nedelja 1",
        name: "{offer} — {length}",
        body: "{description} Odlazite sa pisanom specifikacijom, planom arhitekture, jasnom ponudom i registrom rizika. {guarantee}",
      },
      {
        stage: "Nedelje izrade",
        name: "Softver u radu, svake nedelje",
        body: "Gradnja teče u nedeljnim ciklusima. Svaka nedelja se završava demoom pravog proizvoda na staging URL-u koji možete otvoriti i podeliti — nikada izveštaj o statusu. Vidite obim, budžet i napredak otvoreno celim putem; pitanja dobijaju odgovor istog dana.",
      },
      {
        stage: "Lansiranje",
        name: "Isporuka i primopredaja",
        body: "Produkciono postavljanje, nadgledanje, dokumentacija i snimljeni vodič. Sve — kod, infrastruktura, nalozi — prelazi vama u potpunosti po finalnoj uplati. Period od 30 dana za ispravke je uključen u svaku izradu.",
      },
      {
        stage: "Posle",
        name: "Iterirajte ili se čisto razdvojite",
        body: "Nastavite po izdanju kako nas stvarni korisnici uče šta sledi, pređite na interni tim uz dokumentovanu predaju, ili oboje. Nema retainera u koji ste zaključani i nema zavisnosti po dizajnu.",
      },
    ],
    guaranteesAria: "Garancije",
    guaranteesEyebrow: "Za šta nas možete držati odgovornim",
    guaranteesH1: { pre: "Garantovano, u ", em: "pisanoj formi", post: "." },
    pricingPre: "Svaka gradnja je definisana i ponuđena u Roadmap Sprintu — pogledajte ",
    pricingSep: ", ",
    pricingLastSep: " i ",
    pricingPost: ". ",
    whoAria: "Sa kim radite",
    whoEyebrow: "Sa kim radite",
    founderNote:
      "Od početka do kraja, inženjer koji definiše obim vašeg projekta je onaj koji ga gradi, isporučuje i odgovara za njega. Ništa se ne izgubi između odeljenja, jer ih nema.",
  },

  startPage: {
    metaTitle: "Pokreni projekat — SaaS, aplikacije i AI",
    metaDescription:
      "Recite noqyris šta gradite — SaaS, aplikaciju po meri ili AI rešenje — i dobijte lični odgovor u roku od jednog radnog dana.",
    eyebrow: "Pokreni projekat",
    h1: { pre: "Recite nam šta ", em: "gradite", post: "." },
    briefAria: "Brief projekta",
    founderNote:
      "Vaš email stiže direktno timu, ne u CRM. Svaki projekat sami osmišljavamo, gradimo i isporučujemo — ono što čitate ovde jeste tim sa kojim radite.",
    whatNext: "Šta sledi",
    steps: [
      {
        name: "Vi pišete",
        body: "Forma ispod pravi kratak brief i otvara ga u vašoj sopstvenoj mail aplikaciji. Dva minuta, bez naloga, ništa se ne čuva ovde.",
      },
      {
        name: "Odgovaramo — u roku od jednog dana",
        body: "Lični odgovor u roku od jednog radnog dana, obično u roku od nekoliko sati: iskrena procena uklapanja, gruba forma i pravi sledeći korak. Ako nismo pravi izbor, reći ćemo to i uputiti vas negde bolje.",
      },
      {
        name: "Definišemo obim",
        body: "Besplatan poziv od 30 minuta ili pisani pregled — zatim, ako ima smisla, {offer}: fokusiranih {length}, koji se završava planom spremnim za gradnju i jasnom ponudom.",
      },
    ],
    plainEmailPre: "Više volite običan email? Pišite na ",
    plainEmailMid: " — isti tim, isto obećanje. Želite prvo celu sliku? Pročitajte ",
    plainEmailLink: "kako saradnja funkcioniše",
    plainEmailPost: ".",
  },

  // Live open-startup numbers, rendered at the top of /changelog (the /open
  // page was folded in). Only these keys are consumed by ChangelogView.
  openPage: {
    metricsAria: "Metrike studija",
    numbers: "Brojevi",
    stats: [
      { value: "{services}", label: "Ponuđenih usluga" },
      { value: "{changelog}", label: "Isporučenih changelog unosa" },
      { value: "2026", label: "Gradnja u javnosti od" },
    ],
    mrrLabel: "Mesečni ponavljajući prihod",
    mrrNote:
      "Ovaj broj je stvaran, i ostaje stvaran. Objavljuje se od prvog dolara — uspon je čitava poenta gradnje u javnosti.",
  },

  aboutPage: {
    metaTitle: "O studiju — Nezavisni softverski studio",
    metaDescription:
      "Priča, principi i standardi iza noqyris — nezavisnog softverskog studija koji isporučuje sopstvene SaaS proizvode i gradi aplikacije po meri i AI sisteme za klijente.",
    eyebrow: "O studiju",
    h1: { pre: "Jedan studio, jedan ", em: "standard", post: "." },
    lead: "{name} je nezavisni softverski studio koji isporučuje sopstvene SaaS proizvode pod svojim imenom i gradi aplikacije po meri i AI sisteme za klijente širom sveta.",
    para2:
      "Proizvodi i rad sa klijentima su jedna praksa. Alati, infrastruktura i prosuđivanje izoštreni vođenjem pravih proizvoda direktno ulaze u klijentske projekte — a klijentski problemi drže proizvode iskrenim.",
    howWeWork: "Kako to funkcioniše",
    principles: [
      {
        title: "Isporuči, pa doteruj",
        body: "Softver u radu pred stvarnim korisnicima pobeđuje savršen plan. Svaki projekat — sopstveni ili klijentov — dobija nešto stvarno u produkciji rano.",
      },
      {
        title: "Posedujte ono što gradite",
        body: "Klijenti potpuno poseduju svoj kod, infrastrukturu i podatke. Proizvodi poštuju isto pravilo: pun izvoz, iskrene cene, bez zaključavanja.",
      },
      {
        title: "Gradi u javnosti",
        body: "Napredak, brojevi i lekcije se dele kako se dešavaju. To drži studio iskrenim a rad vidljivim.",
      },
    ],
    stackLinks: "Stack i linkovi",
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
    curiousPre: "Zanima vas šta studio isporučuje? ",
    curiousProducts: "Pregledajte proizvode",
    curiousMid: " ili ",
    curiousChangelog: "pratite changelog",
    curiousPost: ".",
  },

  changelogPage: {
    metaTitle: "Changelog — Gradnja u javnosti",
    metaDescription:
      "Sve što noqyris isporučuje, u javnosti — izdanja proizvoda, novosti studija, žive brojke i izmene na sajtu, najnovije prvo. Građeno u javnosti od 2026.",
    eyebrow: "Changelog",
    h1: { pre: "Gradnja u ", em: "javnosti", post: "." },
    hero: "Sve što studio isporučuje — izdanja proizvoda, novosti studija i izmene na sajtu. Samo stvarna istorija, najnovije prvo.",
    rss: "Pretplati se preko RSS-a",
    entriesAria: "Changelog unosi",
    followEyebrow: "Pratite uz nas",
    followIntro:
      "Svako izdanje ovde ide i na kanale ispod — zaprati jednom, ne propusti nijedno.",
  },

  notFound: {
    h1: { pre: "Nema ničega ", em: "ovde", post: "." },
    body: "Stranica je premeštena, nikada nije postojala ili se još uvek gradi u javnosti.",
    backHome: "Nazad na početnu",
  },

  form: {
    name: "Vaše ime",
    email: "Vaš email",
    company: "Kompanija",
    optional: "opciono",
    building: "Šta gradite?",
    budget: "Budžet",
    budgetHint: "stvaran raspon nam pomaže da pravilno odredimo obim",
    timeline: "Vremenski okvir",
    description: "Šta bi trebalo da postoji a još ne postoji?",
    descriptionHint: "nekoliko rečenica je sasvim dovoljno (najviše {max} karaktera)",
    namePlaceholder: "Ada Lovelace",
    emailPlaceholder: "ada@primer.com",
    companyPlaceholder: "Analytical Engines Ltd",
    descriptionPlaceholder:
      "Problem, ko ga ima i šta ste do sada probali. Linkovi su dobrodošli.",
    typeOptions: [
      "SaaS proizvod",
      "Aplikacija po meri",
      "AI rešenje",
      "Roadmap Sprint",
      "Još nisam siguran",
    ],
    budgetOptions: [
      "Ispod $5,000",
      "$5,000 – $15,000",
      "$15,000 – $40,000",
      "$40,000+",
      "Još nisam siguran",
    ],
    timelineOptions: ["Što pre moguće", "U roku od 1–3 meseca", "Fleksibilno"],
    send: "Pošalji brief",
    sending: "Šaljem…",
    sent: "Hvala — brief je stigao. Odgovaramo u roku od jednog radnog dana.",
    error: "Slanje nije uspelo. Kopirajte brief iznad ili pišite direktno na",
    copyInstead: "Umesto toga kopiraj brief",
    copied: "Kopirano",
    sentHint:
      "Trebalo bi da se otvori vaša mail aplikacija sa spremnim brief-om. Ako se ništa nije desilo, kopirajte ga iznad ili pišite direktno na",
    footerHelper:
      "Vaš brief stiže direktno u naš inbox — ništa drugo se ne čuva. ",
    briefName: "Ime",
    briefCompany: "Kompanija",
    briefLooking: "Tražim",
    briefBudget: "Budžet",
    briefTimeline: "Vremenski okvir",
    briefAbout: "O projektu:",
    briefEmpty: "—",
    briefTo: "Za",
    briefSubject: "Naslov",
    mailtoSubject: "Upit za projekat",
  },

  badge: {
    status: { live: "Uživo", beta: "Beta", building: "U izradi" },
    tag: { product: "proizvod", studio: "studio", site: "sajt" },
  },

  copyEmail: {
    copied: "Kopirano — čujemo se uskoro.",
    aria: "Kopiraj email adresu {email}",
    srCopied: "Email adresa kopirana",
  },

  contactSubject: "Upit za projekat — noqyris.com",

  og: {
    home: {
      alt: "noqyris — Softverski studio za SaaS, aplikacije po meri i AI",
      title: "SaaS proizvodi, aplikacije po meri i AI —",
      em: "isporučeno.",
      subtitle: "Nezavisni softverski studio",
    },
    products: {
      alt: "Proizvodi od noqyris",
      title: "Ono što se",
      em: "isporučuje.",
      subtitle: "SaaS proizvodi, građeni u javnosti",
    },
    services: {
      alt: "Usluge razvoja softvera od noqyris",
      title: "Šta se",
      em: "gradi",
      subtitle: "SaaS · Aplikacije po meri · AI rešenja",
    },
    process: {
      alt: "Kako saradnja sa noqyris funkcioniše",
      title: "Bez iznenađenja, po",
      em: "dizajnu.",
      subtitle: "Proces, cene i garancije — javno",
    },
    start: {
      alt: "Pokreni projekat sa noqyris",
      title: "Recite nam šta",
      em: "gradite.",
      subtitle: "Odgovor u roku od jednog radnog dana",
    },
    changelog: {
      alt: "noqyris changelog — gradnja u javnosti",
      title: "Gradnja u",
      em: "javnosti.",
      subtitle: "noqyris changelog",
    },
    about: {
      alt: "O noqyris, nezavisnom softverskom studiju",
      title: "Jedan studio, jedan",
      em: "standard.",
      subtitle: "O noqyris",
    },
    serviceFallback: "Usluge",
    serviceSubtitle: "Usluge razvoja softvera",
    productFallback: "Proizvodi",
  },

  feed: {
    channelDescription:
      "Sve što noqyris isporučuje, u javnosti: izdanja proizvoda, novosti studija i izmene na sajtu.",
  },
};

export default sr;
