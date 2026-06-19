import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Products by noqyris";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "What gets",
    em: "shipped.",
    subtitle: "SaaS products, built in public",
  });
}
