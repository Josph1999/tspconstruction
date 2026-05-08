"use client";

import { Box, Container, Stack, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandMark from "./BrandMark";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services.items");
  const tContactInfo = useTranslations("contact.info");
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: "#050913",
        color: "rgba(255,255,255,0.78)",
        pt: { xs: 8, md: 10 },
        pb: 4,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.4fr 1fr 1fr 1fr",
            },
            gap: { xs: 5, md: 6 },
            mb: 6,
          }}
        >
          <Stack spacing={2.5} sx={{ maxWidth: 360 }}>
            <BrandMark dark />
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
              {t("tagline")}
            </Typography>
            <Stack direction="row" spacing={1}>
              {[FacebookIcon, InstagramIcon, LinkedInIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    "&:hover": {
                      color: "#0B1220",
                      background:
                        "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                      borderColor: "transparent",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Stack>

          <FooterColumn
            title={t("company")}
            items={[
              { label: tNav("about"), href: "/#about" },
              { label: tNav("projects"), href: "/projects" },
              { label: tNav("services"), href: "/#services" },
              { label: tNav("contact"), href: "/#contact" },
            ]}
          />

          <FooterColumn
            title={t("services")}
            items={[
              { label: tServices("apartment.title"), href: "/#services" },
              { label: tServices("kitchen.title"), href: "/#services" },
              { label: tServices("bathroom.title"), href: "/#services" },
              { label: tServices("design.title"), href: "/#services" },
            ]}
          />

          <FooterColumn
            title={t("contact")}
            items={[
              { label: tContactInfo("address") },
              { label: tContactInfo("phone") },
              { label: tContactInfo("email") },
            ]}
          />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            pt: 4,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            © {year} TSPconstruction. {t("rights")}
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("language")}
            </Typography>
            <LanguageSwitcher dark />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href?: string }[];
}) {
  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          color: "#FCD34D",
          fontSize: "0.75rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Stack spacing={1.25}>
        {items.map((item, i) =>
          item.href ? (
            <Box
              key={i}
              component={Link}
              href={item.href}
              sx={{
                color: "rgba(255,255,255,0.78)",
                textDecoration: "none",
                transition: "color 200ms ease",
                "&:hover": { color: "#fff" },
              }}
            >
              {item.label}
            </Box>
          ) : (
            <Typography key={i} sx={{ color: "rgba(255,255,255,0.78)" }}>
              {item.label}
            </Typography>
          )
        )}
      </Stack>
    </Stack>
  );
}
