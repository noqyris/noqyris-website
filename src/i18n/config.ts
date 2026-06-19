export const locales = ["en", "sr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sr: "Srpski",
};

/** OpenGraph locale tags + <html lang> values. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  sr: "sr-Latn",
};
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  sr: "sr_RS",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix a root-relative path for the given locale. English stays at root;
 *  Serbian lives under /sr. */
export function localePath(path: string, lang: Locale): string {
  const clean = path === "/" ? "" : path;
  return lang === defaultLocale ? path : `/sr${clean}` || "/sr";
}

/** Swap the locale of the current path (for the language switcher). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const stripped = pathname.replace(/^\/sr(?=\/|$)/, "") || "/";
  return localePath(stripped, to);
}
