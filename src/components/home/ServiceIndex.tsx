import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localePath } from "@/i18n/config";
import { getServices } from "@/content/services";
import { Container } from "@/components/layout/Container";
import {
  SectionHeading,
  SectionNumeral,
} from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { EntryOfferCard } from "@/components/shared/EntryOfferCard";

/** Typographic index list — oversized service rows, ped.ro-style. */
export function ServiceIndex({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const services = getServices(lang);

  return (
    <section className="hairline-t" aria-label={dict.serviceIndex.aria}>
      <Container className="relative flex flex-col gap-12 py-24 md:py-32">
        <SectionNumeral n="04" />
        <MaskReveal>
          <SectionHeading eyebrow={dict.serviceIndex.eyebrow}>
            {dict.serviceIndex.h1.pre}
            <span className="serif-em">{dict.serviceIndex.h1.em}</span>
            {dict.serviceIndex.h1.post}
          </SectionHeading>
        </MaskReveal>

        <div>
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} from="left" distance={80} exit={false} lead={i * 0.05}>
              <Link
                href={localePath(`/services/${service.slug}`, lang)}
                data-spotlight
                className="group hairline-t grid gap-x-8 gap-y-3 py-8 md:grid-cols-[6rem_1fr_auto] md:items-center md:py-12"
              >
                <span className="outline-text font-display text-3xl font-semibold md:text-4xl">
                  0{i + 1}
                </span>
                <div className="flex flex-col gap-2 transition-transform duration-300 md:group-hover:translate-x-2">
                  <h3 className="text-display-lg text-fg-muted transition-colors group-hover:text-fg">
                    {service.name}
                  </h3>
                  <p className="max-w-xl text-fg-muted">{service.summary}</p>
                  <p className="mono-label text-fg-faint">
                    {service.pricing.from} · {service.pricing.timeline}
                  </p>
                </div>
                <ArrowIcon
                  width={32}
                  height={32}
                  className="hidden -translate-x-2 text-fg-faint opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 md:block"
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal from="up" distance={60} exit={false}>
          <EntryOfferCard lang={lang} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
