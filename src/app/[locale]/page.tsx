import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Box } from "@mui/material";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Services from "@/components/landing/Services";
import Projects from "@/components/landing/Projects";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { getFeaturedProjectsServer } from "@/lib/projects/server";
import {
  DEFAULT_OG_IMAGE,
  localeAlternates,
  ogLocale,
} from "@/lib/seo/site";
import {
  organizationSchema,
  websiteSchema,
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
  const title = t("homeTitle");
  const description = t("homeDescription");

  return {
    title,
    description,
    keywords: t("homeKeywords"),
    alternates: localeAlternates(locale, ""),
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: t("siteName"),
      locale: ogLocale(locale),
      type: "website",
      images: [
        { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: t("siteName") },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tContact, projects] = await Promise.all([
    getTranslations({ locale, namespace: "seo" }),
    getTranslations({ locale, namespace: "contact.info" }),
    getFeaturedProjectsServer(4).catch(() => []),
  ]);

  const jsonLd = [
    organizationSchema({
      locale: locale as Locale,
      siteName: t("siteName"),
      description: t("siteDescription"),
      email: tContact("email"),
      phone: tContact("phone"),
      address: tContact("address"),
    }),
    websiteSchema({
      siteName: t("siteName"),
      description: t("siteDescription"),
    }),
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <JsonLd data={jsonLd} />
      <Header />
      <Box component="main">
        <Hero />
        <Stats />
        <Services />
        <Projects projects={projects} />
        <About />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
