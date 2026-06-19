"use client";

import { useEffect } from "react";

/**
 * Cursor spotlight for any element with [data-spotlight]: a soft accent
 * glow follows the pointer across the card. One delegated listener for the
 * whole site; hover-capable devices only, and skipped under reduced motion
 * (the ::after is CSS-gated too, but bailing here avoids the per-pointer work).
 */
export function Spotlight() {
  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let current: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-spotlight]",
      ) as HTMLElement | null;

      if (current && current !== target) {
        current.classList.remove("spot-on");
        current = null;
      }
      if (!target) return;

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      target.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      if (current !== target) {
        target.classList.add("spot-on");
        current = target;
      }
    };

    const onLeave = () => {
      current?.classList.remove("spot-on");
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      current?.classList.remove("spot-on");
    };
  }, []);

  return null;
}
