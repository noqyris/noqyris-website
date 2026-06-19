"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = { en: "EN", sr: "SR" };

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 text-sm"
      role="group"
      aria-label="Language"
    >
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-fg-faint">/</span>}
          <Link
            href={switchLocalePath(pathname, loc)}
            hrefLang={loc}
            aria-current={loc === lang ? "true" : undefined}
            className={cn(
              "mono-label transition-colors",
              loc === lang ? "text-fg" : "text-fg-faint hover:text-fg",
            )}
          >
            {labels[loc]}
          </Link>
        </span>
      ))}
    </div>
  );
}
