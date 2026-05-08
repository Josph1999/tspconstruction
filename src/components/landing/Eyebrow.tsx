"use client";

import { Box, Stack, Typography } from "@mui/material";

export default function Eyebrow({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          width: 28,
          height: 2,
          background: "linear-gradient(90deg, #F59E0B, #FB923C)",
          borderRadius: 2,
        }}
      />
      <Typography
        sx={{
          color: light ? "rgba(252,211,77,0.95)" : "secondary.dark",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontSize: "0.75rem",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}
