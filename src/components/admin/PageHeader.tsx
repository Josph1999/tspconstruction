"use client";

import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 2, md: 3 }}
      sx={{
        alignItems: { md: "flex-end" },
        justifyContent: "space-between",
        mb: { xs: 3, md: 4 },
      }}
    >
      <Box>
        {eyebrow && (
          <Typography
            sx={{
              color: "secondary.dark",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              mb: 1,
            }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: "primary.main",
            mb: subtitle ? 0.75 : 0,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: "text.secondary", maxWidth: 640 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && (
        <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
}
