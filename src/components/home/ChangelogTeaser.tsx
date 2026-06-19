import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";
import { getChangelog } from "@/content/changelog";
import { Container } from "@/components/layout/Container";
import {
  SectionHeading,
  SectionNumeral,
} from "@/components/ui/SectionHeading";
import { TagBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function ChangelogTeaser({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const latest = getChangelog(lang).slice(0, 3);

  return (
    <section className="hairline-t" aria-label={dict.changelogTeaser.aria}>
      <Container className="relative flex flex-col gap-12 py-24 md:py-32">
        <SectionNumeral n="03" />
        <Reveal variant="rise" className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.changelogTeaser.eyebrow}>
            {dict.changelogTeaser.h1.pre}
            <span className="serif-em">{dict.changelogTeaser.h1.em}</span>
            {dict.changelogTeaser.h1.post}
          </SectionHeading>
          <Link
            href={localePath("/changelog", lang)}
            className="text-sm text-fg-muted transition-colors hover:text-fg"
          >
            {dict.changelogTeaser.full}
          </Link>
        </Reveal>

        <div>
          {latest.map((entry, i) => (
            <Reveal key={`${entry.date}-${entry.title}`} delay={i * 60}>
              <div className="hairline-t grid gap-x-8 gap-y-2 py-6 md:grid-cols-[8rem_6rem_1fr] md:items-baseline">
                <time dateTime={entry.date} className="mono-label text-fg-faint">
                  {entry.date}
                </time>
                <div>
                  <TagBadge tag={entry.tag} lang={lang} />
                </div>
                <div>
                  <h3 className="font-medium">{entry.title}</h3>
                  {entry.body && (
                    <p className="mt-1 text-sm text-fg-muted">{entry.body}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
