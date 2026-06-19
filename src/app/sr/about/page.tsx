import { AboutView } from "@/views/AboutView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("sr");

export const metadata = buildMetadata({
  lang: "sr",
  path: "/about",
  title: dict.aboutPage.metaTitle,
  description: dict.aboutPage.metaDescription,
  ogImage: "/about/opengraph-image",
  ogAlt: dict.og.about.alt,
});

export default function Page() {
  return <AboutView lang="sr" />;
}
