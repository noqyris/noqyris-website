# AI assets — what to generate (external) + where it plugs in

The code is wired with drop-in slots. You generate the media with the external
tools; drop the files in the paths below and flip the matching flag — the site
picks them up. Nothing here blocks launch; all slots have on-brand fallbacks.

**Brand constraints for every asset:** dark base `#0B0B0C`, single accent lime
`#D4FF4F`, no other colors, no text/logo baked in (the wordmark sits on top),
abstract/premium — not "AI-stocky". Less is more.

## 1. Hero background video — ✅ ACTIVE

A clip is live: `public/hero/hero.mp4` (720p, ~7 MB, seamless boomerang loop) +
`hero-poster.jpg`, with `site.heroVideo = "/hero/hero"`. The raw source is kept
(gitignored) at `.hero-source.mp4`. Mobile + reduced-motion show only the poster
(no multi-MB autoplay on phones); desktop plays the video.

**To swap or retune** — drop a new raw clip at `.hero-source.mp4` and re-encode.
720p + crf 21 keeps it clean (no banding on the dark gradients) and light; bump
to `scale=1920:1080` for a sharper, heavier file:
```bash
FILT="scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24"
# seamless boomerang loop (forward + reverse), clean + compact:
ffmpeg -y -i .hero-source.mp4 -filter_complex \
  "[0:v]$FILT[s];[s]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" \
  -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 21 -preset slow -movflags +faststart \
  public/hero/hero.mp4
ffmpeg -y -ss 1.5 -i .hero-source.mp4 -vf "$FILT" -frames:v 1 -q:v 3 public/hero/hero-poster.jpg
```
(Keep crf ≤ 23 — higher values band badly on dark glow. H.264 MP4 plays in every
modern browser incl. Safari, so no WebM needed.)

### Original spec / how to make it

- **Tool:** ElevenLabs Seedance 2.0 (generate) → Canva (trim/merge/loop).
- **Spec:** 1920×1080, 8–12s **seamless loop**, dark with subtle lime motion
  (drifting particles / soft light / slow geometry), **no text or logo**.
  Export **MP4 (H.264)** + **WebM (VP9)**, keep each **< ~4 MB**. Grab one frame
  as a **poster JPG**.
- **Drop in:** `public/hero/hero.mp4`, `public/hero/hero.webm`,
  `public/hero/hero-poster.jpg`
- **Enable:** set `heroVideo: "/hero/hero"` in `src/content/site.ts` (base path,
  no extension). `null` = the code aurora (default). The component adds a dark
  overlay for text contrast, autoplays muted/looped, and shows only the poster
  under reduced-motion.

### How to make it (recipe)

1. **Still (Nano Banana / Gemini Flash Image or GPT Image 2):** generate a
   1920×1080 keyframe. Prompt seed:
   > *Abstract dark background, near-black `#0B0B0C`, a single acid-lime `#D4FF4F`
   > light: soft drifting particles / slow liquid light / fine geometric mesh.
   > Minimal, premium, cinematic, lots of negative space, no text, no logo,
   > centered emptiness for an overlaid headline.*
2. **Animate (image→video — Runway / Kling / Sora / Seedance):** turn the still
   into **8–12s** of **slow, ambient** motion (drift/parallax, no hard cuts).
   Prompt seed: *very slow subtle motion, gentle drift and breathing light,
   seamless loop, no camera shake.*
3. **Loop + export (Canva / ffmpeg):** make first frame ≈ last frame so the loop
   is invisible; export **MP4 (H.264, yuv420p)** + **WebM (VP9)**, **< ~4 MB**
   each; save the first frame as `hero-poster.jpg`.

> Keep it **dark and subtle** — it sits *behind* the headline. If in doubt,
> dimmer + slower. The lime is an accent, not a wash.

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
