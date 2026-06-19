import { StartView } from "@/views/StartView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("en");

export const metadata = buildMetadata({
  lang: "en",
  path: "/start",
  title: dict.startPage.metaTitle,
  description: dict.startPage.metaDescription,
  ogImage: "/start/opengraph-image",
  ogAlt: dict.og.start.alt,
});

export default function Page() {
  return <StartView lang="en" />;
}
