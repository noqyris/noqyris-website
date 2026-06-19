import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "How an engagement with noqyris works";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "No surprises, by",
    em: "design.",
    subtitle: "The process, pricing & guarantees — public",
  });
}
