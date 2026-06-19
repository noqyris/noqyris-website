import { site } from "@/content/site";
import { getChangelog } from "@/content/changelog";
import { getDictionary } from "@/i18n";

export const dynamic = "force-static";

// The feed is the English changelog (the canonical /changelog). Serbian
// readers get the localized site; the RSS stays single-language by design.
const changelog = getChangelog("en");

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** RSS feed of the build-in-public changelog. */
export function GET() {
  const items = changelog
    .map((entry) => {
      const url = `${site.url}/changelog`;
      return `    <item>
      <title>${escapeXml(`[${entry.tag}] ${entry.title}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${entry.date}-${escapeXml(entry.title)}</guid>
      <pubDate>${new Date(`${entry.date}T12:00:00Z`).toUTCString()}</pubDate>
      ${entry.body ? `<description>${escapeXml(entry.body)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — changelog`)}</title>
    <link>${site.url}/changelog</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(getDictionary("en").feed.channelDescription)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
