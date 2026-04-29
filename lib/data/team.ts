import type { TeamMember as PayloadTeamMember } from "@/payload-types";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  order: number;
  links: { label: string; url: string }[];
};

const MOCK: TeamMember[] = [
  {
    id: "1",
    name: "—",
    role: "Founder, Engineering",
    bio: "Builds the things, breaks the things, writes about the things.",
    order: 0,
    links: [],
  },
  {
    id: "2",
    name: "—",
    role: "Founder, Design",
    bio: "Shapes how the things look and how they feel under the cursor.",
    order: 1,
    links: [],
  },
  {
    id: "3",
    name: "—",
    role: "Engineer",
    bio: "Specialised in real-time graphics and edge inference.",
    order: 2,
    links: [],
  },
];

function fromDoc(doc: PayloadTeamMember): TeamMember {
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    bio: doc.bio ?? undefined,
    order: doc.order ?? 0,
    links: (doc.links ?? [])
      .map((l) => ({ label: l.label, url: l.url }))
      .filter((l) => l.label && l.url) as { label: string; url: string }[],
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
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
    });

    if (result.docs.length === 0) return MOCK;
    return result.docs.map(fromDoc);
  } catch {
    return MOCK;
  }
}
