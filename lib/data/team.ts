import type { TeamMember as PayloadTeamMember } from "@/payload-types";

export type TeamMember = {
  id: string;
  name: string;
  /** First name(s) used for `/team` static photo lookup. */
  photoSlug: string;
  role: string;
  bio?: string;
  location?: string;
  order: number;
  links: { label: string; url: string }[];
};

type TeamLocale = "fr" | "en" | "it";

/**
 * Derive a public-photo slug from a member's full name.
 * "Christopher Cavalli" → "christopher", "Chahine Benlahcen Tlemcani" → "chahine".
 * Looks up `/public/team/<slug>.jpg`.
 */
function slugifyForPhoto(name: string): string {
  return name.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().split(" ")[0] ?? "team";
}

const MOCK: TeamMember[] = [
  {
    id: "1",
    name: "Christopher Cavalli",
    photoSlug: "christopher",
    role: "CEO · AI Engineer · Fullstack Developer",
    bio: "Fondateur et CEO de FoxStudio, basé à Cannes. C'est lui qui pitche.",
    location: "Cannes",
    order: 0,
    links: [
      { label: "GitHub", url: "https://github.com/SwaynIO" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/christopher-cvlli" },
    ],
  },
  {
    id: "2",
    name: "Chahine Benlahcen Tlemcani",
    photoSlug: "chahine",
    role: "Co-CEO · Software Engineer",
    bio: "Cofondateur et Co-CEO, basé à Paris. C'est lui qui casse le code de Christopher quand ça va pas.",
    location: "Paris",
    order: 1,
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/chahine-benlahcen-tlemcani-999031202",
      },
    ],
  },
];

function fromDoc(doc: PayloadTeamMember): TeamMember {
  const docWithLocation = doc as PayloadTeamMember & { location?: string | null };
  return {
    id: String(doc.id),
    name: doc.name,
    photoSlug: slugifyForPhoto(doc.name),
    role: doc.role,
    bio: doc.bio ?? undefined,
    location: docWithLocation.location ?? undefined,
    order: doc.order ?? 0,
    links: (doc.links ?? [])
      .map((l) => ({ label: l.label, url: l.url }))
      .filter((l) => l.label && l.url) as { label: string; url: string }[],
  };
}

export async function getTeamMembers(locale?: TeamLocale): Promise<TeamMember[]> {
  if (!process.env.DATABASE_URL) return MOCK;

  try {
    const [{ getPayload }, configMod] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config: configMod.default });

    const result = await payload.find({
      collection: "team-members",
      limit: 50,
      sort: "order,name",
      depth: 0,
      locale: locale ?? "en",
    });

    if (result.docs.length === 0) return MOCK;
    return result.docs.map(fromDoc);
  } catch {
    return MOCK;
  }
}
