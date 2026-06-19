const { chromium } = require("playwright");
const fs = require("fs");

const SIZES = [
  // 1:1 — Instagram / LinkedIn / X feed
  { name: "square", w: 1080, h: 1080, logoFont: "clamp(3rem, 14vw, 9rem)" },
  // 4:5 — Instagram portrait feed (takes more of the screen)
  { name: "portrait", w: 1080, h: 1350, logoFont: "clamp(3rem, 16vw, 11rem)" },
  // 9:16 — Reels / Shorts / Stories / TikTok (larger logo fills the tall frame)
  { name: "reels", w: 1080, h: 1920, logoFont: "clamp(3rem, 18vw, 12rem)" },
  // 16:9 — YouTube / X / LinkedIn / Product Hunt (landscape)
  { name: "wide", w: 1920, h: 1080, logoFont: "clamp(3rem, 13vw, 16rem)" },
];
const FPS = 30;
const FORM_MS = 1500; // logo-forming sequence (stops just before the curtain at 1.55s)
const HOLD_MS = 1100; // hold on the formed logo on black
const FRAMES = Math.round((FPS * (FORM_MS + HOLD_MS)) / 1000);

(async () => {
  for (const s of SIZES) {
    const dir = `brand/video/_frames/${s.name}`;
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    const browser = await chromium.launch({ channel: "chrome" });
    const ctx = await browser.newContext({
      viewport: { width: s.w, height: s.h },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:3000/?splash", { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);

    await page.evaluate((logoFont) => {
      // size the logo for this format + drop the dev indicator
      const st = document.createElement("style");
      st.textContent =
        `.splash-logo{font-size:${logoFont}!important}` +
        "nextjs-portal{display:none!important}";
      document.head.appendChild(st);
      document.querySelectorAll("nextjs-portal").forEach((e) => e.remove());
      document.documentElement.style.overflow = "hidden";

      // Rebuild a fresh splash so capture never races SplashController's removal
      // timer — it targets the original element, leaving this clone untouched.
      const old = document.getElementById("splash");
      if (old) old.remove();
      const WORD = "noqyris";
      const splash = document.createElement("div");
      splash.id = "splash";
      splash.className = "splash";
      splash.setAttribute("aria-hidden", "true");
      const logo = document.createElement("div");
      logo.className = "splash-logo";
      const word = document.createElement("span");
      word.className = "splash-word";
      [...WORD].forEach((ch, i) => {
        const c = document.createElement("span");
        c.className = "splash-char";
        c.style.setProperty("--i", String(i));
        c.textContent = ch;
        word.appendChild(c);
      });
      const travel = document.createElement("span");
      travel.className = "splash-dot-travel";
      const drop = document.createElement("span");
      drop.className = "splash-dot-drop";
      const dot = document.createElement("span");
      dot.className = "splash-dot";
      drop.appendChild(dot);
      travel.appendChild(drop);
      logo.appendChild(word);
      logo.appendChild(travel);
      splash.appendChild(logo);
      document.body.appendChild(splash);
    }, s.logoFont);

    for (let f = 0; f < FRAMES; f++) {
      // play through the formation, then hold the formed logo (cap before curtain)
      const ms = Math.min((f / FPS) * 1000, FORM_MS);
      await page.evaluate((t) => {
        // keep clearing pending timers so SplashController never removes #splash
        const hi = setTimeout(() => {}, 0);
        for (let i = 0; i <= hi; i++) clearTimeout(i);
        const a = document.getAnimations();
        a.forEach((x) => x.pause());
        a.forEach((x) => {
          try {
            x.currentTime = t;
          } catch {}
        });
        return new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(() => r())),
        );
      }, ms);
      await page.waitForTimeout(40);
      await page.screenshot({ path: `${dir}/f_${String(f).padStart(4, "0")}.png` });
    }

    await ctx.close();
    await browser.close();
    console.log(s.name, "captured", FRAMES, "frames");
  }
  console.log("DONE");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
