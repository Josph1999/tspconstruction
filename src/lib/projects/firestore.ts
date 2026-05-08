import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { ProjectDoc, ProjectInput } from "@/types/project";

const COLLECTION = "projects";

export const projectsRef = collection(db, COLLECTION);

export function newProjectRef() {
  return doc(projectsRef);
}

export async function listProjects(): Promise<ProjectDoc[]> {
  const q = query(projectsRef, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ProjectDoc, "id">) }));
}

export async function getProject(id: string): Promise<ProjectDoc | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<ProjectDoc, "id">) };
}

export async function createProject(id: string, input: ProjectInput) {
  await setDoc(doc(db, COLLECTION, id), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  await updateDoc(doc(db, COLLECTION, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
