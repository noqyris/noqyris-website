import { getProduct, productSlugs } from "@/content/products";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "noqyris product";
export const size = ogSize;
export const contentType = ogContentType;

// Pre-render one OG image per product so the route is static, not on-demand.
export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct("en", slug);
  return buildOgImage({
    title: product
      ? `${product.name} — ${product.tagline.replace(/\.$/, "")}`
      : "Products",
    subtitle: product?.category,
  });
}
