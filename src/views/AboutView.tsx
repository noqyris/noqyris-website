import Link from "next/link";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/shared/CtaSection";
import { FounderAvatar } from "@/components/shared/FounderCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/seo";

export function AboutView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd data={personJsonLd(lang)} />

      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <Eyebrow>{dict.aboutPage.eyebrow}</Eyebrow>
          <h1 className="text-display-xl max-w-4xl">
            {dict.aboutPage.h1.pre}
            <span className="serif-em text-accent">{dict.aboutPage.h1.em}</span>
            {dict.aboutPage.h1.post}
          </h1>
          <div className="flex items-center gap-5">
            <FounderAvatar size="size-20" textSize="text-2xl" />
            <div>
              <p className="font-display text-xl font-medium">
                {site.founder}
              </p>
              <p className="mono-label mt-1 text-fg-faint">
                {dict.site.location}
              </p>
            </div>
          </div>
          <div className="flex max-w-2xl flex-col gap-5 text-lg text-fg-muted">
            <p>
              {t(dict.aboutPage.lead, {
                name: site.name,
                founder: site.founder,
              })}
            </p>
            <p>{dict.aboutPage.para2}</p>
          </div>
        </Container>
      </section>

      <section className="hairline-t" aria-label="Principles">
        <Container className="grid gap-12 py-24 md:grid-cols-[16rem_1fr] md:py-32">
          <Reveal>
            <Eyebrow>{dict.aboutPage.howWeWork}</Eyebrow>
          </Reveal>
          <div>
            {dict.aboutPage.principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="hairline-t grid gap-2 py-7 first:border-t-0 first:pt-0 md:grid-cols-[14rem_1fr] md:gap-8">
                  <h2 className="font-display text-xl font-medium">
                    {p.title}
                  </h2>
                  <p className="max-w-xl text-fg-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="hairline-t" aria-label="Stack and links">
        <Container className="grid gap-12 py-24 md:grid-cols-[16rem_1fr] md:py-32">
          <Reveal>
            <Eyebrow>{dict.aboutPage.stackLinks}</Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-wrap gap-2">
              {dict.aboutPage.stackChips.map((tech) => (
                <span
                  key={tech}
                  className="mono-label rounded-md border border-line px-2.5 py-1.5 text-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </Reveal>
            <Reveal>
              <ul className="flex flex-col">
                {site.socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hairline-t group flex items-center justify-between gap-4 py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="flex items-center gap-3">
                        <SocialIcon
                          network={social.key}
                          width={18}
                          height={18}
                          className="text-fg-faint transition-colors group-hover:text-fg"
                        />
                        <span className="text-sm font-medium">
                          {social.label}
                        </span>
                      </span>
                      <span className="mono-label text-fg-faint">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <p className="text-fg-muted">
                {dict.aboutPage.curiousPre}
                <Link
                  href={localePath("/products", lang)}
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                >
                  {dict.aboutPage.curiousProducts}
                </Link>
                {dict.aboutPage.curiousMid}
                <Link
                  href={localePath("/changelog", lang)}
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                >
                  {dict.aboutPage.curiousChangelog}
                </Link>
                {dict.aboutPage.curiousPost}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
