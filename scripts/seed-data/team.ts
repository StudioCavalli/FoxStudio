/**
 * Seed data for the FoxStudio team. Two founders for now —
 * Christopher leads as CEO, Chahine partners as Co-CEO.
 */

import type { Locale } from "./projects";

export type TeamMemberSeed = {
  /** Stable identifier — used both as ordering hint and for fallback patterns. */
  name: string;
  /** Localized role / job title. */
  role: Record<Locale, string>;
  /** Localized short bio (≤ 480 chars per locale). Multiple lines are joined. */
  bio: Record<Locale, string>;
  /** City of residence. Same string across locales — proper noun. */
  location: string;
  /** Display order on /studio and /team. Lower = first. */
  order: number;
  /** External profile links. */
  links: { label: string; url: string }[];
  /** Slug used for the static photo file at /public/team/{slug}.jpg */
  slug: string;
};

const tri = <T>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

export const TEAM: TeamMemberSeed[] = [
  {
    name: "Christopher Cavalli",
    slug: "christopher",
    role: tri(
      "CEO · Ingénieur IA · Développeur fullstack",
      "CEO · AI Engineer · Fullstack Developer",
      "CEO · Ingegnere IA · Sviluppatore fullstack",
    ),
    location: "Cannes",
    order: 0,
    bio: tri(
      "Fondateur et CEO de FoxStudio, basé à Cannes. Construit côté IA et fullstack, prototype, casse, recommence. C'est lui qui pitche — aux incubateurs, aux clients, aux talents. Créateur d'idées pour un futur plus intelligent et plus équitable.",
      "Founder and CEO of FoxStudio, based in Cannes. Builds on the AI and fullstack side, prototypes, breaks, starts again. He's the one who pitches — to incubators, clients, talents. Crafts ideas for a smarter, fairer future.",
      "Fondatore e CEO di FoxStudio, con base a Cannes. Costruisce sul lato IA e fullstack, prototipa, rompe, ricomincia. È lui che presenta — agli incubatori, ai clienti, ai talenti. Crea idee per un futuro più intelligente ed equo.",
    ),
    links: [
      { label: "GitHub", url: "https://github.com/SwaynIO" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/christopher-cavalli/" },
    ],
  },
  {
    name: "Chahine Benlahcen Tlemcani",
    slug: "chahine",
    role: tri(
      "Co-CEO · Software Engineer",
      "Co-CEO · Software Engineer",
      "Co-CEO · Software Engineer",
    ),
    location: "Paris",
    order: 1,
    bio: tri(
      "Cofondateur et Co-CEO de FoxStudio, basé à Paris. C'est lui qui revoit le code, qui casse celui de Christopher quand ça déraille, et qui le remet droit. Très terre à terre — pas de promesse qu'on ne peut pas tenir, pas de feature qu'on ne peut pas livrer.",
      "Co-founder and Co-CEO of FoxStudio, based in Paris. He's the one who reviews the code, breaks Christopher's when it goes off the rails, and straightens it back out. Deeply pragmatic — no promise we can't keep, no feature we can't ship.",
      "Cofondatore e Co-CEO di FoxStudio, con base a Parigi. È lui che revisiona il codice, rompe quello di Christopher quando deraglia, e lo rimette in carreggiata. Molto pragmatico — nessuna promessa che non si possa mantenere, nessuna feature che non si possa consegnare.",
    ),
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/chahine-benlahcen-tlemcani/",
      },
    ],
  },
];
