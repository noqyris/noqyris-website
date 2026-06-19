import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export function AvailabilityBadge({
  lang,
  className,
  inverted = false,
}: {
  lang: Locale;
  className?: string;
  /** For accent-background (lime) sections. */
  inverted?: boolean;
}) {
  const dict = getDictionary(lang);
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-2.5",
        inverted ? "text-accent-ink/70" : "text-fg-muted",
        className,
      )}
    >
      <span
        className={cn(
          "availability-dot size-2 rounded-full",
          inverted ? "bg-accent-ink" : "bg-accent",
        )}
      />
      {dict.site.availability}
    </span>
  );
}

const statusStyles = {
  live: "bg-accent text-accent-ink",
  beta: "border border-accent/40 text-accent",
  building: "border border-line text-fg-faint",
} as const;

export function StatusBadge({
  status,
  lang,
  className,
}: {
  status: keyof typeof statusStyles;
  lang: Locale;
  className?: string;
}) {
  const dict = getDictionary(lang);
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center rounded-full px-2.5 py-1",
        statusStyles[status],
        className,
      )}
    >
      {dict.badge.status[status]}
    </span>
  );
}

const tagStyles = {
  product: "border border-accent/40 text-accent",
  studio: "border border-line text-fg-muted",
  site: "border border-line text-fg-faint",
} as const;

export function TagBadge({
  tag,
  lang,
  className,
}: {
  tag: keyof typeof tagStyles;
  lang: Locale;
  className?: string;
}) {
  const dict = getDictionary(lang);
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center rounded-md px-2 py-0.5",
        tagStyles[tag],
        className,
      )}
    >
      {dict.badge.tag[tag]}
    </span>
  );
}
