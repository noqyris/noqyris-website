import type { MetadataRoute } from "next";
import { site } from "@/content/site";
// import { productSlugs } from "@/content/products"; // products hidden for now
import { serviceSlugs } from "@/content/services";
import { changelogDates } from "@/content/changelog";
import { locales, localePath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Latest changelog entry, not the build timestamp — Google ignores
  // lastmod when it is detectably inaccurate.
  const lastModified = new Date(`${changelogDates[0]}T00:00:00Z`);

  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    ...serviceSlugs.map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.9,
    })),
    { path: "/services", priority: 0.8 },
    // Products hidden for now — restore these entries when products go public.
    // { path: "/products", priority: 0.8 },
    { path: "/start", priority: 0.8 },
    { path: "/process", priority: 0.8 },
    // ...productSlugs.map((slug) => ({
    //   path: `/products/${slug}`,
    //   priority: 0.7,
    // })),
    { path: "/changelog", priority: 0.6 },
    { path: "/about", priority: 0.6 },
  ];

  // One entry per (path, locale) with hreflang alternates linking the pair.
  return paths.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${site.url}${localePath(path, lang)}`,
      lastModified,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [
              l === "sr" ? "sr-Latn" : l,
              `${site.url}${localePath(path, l)}`,
            ]),
          ),
          // Mirror the per-page <head> hreflang (pageMeta.ts) so signals match.
          "x-default": `${site.url}${localePath(path, "en")}`,
        },
      },
    })),
  );
}
