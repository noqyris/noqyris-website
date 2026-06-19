import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";
import { getProducts } from "@/content/products";
import { Container } from "@/components/layout/Container";
import {
  SectionHeading,
  SectionNumeral,
} from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

export function ProductStrip({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const products = getProducts(lang);
  const featured = products.find((p) => p.featured) ?? products[0];
  const rest = products.filter((p) => p !== featured);

  return (
    <section className="hairline-t" aria-label={dict.productStrip.aria}>
      <Container className="relative flex flex-col gap-12 py-24 md:py-32">
        <SectionNumeral n="01" />
        <Reveal variant="rise" className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.productStrip.eyebrow}>
            {dict.productStrip.h1.pre}
            <span className="serif-em">{dict.productStrip.h1.em}</span>
            {dict.productStrip.h1.post}
          </SectionHeading>
          <Link
            href={localePath("/products", lang)}
            className="text-sm text-fg-muted transition-colors hover:text-fg"
          >
            {dict.productStrip.all}
          </Link>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal>
            <ProductCard product={featured} featured lang={lang} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((product, i) => (
              <Reveal key={product.slug} delay={i * 80}>
                <ProductCard product={product} lang={lang} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
