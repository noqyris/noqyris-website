import { buildOgImage, ogSize, ogContentType } from "@/lib/og";
import { getDictionary } from "@/i18n";

// Default OG card for the whole /sr subtree (Next inherits it into nested /sr
// pages that don't define their own). Fixes Serbian links sharing with no
// preview image. Per-page SR OG routes can be added later to mirror the EN set.
const og = getDictionary("sr").og.home;

export const alt = og.alt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({ title: og.title, em: og.em, subtitle: og.subtitle });
}
