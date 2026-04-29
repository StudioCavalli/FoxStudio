/**
 * Data layer for Projects.
 *
 * Tries Payload's local API first; falls back to mock data when no
 * database is configured (e.g., during early dev or in CI without
 * a DATABASE_URL secret). This lets the public site render even
 * before the CMS is wired up to a real database.
 */

import type { Project as PayloadProject } from "@/payload-types";
import { MOCK_PROJECTS, type MockProject } from "./projects.mock";

/**
 * View model — the projection of a project that the front actually consumes.
 * Decouples the UI from the CMS shape so the CMS can evolve independently.
 */
export type ProjectState = "live" | "wip" | "archived";

export type ProjectResult = {
  value: string;
  label: string;
};

export type ProjectPartner = {
  name: string;
  url?: string;
};

export type Project = {
  id: string;
  number: string;
  slug: string;
  name: string;
  summary?: string;
  year: number;
  stack: string[];
  state: ProjectState;
  results: ProjectResult[];
  partners: ProjectPartner[];
};

function fromMock(m: MockProject): Project {
  return {
    id: m.id,
    number: m.number,
    slug: m.slug,
    name: m.name,
    summary: m.description,
    year: m.year,
    stack: m.stack,
    state: m.status,
    results: [],
    partners: [],
  };
}

function fromPayloadDoc(doc: PayloadProject): Project {
  const results = ((doc.results ?? []) as Array<{ value: string; label: string }>).map((r) => ({
    value: r.value,
    label: r.label,
  }));
  const partners = ((doc.partners ?? []) as Array<{ name: string; url?: string | null }>).map(
    (p) => ({
      name: p.name,
      url: p.url ?? undefined,
    }),
  );
  return {
    id: String(doc.id),
    number: doc.number,
    slug: doc.slug,
    name: doc.name,
    summary: doc.summary ?? undefined,
    year: doc.year,
    stack: (doc.stack ?? []).map((s) => s.tech).filter((t): t is string => Boolean(t)),
    state: doc.state,
    results,
    partners,
  };
}

type LocaleParam = "fr" | "en" | "it";

async function fromPayload(locale?: LocaleParam): Promise<Project[] | null> {
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
      locale: locale ?? "en",
    });

    return result.docs.map(fromPayloadDoc);
  } catch {
    return null;
  }
}

export async function getProjects(locale?: LocaleParam): Promise<Project[]> {
  const fromCms = await fromPayload(locale);
  if (fromCms && fromCms.length > 0) return fromCms;
  return MOCK_PROJECTS.map(fromMock);
}

export async function getProjectBySlug(
  slug: string,
  locale?: LocaleParam,
): Promise<Project | null> {
  const all = await getProjects(locale);
  return all.find((p) => p.slug === slug) ?? null;
}
