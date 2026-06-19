import { ProductsView } from "@/views/ProductsView";
import { buildMetadata } from "@/lib/pageMeta";
import { getDictionary } from "@/i18n";

const dict = getDictionary("sr");

export const metadata = buildMetadata({
  lang: "sr",
  path: "/products",
  title: dict.productsPage.metaTitle,
  description: dict.productsPage.metaDescription,
  ogImage: "/products/opengraph-image",
  ogAlt: dict.og.products.alt,
});

export default function Page() {
  return <ProductsView lang="sr" />;
}
