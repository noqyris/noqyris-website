import { HomeView } from "@/views/HomeView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("sr");

export const metadata = buildMetadata({
  lang: "sr",
  path: "/",
  title: dict.meta.titleDefault,
  description: dict.site.description,
  absoluteTitle: true,
  ogImage: "/opengraph-image",
  ogAlt: dict.og.home.alt,
});

export default function Page() {
  return <HomeView lang="sr" />;
}
