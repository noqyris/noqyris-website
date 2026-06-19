import { ServicesView } from "@/views/ServicesView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("en");

export const metadata = buildMetadata({
  lang: "en",
  path: "/services",
  title: dict.servicesPage.metaTitle,
  description: dict.servicesPage.metaDescription,
  ogImage: "/services/opengraph-image",
  ogAlt: dict.og.services.alt,
});

export default function Page() {
  return <ServicesView lang="en" />;
}
