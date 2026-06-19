import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { getProduct } from "@/content/products";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MetricStat } from "@/components/products/MetricStat";
import { ProductCover } from "@/components/products/ProductCover";
import { Reveal } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/shared/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function ProductDetailView({
  lang,
  slug,
}: {
  lang: Locale;
  slug: string;
}) {
  const dict = getDictionary(lang);
  const product = getProduct(lang, slug);
  if (!product) return null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.products, path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ],
          lang,
        )}
      />

      <section>
        <Container className="flex flex-col gap-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow>{product.category}</Eyebrow>
            <StatusBadge status={product.status} lang={lang} />
          </div>
          <h1 className="text-display-xl">{product.name}</h1>
          <p className="font-display max-w-3xl text-2xl text-fg-muted md:text-3xl">
            {product.tagline}
          </p>
          <p className="max-w-2xl text-lg text-fg-muted">
            {product.description}
          </p>

          {product.metrics && product.metrics.length > 0 && (
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {product.metrics.map((metric) => (
                <MetricStat key={metric.label} metric={metric} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {product.url ? (
              <Button href={product.url} size="lg">
                {t(dict.productDetail.visit, { name: product.name })}
              </Button>
            ) : (
              <span className="mono-label text-fg-faint">
                {dict.productDetail.comingSoon}
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* Cover banner — generated art now, real screenshot once image is set */}
      <section>
        <Container className="pb-24 md:pb-32">
          <Reveal>
            <div className="overflow-hidden rounded-card border border-line">
              <ProductCover
                product={product}
                lang={lang}
                aspect="aspect-[16/6]"
                sizes="(min-width: 1152px) 1072px, 100vw"
                letterClass="text-[14rem] -mr-6 -mb-14"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.productDetail.featuresAria}>
        <Container className="flex flex-col gap-12 py-24 md:py-32">
          <Reveal>
            <Eyebrow>{dict.productDetail.whatItDoes}</Eyebrow>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {product.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 60} className="h-full bg-bg">
                <div className="flex h-full flex-col gap-3 p-7">
                  <h2 className="font-display text-xl font-medium">
                    {feature.title}
                  </h2>
                  <p className="text-fg-muted">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="flex flex-wrap gap-2">
            {product.stack.map((tech) => (
              <span
                key={tech}
                className="mono-label rounded-md border border-line px-2.5 py-1.5 text-fg-muted"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="hairline-t" aria-label={dict.productDetail.bridgeAria}>
        <Container className="py-16">
          <p className="max-w-2xl text-lg text-fg-muted">
            {dict.productDetail.bridgePre}
            <Link
              href={localePath("/services", lang)}
              className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              {dict.productDetail.bridgeLink}
            </Link>
            {dict.productDetail.bridgePost}
          </p>
        </Container>
      </section>

      <CtaSection lang={lang} />
    </>
  );
}
