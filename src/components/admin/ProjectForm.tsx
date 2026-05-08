"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  emptyProjectInput,
  PROJECT_CATEGORIES,
  PROJECT_LOCALES,
  PROJECT_STATUSES,
  type Locale,
  type ProjectInput,
} from "@/types/project";
import {
  createProject,
  deleteProject,
  newProjectRef,
  updateProject,
} from "@/lib/projects/firestore";
import { deleteByDownloadUrl } from "@/lib/projects/storage";
import CoverImageInput from "./CoverImageInput";
import GalleryInput from "./GalleryInput";

type Props = {
  mode: "create" | "edit";
  initialId?: string;
  initial?: ProjectInput;
};

const LOCALE_LABELS: Record<Locale, string> = { en: "English", ka: "ქართული" };

export default function ProjectForm({ mode, initialId, initial }: Props) {
  const router = useRouter();

  const [projectId] = useState(() => initialId ?? newProjectRef().id);
  const [form, setForm] = useState<ProjectInput>(
    () => initial ?? emptyProjectInput()
  );
  const [activeLocale, setActiveLocale] = useState<Locale>("en");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const slugTouched = useMemo(() => form.slug !== "", [form.slug]);

  useEffect(() => {
    if (mode !== "create") return;
    if (slugTouched) return;
    const auto = form.translations.en.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);
    if (auto && auto !== form.slug) {
      setForm((f) => ({ ...f, slug: auto }));
    }
  }, [form.translations.en.title, form.slug, slugTouched, mode]);

  const update = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateTranslation = (
    locale: Locale,
    key: keyof ProjectInput["translations"]["en"],
    value: string
  ) =>
    setForm((f) => ({
      ...f,
      translations: {
        ...f.translations,
        [locale]: { ...f.translations[locale], [key]: value },
      },
    }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const slug = form.slug.trim();
    if (!slug) {
      setError("Slug is required.");
      return;
    }
    if (!form.translations.en.title.trim()) {
      setError("English title is required.");
      return;
    }
    if (!form.translations.ka.title.trim()) {
      setError("Georgian title is required.");
      return;
    }

    setSaving(true);
    try {
      const payload: ProjectInput = { ...form, slug };
      if (mode === "create") {
        await createProject(projectId, payload);
      } else {
        await updateProject(projectId, payload);
      }
      router.replace("/admin/projects");
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    try {
      await Promise.all([
        form.cover ? deleteByDownloadUrl(form.cover) : Promise.resolve(),
        ...form.gallery.map((url) => deleteByDownloadUrl(url)),
      ]).catch(() => undefined);
      await deleteProject(projectId);
      router.replace("/admin/projects");
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "Delete failed.");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" },
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        <Stack spacing={3}>
          <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionTitle title="Translations" />
            <Tabs
              value={activeLocale}
              onChange={(_, v) => setActiveLocale(v)}
              sx={{ mb: 2.5, borderBottom: "1px solid rgba(15,23,42,0.08)" }}
            >
              {PROJECT_LOCALES.map((l) => (
                <Tab key={l} value={l} label={LOCALE_LABELS[l]} />
              ))}
            </Tabs>

            <Stack spacing={2.5}>
              <TextField
                label="Title"
                value={form.translations[activeLocale].title}
                onChange={(e) =>
                  updateTranslation(activeLocale, "title", e.target.value)
                }
                required
                fullWidth
              />
              <TextField
                label="Category label"
                helperText='e.g. "Residential · Tbilisi"'
                value={form.translations[activeLocale].category}
                onChange={(e) =>
                  updateTranslation(activeLocale, "category", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Summary"
                value={form.translations[activeLocale].summary}
                onChange={(e) =>
                  updateTranslation(activeLocale, "summary", e.target.value)
                }
                fullWidth
                multiline
                rows={2}
              />
              <TextField
                label="Description (paragraph 1)"
                value={form.translations[activeLocale].description1}
                onChange={(e) =>
                  updateTranslation(activeLocale, "description1", e.target.value)
                }
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                label="Description (paragraph 2)"
                value={form.translations[activeLocale].description2}
                onChange={(e) =>
                  updateTranslation(activeLocale, "description2", e.target.value)
                }
                fullWidth
                multiline
                rows={4}
              />
            </Stack>
          </Card>

          <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionTitle
              title="Cover image"
              subtitle="Used as the project's hero and the card thumbnail."
            />
            <CoverImageInput
              projectId={projectId}
              value={form.cover}
              onChange={(v) => update("cover", v)}
            />
          </Card>

          <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionTitle
              title="Gallery"
              subtitle="Drag to reorder later — for now use the arrow buttons."
            />
            <GalleryInput
              projectId={projectId}
              value={form.gallery}
              onChange={(v) => update("gallery", v)}
            />
          </Card>
        </Stack>

        <Stack spacing={3}>
          <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionTitle title="Details" />
            <Stack spacing={2.5}>
              <TextField
                label="Slug"
                value={form.slug}
                onChange={(e) =>
                  update(
                    "slug",
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "-")
                      .replace(/-+/g, "-")
                  )
                }
                required
                fullWidth
                helperText="Used in the URL: /projects/<slug>"
              />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={form.category}
                  onChange={(e) =>
                    update("category", e.target.value as ProjectInput["category"])
                  }
                >
                  {PROJECT_CATEGORIES.map((c) => (
                    <MenuItem key={c} value={c}>
                      {capitalize(c)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={form.status}
                  onChange={(e) =>
                    update("status", e.target.value as ProjectInput["status"])
                  }
                >
                  {PROJECT_STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {capitalize(s)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Year"
                  type="number"
                  value={form.year}
                  onChange={(e) =>
                    update("year", Number(e.target.value) || 0)
                  }
                  fullWidth
                />
                <TextField
                  label="Display order"
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    update("order", Number(e.target.value) || 0)
                  }
                  fullWidth
                  helperText="Lower = earlier"
                />
              </Stack>

              <TextField
                label="Client"
                value={form.client}
                onChange={(e) => update("client", e.target.value)}
                fullWidth
              />
              <TextField
                label="Location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                fullWidth
              />
              <TextField
                label="Area"
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
                fullWidth
                helperText='e.g. "28,000 m²"'
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.featured}
                    onChange={(_, checked) => update("featured", checked)}
                  />
                }
                label="Featured on homepage"
              />
            </Stack>
          </Card>

          <Card
            sx={{
              p: { xs: 2.5, md: 3.5 },
              position: { lg: "sticky" },
              top: { lg: 96 },
            }}
          >
            <Stack spacing={1.5}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                disabled={saving}
                fullWidth
              >
                {saving
                  ? "Saving..."
                  : mode === "create"
                    ? "Create project"
                    : "Save changes"}
              </Button>
              <Button
                type="button"
                variant="text"
                onClick={() => router.back()}
                disabled={saving}
                fullWidth
              >
                Cancel
              </Button>

              {mode === "edit" && (
                <>
                  <Box sx={{ height: 1, background: "rgba(15,23,42,0.08)", my: 1 }} />
                  <Button
                    type="button"
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => setConfirmDelete(true)}
                    disabled={saving || deleting}
                    fullWidth
                  >
                    Delete project
                  </Button>
                </>
              )}
            </Stack>
          </Card>
        </Stack>
      </Box>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Delete this project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the project document and all uploaded
            images. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDelete(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onDelete}
            disabled={deleting}
            startIcon={<DeleteIcon />}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="h6"
        sx={{ fontSize: "1.05rem", fontWeight: 700, mb: subtitle ? 0.5 : 0 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
