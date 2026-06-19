import type { Locale } from "./config";
import en from "./dictionaries/en";
import sr from "./dictionaries/sr";

export type Dictionary = typeof en;

/**
 * Recursively widen literal string types to `string` while preserving the
 * object/array shape. `en` and each locale dictionary use `as const`, so their
 * literal types differ; this lets us verify that every locale has the *same
 * shape* as `en` (same keys, array lengths, nesting) without demanding that the
 * translated strings equal the English ones.
 */
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { [K in keyof T]: WidenStrings<T[K]> }
    : T extends object
      ? { [K in keyof T]: WidenStrings<T[K]> }
      : T;

// Compile-time shape guard: fails to type-check if `sr` drifts from `en`'s shape.
const _srShapeCheck: WidenStrings<typeof en> = sr;
void _srShapeCheck;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  sr: sr as unknown as Dictionary,
};

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** Fill {name}-style placeholders in a template string. */
export function t(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export { type Locale } from "./config";
