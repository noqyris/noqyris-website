"use client";

import { useEffect } from "react";

// Must outlast the CSS sequence in globals.css (cube sweeps right writing the
// word → ignite flash → hold → curtain, which ends at ~2.17s). Keep in sync if
// the timing there changes.
const SPLASH_MS = 2350;

/**
 * Lifecycle for the server-rendered <Splash> overlay: flags the session so
 * reloads skip it, locks scroll while it plays, then removes it from the DOM.
 * Renders nothing. The visual is entirely CSS; this only handles cleanup.
 */
export function SplashController() {
  useEffect(() => {
    // Mark seen immediately — a reload mid-animation should still skip next time.
    try {
      sessionStorage.setItem("nq_splash", "1");
    } catch {
      /* private mode / storage disabled — splash simply replays each load */
    }

    const html = document.documentElement;
    const el = document.getElementById("splash");
    if (!el || html.classList.contains("splash-skip")) {
      return;
    }

    // Lock scroll on <html> — Header toggles body.style.overflow for its mobile
    // menu, so locking body here would be clobbered by Header's mount effect.
    html.style.overflow = "hidden";
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
