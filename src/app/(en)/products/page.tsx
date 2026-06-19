import { ProductsView } from "@/views/ProductsView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("en");

export const metadata = buildMetadata({
  lang: "en",
  path: "/products",
  title: dict.productsPage.metaTitle,
  description: dict.productsPage.metaDescription,
  ogImage: "/products/opengraph-image",
  ogAlt: dict.og.products.alt,
});

export default function Page() {
  return <ProductsView lang="en" />;
}
