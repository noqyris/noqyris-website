// The journey video is one continuous film; each route owns a slice of its
// timeline (fractions 0..1). Scrolling a page scrubs within its slice, and
// navigating winds the film to the next page's slice — so moving deeper into
// the site moves deeper into the journey, instead of snapping back to frame 0.
export type Slice = readonly [number, number];

// Contiguous, non-overlapping, narrative order. Home is the opening
// (spark → MacBook) and the longest page, so it gets the largest slice;
// `start` (the CTA) gets the closing settle.
const CHAPTERS: Record<string, Slice> = {
  "": [0.0, 0.4], // home
  services: [0.4, 0.55],
  products: [0.55, 0.68],
  process: [0.68, 0.78],
  changelog: [0.78, 0.88],
  about: [0.88, 0.95],
  start: [0.95, 1.0], // CTA — the closing beat
};

const HOME: Slice = CHAPTERS[""];

/** Map a pathname (any locale, incl. /sr and detail routes) to its slice. */
export function sliceForPath(pathname: string): Slice {
  let p = pathname || "/";
  if (p === "/sr") p = "/";
  else if (p.startsWith("/sr/")) p = p.slice(3); // "/sr/services" → "/services"
  const seg = p.split("/")[1] ?? ""; // first segment; detail pages share parent
  return CHAPTERS[seg] ?? HOME;
}
