# noqyris — brand kit

Everything for your social accounts, organized by what it's for. Rendered from
the site's own logo (Clash Display Medium, lowercase — the period is the brand's
lime square).

**Brand:** background `#0B0B0C` · text `#F2F2F0` · accent dot `#D4FF4F` (acid lime)
· wordmark `noqyris.` · monogram `n.`

```
brand/
├── logo/                ← the master logo (wordmark + monogram)
├── profile-pictures/    ← profile pics, sized per network (the n. mark)
├── banners/             ← headers / cover images per network
└── video/               ← the splash animation, one folder per format
    ├── reels/     9:16   Reels · Shorts · Stories · TikTok
    ├── square/    1:1    Instagram · LinkedIn · X feed
    ├── portrait/  4:5    Instagram feed (taller)
    └── wide/      16:9   YouTube · X · LinkedIn · Product Hunt
```

## logo/

The master marks, 1024×1024 on the dark background.

| File | Mark | Use |
|---|---|---|
| `wordmark.png` | `noqyris.` | the main logo — also works as a universal profile picture (every platform crops it cleanly) |
| `monogram.png` | `n.` | the compact mark — crispest at tiny / circular sizes |

## profile-pictures/

Ready to upload, sized per platform (the `n.` monogram — most legible in small,
circular avatar crops). If unsure, `logo/wordmark.png` works everywhere too.

| Network | File | Size |
|---|---|---|
| X (Twitter) | `x.png` | 400×400 |
| LinkedIn | `linkedin.png` | 400×400 |
| Instagram | `instagram.png` | 320×320 |
| YouTube | `youtube.png` | 800×800 |
| TikTok | `tiktok.png` | 400×400 |
| Product Hunt | `producthunt.png` | 400×400 |

## banners/

The full wordmark, centered inside each platform's safe area.

| Network | File | Size |
|---|---|---|
| X header | `x-1500x500.png` | 1500×500 |
| YouTube channel art | `youtube-2048x1152.png` | 2048×1152 |
| LinkedIn cover | `linkedin-1128x191.png` | 1128×191 |

## video/

The splash animation (the lime cube writes `noqyris`, lands as the dot, holds)
— each folder has `splash.mp4` (H.264) + `splash.gif`. ~2.6s, dark background, no
site reveal so it ends clean on the logo.

| Folder | Ratio | Size | Best for |
|---|---|---|---|
| `reels/` | 9:16 | 1080×1920 | Reels · Shorts · Stories · TikTok |
| `square/` | 1:1 | 1080×1080 | Instagram / LinkedIn / X feed |
| `portrait/` | 4:5 | 1080×1350 | Instagram feed (more screen) |
| `wide/` | 16:9 | 1920×1080 | YouTube · X · LinkedIn · Product Hunt |

## Quick guide — what to upload where

| Network | Profile picture | Banner | Video |
|---|---|---|---|
| **X** | `profile-pictures/x.png` | `banners/x-1500x500.png` | `video/square` or `video/wide` |
| **LinkedIn** | `profile-pictures/linkedin.png` | `banners/linkedin-1128x191.png` | `video/square` or `video/wide` |
| **Instagram** | `profile-pictures/instagram.png` | — | `video/reels` (Reels/Stories) + `video/portrait` or `video/square` (feed) |
| **YouTube** | `profile-pictures/youtube.png` | `banners/youtube-2048x1152.png` | `video/wide` (videos) + `video/reels` (Shorts) |
| **TikTok** | `profile-pictures/tiktok.png` | — | `video/reels` |
| **Product Hunt** | `profile-pictures/producthunt.png` | — | `video/wide` or `video/square` |

---

## Regenerating

Everything here is rendered from the live `noqyris.` logo — never hand-edited.
Both generators need the dev server on `:3000` and `npm i playwright`.

**Static PNGs** (`logo/`, `profile-pictures/`, `banners/`): `node brand/.logo-gen.cjs`
renders the `noqyris.` wordmark and `n.` monogram (Clash Display Medium, white on
`#0B0B0C`, lime square dot) at each file's exact dimensions. Sizes/font-sizes live
in the `ASSETS` table at the top of that script — edit there to add or retune a size.

**Videos** (`video/<format>/`): `node brand/.video-gen.cjs` captures the splash
animation frames to `video/_frames/`, then encode each with ffmpeg
(libx264, `yuv420p`, crf 18) into `video/<format>/splash.mp4` + a palette GIF. The
live animation is at `/?splash` (append `?splash` to force-play for a recording).
For a transparent version or other sizes, ask.
