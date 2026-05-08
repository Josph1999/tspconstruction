import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listProjectsServer } from "@/lib/projects/server";
import { SITE_URL } from "@/lib/seo/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await listProjectsServer().catch(() => []);
  const now = new Date();

  function alternatesFor(tail: string) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) languages[l] = `${SITE_URL}/${l}${tail}`;
    return languages;
  }

  const entries: MetadataRoute.Sitemap = [];

  // Homepage + Projects listing — one entry per locale, with hreflang alternates
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: alternatesFor("") },
    });
    entries.push({
      url: `${SITE_URL}/${locale}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alternatesFor("/projects") },
    });
  }

  // Per-project pages, both locales
  for (const project of projects) {
    const tail = `/projects/${project.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${tail}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: alternatesFor(tail) },
      });
    }
  }

  return entries;
}
