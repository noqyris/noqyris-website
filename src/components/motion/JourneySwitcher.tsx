"use client";

import { useSyncExternalStore } from "react";
import { ScrollSequence } from "./ScrollSequence";

type V = "1" | "2" | "3";

const KEY = "journey-version-2"; // bumped: ignore stale preview choices → default V2
const EVT = "journey-version-change";
const DEFAULT: V = "2";

/** Persisted A/B/C choice, without setState-in-effect (lint-clean + reactive). */
function usePersistedVersion(): [V, (v: V) => void] {
  const v = useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVT, cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener(EVT, cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => {
      const s = localStorage.getItem(KEY);
      return s === "1" || s === "2" || s === "3" ? (s as V) : DEFAULT;
    },
    () => DEFAULT,
  );
  const set = (next: V) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(EVT));
  };
  return [v as V, set];
}

const VERSIONS: Record<
  V,
  { base: string; frames: number; poster: string; label: string }
> = {
  "1": {
    base: "/scroll/v1",
    frames: 361,
    poster: "/scroll/v1/poster.jpg",
    label: "V1 · 720p",
  },
  "2": {
    base: "/scroll/v2",
    frames: 361,
    poster: "/scroll/v2/poster.jpg",
    label: "V2 · 1080p",
  },
  "3": {
    base: "/scroll/v3",
    frames: 361,
    poster: "/scroll/v3/poster.jpg",
    label: "V3 · HD",
  },
};

/**
 * A/B/C switch between the scroll-journey videos (preview tool). Holds the
 * chosen version (persisted, default V3) and feeds it to the frame sequence.
 * Switching remounts the sequence so the new frames load cleanly.
 */
export function JourneySwitcher() {
  const [v, choose] = usePersistedVersion();
  const cfg = VERSIONS[v];

  return (
    <>
      <ScrollSequence
        key={`seq-${v}`}
        base={cfg.base}
        frameCount={cfg.frames}
        poster={cfg.poster}
      />

      {/* preview A/B/C switch */}
      <div className="fixed right-5 bottom-5 z-40 flex items-center gap-1 rounded-full border border-line bg-bg/70 p-1 backdrop-blur-md">
        {(["1", "2", "3"] as V[]).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => choose(n)}
            aria-pressed={v === n}
            className={`mono-label rounded-full px-3 py-1.5 transition-colors ${
              v === n
                ? "bg-accent text-accent-ink"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {VERSIONS[n].label}
          </button>
        ))}
      </div>
    </>
  );
}
