"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProject } from "@/lib/projects/firestore";
import type { ProjectDoc, ProjectInput } from "@/types/project";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<ProjectDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProject(id)
      .then((p) => {
        setProject(p);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 6, display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box>
        <PageHeader
          eyebrow="Portfolio"
          title="Project not found"
          actions={
            <Button
              component={Link}
              href="/admin/projects"
              startIcon={<ArrowBackIcon />}
            >
              Back to projects
            </Button>
          }
        />
        <Alert severity="error">{error ?? `No project with id "${id}".`}</Alert>
      </Box>
    );
  }

  const initial: ProjectInput = {
    slug: project.slug,
    category: project.category,
    status: project.status,
    year: project.year,
    client: project.client,
    location: project.location,
    area: project.area,
    cover: project.cover,
    gallery: project.gallery ?? [],
    featured: project.featured ?? false,
    order: project.order ?? 0,
    translations: project.translations,
  };

  return (
    <Box>
      <PageHeader
        eyebrow="Portfolio"
        title={project.translations?.en?.title || "Edit project"}
        subtitle={`Slug: /projects/${project.slug}`}
        actions={
          <>
            <Button
              component={Link}
              href="/admin/projects"
              startIcon={<ArrowBackIcon />}
              variant="text"
            >
              Back
            </Button>
            <Button
              component="a"
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />}
              variant="outlined"
            >
              View live
            </Button>
          </>
        }
      />
      <ProjectForm mode="edit" initialId={project.id} initial={initial} />
    </Box>
  );
}
