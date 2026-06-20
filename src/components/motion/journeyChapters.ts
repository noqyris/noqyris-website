// The journey video is one continuous film. The home page plays the WHOLE film
// (scrolling it scrubs the entire timeline). Every other route winds to a
// specific second of that film and scrubs a short window there — so navigating
// "rewinds/forwards" to that moment instead of snapping back to the start.
export type Slice = readonly [number, number];

// 361 frames @ 24fps.
const DURATION = 15.04;
const at = (from: number, to: number): Slice =>
  [from / DURATION, to / DURATION] as const;

// Home = full film. Sub-pages = distinct seconds along the journey.
const CHAPTERS: Record<string, Slice> = {
  "": [0, 1], // home — the whole video
  services: at(5.5, 6.5),
  products: at(7.0, 8.0),
  process: at(8.5, 9.5),
  changelog: at(10.3, 11.3),
  about: at(12.2, 13.2),
  start: at(13.9, DURATION), // CTA — the closing settle
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
