import { cache } from "react";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type { ProjectDoc } from "@/types/project";

export type PublicProject = Omit<ProjectDoc, "createdAt" | "updatedAt">;

const COLLECTION = "projects";

function toPublic(
  doc: QueryDocumentSnapshot<DocumentData>
): PublicProject {
  const data = doc.data() as Omit<ProjectDoc, "id">;
  return {
    id: doc.id,
    slug: data.slug,
    category: data.category,
    status: data.status,
    year: data.year,
    client: data.client ?? "",
    location: data.location ?? "",
    area: data.area ?? "",
    cover: data.cover ?? "",
    gallery: data.gallery ?? [],
    featured: data.featured ?? false,
    order: data.order ?? 0,
    translations: data.translations,
  };
}

export const listProjectsServer = cache(
  async (): Promise<PublicProject[]> => {
    const snap = await adminDb
      .collection(COLLECTION)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map(toPublic);
  }
);

export async function getFeaturedProjectsServer(
  limit = 4
): Promise<PublicProject[]> {
  const all = await listProjectsServer();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  // Fill with non-featured to keep the homepage grid populated.
  const rest = all.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}

export const getProjectBySlugServer = cache(
  async (slug: string): Promise<PublicProject | null> => {
    const snap = await adminDb
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();
    if (snap.empty) return null;
    return toPublic(snap.docs[0]);
  }
);

export async function getRelatedProjectsServer(
  slug: string,
  limit = 3
): Promise<PublicProject[]> {
  const all = await listProjectsServer();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const same = all.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = all.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...same, ...others].slice(0, limit);
}
