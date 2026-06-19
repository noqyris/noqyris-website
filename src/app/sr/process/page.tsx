import { ProcessView } from "@/views/ProcessView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("sr");

export const metadata = buildMetadata({
  lang: "sr",
  path: "/process",
  title: dict.processPage.metaTitle,
  description: dict.processPage.metaDescription,
  ogImage: "/process/opengraph-image",
  ogAlt: dict.og.process.alt,
});

export default function Page() {
  return <ProcessView lang="sr" />;
}
