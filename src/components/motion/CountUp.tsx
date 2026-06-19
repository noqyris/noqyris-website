"use client";

import { useEffect, useRef } from "react";

type Parsed = {
  num: number;
  prefix: string;
  suffix: string;
  pad: number;
  grouped: boolean;
};

/** Split "03" / "2026" / "$1,240 MRR" into number + affixes. Non-numeric → null. */
function parse(value: string): Parsed | null {
  const m = value.match(/^(\D*)(\d[\d,]*)(\D*)$/);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  const num = Number.parseInt(raw, 10);
  if (!Number.isFinite(num)) return null;
  return {
    num,
    prefix: m[1],
    suffix: m[3],
    pad: raw.length,
    grouped: m[2].includes(","),
  };
}

function format(n: number, p: Parsed): string {
  const body = p.grouped
    ? n.toLocaleString("en-US")
    : String(n).padStart(p.pad, "0");
  return p.prefix + body + p.suffix;
}

/**
 * Odometer count-up. The final value renders server-side (no-JS + SEO safe);
 * once in view, the number animates 0 → target. Non-numeric values ("Remote")
 * and zero pass straight through untouched. Reduced-motion shows the target.
 */
export function CountUp({
  value,
  className,
  duration = 1100,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parse(value);
    if (!parsed || parsed.num === 0) return;
    // Don't odometer a year (e.g. "2026") — counting it up from 0 reads as a
    // gimmick and flashes nonsense interim figures. Render it static instead.
    const isYear =
      !parsed.prefix &&
      !parsed.suffix &&
      parsed.pad === 4 &&
      parsed.num >= 1900 &&
      parsed.num <= 2999;
    if (isYear) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = format(Math.round(eased * parsed.num), parsed);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          el.textContent = format(0, parsed);
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <>
      {/* Assistive tech always reads the true final figure; only the visual
          layer animates (and the transient 0 never reaches the a11y tree). */}
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className={className}>
        {value}
      </span>
    </>
  );
}
