"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslations } from "next-intl";
import Eyebrow from "./Eyebrow";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1600&q=80";

const POINTS = ["quality", "ontime", "safety", "transparent"] as const;

export default function About() {
  const t = useTranslations("about");
  const tPoints = useTranslations("about.points");
  const tBadge = useTranslations("about.badge");

  return (
    <Box id="about" component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: 4,
                overflow: "hidden",
                backgroundImage: `url('${ABOUT_IMAGE}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 40px 80px -40px rgba(11,18,32,0.5)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: -20, md: -30 },
                right: { xs: -10, md: -30 },
                px: 3,
                py: 2.5,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                color: "#0B1220",
                boxShadow: "0 24px 48px -24px rgba(245,158,11,0.7)",
                minWidth: 200,
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: "2.2rem", lineHeight: 1 }}>
                {tBadge("value")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  mt: 0.5,
                }}
              >
                {tBadge("label")}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={3}>
            <Eyebrow text={t("eyebrow")} />
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "2rem", md: "2.6rem" } }}
            >
              {t("title")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {t("paragraph1")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {t("paragraph2")}
            </Typography>

            <Stack spacing={1.5} sx={{ pt: 1 }}>
              {POINTS.map((p) => (
                <Stack
                  key={p}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center" }}
                >
                  <CheckCircleIcon sx={{ color: "secondary.main" }} />
                  <Typography sx={{ fontWeight: 500 }}>
                    {tPoints(p)}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Box sx={{ pt: 1 }}>
              <Button
                href="#contact"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
              >
                {t("cta")}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
