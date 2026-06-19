#!/usr/bin/env node
// noqyris QA MCP server — a manual-tester you can drive from Claude Code.
// Tools: list_routes, screenshot, audit_route, check_links, audit_site.
// Drives the running app with Playwright (system Chrome), captures screenshots,
// and validates console/network/a11y/SEO. Point BASE_URL at the running app
// (default http://localhost:3000 — start it with `npm run dev`).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(HERE, "shots");

// --- route inventory (mirrors src/app) -------------------------------------
// NOTE: /products and /products/<slug> are intentionally redirected to
// /changelog (next.config.ts) while products are hidden, so they're omitted
// here — auditing them would just re-audit /changelog. When products return,
// add "/products" to STATIC and spread the slugs (relayform, briefcast,
// stackpilot) as `/products/<slug>` into `base` below.
const STATIC = ["/", "/about", "/changelog", "/process", "/services", "/start"];
const SERVICE_SLUGS = ["saas-development", "custom-applications", "ai-solutions"];

function allRoutes() {
  const base = [
    ...STATIC,
    ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  ];
  const en = [...base, "/preview"].map((p) => ({ locale: "en", path: p }));
  const sr = base.map((p) => ({ locale: "sr", path: p === "/" ? "/sr" : `/sr${p}` }));
  return [...en, ...sr];
}

// --- shared browser (lazy, reused across tool calls) -----------------------
let browserPromise = null;
function getBrowser() {
  if (!browserPromise) browserPromise = chromium.launch({ channel: "chrome" });
  return browserPromise;
}
async function newPage({ width = 1440, height = 900, skipSplash = true, reducedMotion = false }) {
  const browser = await getBrowser();
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    ...(reducedMotion ? { reducedMotion: "reduce" } : {}),
  });
  if (skipSplash) {
    // The splash gate skips the intro when this session flag is set.
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("nq_splash", "1");
      } catch {}
    });
  }
  const page = await ctx.newPage();
  return { ctx, page };
}

const text = (obj) => ({ content: [{ type: "text", text: typeof obj === "string" ? obj : JSON.stringify(obj, null, 2) }] });

// --- server ----------------------------------------------------------------
const server = new McpServer({ name: "noqyris-qa", version: "1.0.0" });

server.registerTool(
  "list_routes",
  {
    title: "List routes",
    description: "List every app route to test (EN + SR, including product/service detail pages).",
    inputSchema: {},
  },
  async () => text({ baseUrl: BASE_URL, count: allRoutes().length, routes: allRoutes() }),
);

server.registerTool(
  "screenshot",
  {
    title: "Screenshot a route",
    description:
      "Navigate to a route and capture a screenshot (returned inline + saved under tools/qa-mcp/shots). Use to visually inspect any page at a given viewport.",
    inputSchema: {
      route: z.string().describe('Route path, e.g. "/" or "/sr/about"'),
      width: z.number().optional().describe("Viewport width (default 1440; use 390 for mobile)"),
      height: z.number().optional().describe("Viewport height (default 900)"),
      fullPage: z.boolean().optional().describe("Capture the full scrollable page (default false)"),
    },
  },
  async ({ route, width = 1440, height = 900, fullPage = false }) => {
    const { ctx, page } = await newPage({ width, height });
    try {
      const url = BASE_URL + route;
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.evaluate(() => document.fonts?.ready).catch(() => {});
      await page.waitForTimeout(1200); // let reveals/fonts settle
      await page.evaluate(() => document.querySelectorAll("nextjs-portal").forEach((e) => e.remove()));
      const buf = await page.screenshot({ fullPage });
      await mkdir(SHOTS, { recursive: true });
      const name = (route.replace(/[^\w]+/g, "_").replace(/^_|_$/g, "") || "home") + `_${width}.png`;
      const file = join(SHOTS, name);
      await writeFile(file, buf);
      return {
        content: [
          { type: "image", data: buf.toString("base64"), mimeType: "image/png" },
          { type: "text", text: `${url} @ ${width}x${height}${fullPage ? " (full page)" : ""} → ${file}` },
        ],
      };
    } finally {
      await ctx.close();
    }
  },
);

