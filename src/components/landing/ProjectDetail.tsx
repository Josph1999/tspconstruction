"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types/project";
import type { PublicProject } from "@/lib/projects/server";
import Eyebrow from "./Eyebrow";

export default function ProjectDetail({
  project,
  related,
}: {
  project: PublicProject;
  related: PublicProject[];
}) {
  const t = useTranslations("projectsPage.detail");
  const tMeta = useTranslations("projectsPage.meta");
  const tStatus = useTranslations("projectsPage.status");
  const locale = useLocale() as Locale;
  const tr = project.translations[locale];

  const meta = [
    { label: tMeta("client"), value: project.client },
    { label: tMeta("location"), value: project.location },
    { label: tMeta("year"), value: String(project.year) },
    { label: tMeta("area"), value: project.area },
    {
      label: tMeta("status"),
      value: tStatus(project.status),
      accent: true,
    },
    { label: tMeta("category"), value: tr.category },
  ];

  return (
    <>
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: { xs: "70vh", md: "85vh" },
          display: "flex",
          alignItems: "flex-end",
          color: "#fff",
          overflow: "hidden",
          backgroundImage: `linear-gradient(180deg, rgba(11,18,32,0.55) 0%, rgba(11,18,32,0.85) 100%), url('${project.cover}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pt: { xs: 16, md: 22 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container sx={{ position: "relative" }}>
          <Button
            component={Link}
            href="/projects"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "rgba(255,255,255,0.85)",
              mb: 4,
              px: 0,
              "&:hover": {
                background: "transparent",
                color: "#FCD34D",
              },
            }}
          >
            {t("back")}
          </Button>

          <Stack spacing={3} sx={{ maxWidth: 920 }}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", flexWrap: "wrap", gap: 1.5 }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  background:
                    project.status === "ongoing"
                      ? "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)"
                      : "rgba(255,255,255,0.12)",
                  border:
                    project.status === "ongoing"
                      ? "none"
                      : "1px solid rgba(255,255,255,0.18)",
                  color:
                    project.status === "ongoing"
                      ? "#0B1220"
                      : "rgba(255,255,255,0.92)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {tStatus(project.status)}
              </Box>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {tr.category} · {project.year}
              </Typography>
            </Stack>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.6rem", sm: "3.4rem", md: "5rem" },
                color: "#fff",
              }}
            >
              {tr.title}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                maxWidth: 720,
              }}
            >
              {tr.summary}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
              gap: { xs: 5, md: 8 },
              alignItems: "flex-start",
            }}
          >
            <Stack spacing={3}>
              <Eyebrow text={t("overview")} />
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" } }}
              >
                {tr.title}
              </Typography>
              <Typography
                sx={{ color: "text.secondary", fontSize: "1.05rem" }}
              >
                {tr.description1}
              </Typography>
              <Typography
                sx={{ color: "text.secondary", fontSize: "1.05rem" }}
              >
                {tr.description2}
              </Typography>
            </Stack>

            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 100 },
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, #0B1220 0%, #1E293B 100%)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 30px 80px -40px rgba(11,18,32,0.5)",
              }}
            >
              <Typography
                sx={{
                  color: "#FCD34D",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {t("highlights")}
              </Typography>
              <Stack
                divider={
                  <Box
                    sx={{
                      height: 1,
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />
                }
                spacing={2}
              >
                {meta.map((m) => (
                  <Stack
                    key={m.label}
                    direction="row"
                    sx={{ justifyContent: "space-between", gap: 2 }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {m.label}
                    </Typography>
                    <Typography
                      sx={{
                        color: m.accent ? "#FCD34D" : "rgba(255,255,255,0.95)",
                        fontWeight: 600,
                        textAlign: "right",
                      }}
                    >
                      {m.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background:
            "linear-gradient(180deg, #FAFAF9 0%, #F1F5F9 50%, #FAFAF9 100%)",
        }}
      >
        <Container>
          <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 600 }}>
            <Eyebrow text={t("gallery")} />
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" } }}
            >
              {tr.title}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            }}
          >
            {project.gallery.map((src, i) => (
              <Box
                key={i}
                sx={{
                  gridColumn: {
                    xs: "1 / -1",
                    md:
                      i === 0
                        ? "1 / span 7"
                        : i === 1
                          ? "8 / span 5"
                          : "1 / span 12",
                  },
                  aspectRatio: i === 2 ? "21 / 9" : "4 / 3",
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundImage: `url('${src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 24px 50px -30px rgba(11,18,32,0.35)",
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {related.length > 0 && (
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
          <Container>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 4 }}
              sx={{
                alignItems: { md: "flex-end" },
                justifyContent: "space-between",
                mb: { xs: 4, md: 6 },
              }}
            >
              <Stack spacing={1.5} sx={{ maxWidth: 560 }}>
                <Eyebrow text={t("relatedTitle")} />
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" } }}
                >
                  {t("relatedSubtitle")}
                </Typography>
              </Stack>
              <Button
                component={Link}
                href="/projects"
                endIcon={<ArrowOutwardIcon />}
                sx={{ alignSelf: { xs: "flex-start", md: "auto" }, fontWeight: 700 }}
              >
                {t("back")}
              </Button>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 2.5, md: 3 },
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }}
            >
              {related.map((p) => (
                <Box
                  key={p.slug}
                  component={Link}
                  href={`/projects/${p.slug}`}
                  sx={{
                    position: "relative",
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 4,
                    overflow: "hidden",
                    aspectRatio: "4 / 5",
                    backgroundImage: `url('${p.cover}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 320ms ease",
                    "&:hover": { transform: "translateY(-4px)" },
                    "&:hover .related-overlay": {
                      background:
                        "linear-gradient(180deg, rgba(11,18,32,0) 30%, rgba(11,18,32,0.9) 100%)",
                    },
                  }}
                >
                  <Box
                    className="related-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(11,18,32,0) 50%, rgba(11,18,32,0.8) 100%)",
                      transition: "background 320ms ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      color: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.78)",
                        mb: 0.5,
                      }}
                    >
                      {p.translations[locale].category}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: "1.25rem", fontWeight: 700 }}
                    >
                      {p.translations[locale].title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background:
            "radial-gradient(60% 80% at 80% 20%, rgba(245,158,11,0.18) 0%, transparent 60%), linear-gradient(180deg, #0B1220 0%, #050913 100%)",
          color: "#fff",
        }}
      >
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 6 }}
            sx={{
              alignItems: { md: "center" },
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={2} sx={{ maxWidth: 620 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontSize: { xs: "1.8rem", md: "2.6rem" },
                }}
              >
                {t("ctaTitle")}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                {t("ctaSubtitle")}
              </Typography>
            </Stack>
            <Button
              component={Link}
              href="/#contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ fontSize: "1rem", py: 1.6, px: 3.5 }}
            >
              {t("ctaButton")}
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
