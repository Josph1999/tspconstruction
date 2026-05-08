"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const STATS = [
  { value: "500+", key: "projects" as const },
  { value: "480+", key: "clients" as const },
  { value: "20+", key: "experience" as const },
  { value: "35+", key: "team" as const },
];

export default function Stats() {
  const t = useTranslations("stats");
  return (
    <Box component="section" sx={{ position: "relative", mt: { xs: -6, md: -10 } }}>
      <Container>
        <Box
          sx={{
            position: "relative",
            background: "#FFFFFF",
            borderRadius: 4,
            border: "1px solid rgba(15,23,42,0.06)",
            boxShadow:
              "0 30px 80px -40px rgba(11,18,32,0.4), 0 8px 20px -10px rgba(11,18,32,0.08)",
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 5 },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            divider={
              <Box
                sx={{
                  width: { xs: "100%", sm: 1 },
                  height: { xs: 1, sm: "auto" },
                  background: "rgba(15,23,42,0.08)",
                }}
              />
            }
            spacing={{ xs: 3, sm: 0 }}
            sx={{ alignItems: "stretch" }}
          >
            {STATS.map((s) => (
              <Box
                key={s.key}
                sx={{
                  flex: 1,
                  px: { sm: 3 },
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "2.4rem", md: "3rem" },
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    background:
                      "linear-gradient(135deg, #0B1220 0%, #1E293B 60%, #F59E0B 140%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                  }}
                >
                  {t(s.key)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
