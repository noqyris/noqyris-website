import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary, t } from "@/i18n";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/icons";
import { Container } from "./Container";

const footerNav = [
  // { href: "/products", key: "products" }, // products hidden for now
  { href: "/services", key: "services" },
  { href: "/process", key: "process" },
  { href: "/changelog", key: "changelog" },
  { href: "/about", key: "about" },
  { href: "/start", key: "startProject" },
] as const;

export function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <footer className="hairline-t overflow-hidden">
      <Container className="flex flex-col gap-10 py-12">
        <Link
          href={localePath("/", lang)}
          aria-label={dict.nav.home}
          className="footer-wordmark -mb-2 block whitespace-nowrap"
        >
          <span aria-hidden="true">noqyris.</span>
        </Link>

        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {footerNav.map((link) => (
              <Link
                key={link.href}
                href={localePath(link.href, lang)}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {dict.nav[link.key]}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {dict.nav.contact}
            </a>
            <a
              href="/feed.xml"
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {dict.nav.rss}
            </a>
          </nav>
          <ul className="flex items-center gap-4">
            {site.socials.map((social) => (
              <li key={social.key}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(dict.site.socialAria, {
                    name: site.name,
                    label: social.label,
                  })}
                  className="text-fg-faint transition-colors hover:text-fg"
                >
                  <SocialIcon network={social.key} width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <p className="text-sm text-fg-faint">{dict.site.copyright}</p>
          <p className="mono-label text-fg-faint">{dict.site.techChips}</p>
        </div>
      </Container>
    </footer>
  );
}
