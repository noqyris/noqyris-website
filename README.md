# noqyris.com

The site of **noqyris** — an independent software studio shipping its own
SaaS products and building custom applications & AI solutions for clients.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Bilingual: English at the root, Serbian under `/sr` — every UI string lives in
`src/i18n/dictionaries/{en,sr}.ts` (keep the two in sync; the build enforces the
shape).

## Editing content

All content lives in `src/content/` — components never hold copy:

| File | What it controls |
|---|---|
| `site.ts` | Name, email, availability line, social links (@noqyris everywhere) |
| `products.ts` | Product cards — **placeholders for now** (and the `/products` routes redirect to `/changelog` via `next.config.ts` until real ones exist; remove those redirects to bring products back) |
| `services.ts` | The three service pages (copy, FAQs, process) — EN + SR |
| `changelog.ts` | Build-in-public timeline — append new entries at the top, real dates only |
| `testimonials.ts` | Empty until real, named quotes exist |

Fonts: Clash Display + Satoshi (Fontshare, free license — see
`src/fonts/LICENSE-fontshare.txt`) and Instrument Serif (Google Fonts).

## Project layout

| Path | What's there |
|---|---|
| `src/app/` | Routes (App Router) — `(en)` group + `sr/`, metadata, OG image routes, sitemap/robots/manifest |
| `src/views/` | One component per page, composed from sections |
| `src/components/` | `ui` · `layout` · `home` · `shared` · `products` · `services` · `motion` · `seo` · `start` |
| `src/lib/` | `seo.ts` (JSON-LD), `pageMeta.ts` (per-page metadata), `og.tsx` (OG template) |
| `brand/` | Logo, profile pics, banners, splash videos + the generators (`.logo-gen.cjs`, `.video-gen.cjs`) — see `brand/README.md` |
| `tools/qa-mcp/` | QA MCP server — drive Claude as a manual tester (see below) |
| `docs/` | [`MOTION.md`](docs/MOTION.md) (animation system), [`LAUNCH.md`](docs/LAUNCH.md) (pre-launch checklist) |

## QA (MCP)

`tools/qa-mcp/` is an MCP server that lets Claude screenshot and validate every
route. With the dev server running, ask Claude to *"audit the whole site"* or
*"screenshot /sr/services on mobile"*. Registered in `.mcp.json`; details in
[`tools/qa-mcp/README.md`](tools/qa-mcp/README.md).

## Deploy (Vercel)

1. Push to `main` — repo: `github.com/noqyris/noqyris`.
2. [vercel.com/new](https://vercel.com/new) → import the repo → defaults are fine → Deploy.
3. Project → Settings → Domains → add `noqyris.com` (+ `www`) and follow the
   DNS instructions at your registrar.
4. Every push to `main` auto-deploys.
