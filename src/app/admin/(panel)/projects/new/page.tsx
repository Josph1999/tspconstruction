"use client";

import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Portfolio"
        title="New project"
        subtitle="Fill in the details below. You can always edit later."
        actions={
          <Button
            component={Link}
            href="/admin/projects"
            startIcon={<ArrowBackIcon />}
            variant="text"
          >
            Back to projects
          </Button>
        }
      />
      <ProjectForm mode="create" />
    </Box>
  );
}
