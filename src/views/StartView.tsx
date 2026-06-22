import Link from "next/link";
import { site } from "@/content/site";
import { getOffer } from "@/content/offer";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { IntakeForm } from "@/components/start/IntakeForm";
import { WhoNote } from "@/components/shared/WhoNote";
import { Reveal } from "@/components/motion/Reveal";

export function StartView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const offer = getOffer(lang);
  const entryOffer = offer.entryOffer;

  const steps = dict.startPage.steps.map((step) => ({
    name: step.name,
    body: t(step.body, {
      offer: entryOffer.name,
      length: entryOffer.length,
    }),
  }));

  return (
    <>
      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-16 md:pt-28">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Eyebrow>{dict.startPage.eyebrow}</Eyebrow>
            <AvailabilityBadge lang={lang} />
          </div>
          <h1 className="text-display-xl max-w-4xl">
            {dict.startPage.h1.pre}{" "}
            <span className="serif-em text-accent">
              {dict.startPage.h1.em}
            </span>
            {dict.startPage.h1.post}
          </h1>
          <p className="max-w-xl text-lg text-fg-muted">
            {offer.responsePromise}
          </p>
        </Container>
      </section>

      <section aria-label={dict.startPage.briefAria}>
        <Container className="grid gap-12 pb-24 md:grid-cols-[1fr_20rem] md:gap-16 md:pb-32">
          <Reveal>
            <IntakeForm lang={lang} />
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delay={80}>
              <WhoNote note={dict.startPage.founderNote} />
            </Reveal>
            <Reveal delay={140}>
              <div className="flex flex-col gap-5">
                <p className="mono-label text-fg-faint">
                  {dict.startPage.whatNext}
                </p>
                <ol className="flex flex-col gap-5">
                  {steps.map((step, i) => (
                    <li key={step.name} className="flex gap-4">
                      <span className="outline-text font-display text-2xl font-semibold">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="font-medium">{step.name}</p>
                        <p className="mt-1 text-sm text-fg-muted">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-sm text-fg-faint">
                {dict.startPage.plainEmailPre}
                <a
                  href={`mailto:${site.email}`}
                  className="text-fg-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
                >
                  {site.email}
                </a>
                {dict.startPage.plainEmailMid}
                <Link
                  href={localePath("/process", lang)}
                  className="text-fg-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
                >
                  {dict.startPage.plainEmailLink}
                </Link>
                {dict.startPage.plainEmailPost}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
