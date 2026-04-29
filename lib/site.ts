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
    location: "Cannes, FR",
    timezone: "GMT+1",
  },
  legal: {
    name: "Christopher Cavalli",
    commercialName: "FoxCase",
    form: "Entrepreneur Individuel (EI)",
    address: "45 Boulevard de la Croisette, 06400 Cannes, France",
    siren: "834 802 407",
    siret: "834 802 407 00033",
    ape: "6201Z — Programmation informatique",
    vat: "FR26834802407",
    director: "Christopher Cavalli",
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
