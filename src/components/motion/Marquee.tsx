import { MarqueeTrack } from "./MarqueeTrack";

/**
 * Signature moment #2 — typographic outline-text marquee. CSS animation as
 * the baseline (no-JS, reduced-motion); MarqueeTrack upgrades it to a
 * scroll-velocity-reactive drive when JS is available.
 */
export function Marquee({
  text,
  href,
  label,
}: {
  text: string;
  href: string;
  label: string;
}) {
  // NBSP separators: a flex item's trailing regular space gets trimmed,
  // which would jam the loop seam ("…build —Available…").
  const half = `${text} ${text} `;
  return (
    <a
      href={href}
      aria-label={label}
      className="marquee hairline-t block border-b border-line py-6"
    >
      <MarqueeTrack half={half} />
    </a>
  );
}
