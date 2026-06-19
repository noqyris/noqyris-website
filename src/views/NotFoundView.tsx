import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Container } from "@/components/layout/Container";

export function NotFoundView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  return (
    <section className="flex min-h-[70svh] items-center">
      <Container className="flex flex-col gap-8">
        <h1 className="flex flex-col gap-4">
          <span className="outline-text font-display text-[clamp(7rem,24vw,18rem)] leading-none font-semibold">
            404
          </span>
          <span className="text-display-lg">
            {dict.notFound.h1.pre}
            <span className="serif-em text-accent">{dict.notFound.h1.em}</span>
            {dict.notFound.h1.post}
          </span>
        </h1>
        <p className="max-w-md text-lg text-fg-muted">{dict.notFound.body}</p>
        <div>
          <Link
            href={localePath("/", lang)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-colors hover:bg-fg"
          >
            {dict.notFound.backHome}
          </Link>
        </div>
      </Container>
    </section>
  );
}
