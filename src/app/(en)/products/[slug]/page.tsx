import { notFound } from "next/navigation";
import { ProductDetailView } from "@/views/ProductDetailView";
import { getProduct, productSlugs } from "@/content/products";
import { buildMetadata } from "@/lib/pageMeta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct("en", slug);
  if (!product) return {};
  return buildMetadata({
    lang: "en",
    path: `/products/${slug}`,
    title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`,
    description: product.description,
    ogImage: `/products/${slug}/opengraph-image`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getProduct("en", slug)) notFound();
  return <ProductDetailView lang="en" slug={slug} />;
}
