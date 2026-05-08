"use client";

import { useRef, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteByDownloadUrl,
  uploadProjectImage,
} from "@/lib/projects/storage";

export default function CoverImageInput({
  projectId,
  value,
  onChange,
}: {
  projectId: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setProgress(0);
    try {
      const { task, promise } = uploadProjectImage(projectId, file, "cover");
      task.on("state_changed", (snap) => {
        setProgress((snap.bytesTransferred / snap.totalBytes) * 100);
      });
      const { url } = await promise;
      if (value) await deleteByDownloadUrl(value).catch(() => undefined);
      onChange(url);
    } catch (err) {
      setError((err as Error).message || "Upload failed.");
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    setRemoving(true);
    try {
      await deleteByDownloadUrl(value);
      onChange("");
    } catch (err) {
      setError((err as Error).message || "Remove failed.");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <Stack spacing={1.5}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />

      {value ? (
        <Box
          sx={{
            position: "relative",
            aspectRatio: "16 / 9",
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid rgba(15,23,42,0.08)",
            backgroundImage: `url('${value}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <Button
              size="small"
              variant="contained"
              onClick={() => inputRef.current?.click()}
              startIcon={<CloudUploadIcon />}
              sx={{
                background: "rgba(255,255,255,0.95)",
                color: "#0B1220",
                "&:hover": { background: "#fff" },
              }}
            >
              Replace
            </Button>
            <IconButton
              size="small"
              onClick={handleRemove}
              disabled={removing}
              sx={{
                background: "rgba(11,18,32,0.7)",
                color: "#fff",
                "&:hover": { background: "rgba(11,18,32,0.9)" },
              }}
            >
              {removing ? (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </IconButton>
          </Stack>
        </Box>
      ) : (
        <Box
          onClick={() => inputRef.current?.click()}
          sx={{
            cursor: "pointer",
            aspectRatio: "16 / 9",
            display: "grid",
            placeItems: "center",
            borderRadius: 3,
            border: "2px dashed rgba(15,23,42,0.18)",
            background: "rgba(15,23,42,0.02)",
            color: "text.secondary",
            transition: "all 200ms ease",
            "&:hover": {
              borderColor: "secondary.main",
              background: "rgba(245,158,11,0.04)",
              color: "secondary.dark",
            },
          }}
        >
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CloudUploadIcon fontSize="large" />
            <Typography sx={{ fontWeight: 600 }}>Upload cover image</Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              Click to browse · 16:9 recommended
            </Typography>
          </Stack>
        </Box>
      )}

      {progress !== null && (
        <Box>
          <LinearProgress variant="determinate" value={progress} />
          <Typography
            sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.5 }}
          >
            Uploading… {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      {error && (
        <Typography sx={{ color: "error.main", fontSize: "0.85rem" }}>
          {error}
        </Typography>
      )}
    </Stack>
  );
}
