import type { CSSProperties } from "react";

const WORD = "noqyris";

/**
 * Brand splash — rendered server-side (in the document on first paint, so no
 * flash of content before it appears). The whole sequence is pure CSS
 * (globals.css): from frame 0 the lime cube races right like a cursor — hopping —
 * laying each letter of the wordmark down (pop) in its wake over a soft lime aura,
 * landing as the final dot with a glow flash, then the curtain reveals the site.
 *
 * Shown once per session and skipped under reduced motion — both gated by the
 * inline script in the root layout (adds `splash-skip` before paint).
 * `SplashController` clears it from the DOM and unlocks scroll when it's done.
 */
export function Splash() {
  return (
    <div id="splash" className="splash" aria-hidden="true">
      <div className="splash-logo">
        <span className="splash-word">
          {WORD.split("").map((ch, i) => (
            <span
              key={i}
              className="splash-char"
              style={{ "--i": i } as CSSProperties}
            >
              {ch}
            </span>
          ))}
        </span>
        <span className="splash-dot-travel">
          <span className="splash-dot-drop">
            <span className="splash-dot" />
          </span>
        </span>
      </div>
    </div>
  );
}
