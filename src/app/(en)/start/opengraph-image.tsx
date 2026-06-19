import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Start a project with noqyris";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "Tell me what you're",
    em: "building.",
    subtitle: "A reply within one business day",
  });
}
