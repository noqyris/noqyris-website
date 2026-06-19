"use client";

import { useEffect, useRef } from "react";

const BASE_SPEED = 60; // px/s drift
const MAX_BOOST = 540; // px/s cap from scroll velocity

/**
 * Progressive enhancement over the pure-CSS marquee: a rAF loop drives the
 * track and multiplies its speed by scroll velocity, flipping direction with
 * scroll direction. Falls back to the CSS animation for no-JS and
 * reduced-motion visitors. Pauses on hover/focus (reading) and offscreen.
 */
export function MarqueeTrack({ half }: { half: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let halfWidth = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let direction = 1;
    let visible = true;
    let paused = false;
    let last = performance.now();
    let raf = 0;

    const measure = () => {
      halfWidth = el.scrollWidth / 2;
    };
    measure();
    el.classList.add("js-drive");

    // Re-measure on any intrinsic-width change — crucially after the web font
    // (var(--font-display)) swaps in, which reflows the track but never fires a
    // window 'resize'. A stale halfWidth would misalign the wrap seam, making
    // the loop visibly jump on the first scroll on a cold cache.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if ("fonts" in document) void document.fonts.ready.then(measure);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      // Re-arm the loop when it scrolls back into view; the tick parks itself
      // (raf = 0) while offscreen so it isn't spinning the main thread for a
      // below-the-fold decorative element on low-end devices.
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);

    const onScroll = () => {
      const y = window.scrollY;
      velocity += y - lastY;
      lastY = y;
    };

    const link = el.closest("a");
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    link?.addEventListener("pointerenter", pause);
    link?.addEventListener("pointerleave", resume);
    link?.addEventListener("focusin", pause);
    link?.addEventListener("focusout", resume);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      velocity *= 0.9;
      if (visible && halfWidth > 0) {
        if (Math.abs(velocity) > 2) direction = velocity > 0 ? 1 : -1;
        const boost = Math.min(Math.abs(velocity) * 6, MAX_BOOST);
        const speed = paused ? 0 : BASE_SPEED + boost;
        x = (((x + direction * speed * dt) % halfWidth) + halfWidth) % halfWidth;
        el.style.transform = `translateX(${-x}px)`;
      }
      // Park the loop while offscreen — the IntersectionObserver re-arms it.
      if (!visible) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      link?.removeEventListener("pointerenter", pause);
      link?.removeEventListener("pointerleave", resume);
      link?.removeEventListener("focusin", pause);
      link?.removeEventListener("focusout", resume);
      el.classList.remove("js-drive");
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className="marquee-track">
      <span className="marquee-text" aria-hidden="true">
        {half}
      </span>
      <span className="marquee-text" aria-hidden="true">
        {half}
      </span>
    </div>
  );
}
