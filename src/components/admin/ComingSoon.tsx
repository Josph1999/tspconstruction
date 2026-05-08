"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function ComingSoon({
  icon,
  title,
  description,
  ideas,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  ideas: string[];
}) {
  return (
    <Card
      sx={{
        p: { xs: 4, md: 6 },
        background:
          "linear-gradient(180deg, rgba(245,158,11,0.04) 0%, transparent 100%)",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "flex-start", maxWidth: 720 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
            color: "#0B1220",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "secondary.dark",
              mb: 1,
            }}
          >
            Coming soon
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "1.8rem", mb: 1 }}>
            {title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "1rem" }}>
            {description}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, mb: 1.5 }}>
            What this module will include:
          </Typography>
          <Stack spacing={1}>
            {ideas.map((i, idx) => (
              <Stack
                key={idx}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                    mt: "10px",
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ color: "text.secondary" }}>{i}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
