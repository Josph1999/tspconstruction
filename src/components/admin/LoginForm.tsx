"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "@/lib/firebase/auth-context";
import BrandMark from "@/components/landing/BrandMark";

export default function LoginForm() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) router.replace("/admin/dashboard");
  }, [loading, user, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace("/admin/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      const message =
        code === "auth/invalid-credential" || code === "auth/wrong-password"
          ? "Invalid email or password."
          : code === "auth/user-not-found"
            ? "No account exists for that email."
            : code === "auth/too-many-requests"
              ? "Too many attempts. Try again in a moment."
              : (err as Error).message || "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(60% 50% at 80% 0%, rgba(245,158,11,0.18) 0%, transparent 60%), linear-gradient(180deg, #0B1220 0%, #050913 100%)",
        color: "#fff",
        px: 3,
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

      <Container maxWidth="xs" sx={{ position: "relative" }}>
        <Stack spacing={4} sx={{ alignItems: "center", mb: 4 }}>
          <BrandMark dark />
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontSize: "1.8rem", color: "#fff", mb: 1 }}
            >
              Admin sign-in
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
              Manage your projects, gallery, and content.
            </Typography>
          </Box>
        </Stack>

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Stack spacing={2.5}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#FCA5A5",
                  ".MuiAlert-icon": { color: "#FCA5A5" },
                }}
              >
                {error}
              </Alert>
            )}

            <DarkField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              required
            />
            <DarkField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={
                submitting ? <LockOutlinedIcon /> : <LoginIcon />
              }
              disabled={submitting || !email || !password}
              sx={{ mt: 1, py: 1.4 }}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </Stack>
        </Box>

        <Typography
          sx={{
            mt: 3,
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          Accounts are managed in the Firebase console.
        </Typography>
      </Container>
    </Box>
  );
}

function DarkField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete={autoComplete}
      required={required}
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
