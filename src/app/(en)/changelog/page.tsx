import { ChangelogView } from "@/views/ChangelogView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("en");

export const metadata = buildMetadata({
  lang: "en",
  path: "/changelog",
  title: dict.changelogPage.metaTitle,
  description: dict.changelogPage.metaDescription,
  ogImage: "/changelog/opengraph-image",
  ogAlt: dict.og.changelog.alt,
});

export default function Page() {
  return <ChangelogView lang="en" />;
}
