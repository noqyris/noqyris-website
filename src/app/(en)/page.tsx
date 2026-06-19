import { HomeView } from "@/views/HomeView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("en");

export const metadata = buildMetadata({
  lang: "en",
  path: "/",
  title: dict.meta.titleDefault,
  description: dict.site.description,
  absoluteTitle: true,
  ogImage: "/opengraph-image",
  ogAlt: dict.og.home.alt,
});

export default function Page() {
  return <HomeView lang="en" />;
}
