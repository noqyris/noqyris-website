import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "noqyris changelog — building in public";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "Building in",
    em: "public.",
    subtitle: "The noqyris changelog",
  });
}
