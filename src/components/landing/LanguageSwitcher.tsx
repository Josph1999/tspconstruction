"use client";

import { useState, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button, Menu, MenuItem, ListItemText } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const open = Boolean(anchor);
  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  const switchTo = (next: Locale) => {
    handleClose();
    if (next === locale) return;
    router.replace(
      // @ts-expect-error -- next-intl types pathname as a known route literal
      { pathname, params },
      { locale: next }
    );
  };

  const labelColor = dark ? "rgba(255,255,255,0.92)" : "text.primary";

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<LanguageIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        size="small"
        sx={{
          color: labelColor,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontSize: "0.78rem",
          px: 1.5,
          minWidth: 0,
          "&:hover": {
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.05)",
          },
        }}
        aria-label={t("switchTo")}
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 160, borderRadius: 2 } } }}
      >
        {routing.locales.map((code) => (
          <MenuItem
            key={code}
            selected={code === locale}
            onClick={() => switchTo(code)}
          >
            <ListItemText
              primary={t(code)}
              secondary={code.toUpperCase()}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: "0.7rem", letterSpacing: "0.1em" } },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
