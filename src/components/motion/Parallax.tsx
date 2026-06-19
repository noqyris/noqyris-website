"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Scroll-linked parallax — shifts a (usually decorative) layer at a different
 * rate than the page, for depth. `speed` is the peak travel in px across the
 * element's full pass through the viewport; positive drifts up as you scroll
 * down (background recedes). Static under prefers-reduced-motion.
 */
export function Parallax({
  children,
  className,
  speed = 80,
  axis = "y",
  "aria-hidden": ariaHidden,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  axis?: "x" | "y";
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  if (reduce) {
    return (
      <div className={className} aria-hidden={ariaHidden}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden={ariaHidden}
      style={
        axis === "x"
          ? { x: offset, willChange: "transform" }
          : { y: offset, willChange: "transform" }
      }
    >
      {children}
    </motion.div>
  );
}
