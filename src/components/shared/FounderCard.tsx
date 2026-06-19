import Image from "next/image";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

export function FounderAvatar({
  size = "size-16",
  textSize = "text-xl",
}: {
  size?: string;
  textSize?: string;
}) {
  if (site.founderImage) {
    return (
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden rounded-full border border-line",
          size,
        )}
      >
        <Image
          src={site.founderImage}
          alt={site.founder}
          fill
          sizes="96px"
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-display flex shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-semibold text-accent",
        size,
        textSize,
      )}
    >
      {site.founderInitials}
    </span>
  );
}

/** The human behind the studio — shown wherever a prospect decides
 *  whether to reach out. */
export function FounderCard({ lang, note }: { lang: Locale; note: string }) {
  const dict = getDictionary(lang);
  return (
    <div className="flex items-start gap-5 rounded-card border border-line bg-surface p-6">
      <FounderAvatar />
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-lg font-medium">{site.founder}</p>
        <p className="mono-label text-fg-faint">{dict.site.location}</p>
        <p className="mt-1 max-w-md text-sm text-fg-muted">{note}</p>
      </div>
    </div>
  );
}
