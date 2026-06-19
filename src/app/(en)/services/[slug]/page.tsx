import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/views/ServiceDetailView";
import { getService, serviceSlugs } from "@/content/services";
import { buildMetadata } from "@/lib/pageMeta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService("en", slug);
  if (!service) return {};
  return buildMetadata({
    lang: "en",
    path: `/services/${slug}`,
    title: service.seo.title,
    description: service.seo.description,
    ogImage: `/services/${slug}/opengraph-image`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getService("en", slug)) notFound();
  return <ServiceDetailView lang="en" slug={slug} />;
}
