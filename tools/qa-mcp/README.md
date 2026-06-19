# noqyris QA MCP

A small [MCP](https://modelcontextprotocol.io) server that turns Claude into a
**manual tester** for this site: it drives the running app with Playwright
(system Chrome), captures screenshots, and validates console output, network
requests, accessibility, and SEO metadata.

## Tools

| Tool | What it does |
|---|---|
| `list_routes` | Lists every route to test (EN + SR, incl. product/service detail pages) |
| `screenshot` | Navigates to a route and returns a screenshot (also saved to `shots/`). Args: `route`, `width`, `height`, `fullPage` |
| `audit_route` | Loads a route → console errors, page errors, 4xx/5xx requests, + a11y/SEO (html lang, title, meta description, h1 count, images missing alt, links/buttons without accessible names). Args: `route`, `width` |
| `check_links` | Collects every internal link on a page and reports each one's HTTP status (finds broken links). Args: `route` |
| `audit_site` | Walks **every** route and returns a per-route summary — the fast full-app regression sweep. Args: `width`, `includePreview` |

## Setup

1. Start the app so the server has something to test:
   ```bash
   npm run dev        # http://localhost:3000
   ```
2. The server is registered for this project in [`.mcp.json`](../../.mcp.json).
   In Claude Code, approve the `noqyris-qa` server when prompted (project-scoped
   MCP servers require approval), then ask Claude to e.g. *"audit the whole site"*
   or *"screenshot /sr/services on mobile"*.

To point it at a different target (e.g. a Vercel preview), set `BASE_URL`:
```bash
BASE_URL=https://noqyris-preview.vercel.app node tools/qa-mcp/server.mjs
```

## Notes

- Uses `channel: "chrome"` (system Chrome) — no Playwright browser download needed.
- Screenshots skip the one-time splash automatically (sets the `nq_splash`
  session flag) and wait for fonts + reveals to settle.
- Screenshots land in `tools/qa-mcp/shots/` (gitignored).
- The route inventory mirrors `src/app`; update the slug arrays at the top of
  `server.mjs` when products/services change.
