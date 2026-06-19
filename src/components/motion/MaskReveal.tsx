"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Clip-path "curtain wipe" reveal for big headings — the text is unveiled
 * top-to-bottom as it scrolls into the lower-middle of the viewport, scrubbed
 * to scroll. More dramatic than a fade for hero-grade headlines. Static under
 * prefers-reduced-motion.
 */
export function MaskReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.42"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  );
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ clipPath, y, willChange: "clip-path, transform" }}
    >
      {children}
    </motion.div>
  );
}
