import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  type UploadTask,
} from "firebase/storage";
import { storage } from "@/lib/firebase/client";

export type UploadProgress = {
  task: UploadTask;
  promise: Promise<{ url: string; path: string }>;
};

export function uploadProjectImage(
  projectId: string,
  file: File,
  kind: "cover" | "gallery"
): UploadProgress {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `projects/${projectId}/${kind}-${Date.now()}-${safeName}`;
  const objectRef = ref(storage, path);
  const task = uploadBytesResumable(objectRef, file, {
    contentType: file.type || "image/jpeg",
    cacheControl: "public, max-age=31536000, immutable",
  });

  const promise = new Promise<{ url: string; path: string }>((resolve, reject) => {
    task.on(
      "state_changed",
      undefined,
      (err) => reject(err),
      async () => {
        const url = await getDownloadURL(objectRef);
        resolve({ url, path });
      }
    );
  });

  return { task, promise };
}

export async function deleteByDownloadUrl(url: string) {
  if (!url) return;
  try {
    const objectRef = ref(storage, url);
    await deleteObject(objectRef);
  } catch (err) {
    if ((err as { code?: string }).code !== "storage/object-not-found") {
      throw err;
    }
  }
}
