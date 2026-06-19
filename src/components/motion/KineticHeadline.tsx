"use client";

import { useEffect, useRef } from "react";

const BASE = 450;
const PEAK = 700;
const RADIUS = 160;

/**
 * Signature moment #1 — per-character variable-weight headline.
 * Characters render server-side (no hydration flash); load-in is pure CSS.
 * On hover-capable devices a single rAF loop lerps each character's wght
 * toward the cursor within RADIUS px.
 */
export function KineticHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = Array.from(
      el.querySelectorAll<HTMLSpanElement>(".kinetic-char"),
    );
    const weights = chars.map(() => BASE);
    // Char centers are cached and refreshed at most once per frame batch —
    // an interleaved read/write loop would force a reflow per character.
    let centers: { x: number; y: number }[] | null = null;
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let running = false;

    const measure = () => {
      centers = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };
    const invalidate = () => {
      centers = null;
    };

    const tick = () => {
      if (!centers) measure();
      let settled = true;
      for (let i = 0; i < chars.length; i++) {
        let target = BASE;
        if (pointer && centers) {
          const dx = centers[i].x - pointer.x;
          const dy = centers[i].y - pointer.y;
          const t = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
          target = BASE + (PEAK - BASE) * t * t;
        }
        weights[i] += (target - weights[i]) * 0.12;
        if (Math.abs(target - weights[i]) > 0.5) settled = false;
        chars[i].style.setProperty("--wght", weights[i].toFixed(1));
      }
      // Stop once weights settle; pointermove restarts the loop. Without
      // this, a cursor parked on the hero would spin the loop forever.
      if (!settled) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      start();
    };
    const onLeave = () => {
      pointer = null;
      start();
    };

    const zone = el.closest("section") ?? el;
    zone.addEventListener("pointermove", onMove as EventListener);
    zone.addEventListener("pointerleave", onLeave);
    zone.addEventListener("pointercancel", onLeave);
    window.addEventListener("resize", invalidate);
    window.addEventListener("scroll", invalidate, { passive: true });
    return () => {
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerleave", onLeave);
      zone.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("resize", invalidate);
      window.removeEventListener("scroll", invalidate);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, ci) => {
                const i = charIndex++;
                return (
                  <span
                    key={ci}
                    className="kinetic-char"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
