import Link from "next/link";
import { getOffer } from "@/content/offer";
import { getServices } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WhoNote } from "@/components/shared/WhoNote";
import { CtaSection } from "@/components/shared/CtaSection";

export function ProcessView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const offer = getOffer(lang);
  const entryOffer = offer.entryOffer;
  const services = getServices(lang);

  const phases = dict.processPage.phases.map((phase) => {
    if (phase.stage === "Week 1") {
      return {
        stage: phase.stage,
        name: t(phase.name, {
          offer: entryOffer.name,
          length: entryOffer.length,
        }),
        body: t(phase.body, {
          description: entryOffer.description,
          guarantee: entryOffer.guarantee,
        }),
      };
    }
    return phase;
  });

  return (
    <>
      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <Eyebrow>{dict.processPage.eyebrow}</Eyebrow>
          <h1 className="text-display-xl max-w-4xl">
            {dict.processPage.h1.pre}{" "}
            <span className="serif-em text-accent">
              {dict.processPage.h1.em}
            </span>
            {dict.processPage.h1.post}
          </h1>
          <p className="max-w-2xl text-lg text-fg-muted">
            {dict.processPage.hero}
          </p>
          <div>
            <Button href={localePath("/start", lang)} size="lg">
              {dict.processPage.start}
            </Button>
          </div>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.processPage.timelineAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.processPage.timelineEyebrow}</Eyebrow>
          </Reveal>
          <div>
            {phases.map((phase, i) => (
              <Reveal key={phase.name} delay={i * 50}>
                <div className="hairline-t grid gap-x-8 gap-y-2 py-8 first:border-t-0 first:pt-0 md:grid-cols-[8rem_16rem_1fr] md:py-10">
                  <span className="mono-label pt-1.5 text-fg-faint">
                    {phase.stage}
                  </span>
                  <h2 className="font-display text-xl font-medium">
                    {phase.name}
                  </h2>
                  <p className="max-w-2xl text-fg-muted">{phase.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.processPage.guaranteesAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.processPage.guaranteesEyebrow}</Eyebrow>
            <h2 className="text-display-lg mt-4">
              {dict.processPage.guaranteesH1.pre}{" "}
              <span className="serif-em">
                {dict.processPage.guaranteesH1.em}
              </span>
              {dict.processPage.guaranteesH1.post}
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {offer.guarantees.map((g, i) => (
              <Reveal key={g.title} delay={i * 60} className="h-full bg-bg">
                <div className="flex h-full flex-col gap-3 p-7">
                  <h3 className="font-display text-xl font-medium">
                    {g.title}
                  </h3>
                  <p className="text-fg-muted">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="max-w-2xl text-fg-muted">
              {dict.processPage.pricingPre}
              {services.map((s, i) => (
                <span key={s.slug}>
                  <Link
                    href={localePath(`/services/${s.slug}`, lang)}
                    className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                  >
                    {s.name}
                  </Link>
                  {i < services.length - 2
                    ? dict.processPage.pricingSep
                    : i === services.length - 2
                      ? dict.processPage.pricingLastSep
                      : ""}
                </span>
              ))}
              {dict.processPage.pricingPost}
              {offer.responsePromise}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.processPage.whoAria}>
        <Container className="grid gap-12 py-24 md:grid-cols-[16rem_1fr] md:py-32">
          <Reveal>
            <Eyebrow>{dict.processPage.whoEyebrow}</Eyebrow>
          </Reveal>
          <Reveal className="max-w-xl">
            <WhoNote note={dict.processPage.founderNote} />
          </Reveal>
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
