"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * The hero "dives away" as you scroll into the page — content scales up,
 * lifts, and fades while the dot-field and glow linger behind it. Scroll-linked
 * (cross-browser, unlike the CSS scroll-timeline it replaces). Static under
 * prefers-reduced-motion.
 */
export function HeroStage({
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
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity, y, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
