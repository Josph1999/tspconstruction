import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ka"] as const,
  defaultLocale: "ka",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