async function auditPage(page, url) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => pageErrors.push(String(e.message || e)));
  page.on("requestfailed", (r) => failedRequests.push(`${r.method()} ${r.url()} — ${r.failure()?.errorText}`));
  page.on("response", (r) => {
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`);
  });
  const resp = await page.goto(url, { waitUntil: "load", timeout: 30000 });
  const finalUrl = page.url();
  const reqPath = new URL(url).pathname;
  const finalPath = new URL(finalUrl).pathname;
  const redirectedTo = finalPath !== reqPath ? finalPath : null;
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(600);
  const a11y = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const links = [...document.querySelectorAll("a")];
    const h1s = [...document.querySelectorAll("h1")].map((h) => h.textContent.trim());
    const metaDesc = document.querySelector('meta[name="description"]')?.content || null;
    const buttonsNoName = [...document.querySelectorAll("button")].filter(
      (b) => !b.textContent.trim() && !b.getAttribute("aria-label") && !b.getAttribute("title"),
    ).length;
    return {
      htmlLang: document.documentElement.lang || null,
      title: document.title || null,
      metaDescription: metaDesc,
      titleLen: (document.title || "").length,
      metaDescLen: (metaDesc || "").length,
      h1Count: h1s.length,
      h1: h1s,
      imagesMissingAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
      linksNoText: links.filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label")).length,
      buttonsNoAccessibleName: buttonsNoName,
    };
  });
  return {
    httpStatus: resp?.status() ?? null,
    redirectedTo,
    consoleErrors,
    pageErrors,
    failedRequests: [...new Set(failedRequests)],
    a11y,
  };
}

server.registerTool(
  "audit_route",
  {
    title: "Audit a route",
    description:
      "Load a route and report console errors, page errors, failed/4xx-5xx requests, plus a11y/SEO checks (html lang, title, meta description, h1 count, images missing alt, links/buttons without accessible names).",
    inputSchema: {
      route: z.string().describe('Route path, e.g. "/sr/services/saas-development"'),
      width: z.number().optional(),
    },
  },
  async ({ route, width = 1440 }) => {
    const { ctx, page } = await newPage({ width });
    try {
      const result = await auditPage(page, BASE_URL + route);
      return text({ route, ...result });
    } finally {
      await ctx.close();
    }
  },
);

server.registerTool(
  "check_links",
  {
    title: "Check links on a route",
    description: "Collect every internal link on a page and report the HTTP status of each (finds broken/dead links).",
    inputSchema: { route: z.string() },
  },
  async ({ route }) => {
    const { ctx, page } = await newPage({});
    try {
      await page.goto(BASE_URL + route, { waitUntil: "load", timeout: 30000 });
      const hrefs = await page.evaluate((origin) => {
        const out = new Set();
        for (const a of document.querySelectorAll("a[href]")) {
          const href = a.getAttribute("href");
          if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
          try {
            const u = new URL(href, location.href);
            if (u.origin === origin) out.add(u.pathname + u.search);
          } catch {}
        }
        return [...out];
      }, BASE_URL);
      const results = [];
      for (const href of hrefs) {
        try {
          const r = await page.request.get(BASE_URL + href, { failOnStatusCode: false });
          results.push({ href, status: r.status() });
        } catch (e) {
          results.push({ href, status: "ERROR", error: String(e.message || e) });
        }
      }
      const broken = results.filter((r) => r.status === "ERROR" || r.status >= 400);
      return text({ route, total: results.length, broken, results });
    } finally {
      await ctx.close();
    }
  },
);

server.registerTool(
  "audit_site",
  {
    title: "Audit the whole site",
    description:
      "Walk every route (EN + SR) and report a per-route summary of HTTP status, console/page errors, h1 count, and SEO meta lengths. The fast way to sweep the whole app for regressions.",
    inputSchema: {
      width: z.number().optional().describe("Viewport width (default 1440)"),
      includePreview: z.boolean().optional().describe("Include the internal /preview route (default false)"),
    },
  },
  async ({ width = 1440, includePreview = false }) => {
    const routes = allRoutes().filter((r) => includePreview || r.path !== "/preview");
    const rows = [];
    const { ctx } = await newPage({ width });
    try {
      for (const r of routes) {
        const page = await ctx.newPage();
        try {
          const a = await auditPage(page, BASE_URL + r.path);
          rows.push({
            route: r.path,
            status: a.httpStatus,
            redirectedTo: a.redirectedTo,
            consoleErrors: a.consoleErrors.length,
            pageErrors: a.pageErrors.length,
            failedReq: a.failedRequests.length,
            h1: a.a11y.h1Count,
            titleLen: a.a11y.titleLen,
            descLen: a.a11y.metaDescLen,
            lang: a.a11y.htmlLang,
            imgNoAlt: a.a11y.imagesMissingAlt,
            issues: [
              a.httpStatus !== 200 && `http ${a.httpStatus}`,
              a.consoleErrors.length && `${a.consoleErrors.length} console err`,
              a.pageErrors.length && `${a.pageErrors.length} page err`,
              a.failedRequests.length && `${a.failedRequests.length} failed req`,
              a.a11y.h1Count !== 1 && `${a.a11y.h1Count} h1`,
              a.a11y.imagesMissingAlt && `${a.a11y.imagesMissingAlt} img no alt`,
            ].filter(Boolean),
          });
        } catch (e) {
          rows.push({ route: r.path, status: "ERROR", error: String(e.message || e) });
        } finally {
          await page.close();
        }
      }
    } finally {
      await ctx.close();
    }
    const flagged = rows.filter((r) => r.status === "ERROR" || (r.issues && r.issues.length));
    return text({ baseUrl: BASE_URL, routes: rows.length, flagged: flagged.length, summary: rows });
  },
);

// --- boot ------------------------------------------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  const shutdown = async () => {
    try {
      if (browserPromise) await (await browserPromise).close();
    } catch {}
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
main().catch((e) => {
  console.error("noqyris-qa MCP failed to start:", e);
  process.exit(1);
});
