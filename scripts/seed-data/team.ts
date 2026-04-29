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
      "Fondateur et CEO de FoxStudio, basé à Cannes. Construit côté IA et fullstack. Créateur d'idées pour un futur plus intelligent et plus équitable. C'est lui qui prototype, qui casse, qui recommence — et qui finit par publier.",
      "Founder and CEO of FoxStudio, based in Cannes. Builds on the AI and fullstack side. Crafts ideas for a smarter, fairer future. The one who prototypes, breaks it, starts again — and eventually ships.",
      "Fondatore e CEO di FoxStudio, con base a Cannes. Costruisce sul lato IA e fullstack. Crea idee per un futuro più intelligente ed equo. È colui che prototipa, rompe, ricomincia — e alla fine pubblica.",
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
      "Cofondateur et Co-CEO de FoxStudio, basé à Paris. Garde un pied dans le code de production et l'autre dans la stratégie d'incubation. C'est lui qui défend le calendrier, qui dit non quand il faut, et qui relit les pull-requests à 23 h.",
      "Co-founder and Co-CEO of FoxStudio, based in Paris. Keeps one foot in production code and the other in incubation strategy. The one who guards the schedule, says no when needed, and reviews pull-requests at 11 pm.",
      "Cofondatore e Co-CEO di FoxStudio, con base a Parigi. Tiene un piede nel codice di produzione e l'altro nella strategia di incubazione. È colui che difende il calendario, dice no quando serve, e revisiona le pull-request alle 23.",
    ),
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/chahine-benlahcen-tlemcani/",
      },
    ],
  },
];
