import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "it"],
  defaultLocale: "en",
  // Always show locale prefix in URL — keeps SEO/sharing predictable
  // and avoids the "default locale at root" ambiguity.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
