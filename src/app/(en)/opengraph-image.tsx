import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "noqyris — Software Studio for SaaS, Custom Apps & AI";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    title: "SaaS products, custom apps & AI —",
    em: "shipping.",
    subtitle: "Independent software, built in the open",
  });
}
