# Motion system

How animation works on this site, so it stays cohesive as it grows.

## Principles

1. **CSS first, JS to enhance.** The page is fully usable and styled with zero
   JS. Client components only *upgrade* what's already there (reveal-on-scroll,
   cursor reactivity, scroll velocity). Nothing essential depends on a rAF loop.
2. **Respect `prefers-reduced-motion`.** Every animation is gated — CSS behind
   `@media (prefers-reduced-motion: no-preference)`, JS behind a
   `matchMedia('(prefers-reduced-motion: reduce)')` check. The splash is removed
   outright.
3. **Transform & opacity only.** No animating layout properties. Compositor-only
   so it stays smooth on mobile. `will-change` is promoted *during* a spring and
   dropped at rest (see `Magnetic`/`Tilt`).
4. **One accent.** Motion uses the lime accent (`--color-accent`) sparingly —
   the cube, the scroll cue, the ignite flash. Monochrome everywhere else.

## Layers

### 1. CSS keyframes (`globals.css`)
`pulse-dot`, `char-in` (headline letters), `fade-up` (`.hero-follow`),
`marquee-scroll`, `glow-drift` (ambient hero glow), and the splash sequence
(`splash-sweep/hop/settle/ignite/pop/aura/curtain`).

### 2. Scroll-driven CSS (`animation-timeline: view()`)
Progressive enhancement — browsers without scroll timelines render these static.
Gated by `@supports (animation-timeline: view())` **and** reduced-motion.
- `.section-numeral`, `.footer-wordmark` — editorial parallax.
- `.hero-scrollaway` — hero content lifts + dims as it exits (depth on entry).
- `.parallax-slow` — reusable slow parallax for decorative elements.

### 3. Cinematic scroll layer (Framer Motion + Lenis)
The homepage is a scroll-driven "story": content flies in/out and the hero
dives away as you scroll, over buttery inertial scroll. Cross-browser (works in
Safari, unlike CSS scroll-timeline), fully disabled under `prefers-reduced-motion`.
- **`SmoothScroll`** — global Lenis inertial scroll (`lenis/react`), mounted in
  the root layout. Returns `null` under reduced motion (native scroll).
- **`ScrollReveal`** — scroll-scrubbed reveal: content flies in from a direction
  (+ scale + fade) as it enters, optionally back out as it leaves (`exit`).
  `lead` staggers a row. Reduced motion → plain element.
- **`Parallax`** — scroll-linked depth shift for decorative layers.
- **`HeroStage`** — the hero scales up + lifts + fades as it scrolls away.

Used on the homepage sections (Hero, AudienceFork, ProofSection, ServiceIndex,
CtaSection). Inner pages use the lighter `Reveal` (below) + the global smooth
scroll. Don't stack `ScrollReveal`/`HeroStage`/`Parallax` and a CSS
scroll-timeline on the same element — they fight over `transform`.

### 4. JS components (`src/components/motion/`)
| Component | Technique | Notes |
|---|---|---|
| `Reveal` | IntersectionObserver + CSS transition | `variant="rise"` for big headings (blur-up + scale settle); gated by `html.js` |
| `KineticHeadline` | rAF, per-char variable font-weight toward cursor | hover-capable only; SSR-rendered chars |
| `HeroField` | Canvas dot field, cursor-reactive | static grid on touch/no-JS |
| `Magnetic` / `Tilt` | rAF spring | `will-change` only while active |
| `Marquee` + `MarqueeTrack` | CSS baseline, JS upgrades to scroll-velocity | pauses on hover/focus (WCAG 2.2.2) |
| `ScrollProgress` | rAF `scaleX` | top hairline |
| `Spotlight` | one delegated `pointermove` | drives `[data-spotlight]::after` |
| `CountUp` | IntersectionObserver + rAF odometer | skips years (renders static); a11y reads true value |
| `Splash` / `SplashController` | pure-CSS sequence + lifecycle | see caveat below |

### Hero choreography (`Hero.tsx` + `globals.css`)
- **`.hero-cube`** — the lime square from the wordmark, floating in the hero's
  negative space (`cube-float`). Hidden below `md`, `aria-hidden`.
- **`.scroll-cue`** — a lime glint travelling down a hairline, bottom-right.
- **`.hero-scrollaway`** — content fades/lifts as the hero scrolls away.

## ⚠️ Splash timing is coupled

The splash is pure CSS in `globals.css`, but `SplashController.tsx` removes it
from the DOM after a hardcoded `SPLASH_MS` (2350 ms), and `brand/.video-gen.cjs`
captures a fixed window. **If you change the splash keyframe durations, update
both.** The sequence is calibrated to the 7-letter `noqyris` wordmark
(`--sweep: 3.44em`, sweep `0.48s` = 6 letters × `0.08s` stagger). Changing the
wordmark length means re-measuring (`--sweep`) and re-timing.

## Adding motion

- Decorative, scroll-linked → add a `view()` keyframe + class (copy
  `.parallax-slow`). Always wrap in `@supports` + reduced-motion.
- Interactive (cursor) → a small client component with a single rAF loop and a
  reduced-motion + `hover: hover` guard. Drop `will-change` at rest.
- Don't put scroll-timeline animations on `Reveal`-wrapped elements — the
  transition and the animation fight over `transform`.
