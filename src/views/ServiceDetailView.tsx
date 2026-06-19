import Link from "next/link";
import { getServices, getService } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { FaqList } from "@/components/services/FaqList";
import { CtaSection } from "@/components/shared/CtaSection";
import { EntryOfferCard } from "@/components/shared/EntryOfferCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

export function ServiceDetailView({
  lang,
  slug,
}: {
  lang: Locale;
  slug: string;
}) {
  const dict = getDictionary(lang);
  const service = getService(lang, slug);
  if (!service) return null;

  const services = getServices(lang);
  const index = services.indexOf(service);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(service, lang)} />
      <JsonLd data={faqPageJsonLd(service.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.services, path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ],
          lang,
        )}
      />

      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <Eyebrow>
            {t(dict.serviceDetail.eyebrow, { n: index + 1 })}
          </Eyebrow>
          <h1 className="text-display-xl max-w-5xl">
            {service.h1.pre}{" "}
            <span className="serif-em text-accent">{service.h1.em}</span>
            {service.h1.post}
          </h1>
          <p className="max-w-2xl text-lg text-fg-muted">{service.lede}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-display text-2xl font-semibold">
              {service.pricing.from}
            </span>
            <span className="mono-label text-fg-faint">
              {service.pricing.timeline}
            </span>
          </div>
          <div>
            <Button href={localePath("/start", lang)} size="lg">
              {dict.serviceDetail.start}
            </Button>
          </div>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.serviceDetail.whoForAria}>
        <Container className="grid gap-12 py-24 md:grid-cols-[16rem_1fr] md:py-32">
          <Reveal>
            <Eyebrow>{dict.serviceDetail.whoFor}</Eyebrow>
          </Reveal>
          <ul className="flex flex-col">
            {service.audience.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <li className="hairline-t py-5 text-lg text-fg-muted first:border-t-0 first:pt-0">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className="hairline-t"
        aria-label={dict.serviceDetail.whatYouGetAria}
      >
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.serviceDetail.whatYouGet}</Eyebrow>
            <h2 className="text-display-lg mt-4">
              {dict.serviceDetail.whatYouGetH1.pre}{" "}
              <span className="serif-em">
                {dict.serviceDetail.whatYouGetH1.em}
              </span>
              {dict.serviceDetail.whatYouGetH1.post}
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i * 60} className="h-full bg-bg">
                <div className="flex h-full flex-col gap-3 p-7">
                  <h3 className="font-display text-xl font-medium">
                    {d.title}
                  </h3>
                  <p className="text-fg-muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="flex flex-wrap gap-2">
            {service.stack.map((tech) => (
              <span
                key={tech}
                className="mono-label rounded-md border border-line px-2.5 py-1.5 text-fg-muted"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.serviceDetail.processAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.serviceDetail.process}</Eyebrow>
          </Reveal>
          <ProcessSteps steps={service.process} />
          <Reveal>
            <p className="text-fg-muted">
              {dict.serviceDetail.processMorePre}
              <Link
                href={localePath("/process", lang)}
                className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                {dict.serviceDetail.processMoreLink}
              </Link>
              {dict.serviceDetail.processMorePost}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.serviceDetail.pricingAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.serviceDetail.pricing}</Eyebrow>
            <h2 className="text-display-lg mt-4">
              {dict.serviceDetail.pricingH1.pre}{" "}
              <span className="serif-em">
                {dict.serviceDetail.pricingH1.em}
              </span>
              {dict.serviceDetail.pricingH1.post}
            </h2>
            <p className="mt-4 max-w-2xl text-fg-muted">
              {service.pricing.note}
            </p>
          </Reveal>
          <Reveal>
            <EntryOfferCard lang={lang} />
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.serviceDetail.faqAria}>
        <Container className="grid gap-12 py-24 md:grid-cols-[16rem_1fr] md:py-32">
          <Reveal>
            <Eyebrow>{dict.serviceDetail.faq}</Eyebrow>
          </Reveal>
          <FaqList faqs={service.faqs} />
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.serviceDetail.moreAria}>
        <Container className="flex flex-col gap-6 py-16">
          <p className="text-fg-muted">
            {dict.serviceDetail.moreProductsPre}
            <Link
              href={localePath("/products", lang)}
              className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              {dict.serviceDetail.moreProductsLink}
            </Link>
            {dict.serviceDetail.moreProductsPost}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={localePath(`/services/${other.slug}`, lang)}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {other.name} →
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
