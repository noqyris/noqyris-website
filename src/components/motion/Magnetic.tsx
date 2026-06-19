"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Cursor-magnet wrapper — the child eases toward the pointer while hovered,
 * then springs back on leave. Pure transform writes on a single rAF loop.
 * Desktop hover only; disabled under reduced-motion. SSR renders the child
 * unchanged, so there is no hydration cost.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let targetX = 0;
    let targetY = 0;

    const loop = () => {
      tx += (targetX - tx) * 0.18;
      ty += (targetY - ty) * 0.18;
      el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
      if (Math.abs(targetX - tx) > 0.1 || Math.abs(targetY - ty) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
        el.style.willChange = "auto"; // drop the layer hint once at rest
      }
    };
    const kick = () => {
      if (!raf) {
        el.style.willChange = "transform"; // promote only for the active spring
        raf = requestAnimationFrame(loop);
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      targetX = (e.clientX - (r.left + r.width / 2)) * strength;
      targetY = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {children}
    </span>
  );
}
