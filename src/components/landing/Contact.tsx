"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useTranslations } from "next-intl";
import Eyebrow from "./Eyebrow";

export default function Contact() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const tInfo = useTranslations("contact.info");

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(60% 80% at 80% 0%, rgba(245,158,11,0.18) 0%, transparent 60%), linear-gradient(180deg, #0B1220 0%, #050913 100%)",
        color: "#fff",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "stretch",
          }}
        >
          <Stack spacing={3} sx={{ maxWidth: 540 }}>
            <Eyebrow text={t("eyebrow")} light />
            <Typography
              variant="h2"
              sx={{ color: "#fff", fontSize: { xs: "2rem", md: "2.8rem" } }}
            >
              {t("title")}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.72)",
                fontSize: { xs: "1rem", md: "1.05rem" },
              }}
            >
              {t("subtitle")}
            </Typography>

            <Stack spacing={2.5} sx={{ pt: 2 }}>
              {[
                { Icon: LocationOnIcon, text: tInfo("address") },
                { Icon: PhoneIcon, text: tInfo("phone") },
                { Icon: EmailIcon, text: tInfo("email") },
              ].map(({ Icon, text }, i) => (
                <Stack
                  key={i}
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#FCD34D",
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}
                  >
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              p: { xs: 3, md: 4.5 },
              borderRadius: 4,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(14px)",
            }}
          >
            <Stack spacing={2.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <ContactField label={tForm("name")} name="name" />
                <ContactField label={tForm("email")} name="email" type="email" />
              </Stack>
              <ContactField label={tForm("phone")} name="phone" />
              <ContactField
                label={tForm("message")}
                name="message"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<SendIcon />}
                sx={{ alignSelf: "flex-start", mt: 1 }}
              >
                {tForm("submit")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function ContactField({
  label,
  name,
  type = "text",
  multiline,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      variant="filled"
      slotProps={{
        inputLabel: { sx: { color: "rgba(255,255,255,0.6)" } },
      }}
      sx={{
        "& .MuiFilledInput-root": {
          background: "rgba(255,255,255,0.06)",
          color: "#fff",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.12)",
          "&:hover": { background: "rgba(255,255,255,0.08)" },
          "&.Mui-focused": {
            background: "rgba(255,255,255,0.1)",
            borderColor: "rgba(245,158,11,0.6)",
          },
          "&::before, &::after": { display: "none" },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "#FCD34D" },
      }}
    />
  );
}
