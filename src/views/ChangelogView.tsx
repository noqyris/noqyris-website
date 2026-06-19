import { getChangelog } from "@/content/changelog";
import { getServices } from "@/content/services";
import { site } from "@/content/site";
import type { ChangelogEntry } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TagBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { FollowTheBuild } from "@/components/shared/FollowTheBuild";
import { CtaSection } from "@/components/shared/CtaSection";

function monthOf(date: string, lang: Locale) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(
    lang === "sr" ? "sr-Latn" : "en-US",
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );
}

export function ChangelogView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const changelog = getChangelog(lang);
  const services = getServices(lang);

  // Live open-startup numbers, folded in from the former /open page. Every
  // figure is derived from the content layer — nothing is typed in twice.
  const stats = dict.openPage.stats.map((stat) => ({
    value: t(stat.value, {
      services: `0${services.length}`,
      changelog: `${changelog.length}`.padStart(2, "0"),
    }),
    label: stat.label,
  }));

  const months: { month: string; entries: ChangelogEntry[] }[] = [];
  for (const entry of changelog) {
    const month = monthOf(entry.date, lang);
    const group = months.find((g) => g.month === month);
    if (group) {
      group.entries = [...group.entries, entry];
    } else {
      months.push({ month, entries: [entry] });
    }
  }

  return (
    <>
      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-16 md:pt-28 md:pb-20">
          <Eyebrow>{dict.changelogPage.eyebrow}</Eyebrow>
          <h1 className="text-display-xl max-w-4xl">
            {dict.changelogPage.h1.pre}
            <span className="serif-em text-accent">
              {dict.changelogPage.h1.em}
            </span>
            {dict.changelogPage.h1.post}
          </h1>
          <p className="max-w-xl text-lg text-fg-muted">
            {dict.changelogPage.hero}
          </p>
          <a
            href="/feed.xml"
            className="mono-label w-fit rounded-full border border-line px-3 py-1.5 text-fg-muted transition-colors hover:border-accent hover:text-accent"
          >
            {dict.changelogPage.rss}
          </a>
        </Container>
      </section>

      <section aria-label={dict.openPage.metricsAria}>
        <Container className="flex flex-col gap-6 pb-20 md:pb-28">
          <Reveal>
            <Eyebrow>{dict.openPage.numbers}</Eyebrow>
          </Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60} className="h-full bg-bg">
                <div className="flex h-full flex-col gap-3 p-7">
                  <dd className="font-display text-5xl font-semibold">
                    <CountUp value={stat.value} />
                  </dd>
                  <dt className="mono-label text-fg-faint">{stat.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
          {site.revenue && (
            <Reveal>
              <div className="flex flex-col gap-4 rounded-card border border-accent/40 p-7 md:flex-row md:items-end md:justify-between md:p-10">
                <div>
                  <p className="mono-label text-accent">
                    {dict.openPage.mrrLabel}
                  </p>
                  <p className="font-display mt-3 text-6xl font-semibold md:text-7xl">
                    {site.revenue}
                  </p>
                </div>
                <p className="max-w-md text-fg-muted">{dict.openPage.mrrNote}</p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <section aria-label={dict.changelogPage.entriesAria}>
        <Container className="flex flex-col gap-16 pb-24 md:pb-32">
          {months.map((group) => (
            <div key={group.month} className="flex flex-col gap-2">
              <Reveal>
                <h2 className="mono-label text-fg-faint">{group.month}</h2>
              </Reveal>
              <div>
                {group.entries.map((entry, i) => (
                  <Reveal key={`${entry.date}-${entry.title}`} delay={i * 50}>
                    <div className="hairline-t grid gap-x-8 gap-y-2 py-6 md:grid-cols-[8rem_6rem_1fr] md:items-baseline">
                      <time
                        dateTime={entry.date}
                        className="mono-label text-fg-faint"
                      >
                        {entry.date}
                      </time>
                      <div>
                        <TagBadge tag={entry.tag} lang={lang} />
                      </div>
                      <div>
                        <h3 className="font-medium">{entry.title}</h3>
                        {entry.body && (
                          <p className="mt-1 text-sm text-fg-muted">
                            {entry.body}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <FollowTheBuild
        lang={lang}
        eyebrow={dict.changelogPage.followEyebrow}
        intro={dict.changelogPage.followIntro}
      />
      <CtaSection lang={lang} />
    </>
  );
}
