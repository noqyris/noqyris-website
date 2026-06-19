import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";

/** Generated duotone cover (or real screenshot once `image` is set) —
 *  shared by ProductCard and the product detail banner. */
export function ProductCover({
  product,
  lang,
  aspect = "aspect-[16/9]",
  sizes,
  letterClass = "text-[10rem] -mr-4 -mb-10",
}: {
  product: Product;
  lang: Locale;
  aspect?: string;
  sizes?: string;
  letterClass?: string;
}) {
  const dict = getDictionary(lang);
  if (product.image) {
    return (
      <div className={cn("relative overflow-hidden", aspect)}>
        <Image
          src={product.image}
          alt={t(dict.productDetail.altScreenshot, { name: product.name })}
          fill
          sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-end justify-between overflow-hidden",
        aspect,
      )}
      style={{
        background: `radial-gradient(ellipse 120% 90% at 20% 0%, hsl(${product.accentHue} 70% 55% / 0.22), transparent 65%), var(--color-surface)`,
      }}
    >
      <div className="cover-grid absolute inset-0" />
      <span className="mono-label relative mb-5 ml-6 text-fg-faint">
        noqyris/{product.slug}
      </span>
      <span
        className={cn(
          "font-display pointer-events-none relative leading-none font-semibold select-none",
          letterClass,
        )}
        style={{ color: `hsl(${product.accentHue} 70% 65% / 0.25)` }}
      >
        {product.name[0]}
      </span>
    </div>
  );
}
