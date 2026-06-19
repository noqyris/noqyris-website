import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

// Concrete, verifiable signals — specificity beats vague reassurance, and
// surfacing the guarantee early lifts trust and willingness to pay. Kept to
// a single low-complexity row (clean first impression = stronger trust).
export function TrustBar({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  return (
    <section className="hairline-t border-b border-line" aria-label={dict.trustBar.aria}>
      <Container>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 py-6 lg:grid-cols-4">
          {dict.trustBar.signals.map((signal) => (
            <li key={signal} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="text-accent">
                ✓
              </span>
              <span className="mono-label text-fg-muted">{signal}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
