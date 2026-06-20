/**
 * Brand splash — a short intro video (the animated "noqyris." wordmark) that
 * covers the screen on the first visit of a session, then the curtain
 * (globals.css) rises to reveal the site. Rendered server-side so it's in the
 * document on first paint (no flash of content before it shows).
 *
 * The <video> intentionally has no `src` here: SplashController sets the source
 * and plays it (muted) only when the splash actually runs, so repeat visits and
 * reduced-motion never fetch the clip. Once-per-session + reduced-motion are
 * gated by the inline script in the root layout (adds `splash-skip` pre-paint).
 */
export function Splash() {
  return (
    <div id="splash" className="splash" aria-hidden="true">
      <video className="splash-video" muted playsInline preload="none" />
    </div>
  );
}
