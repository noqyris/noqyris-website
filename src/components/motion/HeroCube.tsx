"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * The hero's signature mark: the lime square promoted to a 3D cube. It floats
 * and slowly tumbles (CSS), and tilts toward the cursor (the rAF spring here).
 * Cursor tilt is gated to hover-capable, motion-on devices; the float/spin are
 * gated in CSS by prefers-reduced-motion. Decorative — aria-hidden.
 */
export function HeroCube({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      ty = nx * 18; // rotateY follows horizontal
      tx = ny * -18; // rotateX follows vertical (inverted)
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={className} style={style} aria-hidden="true">
      <div className="cube-float">
        <div ref={tiltRef} className="cube-tilt">
          <div className="cube-spin">
            <span className="cube-face cube-front" />
            <span className="cube-face cube-back" />
            <span className="cube-face cube-right" />
            <span className="cube-face cube-left" />
            <span className="cube-face cube-top" />
            <span className="cube-face cube-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}
