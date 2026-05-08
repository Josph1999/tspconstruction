"use client";

import { useRef, useState, type ChangeEvent } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  deleteByDownloadUrl,
  uploadProjectImage,
} from "@/lib/projects/storage";

export default function GalleryInput({
  projectId,
  value,
  onChange,
}: {
  projectId: string;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<{ name: string; pct: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError(null);

    const initial = files.map((f) => ({ name: f.name, pct: 0 }));
    setUploading(initial);

    try {
      const results = await Promise.all(
        files.map((file, i) => {
          const { task, promise } = uploadProjectImage(
            projectId,
            file,
            "gallery"
          );
          task.on("state_changed", (snap) => {
            const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
            setUploading((prev) => {
              const next = [...prev];
              next[i] = { name: file.name, pct };
              return next;
            });
          });
          return promise.then((r) => r.url);
        })
      );
      onChange([...value, ...results]);
    } catch (err) {
      setError((err as Error).message || "Upload failed.");
    } finally {
      setUploading([]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = async (i: number) => {
    setRemovingIndex(i);
    try {
      await deleteByDownloadUrl(value[i]);
      const next = value.filter((_, idx) => idx !== i);
      onChange(next);
    } catch (err) {
      setError((err as Error).message || "Remove failed.");
    } finally {
      setRemovingIndex(null);
    }
  };

  const move = (i: number, delta: number) => {
    const j = i + delta;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <Stack spacing={2}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFiles}
      />

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {value.map((url, i) => (
          <Box
            key={url + i}
            sx={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: 2.5,
              overflow: "hidden",
              border: "1px solid rgba(15,23,42,0.08)",
              backgroundImage: `url('${url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&:hover .actions": { opacity: 1 },
            }}
          >
            <Stack
              className="actions"
              direction="row"
              spacing={0.5}
              sx={{
                position: "absolute",
                top: 6,
                right: 6,
                opacity: 0,
                transition: "opacity 180ms ease",
              }}
            >
              <IconButton
                size="small"
                disabled={i === 0}
                onClick={() => move(i, -1)}
                sx={iconBtnSx}
              >
                <ArrowUpwardIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                size="small"
                disabled={i === value.length - 1}
                onClick={() => move(i, 1)}
                sx={iconBtnSx}
              >
                <ArrowDownwardIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => removeAt(i)}
                disabled={removingIndex === i}
                sx={{
                  ...iconBtnSx,
                  background: "rgba(220,38,38,0.85)",
                  "&:hover": { background: "rgba(185,28,28,0.95)" },
                }}
              >
                {removingIndex === i ? (
                  <CircularProgress size={14} sx={{ color: "#fff" }} />
                ) : (
                  <DeleteIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Stack>
            <Box
              sx={{
                position: "absolute",
                bottom: 6,
                left: 6,
                px: 1,
                py: 0.2,
                borderRadius: 999,
                fontSize: "0.7rem",
                fontWeight: 700,
                background: "rgba(11,18,32,0.7)",
                color: "#fff",
              }}
            >
              {i + 1}
            </Box>
          </Box>
        ))}

        <Box
          onClick={() => inputRef.current?.click()}
          sx={{
            cursor: "pointer",
            aspectRatio: "1 / 1",
            display: "grid",
            placeItems: "center",
            borderRadius: 2.5,
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
          <Stack spacing={0.5} sx={{ alignItems: "center", textAlign: "center", px: 1 }}>
            <AddPhotoAlternateIcon />
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
              Add images
            </Typography>
          </Stack>
        </Box>
      </Box>

      {uploading.length > 0 && (
        <Stack spacing={1}>
          {uploading.map((u, i) => (
            <Box key={i}>
              <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                <Typography sx={{ fontSize: "0.8rem" }}>{u.name}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                  {Math.round(u.pct)}%
                </Typography>
              </Stack>
              <LinearProgress variant="determinate" value={u.pct} />
            </Box>
          ))}
        </Stack>
      )}

      {error && (
        <Typography sx={{ color: "error.main", fontSize: "0.85rem" }}>
          {error}
        </Typography>
      )}

      {value.length === 0 && uploading.length === 0 && (
        <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
          No images yet — add up to a dozen showing different angles, details,
          and finished spaces.
        </Typography>
      )}
    </Stack>
  );
}

const iconBtnSx = {
  width: 28,
  height: 28,
  background: "rgba(11,18,32,0.7)",
  color: "#fff",
  "&:hover": { background: "rgba(11,18,32,0.9)" },
  "&.Mui-disabled": {
    background: "rgba(11,18,32,0.4)",
    color: "rgba(255,255,255,0.4)",
  },
} as const;
