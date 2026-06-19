import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";
import type { Product } from "@/content/types";
import { StatusBadge } from "@/components/ui/Badge";
import { Tilt } from "@/components/motion/Tilt";
import { MetricStat } from "./MetricStat";
import { ProductCover } from "./ProductCover";

export function ProductCard({
  product,
  lang,
  featured = false,
  headingLevel = "h3",
}: {
  product: Product;
  lang: Locale;
  featured?: boolean;
  /** h2 where the card sits directly under the page h1 (e.g. /products). */
  headingLevel?: "h2" | "h3";
}) {
  const dict = getDictionary(lang);
  const Heading = headingLevel;
  return (
    <Tilt className="h-full">
      <Link
        href={localePath(`/products/${product.slug}`, lang)}
        data-spotlight
        className="group block h-full overflow-hidden rounded-card border border-line bg-surface transition-[border-color,translate,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-fg-faint"
      >
      <ProductCover
        product={product}
        lang={lang}
        aspect={featured ? "aspect-[16/7]" : "aspect-[16/9]"}
        sizes={
          featured
            ? "(min-width: 1152px) 1072px, 100vw"
            : "(min-width: 768px) 50vw, 100vw"
        }
      />
      <div className="flex flex-col gap-4 p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="mono-label text-fg-faint">{product.category}</p>
          <StatusBadge status={product.status} lang={lang} />
        </div>
        <div>
          <Heading className="font-display text-2xl font-medium">
            {product.name}
          </Heading>
          <p className="mt-1.5 text-fg-muted">{product.tagline}</p>
        </div>
        {product.metrics && product.metrics.length > 0 && (
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
            {product.metrics.map((metric) => (
              <MetricStat key={metric.label} metric={metric} />
            ))}
          </div>
        )}
        <p className="text-sm text-fg-muted group-hover:text-fg">
          {product.url
            ? dict.productDetail.viewProduct
            : dict.productDetail.comingSoon}
        </p>
      </div>
      </Link>
    </Tilt>
  );
}
