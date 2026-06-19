import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { display, sans, serif } from "@/fonts";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { Spotlight } from "@/components/motion/Spotlight";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Splash } from "@/components/motion/Splash";
import { SplashController } from "@/components/motion/SplashController";
import "./globals.css";

// Runs before paint. `?splash` force-plays it (a "watch the intro" link — it
// still plays through and lifts away normally). Otherwise it's skipped on repeat
// visits this session and under reduced motion (adds `splash-skip` → display:none).
const SPLASH_GATE =
  "(function(){try{var h=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('splash-skip');return}if(new URLSearchParams(location.search).has('splash')){return}if(sessionStorage.getItem('nq_splash')){h.classList.add('splash-skip')}}catch(e){}})()";

const en = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: en.meta.titleDefault,
    template: en.meta.titleTemplate,
  },
  description: en.site.description,
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    site: site.socials.find((s) => s.key === "x")?.handle,
    creator: site.socials.find((s) => s.key === "x")?.handle,
  },
  // Only the production deployment is indexable — Vercel previews
  // (VERCEL_ENV "preview"/"development") must not leak into search.
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

// Document shell only — site chrome (Header/Footer/main) lives in the
// per-locale layouts (app/(en) and app/sr) via <SiteChrome>, so the /sr
// subtree can carry its own locale without a duplicated header.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below adds the `js` class
    // before hydration (standard pre-hydration pattern, e.g. next-themes).
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: SPLASH_GATE }} />
        <Splash />
        <SplashController />
        <SmoothScroll />
        <div className="noise-overlay" aria-hidden="true" />
        <ScrollProgress />
        {children}
        <Spotlight />
        <Analytics />
      </body>
    </html>
  );
}
