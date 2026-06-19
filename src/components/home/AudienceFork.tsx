import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/** The dual-audience fork: visitors self-select within 1.5 viewports. */
export function AudienceFork({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  const forks = [
    {
      eyebrow: dict.fork.users.eyebrow,
      title: dict.fork.users.title,
      body: dict.fork.users.body,
      link: dict.fork.users.link,
      href: "/changelog",
    },
    {
      eyebrow: dict.fork.clients.eyebrow,
      title: dict.fork.clients.title,
      body: dict.fork.clients.body,
      link: dict.fork.clients.link,
      href: "/services",
    },
  ];

  return (
    <section aria-label={dict.fork.aria}>
      <Container className="grid gap-4 pt-16 pb-24 md:grid-cols-2 md:pt-24 md:pb-32">
        {forks.map((fork, i) => (
          <ScrollReveal
            key={fork.href}
            from={i === 0 ? "left" : "right"}
            distance={110}
            exit={false}
            className="h-full"
          >
            <Link
              href={localePath(fork.href, lang)}
              className="group relative flex h-full flex-col gap-14 overflow-hidden rounded-card border border-line p-7 transition-colors hover:border-accent/40 md:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at 18% 0%, rgba(212,255,79,0.08), transparent 70%), var(--color-surface)",
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <p className="mono-label text-fg-faint">{fork.eyebrow}</p>
                <span
                  aria-hidden="true"
                  className="outline-text font-display text-4xl font-semibold"
                >
                  0{i + 1}
                </span>
              </div>
              <div className="relative flex flex-col gap-3">
                <h2 className="text-display-md">{fork.title}</h2>
                <p className="max-w-sm text-fg-muted">{fork.body}</p>
                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors group-hover:text-accent">
                  {fork.link}
                  <ArrowIcon
                    width={20}
                    height={20}
                    className="transition-transform group-hover:translate-x-1.5"
                  />
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </Container>
    </section>
  );
}
