import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";
import { testimonials } from "@/content/testimonials";
import { mailto } from "@/content/site";
import { Container } from "@/components/layout/Container";
import {
  SectionHeading,
  SectionNumeral,
} from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

export function ProofSection({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  // No client case studies yet — so instead of an apology, the empty state
  // points to proof a prospect can verify without taking my word for it
  // (public footprints beat self-authored claims).
  const verifiable = dict.proof.items;

  return (
    <section className="hairline-t" aria-label={dict.proof.aria}>
      <Container className="relative flex flex-col gap-12 py-24 md:py-32">
        <SectionNumeral n="02" />
        <MaskReveal>
          <SectionHeading eyebrow={dict.proof.eyebrow}>
            {dict.proof.h1.pre}
            <span className="serif-em">{dict.proof.h1.em}</span>
            {dict.proof.h1.post}
          </SectionHeading>
        </MaskReveal>

        {testimonials.length === 0 ? (
          <>
            <ScrollReveal from="up" exit={false}>
              <p className="max-w-2xl text-lg text-fg-muted">
                {dict.proof.emptyIntro}
              </p>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-3">
              {verifiable.map((item, i) => (
                <ScrollReveal key={item.label} from="up" distance={70} scaleFrom={0.9} exit={false} lead={i * 0.05}>
                  <Link
                    href={localePath(item.href, lang)}
                    data-spotlight
                    className="group flex h-full flex-col justify-between gap-10 rounded-card border border-line bg-surface p-7 transition-colors hover:border-fg-faint"
                  >
                    <p className="mono-label text-accent">{item.label}</p>
                    <div className="flex items-end justify-between gap-4">
                      <p className="max-w-[18ch] text-fg-muted">{item.body}</p>
                      <ArrowIcon
                        width={18}
                        height={18}
                        className="shrink-0 text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal from="up" exit={false}>
              <p className="text-fg-muted">
                {dict.proof.firstResultPre}
                <a
                  href={mailto(dict.proof.mailtoSubject)}
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                >
                  {dict.proof.firstResultLink}
                </a>
              </p>
            </ScrollReveal>
          </>
        ) : (
          <div className="flex flex-col gap-12">
            {testimonials.map((t) => (
              <ScrollReveal key={t.name} from="up" exit={false}>
                <figure className="flex flex-col gap-5">
                  <blockquote className="serif-em max-w-3xl text-[clamp(1.5rem,2.5vw,2.25rem)] leading-snug">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mono-label text-fg-faint">
                    {t.name} — {t.role}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
