"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { sliceForPath, type Slice } from "./journeyChapters";

/** Motion-on only — runs on mobile and desktop (reduced-motion shows poster). */
function useEnabled() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Scroll-scrubbed image sequence behind the whole site — page scroll drives
 * which pre-decoded frame is painted to a canvas. Drawing a cached image is
 * instant (unlike seeking a video), so the journey glides. A lerp eases the
 * frame index for extra smoothness. Desktop + motion only; mobile /
 * reduced-motion show the static poster.
 *
 * `base` is the asset folder (e.g. "/scroll/v2"); frames live at
 * `${base}/frames/f_001.jpg…`.
 */
export function ScrollSequence({
  base,
  frameCount,
  poster,
}: {
  base: string;
  frameCount: number;
  poster: string;
}) {
  const enabled = useEnabled();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliceRef = useRef<Slice>(sliceForPath(pathname));
  const windToRef = useRef<(f: number) => void>(() => {});

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frameSrc = (i: number) =>
      `${base}/frames/f_${String(i + 1).padStart(3, "0")}.jpg`;

    // preload every frame (compressed in memory; decoded lazily on first draw)
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      imgs.push(img);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      lastIdx = -1;
      kick();
    };

    const drawCover = (img: HTMLImageElement) => {
      if (!img.complete || !img.naturalWidth) return false;
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      let dw = cw;
      let dh = cw / ir;
      if (dh < ch) {
        dh = ch;
        dw = ch * ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      return true;
    };

    let raf = 0;
    let target = 0;
    let current = 0;
    let lastIdx = -1;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const [s, e] = sliceRef.current;
      return s + p * (e - s); // page scroll → this page's slice of the timeline
    };

    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0008) current = target;
      const idx = Math.round(current * (frameCount - 1));
      if (idx !== lastIdx && drawCover(imgs[idx])) lastIdx = idx;
      raf = Math.abs(target - current) > 0.0008 ? requestAnimationFrame(tick) : 0;
    };

    function kick() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    // Wind toward a specific timeline fraction (used on navigation). `current`
    // is preserved, so the film eases there instead of snapping to frame 0.
    windToRef.current = (f: number) => {
      target = f;
      kick();
    };

    const onScroll = () => {
      target = progress();
      kick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    target = progress();
    current = target;
    const warm = window.setInterval(() => {
      lastIdx = -1;
      kick();
      if (imgs[Math.round(current * (frameCount - 1))]?.complete) {
        window.clearInterval(warm);
      }
    }, 120);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(warm);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      windToRef.current = () => {};
    };
  }, [enabled, base, frameCount]);

  // On navigation, wind the film to the new page's slice start instead of
  // snapping back to frame 0 — each route owns its moment in the journey.
  useEffect(() => {
    sliceRef.current = sliceForPath(pathname);
    windToRef.current(sliceRef.current[0]);
  }, [pathname]);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
      {enabled && <canvas ref={canvasRef} className="absolute inset-0 size-full" />}
      <div className="absolute inset-0 bg-bg/60" />
    </div>
  );
}
