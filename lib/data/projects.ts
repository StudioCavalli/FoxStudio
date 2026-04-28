/**
 * Data layer for Projects.
 *
 * Tries Payload's local API first; falls back to mock data when no
 * database is configured (e.g., during early dev or in CI without
 * a DATABASE_URL secret). This lets the public site render even
 * before the CMS is wired up to a real database.
 */

import { MOCK_PROJECTS, type MockProject } from "./projects.mock";

export type Project = {
  id: string;
  number: string;
  slug: string;
  name: string;
  summary?: string;
  year: number;
  stack: string[];
  status: "live" | "wip" | "archived";
};

function mockToProject(m: MockProject): Project {
  return {
    id: m.id,
    number: m.number,
    slug: m.slug,
    name: m.name,
    summary: m.description,
    year: m.year,
    stack: m.stack,
    status: m.status,
  };
}

async function fromPayload(): Promise<Project[] | null> {
  // Skip Payload entirely when no DB is configured.
  if (!process.env.DATABASE_URL) return null;

  try {
    const [{ getPayload }, configMod] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const config = configMod.default;
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "projects",
      limit: 50,
      sort: "-year,number",
      depth: 0,
    });

    return result.docs.map((doc) => {
      const stackArr = ((doc.stack as Array<{ tech?: string }> | null | undefined) ?? [])
        .map((s) => s.tech)
        .filter((t): t is string => Boolean(t));

      return {
        id: String(doc.id),
        number: doc.number as string,
        slug: doc.slug as string,
        name: doc.name as string,
        summary: (doc.summary as string | null | undefined) ?? undefined,
        year: doc.year as number,
        stack: stackArr,
        status: doc.status as Project["status"],
      } satisfies Project;
    });
  } catch {
    // DB unreachable, table missing, etc. — quietly fall back.
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const fromCms = await fromPayload();
  if (fromCms && fromCms.length > 0) return fromCms;
  return MOCK_PROJECTS.map(mockToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
