import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getServices } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { CtaSection } from "@/components/shared/CtaSection";
import { EntryOfferCard } from "@/components/shared/EntryOfferCard";
import { mailto } from "@/content/site";

export function ServicesView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const services = getServices(lang);
  const sharedProcess = dict.servicesPage.sharedProcess.map((step) => ({
    name: step.name,
    body: step.body,
  }));

  return (
    <>
      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <Eyebrow>{dict.servicesPage.eyebrow}</Eyebrow>
          <h1 className="text-display-xl max-w-4xl">
            {dict.servicesPage.h1.pre}{" "}
            <span className="serif-em text-accent">
              {dict.servicesPage.h1.em}
            </span>{" "}
            {dict.servicesPage.h1.post}
          </h1>
          <p className="max-w-xl text-lg text-fg-muted">
            {dict.servicesPage.lede}
          </p>
        </Container>
      </section>

      <section aria-label={dict.servicesPage.listAria}>
        <Container className="grid gap-4 pb-24 md:grid-cols-3 md:pb-32">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={localePath(`/services/${service.slug}`, lang)}
                className="group flex h-full flex-col gap-10 rounded-card border border-line p-7 transition-colors hover:border-fg-faint hover:bg-surface"
              >
                <p className="mono-label text-fg-faint">0{i + 1}</p>
                <div className="flex flex-1 flex-col gap-3">
                  <h2 className="font-display text-2xl font-medium">
                    {service.name}
                  </h2>
                  <p className="text-sm text-fg-muted">{service.summary}</p>
                  <p className="font-display text-lg font-semibold">
                    {service.pricing.from}
                    <span className="mono-label ml-3 font-normal text-fg-faint">
                      {service.pricing.timeline}
                    </span>
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {service.deliverables.slice(0, 3).map((d) => (
                    <li
                      key={d.title}
                      className="mono-label text-fg-faint"
                    >
                      — {d.title}
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors group-hover:text-accent">
                  {dict.servicesPage.learnMore}
                  <ArrowIcon
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </p>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.servicesPage.startSmallAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.servicesPage.startSmallEyebrow}</Eyebrow>
            <h2 className="text-display-lg mt-4">
              {dict.servicesPage.startSmallH1.pre}
              <span className="serif-em">
                {dict.servicesPage.startSmallH1.em}
              </span>
              {dict.servicesPage.startSmallH1.post}
            </h2>
          </Reveal>
          <Reveal>
            <EntryOfferCard lang={lang} />
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.servicesPage.processAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.servicesPage.processEyebrow}</Eyebrow>
            <h2 className="text-display-lg mt-4">
              {dict.servicesPage.processH1.pre}
              <span className="serif-em">
                {dict.servicesPage.processH1.em}
              </span>
              {dict.servicesPage.processH1.post}
            </h2>
          </Reveal>
          <ProcessSteps steps={sharedProcess} />
          <Reveal>
            <p className="text-fg-muted">
              {dict.servicesPage.ownProductsPre}
              <Link
                href={localePath("/products", lang)}
                className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                {dict.servicesPage.ownProductsLink}
              </Link>
              {dict.servicesPage.ownProductsPost}
            </p>
          </Reveal>
        </Container>
      </section>

      <Marquee
        text={dict.marquee.services}
        href={mailto(dict.contactSubject)}
        label={dict.marquee.servicesAria}
      />
      <CtaSection lang={lang} />
    </>
  );
}
