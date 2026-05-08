"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types/project";
import type { PublicProject } from "@/lib/projects/server";
import Eyebrow from "./Eyebrow";

const LAYOUT: Array<{
  span: { xs: string; md: string };
  height: { xs: number; md: number };
}> = [
  { span: { xs: "1 / -1", md: "1 / span 7" }, height: { xs: 320, md: 480 } },
  { span: { xs: "1 / -1", md: "8 / span 5" }, height: { xs: 280, md: 480 } },
  { span: { xs: "1 / -1", md: "1 / span 5" }, height: { xs: 280, md: 420 } },
  { span: { xs: "1 / -1", md: "6 / span 7" }, height: { xs: 280, md: 420 } },
];

export default function Projects({ projects }: { projects: PublicProject[] }) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;

  if (projects.length === 0) return null;

  const featured = projects.slice(0, LAYOUT.length);

  return (
    <Box
      id="projects"
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background:
          "linear-gradient(180deg, #FAFAF9 0%, #F1F5F9 50%, #FAFAF9 100%)",
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          sx={{
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: 640 }}>
            <Eyebrow text={t("eyebrow")} />
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "2rem", md: "2.8rem" } }}
            >
              {t("title")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {t("subtitle")}
            </Typography>
          </Stack>
          <Button
            component={Link}
            href="/projects"
            variant="text"
            endIcon={<ArrowOutwardIcon />}
            sx={{
              color: "primary.main",
              fontWeight: 700,
              alignSelf: { xs: "flex-start", md: "auto" },
            }}
          >
            {t("viewAll")}
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {featured.map((p, i) => {
            const layout = LAYOUT[i] ?? LAYOUT[LAYOUT.length - 1];
            const tr = p.translations[locale];
            return (
              <Box
                key={p.id}
                component={Link}
                href={`/projects/${p.slug}`}
                sx={{
                  gridColumn: layout.span,
                  height: layout.height,
                  position: "relative",
                  display: "block",
                  textDecoration: "none",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundImage: `url('${p.cover}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 360ms ease",
                  "&:hover": { transform: "translateY(-4px)" },
                  "&:hover .overlay": {
                    background:
                      "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.85) 100%)",
                  },
                  "&:hover .arrow": { transform: "translate(4px,-4px)" },
                }}
              >
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(11,18,32,0) 40%, rgba(11,18,32,0.75) 100%)",
                    transition: "background 320ms ease",
                  }}
                />
                <Stack
                  direction="row"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    p: { xs: 3, md: 4 },
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    color: "#fff",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.75)",
                        mb: 0.5,
                      }}
                    >
                      {tr.category}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.8rem" },
                        fontWeight: 700,
                      }}
                    >
                      {tr.title}
                    </Typography>
                  </Box>
                  <Box
                    className="arrow"
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background:
                        "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                      color: "#0B1220",
                      transition: "transform 320ms ease",
                    }}
                  >
                    <ArrowOutwardIcon />
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
