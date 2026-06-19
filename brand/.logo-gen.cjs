// One-off: regenerate the static brand PNGs (wordmark, monogram, profile pics,
// banners) from the live noqyris logo. Run with the dev server on :3000.
// DPR=1 so screenshot pixels == viewport pixels == exact target dimensions.
const { chromium } = require("playwright");

const BG = "#0B0B0C";
const FG = "#F2F2F0";
const LIME = "#D4FF4F";

// font-size (CSS px) tuned per asset; wordmark uses the full word, monogram "n".
const ASSETS = [
  { path: "brand/logo/wordmark.png", w: 1024, h: 1024, text: "noqyris", fs: 205 },
  { path: "brand/logo/monogram.png", w: 1024, h: 1024, text: "n", fs: 690 },

  { path: "brand/profile-pictures/x.png", w: 400, h: 400, text: "n", fs: 270 },
  { path: "brand/profile-pictures/linkedin.png", w: 400, h: 400, text: "n", fs: 270 },
  { path: "brand/profile-pictures/instagram.png", w: 320, h: 320, text: "n", fs: 216 },
  { path: "brand/profile-pictures/youtube.png", w: 800, h: 800, text: "n", fs: 540 },
  { path: "brand/profile-pictures/tiktok.png", w: 400, h: 400, text: "n", fs: 270 },
  { path: "brand/profile-pictures/producthunt.png", w: 400, h: 400, text: "n", fs: 270 },

  { path: "brand/banners/x-1500x500.png", w: 1500, h: 500, text: "noqyris", fs: 140 },
  { path: "brand/banners/youtube-2048x1152.png", w: 2048, h: 1152, text: "noqyris", fs: 168 },
  { path: "brand/banners/linkedin-1128x191.png", w: 1128, h: 191, text: "noqyris", fs: 130 },
];

function render({ text, fs }) {
  document.querySelectorAll("nextjs-portal, #brandgen").forEach((e) => e.remove());
  const bg = "#0B0B0C", fg = "#F2F2F0", lime = "#D4FF4F";
  const wrap = document.createElement("div");
  wrap.id = "brandgen";
  wrap.style.cssText =
    `position:fixed;inset:0;z-index:2147483647;background:${bg};` +
    "display:grid;place-items:center;overflow:hidden;";
  const logo = document.createElement("div");
  logo.style.cssText =
    "display:flex;align-items:baseline;gap:0.055em;" +
    "font-family:var(--font-display);font-weight:500;letter-spacing:-0.045em;" +
    `line-height:1;color:${fg};font-size:${fs}px;`;
  const word = document.createElement("span");
  word.textContent = text;
  const dot = document.createElement("span");
  dot.style.cssText =
    `display:inline-block;width:0.2em;height:0.2em;border-radius:0.045em;background:${lime};`;
  logo.appendChild(word);
  logo.appendChild(dot);
  wrap.appendChild(logo);
  document.body.appendChild(wrap);
}

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  for (const a of ASSETS) {
    await page.setViewportSize({ width: a.w, height: a.h });
    await page.evaluate(render, { text: a.text, fs: a.fs });
    // ensure the exact weight/glyphs are rasterized before shooting
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(80);
    await page.screenshot({ path: a.path });
    console.log("rendered", a.path, `${a.w}x${a.h}`);
  }

  await ctx.close();
  await browser.close();
  console.log("DONE png");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
