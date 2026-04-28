export const SITE = {
  name: "FoxStudio",
  description: "R&D lab of FoxCase. Prototypes, technical demos, workshop notes.",
  url: "https://foxstudio.fr",
  parent: {
    name: "FoxCase",
    url: "https://foxcase.fr",
  },
  contact: {
    email: "hello@foxstudio.fr",
    location: "Paris, FR",
    timezone: "GMT+1",
  },
  version: "0.1.0",
} as const;

export const NAV = [
  { label: "Works", href: "/works" },
  { label: "Lab", href: "/lab" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export const LOCALES = ["fr", "en", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
