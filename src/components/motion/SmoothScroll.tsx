"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Global smooth-scroll (Lenis) — the buttery, inertial scroll that makes the
 * scroll-linked motion feel cinematic. Attaches to the window in `root` mode
 * and runs its own rAF. Disabled entirely under prefers-reduced-motion (native
 * scroll), so accessibility and the splash scroll-lock are never fought.
 *
 * Lenis suppresses Next's default scroll-to-top on navigation, so we reset it
 * ourselves on every pathname change (immediate jump, no smooth scroll-up).
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  if (reduce) return null;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    />
  );
}
