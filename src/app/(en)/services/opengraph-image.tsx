import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Software development services by noqyris";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "What gets",
    em: "built",
    subtitle: "SaaS · Custom applications · AI solutions",
  });
}
