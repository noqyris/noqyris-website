"use client";

import { useEffect, useRef } from "react";

const GAP = 28;
const RADIUS = 150;
const ACCENT = { r: 212, g: 255, b: 79 };

/**
 * Cursor-reactive dot field behind the hero — dots brighten and swell toward
 * the accent color near the pointer. Pure canvas, no dependencies. Renders a
 * static grid for touch/reduced-motion/no-JS; the interactive loop runs only
 * on hover-capable devices and stops when the effect settles.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const zone = (canvas.closest("section") ?? canvas) as HTMLElement;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let pointer: { x: number; y: number } | null = null;
    let influence = 0;
    let raf = 0;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          let t = 0;
          if (pointer && influence > 0) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            t = Math.max(0, 1 - d / RADIUS) * influence;
          }
          const r = 1 + 1.4 * t * t;
          const alpha = 0.055 + 0.45 * t * t;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle =
            t > 0.02
              ? `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha.toFixed(3)})`
              : `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const rect = zone.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const tick = () => {
      const target = pointer ? 1 : 0;
      influence += (target - influence) * 0.1;
      draw();
      if (pointer || influence > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        influence = 0;
        draw();
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = zone.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      start();
    };
    const onLeave = () => {
      pointer = null;
      start();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(zone);
    resize();

    const interactive =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (interactive) {
      zone.addEventListener("pointermove", onMove as EventListener);
      zone.addEventListener("pointerleave", onLeave);
      zone.addEventListener("pointercancel", onLeave);
    }

    return () => {
      ro.disconnect();
      if (interactive) {
        zone.removeEventListener("pointermove", onMove as EventListener);
        zone.removeEventListener("pointerleave", onLeave);
        zone.removeEventListener("pointercancel", onLeave);
      }
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
