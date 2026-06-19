import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getProducts } from "@/content/products";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/shared/CtaSection";

export function ProductsView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const products = getProducts(lang);
  return (
    <>
      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <Eyebrow>{dict.productsPage.eyebrow}</Eyebrow>
          <h1 className="text-display-xl max-w-4xl">
            {dict.productsPage.h1.pre}
            <span className="serif-em text-accent">
              {dict.productsPage.h1.em}
            </span>
            {dict.productsPage.h1.post}
          </h1>
          <p className="max-w-xl text-lg text-fg-muted">
            {dict.productsPage.lede}
          </p>
        </Container>
      </section>

      <section aria-label={dict.productsPage.listAria}>
        <Container className="grid gap-4 pb-24 md:grid-cols-2 md:pb-32">
          {products.map((product, i) => (
            <Reveal
              key={product.slug}
              delay={i * 80}
              className={product.featured ? "md:col-span-2" : undefined}
            >
              <ProductCard
                product={product}
                featured={product.featured}
                headingLevel="h2"
                lang={lang}
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
