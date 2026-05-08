"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale, ProjectCategory } from "@/types/project";
import type { PublicProject } from "@/lib/projects/server";
import Eyebrow from "./Eyebrow";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = [
  "all",
  "apartment",
  "kitchen",
  "bathroom",
  "house",
  "commercial",
];

export default function ProjectsList({
  projects,
}: {
  projects: PublicProject[];
}) {
  const t = useTranslations("projectsPage");
  const tFilters = useTranslations("projectsPage.filters");
  const tStatus = useTranslations("projectsPage.status");
  const locale = useLocale() as Locale;

  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects]
  );

  return (
    <Box component="section" sx={{ pt: { xs: 16, md: 22 }, pb: { xs: 10, md: 16 } }}>
      <Container>
        <Stack spacing={3} sx={{ maxWidth: 820, mb: { xs: 5, md: 7 } }}>
          <Eyebrow text={t("eyebrow")} />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.4rem", md: "3.6rem" } }}
          >
            {t("title")}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        {projects.length > 0 && (
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              flexWrap: "wrap",
              gap: 1.25,
              mb: { xs: 5, md: 7 },
            }}
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <Chip
                  key={f}
                  label={tFilters(f)}
                  clickable
                  onClick={() => setFilter(f)}
                  sx={{
                    px: 1,
                    height: 38,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: active ? "transparent" : "rgba(15,23,42,0.12)",
                    background: active
                      ? "linear-gradient(135deg, #0B1220 0%, #1E293B 100%)"
                      : "transparent",
                    color: active ? "#fff" : "text.primary",
                    "&:hover": {
                      background: active
                        ? "linear-gradient(135deg, #050913 0%, #0B1220 100%)"
                        : "rgba(15,23,42,0.05)",
                    },
                  }}
                />
              );
            })}
          </Stack>
        )}

        {projects.length === 0 ? (
          <Box
            sx={{
              p: { xs: 5, md: 8 },
              textAlign: "center",
              borderRadius: 4,
              background: "rgba(15,23,42,0.04)",
              border: "1px dashed rgba(15,23,42,0.12)",
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              No projects published yet.
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Check back soon — our newest renovations will appear here.
            </Typography>
          </Box>
        ) : visible.length === 0 ? (
          <Box
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "rgba(15,23,42,0.04)",
              color: "text.secondary",
            }}
          >
            No projects in this category yet.
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, md: 3.5 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
            }}
          >
            {visible.map((p) => {
              const tr = p.translations[locale];
              return (
                <Box
                  key={p.id}
                  component={Link}
                  href={`/projects/${p.slug}`}
                  sx={{
                    position: "relative",
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid rgba(15,23,42,0.06)",
                    background: "#fff",
                    transition: "transform 280ms ease, box-shadow 280ms ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 30px 60px -30px rgba(11,18,32,0.35)",
                    },
                    "&:hover .cover": { transform: "scale(1.06)" },
                    "&:hover .arrow": {
                      transform: "translate(4px,-4px)",
                      background:
                        "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                      color: "#0B1220",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden" }}>
                    <Box
                      className="cover"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: p.cover ? `url('${p.cover}')` : undefined,
                        background: p.cover
                          ? undefined
                          : "linear-gradient(135deg, #1E293B 0%, #0B1220 100%)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "transform 600ms ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(8px)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color:
                          p.status === "ongoing"
                            ? "secondary.dark"
                            : "primary.main",
                      }}
                    >
                      {tStatus(p.status)}
                    </Box>
                  </Box>
                  <Stack
                    direction="row"
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "text.secondary",
                          mb: 0.5,
                        }}
                      >
                        {tr.category} · {p.year}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {tr.title}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          color: "text.secondary",
                          fontSize: "0.92rem",
                        }}
                      >
                        {tr.summary}
                      </Typography>
                    </Box>
                    <Box
                      className="arrow"
                      sx={{
                        flexShrink: 0,
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "rgba(15,23,42,0.06)",
                        color: "primary.main",
                        transition: "all 280ms ease",
                      }}
                    >
                      <ArrowOutwardIcon fontSize="small" />
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
