"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  // { href: "/products", key: "products" }, // products hidden for now
  { href: "/services", key: "services" },
  { href: "/changelog", key: "changelog" },
  { href: "/about", key: "about" },
] as const;

export function Wordmark({ className, lang }: { className?: string; lang: Locale }) {
  return (
    <Link
      href={localePath("/", lang)}
      className={cn(
        "font-display text-lg font-medium lowercase tracking-tight",
        className,
      )}
    >
      noqyris<span className="text-accent">.</span>
    </Link>
  );
}

export function Header({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Compare active state against the path with any leading /sr stripped, so
  // /sr/services matches the /services nav item.
  const localePathname = pathname.replace(/^\/sr(?=\/|$)/, "") || "/";

  const navLinks = navItems.map((item) => ({
    href: item.href,
    label: dict.nav[item.key],
  }));

  // The Header never remounts (root layout), so the menu must close itself
  // on navigation — including browser back/forward. React's documented
  // "adjust state when a prop changes" pattern (no effect, no extra paint).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Closing controls are md:hidden; crossing the breakpoint with the menu
  // open would otherwise leave body scroll locked with no way out.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock scroll + make the page behind the menu inert while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const page = [
      document.querySelector("main"),
      document.querySelector("footer"),
    ];
    for (const el of page) if (el) el.inert = open;
    return () => {
      document.body.style.overflow = "";
      for (const el of page) if (el) el.inert = false;
    };
  }, [open]);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus management for the mobile menu (it's a modal overlay): move focus
  // into the panel on open, trap Tab within it, and restore focus to the
  // toggle on close. Without this, keyboard/SR users are left behind the
  // overlay on the (visually hidden) page.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    if (!menu) return;
    const items = () =>
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    items()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    menu.addEventListener("keydown", onKey);
    return () => {
      menu.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // backdrop-blur lives on an inner div: a filter on <header> itself would
  // turn it into the containing block for the fixed mobile overlay below.
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "border-b border-line backdrop-blur-md",
          open ? "bg-bg" : "bg-bg/70",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
          <Wordmark lang={lang} />

          <nav className="hidden items-center gap-8 md:flex" aria-label={dict.nav.main}>
            {navLinks.map((link) => {
              const active = localePathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={localePath(link.href, lang)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors hover:text-fg",
                    active
                      ? "text-fg underline decoration-accent underline-offset-8"
                      : "text-fg-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher lang={lang} />
            <Link
              href={localePath("/start", lang)}
              className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-ink transition-colors hover:bg-fg sm:inline-flex"
            >
              {dict.nav.startProject}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
              className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-fg transition-transform",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-fg transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu — inert removes it from tab order and the
          accessibility tree while visually hidden */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={dict.nav.mobile}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col justify-between gap-8 overflow-y-auto bg-bg px-6 pt-10 pb-12 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2" aria-label={dict.nav.mobile}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localePath(link.href, lang)}
              onClick={() => setOpen(false)}
              aria-current={
                localePathname.startsWith(link.href) ? "page" : undefined
              }
              className="text-display-md border-b border-line py-4 text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-6">
          <LanguageSwitcher lang={lang} />
          <Link
            href={localePath("/start", lang)}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink"
          >
            {dict.nav.startProject}
          </Link>
        </div>
      </div>
    </header>
  );
}
