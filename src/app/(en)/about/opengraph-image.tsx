import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "About noqyris, an independent software studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "A studio of",
    em: "one.",
    subtitle: "About noqyris",
  });
}
