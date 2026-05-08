"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import HandymanIcon from "@mui/icons-material/Handyman";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import { useTranslations } from "next-intl";

const SERVICES = [
  { key: "apartment" as const, Icon: ApartmentIcon },
  { key: "kitchen" as const, Icon: KitchenIcon },
  { key: "bathroom" as const, Icon: BathtubIcon },
  { key: "painting" as const, Icon: FormatPaintIcon },
  { key: "utilities" as const, Icon: HandymanIcon },
  { key: "design" as const, Icon: ArchitectureIcon },
];

export default function Services() {
  const t = useTranslations("services");
  const tItems = useTranslations("services.items");

  return (
    <Box id="services" component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container>
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 8 }, maxWidth: 760 }}>
          <Eyebrow text={t("eyebrow")} />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.8rem" } }}
          >
            {t("title")}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            {t("subtitle")}
          </Typography>
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
          {SERVICES.map(({ key, Icon }) => (
            <Card
              key={key}
              sx={{
                p: { xs: 2, md: 3 },
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px -20px rgba(11,18,32,0.25)",
                  borderColor: "rgba(245,158,11,0.4)",
                },
                "&:hover .service-icon": {
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                  color: "#0B1220",
                  transform: "scale(1.05) rotate(-4deg)",
                },
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Box
                  className="service-icon"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2.5,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(11,18,32,0.06)",
                    color: "primary.main",
                    mb: 2.5,
                    transition: "all 280ms ease",
                  }}
                >
                  <Icon sx={{ fontSize: 28 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "1.25rem", mb: 1 }}
                >
                  {tItems(`${key}.title`)}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {tItems(`${key}.description`)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function Eyebrow({ text }: { text: string }) {
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
          color: "secondary.dark",
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
