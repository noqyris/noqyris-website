# Launch checklist

**Verdict: ship-ready pending founder items.** No launch blockers in code. The
site builds + lints clean, an 18-route QA sweep (EN + SR) returns 0 console
errors / 0 page errors / 0 broken links, every route is `200`, each page has one
`<h1>`, `<html lang>` is correct per locale, JSON-LD + sitemap + redirects are
sound, and AA contrast passes everywhere. What remains is **founder decisions
and account/infra setup**, plus a few optional polish items.

## ✅ Done (code)

- Full rename → `noqyris` (code, copy, splash, brand marks, icons, docs).
- Brand assets regenerated (logos, profile pics, banners, splash videos).
- Bilingual EN/SR — canonical + hreflang (incl. `x-default`) + per-locale `<html lang>`.
- SEO: per-page titles/descriptions, OG images (EN per-page + SR default),
  Twitter card `@noqyris`, Organization + WebSite + Service + FAQPage +
  BreadcrumbList JSON-LD, sitemap, robots, RSS.
- Company-voice copy pass (EN + SR), incl. fixing the three first-person SR leaks.
- Hero "wow" pass + cohesive scroll motion; fully reduced-motion safe.
- **Baseline security headers** (HSTS, `nosniff`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`).
- **404** keeps full chrome (header/footer/language switcher) — no dead-end.
- **`robots`** is `index` only on the production deploy (Vercel previews are `noindex`).
- **Mobile menu** focus trap + restore + `role="dialog"`.
- **Intake form** post-submit confirmation surfacing the copy fallback + direct email.
- **MarqueeTrack** parks its rAF loop while offscreen.
- QA MCP tester (`tools/qa-mcp/`).

## 🔴 Before launch — only you can do these

- [ ] **Products** — send the real product data (Relayform/Briefcast/Stackpilot
      are placeholders). Until then `/products` redirects to `/changelog`
      (`next.config.ts`). When ready: replace `src/content/products.ts`, remove
      the product redirects, and restore the products entries in `sitemap.ts`,
      `Header`/`Footer`/`HomeView`, and the QA inventory.
- [ ] **"Browse the products" links** — while products are hidden, the links on
      About / Services / Service-detail point at `/products` (→ changelog).
      Decide: rely on the imminent product data (preferred), or have me reword
      them ("follow what we're building") until products return.
- [ ] **Confirm the SR rewrites** — I changed three first-person strings to
      company voice (`sr.ts`: `productStrip.h1`, `openPage` stat label,
      `og.home.em`). Confirm the Serbian phrasing as a native speaker.
- [ ] **Domain email** — `site.email` is `contact@noqyris.com`. Set up that mailbox.
- [ ] **Social handles** — register every `@noqyris` handle in `site.ts` before
      the links go live; upload the regenerated `brand/` assets. Trim
      `site.socials` to the platforms you'll actually seed.
- [ ] **Operational promises** — confirm you can honor "reply within 1 business
      day" and "a working demo every week", or soften the copy.
- [ ] **Changelog date** — the launch entry in `changelog.ts` must carry the real
      go-live date (no backfilling).
- [ ] **Domain** — add `noqyris.com` (+ `www`) in Vercel → Settings → Domains.
- [ ] **Legal** — add a Privacy page (Vercel Analytics + form data; you're EU-based).
- [ ] **CSP** — ship a `Content-Security-Policy-Report-Only` against a live Vercel
      deploy (hash the two inline scripts; allow Vercel Analytics + Next inline
      styles), confirm nothing breaks, then flip to enforcing.

## 🟠 Optional polish (code)

- [ ] **Per-page SR OG** — `/sr` shares one default OG card; add per-page SR OG
      routes to match the EN set.
- [ ] **Favicon** — `src/app/icon.svg` renders the `n` in Arial; regenerate from
      the Clash `n.` mark for brand parity.
- [ ] **Real lead backend** — the intake form is mailto-based (now with a
      confirmation fallback); wire a server endpoint if you want guaranteed capture.

## Verify before each deploy

```bash
npm run build      # must be clean
npm run lint       # must be clean
npm run dev        # then, with Claude + the QA MCP: "audit the whole site"
```
