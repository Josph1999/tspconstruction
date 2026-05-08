import type { Timestamp } from "firebase/firestore";

export type ProjectCategory =
  | "apartment"
  | "kitchen"
  | "bathroom"
  | "house"
  | "commercial";

export type ProjectStatus = "completed" | "ongoing";

export type Locale = "en" | "ka";

export type ProjectTranslation = {
  title: string;
  category: string;
  summary: string;
  description1: string;
  description2: string;
};

export type ProjectDoc = {
  id: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  client: string;
  location: string;
  area: string;
  cover: string;
  gallery: string[];
  featured: boolean;
  order: number;
  translations: Record<Locale, ProjectTranslation>;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type ProjectInput = Omit<ProjectDoc, "id" | "createdAt" | "updatedAt">;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "apartment",
  "kitchen",
  "bathroom",
  "house",
  "commercial",
];

export const PROJECT_STATUSES: ProjectStatus[] = ["completed", "ongoing"];

export const PROJECT_LOCALES: Locale[] = ["en", "ka"];

export function emptyTranslation(): ProjectTranslation {
  return {
    title: "",
    category: "",
    summary: "",
    description1: "",
    description2: "",
  };
}

export function emptyProjectInput(): ProjectInput {
  return {
    slug: "",
    category: "apartment",
    status: "completed",
    year: new Date().getFullYear(),
    client: "",
    location: "",
    area: "",
    cover: "",
    gallery: [],
    featured: false,
    order: 0,
    translations: {
      en: emptyTranslation(),
      ka: emptyTranslation(),
    },
  };
}
