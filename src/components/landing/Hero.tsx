"use client";

import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const HERO_BG =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <Box
      id="home"
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "92vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        color: "#fff",
        overflow: "hidden",
        backgroundImage: `linear-gradient(120deg, rgba(11,18,32,0.88) 0%, rgba(11,18,32,0.65) 55%, rgba(11,18,32,0.55) 100%), url('${HERO_BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(60% 40% at 80% 10%, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0) 60%), radial-gradient(50% 40% at 0% 100%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 60%)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      <Container sx={{ position: "relative", py: { xs: 14, md: 0 } }}>
        <Stack spacing={4} sx={{ maxWidth: 880 }}>
          <Chip
            icon={<VerifiedIcon sx={{ color: "#FCD34D !important" }} />}
            label={t("eyebrow")}
            sx={{
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(8px)",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontSize: "0.72rem",
              height: 32,
              px: 0.5,
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.6rem", sm: "3.6rem", md: "5rem", lg: "6rem" },
              color: "#fff",
            }}
          >
            {t("titleLine1")}
            <Box
              component="span"
              sx={{
                display: "block",
                background:
                  "linear-gradient(120deg, #F59E0B 0%, #FB923C 40%, #FCD34D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("titleLine2")}
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              color: "rgba(255,255,255,0.78)",
              maxWidth: 640,
              lineHeight: 1.65,
            }}
          >
            {t("subtitle")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: 1 }}
          >
            <Button
              href="#contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ fontSize: "1rem", py: 1.6, px: 3.5 }}
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              size="large"
              startIcon={<PlayCircleOutlineIcon />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.32)",
                background: "rgba(255,255,255,0.04)",
                fontSize: "1rem",
                py: 1.6,
                px: 3.5,
                "&:hover": {
                  borderColor: "#fff",
                  background: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {t("ctaSecondary")}
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
              pt: 3,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 100%)",
              }}
            />
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              {t("trustBadge")}
            </Typography>
          </Stack>
        </Stack>
      </Container>

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(250,250,249,0.6) 60%, #FAFAF9 100%)",
        }}
      />
    </Box>
  );
}
