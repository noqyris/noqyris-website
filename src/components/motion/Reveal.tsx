"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal when intersecting, or when already scrolled past (fast
          // jumps — End key, anchor links — can skip the intersection).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-inview");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
  }
  return sharedObserver;
}

/** Scroll-reveal wrapper. Hidden state is gated behind `html.js` in CSS, so
 *  content stays visible for no-JS visitors and crawlers. */
export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** "rise" — a stronger blur-up reveal, for big section headings. */
  variant?: "fade" | "rise";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already past it on mount (deep link / restored scroll) — show at once.
    if (el.getBoundingClientRect().top < 0) {
      el.classList.add("is-inview");
      return;
    }
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(variant === "rise" ? "reveal-rise" : "reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
