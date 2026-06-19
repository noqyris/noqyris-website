# AI assets — what to generate (external) + where it plugs in

The code is wired with drop-in slots. You generate the media with the external
tools; drop the files in the paths below and flip the matching flag — the site
picks them up. Nothing here blocks launch; all slots have on-brand fallbacks.

**Brand constraints for every asset:** dark base `#0B0B0C`, single accent lime
`#D4FF4F`, no other colors, no text/logo baked in (the wordmark sits on top),
abstract/premium — not "AI-stocky". Less is more.

## 1. Hero background video — biggest "wow" (optional)

- **Tool:** ElevenLabs Seedance 2.0 (generate) → Canva (trim/merge/loop).
- **Spec:** 1920×1080, 8–12s **seamless loop**, dark with subtle lime motion
  (drifting particles / soft light / slow geometry), **no text or logo**.
  Export **MP4 (H.264)** + **WebM (VP9)**, keep each **< ~4 MB**. Grab one frame
  as a **poster JPG**.
- **Drop in:** `public/hero/hero.mp4`, `public/hero/hero.webm`,
  `public/hero/hero-poster.jpg`
- **Enable:** set `heroVideo: "/hero/hero"` in `src/content/site.ts` (base path,
  no extension). `null` = current dark canvas (default). The component adds a
  dark overlay for text contrast, autoplays muted/looped, and shows only the
  poster under reduced-motion.

## 2. Product cover images (when products return)

- **Tool:** GPT Image 2.
- **Spec:** **16:9**, ~1600×900, on-brand dark + lime, abstract or a clean
  product UI shot. One per product.
- **Drop in:** `public/products/<slug>.png` (or `.webp`).
- **Enable:** set `image: "/products/<slug>.png"` on the product in
  `src/content/products.ts`. Falls back to the generated duotone cover when unset.

## 3. Founder photo (optional, boosts trust)

- **Tool:** a real photo is best; or GPT Image 2 for a stylized portrait.
- **Spec:** **square**, ~800×800.
- **Drop in:** `public/founder.jpg`
- **Enable:** set `founderImage: "/founder.jpg"` in `src/content/site.ts`.
  Falls back to the `DS` monogram when unset.

## Already generated (no action)

- Logo, profile pictures, banners, splash videos → `brand/` (regenerate with
  `brand/.logo-gen.cjs` / `.video-gen.cjs`).
- OG share images → generated per-route at build (`src/lib/og.tsx` + the
  `opengraph-image.tsx` routes).

## After dropping files in

```bash
npm run build && npm run lint    # must stay clean
npm run dev                      # then ask Claude + the QA MCP to screenshot the pages
```
