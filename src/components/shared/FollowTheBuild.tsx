import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Container } from "@/components/layout/Container";
import {
  SectionHeading,
  SectionNumeral,
} from "@/components/ui/SectionHeading";
import { SocialIcon, ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

/** Build-in-public social section — homepage + /changelog. */
export function FollowTheBuild({
  lang,
  eyebrow,
  intro,
  index,
}: {
  lang: Locale;
  eyebrow?: string;
  intro?: string;
  /** Homepage section numeral, e.g. "05". */
  index?: string;
}) {
  const dict = getDictionary(lang);
  const eyebrowText = eyebrow ?? dict.followBuild.eyebrow;
  const introText = intro ?? dict.followBuild.intro;
  const [primary, ...rest] = site.socials;

  return (
    <section className="hairline-t" aria-label={dict.followBuild.aria}>
      <Container className="relative flex flex-col gap-12 py-24 md:py-32">
        {index && <SectionNumeral n={index} />}
        <Reveal variant="rise">
          <SectionHeading eyebrow={eyebrowText}>
            {dict.followBuild.h1.pre}
            <span className="serif-em">{dict.followBuild.h1.em}</span>
            {dict.followBuild.h1.post}
          </SectionHeading>
          <p className="mt-4 max-w-xl text-lg text-fg-muted">{introText}</p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-3 lg:col-span-1">
            <a
              href={primary.url}
              target="_blank"
              rel="noopener noreferrer"
              data-spotlight
              className="group flex h-full flex-col justify-between gap-10 rounded-card border border-line bg-surface p-7 transition-colors hover:border-accent/50"
            >
              <SocialIcon network={primary.key} width={28} height={28} />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-medium">
                    {primary.handle}
                  </p>
                  <p className="mono-label mt-1.5 text-fg-faint">
                    {dict.site.socialNotes[primary.key]}
                  </p>
                </div>
                <ArrowIcon className="shrink-0 -rotate-45 text-fg-faint transition-colors group-hover:text-accent" />
              </div>
            </a>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:col-span-3 lg:col-span-2">
            {rest.map((social, i) => (
              <Reveal key={social.key} delay={i * 60}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-spotlight
                  className="group flex h-full flex-col justify-between gap-8 rounded-card border border-line p-5 transition-colors hover:border-accent/50 hover:bg-surface"
                >
                  <SocialIcon
                    network={social.key}
                    className="text-fg-muted transition-colors group-hover:text-fg"
                  />
                  <div>
                    <p className="text-sm font-medium">{social.label}</p>
                    <p className="mono-label mt-1 text-fg-faint">
                      {dict.site.socialNotes[social.key]}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
