import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Box } from "@mui/material";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ProjectDetail from "@/components/landing/ProjectDetail";
import JsonLd from "@/components/seo/JsonLd";
import {
  getProjectBySlugServer,
  getRelatedProjectsServer,
} from "@/lib/projects/server";
import {
  DEFAULT_OG_IMAGE,
  localeAlternates,
  ogLocale,
} from "@/lib/seo/site";
import {
  breadcrumbSchema,
  projectSchema,
} from "@/lib/seo/jsonld";
import type { Locale } from "@/types/project";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlugServer(slug);
  const t = await getTranslations({ locale, namespace: "seo" });

  if (!project) {
    return {
      title: t("projectsTitle"),
      description: t("projectsDescription"),
      alternates: localeAlternates(locale, `/projects/${slug}`),
    };
  }

  const tr = project.translations[locale as Locale];
  const title = tr.title;
  const description = tr.summary || tr.description1.slice(0, 160);
  const cover = project.cover || DEFAULT_OG_IMAGE;
  const baseKeywords = t("projectKeywordsBase");
  const keywords = [
    tr.title,
    tr.category,
    project.location,
    baseKeywords,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title,
    description,
    keywords,
    alternates: localeAlternates(locale, `/projects/${project.slug}`),
    openGraph: {
      title: `${title} · ${t("siteName")}`,
      description,
      url: `/${locale}/projects/${project.slug}`,
      siteName: t("siteName"),
      locale: ogLocale(locale),
      type: "article",
      images: [{ url: cover, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlugServer(slug);
  if (!project) notFound();

  const [tNav, related] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    getRelatedProjectsServer(slug).catch(() => []),
  ]);

  const tr = project.translations[locale as Locale];
  const pageUrl = `/${locale}/projects/${project.slug}`;

  const jsonLd = [
    breadcrumbSchema([
      { name: tNav("home"), url: `/${locale}` },
      { name: tNav("projects"), url: `/${locale}/projects` },
      { name: tr.title, url: pageUrl },
    ]),
    projectSchema(project, locale as Locale, pageUrl),
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <JsonLd data={jsonLd} />
      <Header />
      <Box component="main">
        <ProjectDetail project={project} related={related} />
      </Box>
      <Footer />
    </Box>
  );
}
