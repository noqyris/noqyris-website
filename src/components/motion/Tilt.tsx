"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Subtle 3D tilt — the wrapped element rotates toward the pointer in
 * perspective, then eases back on leave. One rAF spring, transform-only.
 * Desktop hover only; disabled under reduced-motion. SSR renders the child
 * flat, so there is no hydration cost or layout shift.
 */
export function Tilt({
  children,
  max = 5,
  className,
}: {
  children: React.ReactNode;
  /** Max rotation in degrees. */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      rx += (targetX - rx) * 0.14;
      ry += (targetY - ry) * 0.14;
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      if (Math.abs(targetX - rx) > 0.01 || Math.abs(targetY - ry) > 0.01) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = 0;
        el.style.willChange = "auto"; // drop the layer hint once at rest
      }
    };
    const kick = () => {
      if (!raf) {
        el.style.willChange = "transform"; // promote only for the active spring
        raf = requestAnimationFrame(apply);
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetY = px * max * 2;
      targetX = -py * max * 2;
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
  }, [max]);

  return (
    <div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}
