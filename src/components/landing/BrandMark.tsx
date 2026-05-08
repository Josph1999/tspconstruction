"use client";

import { Box, Typography } from "@mui/material";

export default function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Box
        aria-hidden
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
          boxShadow: "0 6px 16px -6px rgba(245,158,11,0.7)",
          fontWeight: 900,
          color: "#0B1220",
          fontSize: "0.95rem",
          letterSpacing: "-0.04em",
        }}
      >
        TSP
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <Typography
          component="span"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontSize: "1.05rem",
            color: dark ? "#FFFFFF" : "primary.main",
          }}
        >
          construction
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,0.55)" : "text.secondary",
            mt: "2px",
          }}
        >
          Renovate · Refresh · Restore
        </Typography>
      </Box>
    </Box>
  );
}
