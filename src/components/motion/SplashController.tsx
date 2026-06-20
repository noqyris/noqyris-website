"use client";

import { useEffect } from "react";

// Must outlast the CSS curtain in globals.css: the intro video plays, the
// curtain rises at 4.7s over 0.72s (reveal done ~5.42s). Keep in sync if the
// video length or the curtain timing changes.
const SPLASH_MS = 5500;
const VIDEO = "/splash.mp4";
const POSTER = "/splash-poster.jpg";

/**
 * Lifecycle for the server-rendered <Splash> overlay: flags the session so
 * reloads skip it, locks scroll while it plays, sets the video source + plays it
 * muted (so repeat/reduced-motion visits never fetch the clip), then removes it
 * from the DOM. The curtain reveal itself is pure CSS; this handles play+cleanup.
 */
export function SplashController() {
  useEffect(() => {
    // Mark seen immediately — a reload mid-intro should still skip next time.
    try {
      sessionStorage.setItem("nq_splash", "1");
    } catch {
      /* private mode / storage disabled — splash simply replays each load */
    }

    const html = document.documentElement;
    const el = document.getElementById("splash");
    // Skip (and never fetch the clip) on repeat sessions or reduced motion.
    // Check the media query directly too — don't rely only on the pre-paint
    // class, which can lag the actual setting in some environments.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || html.classList.contains("splash-skip")) {
      return;
    }

    // Lock scroll on <html> — Header toggles body.style.overflow for its mobile
    // menu, so locking body here would be clobbered by Header's mount effect.
    html.style.overflow = "hidden";

    // Attach + play only now (not on skipped visits) so the clip isn't fetched
    // when the splash won't show. Muted is required for autoplay.
    const video = el.querySelector("video");
    if (video) {
      video.poster = POSTER;
      video.muted = true;
      video.src = VIDEO;
      void video.play?.().catch(() => {
        /* autoplay blocked — the curtain still lifts on schedule */
      });
    }

    const timer = window.setTimeout(() => {
      el.remove();
      html.style.overflow = "";
    }, SPLASH_MS);

    return () => {
      window.clearTimeout(timer);
      html.style.overflow = "";
    };
  }, []);

  return null;
}
