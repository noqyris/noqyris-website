import type { Locale } from "@/i18n/config";
import { htmlLang } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";

export function SiteChrome({
  lang,
  children,
}: Readonly<{ lang: Locale; children: React.ReactNode }>) {
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd data={organizationJsonLd(lang)} />
      <JsonLd data={webSiteJsonLd(lang)} />
      <HtmlLang value={htmlLang[lang]} />
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {dict.meta.skipToContent}
      </a>
      <div className="contents" lang={lang === "en" ? undefined : "sr-Latn"}>
        <Header lang={lang} />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <Footer lang={lang} />
      </div>
    </>
  );
}
