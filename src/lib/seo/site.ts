import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://tspconstruction.ge";

export const SITE_URL_OBJECT = new URL(SITE_URL);

export const DEFAULT_OG_IMAGE = `https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80`;

export const SITE_LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

const OG_LOCALE: Record<(typeof SITE_LOCALES)[number], string> = {
  en: "en_US",
  ka: "ka_GE",
};

export function ogLocale(locale: string) {
  return OG_LOCALE[locale as keyof typeof OG_LOCALE] ?? "en_US";
}

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build canonical + hreflang alternates for a path that exists per-locale.
 * `pathInLocale` should be the locale-suffix part, e.g. `/projects/foo` (no leading locale).
 */
export function localeAlternates(
  locale: string,
  pathInLocale: string
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const tail = pathInLocale === "" ? "" : pathInLocale;
  const languages: Record<string, string> = {};
  for (const l of SITE_LOCALES) {
    languages[l] = `/${l}${tail}`;
  }
  languages["x-default"] = `/${DEFAULT_LOCALE}${tail}`;
  return {
    canonical: `/${locale}${tail}`,
    languages,
  };
}
