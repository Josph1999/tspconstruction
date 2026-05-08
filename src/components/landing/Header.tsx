"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandMark from "./BrandMark";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  key: "services" | "projects" | "about" | "contact";
  href: string;
};

const NAV: NavItem[] = [
  { key: "services", href: "/#services" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeDrawer = () => setDrawer(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.0)",
          color: "primary.main",
          borderBottom: scrolled
            ? "1px solid rgba(15,23,42,0.06)"
            : "1px solid transparent",
          transition: "background 240ms ease, border-color 240ms ease",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 80 }, gap: 2 }}>
            <Box
              component={Link}
              href="/"
              sx={{
                flexShrink: 0,
                textDecoration: "none",
                color: "inherit",
                display: "inline-flex",
              }}
              aria-label="TSPconstruction — home"
            >
              <BrandMark />
            </Box>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                ml: 4,
                display: { xs: "none", md: "flex" },
              }}
            >
              {NAV.map((item) => (
                <Button
                  key={item.key}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    px: 2,
                    "&:hover": {
                      background: "rgba(15,23,42,0.05)",
                      color: "secondary.dark",
                    },
                  }}
                >
                  {t(item.key)}
                </Button>
              ))}
            </Stack>

            <Box sx={{ flex: 1 }} />

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
            >
              <LanguageSwitcher />
              <Button
                component={Link}
                href="/#contact"
                variant="contained"
                color="secondary"
                size="medium"
              >
                {t("getQuote")}
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <LanguageSwitcher />
              <IconButton
                onClick={() => setDrawer(true)}
                aria-label="Open menu"
                sx={{ color: "primary.main" }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawer}
        onClose={closeDrawer}
        slotProps={{ paper: { sx: { width: 300, p: 2 } } }}
      >
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}
        >
          <Box
            component={Link}
            href="/"
            onClick={closeDrawer}
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "inline-flex",
            }}
            aria-label="TSPconstruction — home"
          >
            <BrandMark />
          </Box>
          <IconButton onClick={closeDrawer} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {NAV.map((item) => (
            <ListItemButton
              key={item.key}
              component={Link}
              href={item.href}
              onClick={closeDrawer}
            >
              <ListItemText
                primary={t(item.key)}
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            href="/#contact"
            onClick={closeDrawer}
            variant="contained"
            color="secondary"
            fullWidth
          >
            {t("getQuote")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
