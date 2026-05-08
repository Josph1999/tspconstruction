import { SITE_URL, absoluteUrl } from "./site";
import type { PublicProject } from "@/lib/projects/server";
import type { Locale } from "@/types/project";

type Json = Record<string, unknown>;

export function organizationSchema(args: {
  locale: Locale;
  siteName: string;
  description: string;
  email?: string;
  phone?: string;
  address?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: args.siteName,
    url: SITE_URL,
    description: args.description,
    logo: absoluteUrl("/favicon.ico"),
    image: absoluteUrl("/favicon.ico"),
    inLanguage: args.locale,
    areaServed: { "@type": "City", name: "Tbilisi" },
    address: args.address
      ? {
          "@type": "PostalAddress",
          streetAddress: args.address,
          addressLocality: "Tbilisi",
          addressCountry: "GE",
        }
      : undefined,
    email: args.email,
    telephone: args.phone,
  };
}

export function websiteSchema(args: {
  siteName: string;
  description: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: args.siteName,
    description: args.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function projectSchema(
  project: PublicProject,
  locale: Locale,
  pageUrl: string
): Json {
  const tr = project.translations[locale];
  const description = `${tr.summary} ${tr.description1}`.trim();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: tr.title,
    headline: tr.title,
    description,
    image: [project.cover, ...(project.gallery ?? [])].filter(Boolean),
    url: absoluteUrl(pageUrl),
    inLanguage: locale,
    dateCreated: String(project.year),
    creator: { "@id": `${SITE_URL}/#organization` },
    locationCreated: { "@type": "Place", name: project.location },
    about: tr.category,
    keywords: [tr.title, tr.category, project.location, "renovation", "remont"]
      .filter(Boolean)
      .join(", "),
  };
}

export function projectListSchema(
  projects: PublicProject[],
  locale: Locale
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Renovation projects",
    inLanguage: locale,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/${locale}/projects/${p.slug}`),
      name: p.translations[locale]?.title,
    })),
  };
}

export function jsonLdString(data: Json | Json[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
