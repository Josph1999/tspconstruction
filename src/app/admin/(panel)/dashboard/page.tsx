"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PageHeader from "@/components/admin/PageHeader";
import { listProjects } from "@/lib/projects/firestore";
import { useAuth } from "@/lib/firebase/auth-context";
import type { ProjectDoc } from "@/types/project";

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectDoc[] | null>(null);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const total = projects?.length ?? 0;
  const completed = projects?.filter((p) => p.status === "completed").length ?? 0;
  const ongoing = projects?.filter((p) => p.status === "ongoing").length ?? 0;
  const featured = projects?.filter((p) => p.featured).length ?? 0;

  return (
    <Box>
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back${user?.email ? `, ${user.email.split("@")[0]}` : ""}.`}
        subtitle="Manage your portfolio, content, and inbound inquiries."
        actions={
          <Button
            component={Link}
            href="/admin/projects/new"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            New project
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          mb: 4,
        }}
      >
        <StatCard label="Total projects" value={total} loading={projects === null} />
        <StatCard label="Completed" value={completed} loading={projects === null} />
        <StatCard label="Ongoing" value={ongoing} loading={projects === null} accent />
        <StatCard label="Featured" value={featured} loading={projects === null} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        }}
      >
        <ModuleCard
          icon={<WorkIcon />}
          title="Projects"
          description="Add new builds, edit existing ones, manage galleries and ordering."
          href="/admin/projects"
          ready
        />
        <ModuleCard
          icon={<HomeWorkIcon />}
          title="Services"
          description="Edit the six service cards on the homepage — title, description, icon."
          href="/admin/services"
        />
        <ModuleCard
          icon={<MarkEmailUnreadIcon />}
          title="Inquiries"
          description="Read and respond to messages from the contact form."
          href="/admin/inquiries"
        />
        <ModuleCard
          icon={<SettingsIcon />}
          title="Site settings"
          description="Hero copy, contact info, social links, stat counters."
          href="/admin/settings"
        />
      </Box>
    </Box>
  );
}

function StatCard({
  label,
  value,
  loading,
  accent,
}: {
  label: string;
  value: number;
  loading: boolean;
  accent?: boolean;
}) {
  return (
    <Card sx={{ p: 3 }}>
      <Typography
        sx={{
          fontSize: "0.72rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: "text.secondary",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <Typography
          sx={{
            fontSize: "2.4rem",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            background: accent
              ? "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)"
              : "linear-gradient(135deg, #0B1220 0%, #1E293B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {value}
        </Typography>
      )}
    </Card>
  );
}

function ModuleCard({
  icon,
  title,
  description,
  href,
  ready,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  ready?: boolean;
}) {
  return (
    <Card
      component={Link}
      href={href}
      sx={{
        p: 3,
        textDecoration: "none",
        color: "inherit",
        display: "block",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 20px 40px -20px rgba(11,18,32,0.2)",
          borderColor: "rgba(245,158,11,0.4)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            background: "rgba(11,18,32,0.06)",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          {!ready && (
            <Chip
              label="Coming soon"
              size="small"
              sx={{
                background: "rgba(252,211,77,0.18)",
                color: "secondary.dark",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            />
          )}
          <ArrowOutwardIcon sx={{ color: "text.secondary" }} />
        </Stack>
      </Stack>
      <Typography
        sx={{ mt: 2.5, mb: 0.5, fontSize: "1.15rem", fontWeight: 700 }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: "0.92rem" }}>
        {description}
      </Typography>
    </Card>
  );
}
