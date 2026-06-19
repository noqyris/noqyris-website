import { getService, serviceSlugs } from "@/content/services";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "noqyris service";
export const size = ogSize;
export const contentType = ogContentType;

// Pre-render one OG image per service so the route is static, not on-demand.
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService("en", slug);
  return buildOgImage({
    title: service?.seo.title ?? "Services",
    subtitle: "Software development services",
  });
}
