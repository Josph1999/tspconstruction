"use client";

import { createTheme } from "@mui/material/styles";

const BRAND_AMBER = "#F59E0B";
const BRAND_AMBER_DARK = "#D97706";
const BRAND_INK = "#0B1220";
const BRAND_SLATE = "#1E293B";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: BRAND_INK,
      dark: "#050913",
      light: BRAND_SLATE,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: BRAND_AMBER,
      dark: BRAND_AMBER_DARK,
      light: "#FCD34D",
      contrastText: "#0B1220",
    },
    background: {
      default: "#FAFAF9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0B1220",
      secondary: "#475569",
    },
    divider: "rgba(15, 23, 42, 0.08)",
  },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
      lineHeight: 1.05,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          paddingBlock: 12,
          fontSize: "0.95rem",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            color: BRAND_INK,
            background: `linear-gradient(135deg, ${BRAND_AMBER} 0%, #FB923C 100%)`,
            boxShadow: "0 10px 24px -10px rgba(245, 158, 11, 0.6)",
            "&:hover": {
              background: `linear-gradient(135deg, ${BRAND_AMBER_DARK} 0%, #EA580C 100%)`,
              boxShadow: "0 14px 28px -10px rgba(217, 119, 6, 0.7)",
            },
          },
        },
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: `linear-gradient(135deg, ${BRAND_INK} 0%, ${BRAND_SLATE} 100%)`,
            "&:hover": {
              background: `linear-gradient(135deg, #050913 0%, ${BRAND_INK} 100%)`,
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: "1px solid rgba(15, 23, 42, 0.06)",
          transition: "transform 240ms ease, box-shadow 240ms ease",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: "saturate(160%) blur(14px)",
          WebkitBackdropFilter: "saturate(160%) blur(14px)",
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
    },
  },
});

export const brand = {
  amber: BRAND_AMBER,
  amberDark: BRAND_AMBER_DARK,
  ink: BRAND_INK,
  slate: BRAND_SLATE,
};
