"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type Direction = "up" | "down" | "left" | "right";

/**
 * Scroll-scrubbed reveal: content flies IN as the element enters the viewport
 * and (optionally) flies OUT as it leaves — tied directly to scroll position,
 * so the visitor "drives" the motion. Paired with Lenis smooth-scroll this is
 * the cinematic "scene" feel. Falls back to a plain element under
 * prefers-reduced-motion.
 *
 * `lead` (0–1) offsets where in the element's view-progress the entrance
 * completes — stagger a row of cards by passing 0, 0.06, 0.12, …
 */
export function ScrollReveal({
  children,
  className,
  from = "up",
  distance = 90,
  scaleFrom = 0.92,
  exit = true,
  lead = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: Direction;
  distance?: number;
  scaleFrom?: number;
  exit?: boolean;
  lead?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 = element's top edge at viewport bottom (entering); 1 = bottom edge at
  // viewport top (gone). The middle band is the "settled / in view" window.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const inEnd = Math.min(0.34 + lead, 0.6);
  const outStart = exit ? 0.72 : 1.2;
  const start =
    from === "down" || from === "left" ? -distance : distance;
  const exitEnd = exit ? -start : 0;
  const isX = from === "left" || from === "right";

  const translate = useTransform(
    scrollYProgress,
    [0, inEnd, outStart, 1],
    [start, 0, 0, exitEnd],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, inEnd * 0.85, outStart, 1],
    [0, 1, 1, exit ? 0 : 1],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, inEnd, outStart, 1],
    [scaleFrom, 1, 1, exit ? scaleFrom : 1],
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        isX
          ? { x: translate, opacity, scale, willChange: "transform, opacity" }
          : { y: translate, opacity, scale, willChange: "transform, opacity" }
      }
    >
      {children}
    </motion.div>
  );
}
