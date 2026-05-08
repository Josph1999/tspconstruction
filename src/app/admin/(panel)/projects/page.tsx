"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";
import PageHeader from "@/components/admin/PageHeader";
import { listProjects } from "@/lib/projects/firestore";
import type { ProjectDoc } from "@/types/project";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectDoc[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch((e) => {
        setError(e.message);
        setProjects([]);
      });
  }, []);

  return (
    <Box>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        subtitle="Add, edit, and reorder the projects shown on your public site."
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

      {error && (
        <Typography sx={{ color: "error.main", mb: 2 }}>{error}</Typography>
      )}

      {projects === null ? (
        <Box sx={{ p: 6, display: "grid", placeItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : projects.length === 0 ? (
        <Card sx={{ p: { xs: 4, md: 8 }, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            No projects yet
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            Create your first project to populate the public site.
          </Typography>
          <Button
            component={Link}
            href="/admin/projects/new"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Add your first project
          </Button>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
          }}
        >
          {projects.map((p) => (
            <Card
              key={p.id}
              sx={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 200ms ease, box-shadow 200ms ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 20px 40px -20px rgba(11,18,32,0.2)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  background: p.cover
                    ? `url('${p.cover}') center/cover`
                    : "linear-gradient(135deg, #1E293B 0%, #0B1220 100%)",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ position: "absolute", top: 12, left: 12 }}
                >
                  <Chip
                    size="small"
                    label={p.status}
                    sx={{
                      background: "rgba(255,255,255,0.95)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color:
                        p.status === "ongoing" ? "secondary.dark" : "primary.main",
                    }}
                  />
                  {p.featured && (
                    <Chip
                      size="small"
                      icon={<StarIcon sx={{ fontSize: 14 }} />}
                      label="Featured"
                      sx={{
                        background:
                          "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
                        color: "#0B1220",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                      }}
                    />
                  )}
                </Stack>
              </Box>
              <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {p.category} · {p.year}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 0.5 }}
                >
                  {p.translations?.en?.title || "(untitled)"}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.85rem",
                    mb: 2,
                    flex: 1,
                  }}
                >
                  {p.location || "—"}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    component={Link}
                    href={`/admin/projects/${p.id}/edit`}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    size="small"
                    sx={{ flex: 1 }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    component="a"
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ border: "1px solid rgba(15,23,42,0.12)" }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
