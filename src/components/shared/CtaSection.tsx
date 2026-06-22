import Link from "next/link";
import { site } from "@/content/site";
import { getOffer } from "@/content/offer";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { SocialIcon } from "@/components/icons";
import { KineticHeadline } from "@/components/motion/KineticHeadline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CopyEmail } from "./CopyEmail";

/** Bottom contact CTA, repeated on every page (explicit availability CTA
 *  repeated at page bottom — per research). */
export function CtaSection({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  return (
    <section
      className="section-inverted bg-accent text-accent-ink"
      aria-label={dict.cta.aria}
    >
      <Container className="py-24 md:py-32">
        <ScrollReveal
          from="up"
          distance={50}
          scaleFrom={0.95}
          exit={false}
          className="flex flex-col items-center gap-8 text-center"
        >
        <AvailabilityBadge lang={lang} inverted />
        <h2 className="text-display-xl">
          <KineticHeadline text={dict.cta.h1.pre} />{" "}
          <span className="serif-em">{dict.cta.h1.em}</span>
          {dict.cta.h1.post}
        </h2>
        <CopyEmail lang={lang} inverted />
        <div className="flex flex-col items-center gap-3">
          <Link
            href={localePath("/start", lang)}
            className="inline-flex items-center gap-2 rounded-full bg-accent-ink px-7 py-3.5 font-medium text-accent transition-opacity hover:opacity-80"
          >
            {dict.cta.start}
          </Link>
          <p className="max-w-md text-sm text-accent-ink/70">
            {t(dict.cta.founderLine, {
              promise: getOffer(lang).responsePromise,
            })}
          </p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {site.socials.map((social) => (
            <li key={social.key}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(dict.site.socialAria, {
                  name: site.name,
                  label: social.label,
                })}
                className="text-accent-ink/60 transition-colors hover:text-accent-ink"
              >
                <SocialIcon network={social.key} />
              </a>
            </li>
          ))}
        </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
