import Link from "next/link";
import { getOffer } from "@/content/offer";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { ArrowIcon } from "@/components/icons";

/** The de-risked first step — fixed price, fixed length, guaranteed.
 *  Stretched-link pattern: the whole card is clickable, but the accessible
 *  link is just "Book the sprint" — not a 120-word utterance. */
export function EntryOfferCard({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const entryOffer = getOffer(lang).entryOffer;
  return (
    <div className="group relative overflow-hidden rounded-card border border-accent/40 transition-colors hover:border-accent">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(560px circle at 12% 0%, rgba(212,255,79,0.10), transparent 70%), var(--color-surface)",
        }}
      />
      <div className="relative flex flex-col gap-8 p-7 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mono-label text-accent">
              {dict.entryOfferCard.eyebrow}
            </p>
            <h3 className="text-display-md mt-3">
              {entryOffer.name}
              <span className="serif-em text-accent">.</span>
            </h3>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-semibold">
              {entryOffer.price ?? entryOffer.length}
            </p>
            {entryOffer.price && (
              <p className="mono-label mt-1 text-fg-faint">
                {entryOffer.length}
              </p>
            )}
          </div>
        </div>

        <p className="max-w-2xl text-fg-muted">{entryOffer.description}</p>

        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {entryOffer.deliverables.map((d) => (
            <li key={d.title} className="flex gap-3 text-sm">
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span>
                <span className="font-medium">{d.title}</span>{" "}
                <span className="text-fg-muted">— {d.body}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm text-fg-muted italic">
            “{entryOffer.guarantee}”
          </p>
          <Link
            href={localePath("/start", lang)}
            aria-label={t(dict.entryOfferCard.bookAria, { name: entryOffer.name })}
            className="flex items-center gap-2 text-sm font-medium text-fg transition-colors after:absolute after:inset-0 group-hover:text-accent"
          >
            {dict.entryOfferCard.book}
            <ArrowIcon
              width={18}
              height={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
