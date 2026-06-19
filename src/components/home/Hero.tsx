import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { localePath } from "@/i18n/config";
import { site } from "@/content/site";
import { getServices } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { KineticHeadline } from "@/components/motion/KineticHeadline";
import { HeroField } from "@/components/motion/HeroField";
import { HeroStage } from "@/components/motion/HeroStage";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";

export function Hero({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const serviceCount = `0${getServices(lang).length}`;

  const heroMeta = dict.hero.stats.map((stat) => ({
    value: t(stat.value, {
      services: serviceCount,
    }),
    label: stat.label,
  }));

  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden pt-20 pb-16 md:pt-20 md:pb-20">
      {/* The scroll-scrubbed journey video (global, behind everything) is the
          hero backdrop too — no separate hero background here. */}
      <HeroField />
      <HeroStage className="relative w-full">
      <Container className="relative flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <AvailabilityBadge lang={lang} />
          <span className="mono-label hidden text-fg-faint sm:inline">
            {dict.hero.eyebrow}
          </span>
        </div>

        <h1 className="text-display-xl max-w-5xl">
          <KineticHeadline text={dict.hero.h1.pre} />{" "}
          <span className="serif-em hero-follow inline-block text-accent">
            {dict.hero.h1.em}
          </span>
          <span className="serif-em hero-follow inline-block text-accent">
            {dict.hero.h1.post}
          </span>
        </h1>

        <p
          className="hero-follow max-w-xl text-lg text-fg-muted"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          {t(dict.hero.body, { name: site.name })}
        </p>

        <div
          className="hero-follow flex flex-wrap items-center gap-4"
          style={{ "--delay": "380ms" } as React.CSSProperties}
        >
          <Magnetic>
            <Button href={localePath("/start", lang)} size="lg">
              {dict.hero.ctaPrimary}
            </Button>
          </Magnetic>
          <Button
            href={localePath("/services", lang)}
            variant="ghost"
            size="lg"
          >
            {dict.hero.ctaSecondary}
          </Button>
        </div>

        <div
          className="hero-follow hairline-t flex flex-col gap-4 pt-8"
          style={{ "--delay": "460ms" } as React.CSSProperties}
        >
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {heroMeta.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="mono-label order-last mt-1 text-fg-faint">
                  {item.label}
                </dt>
                <dd className="font-display text-2xl font-semibold">
                  <CountUp value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href={localePath("/changelog", lang)}
            className="mono-label w-fit text-fg-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {dict.hero.openDashboard}
          </Link>
        </div>
      </Container>
      </HeroStage>

      {/* Scroll cue — a lime glint travelling down a hairline, bottom-right. */}
      <div
        className="absolute right-6 bottom-7 hidden flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="mono-label [writing-mode:vertical-rl] text-fg-faint">
          {dict.hero.scroll}
        </span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
