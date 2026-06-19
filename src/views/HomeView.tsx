import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { mailto } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/shared/TrustBar";
import { AudienceFork } from "@/components/home/AudienceFork";
// Products hidden for now — restore this import + the <ProductStrip/> below when
// there are real products to show.
// import { ProductStrip } from "@/components/home/ProductStrip";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { ProofSection } from "@/components/home/ProofSection";
import { ChangelogTeaser } from "@/components/home/ChangelogTeaser";
import { FollowTheBuild } from "@/components/shared/FollowTheBuild";
import { Marquee } from "@/components/motion/Marquee";
import { CtaSection } from "@/components/shared/CtaSection";

export function HomeView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  return (
    <>
      <Hero lang={lang} />
      <TrustBar lang={lang} />
      <AudienceFork lang={lang} />
      {/* <ProductStrip lang={lang} /> — products hidden for now */}
      <ProofSection lang={lang} />
      <ChangelogTeaser lang={lang} />
      <ServiceIndex lang={lang} />
      <FollowTheBuild lang={lang} index="05" />
      <Marquee
        text={dict.marquee.home}
        href={mailto(dict.contactSubject)}
        label={dict.marquee.homeAria}
      />
      <CtaSection lang={lang} />
    </>
  );
}
