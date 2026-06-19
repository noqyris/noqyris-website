"use client";

export function ReplaySplash() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          sessionStorage.removeItem("nq_splash");
        } catch {
          /* ignore */
        }
        window.location.reload();
      }}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-colors hover:bg-fg"
    >
      Replay splash <span aria-hidden="true">↻</span>
    </button>
  );
}
