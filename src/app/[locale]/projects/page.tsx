import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Box } from "@mui/material";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Contact from "@/components/landing/Contact";
import ProjectsList from "@/components/landing/ProjectsList";
import JsonLd from "@/components/seo/JsonLd";
import { listProjectsServer } from "@/lib/projects/server";
import {
  DEFAULT_OG_IMAGE,
  localeAlternates,
  ogLocale,
} from "@/lib/seo/site";
import {
  breadcrumbSchema,
  projectListSchema,
} from "@/lib/seo/jsonld";
import type { Locale } from "@/types/project";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const title = t("projectsTitle");
  const description = t("projectsDescription");

  return {
    title,
    description,
    keywords: t("projectsKeywords"),
    alternates: localeAlternates(locale, "/projects"),
    openGraph: {
      title: `${title} · ${t("siteName")}`,
      description,
      url: `/${locale}/projects`,
      siteName: t("siteName"),
      locale: ogLocale(locale),
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: tNav("projects") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, projects] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    listProjectsServer().catch(() => []),
  ]);

  const jsonLd = [
    breadcrumbSchema([
      { name: tNav("home"), url: `/${locale}` },
      { name: tNav("projects"), url: `/${locale}/projects` },
    ]),
    projectListSchema(projects, locale as Locale),
  ];

  return (
    <Box sx={{ position: "relative", background: "#FAFAF9" }}>
      <JsonLd data={jsonLd} />
      <Header />
      <Box
        component="main"
        sx={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(245,158,11,0.10) 0%, transparent 60%), #FAFAF9",
        }}
      >
        <ProjectsList projects={projects} />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
