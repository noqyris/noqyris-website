import type {
  Organization,
  Person,
  Service as ServiceSchema,
  BreadcrumbList,
  WebSite,
  FAQPage,
  WithContext,
} from "schema-dts";
import { site } from "@/content/site";
import type { Service, ServiceFaq } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath, htmlLang } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export function organizationJsonLd(lang: Locale): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    description: getDictionary(lang).site.description,
    // Raster logo (Google's logo guidelines prefer PNG over SVG).
    logo: `${site.url}/icon-512.png`,
    foundingDate: "2026",
    founder: { "@type": "Person", name: site.founder },
    sameAs: site.socials.map((s) => s.url),
  };
}

/** Site-level WebSite node — anchors site-name/sitelinks + locale signals. */
export function webSiteJsonLd(lang: Locale): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: htmlLang[lang],
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** FAQPage rich-result data, mirrored from the visible FAQ copy on a page. */
export function faqPageJsonLd(faqs: ServiceFaq[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function personJsonLd(lang: Locale): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.founder,
    worksFor: { "@id": `${site.url}/#organization` },
    url: `${site.url}${localePath("/about", lang)}`,
    sameAs: site.socials.map((s) => s.url),
  };
}

export function serviceJsonLd(
  service: Service,
  lang: Locale,
): WithContext<ServiceSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo.title,
    serviceType: service.name,
    description: service.seo.description,
    url: `${site.url}${localePath(`/services/${service.slug}`, lang)}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  lang: Locale,
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${localePath(item.path, lang)}`,
    })),
  };
}
