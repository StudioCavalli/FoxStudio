import type { LabExperiment as PayloadLabExperiment } from "@/payload-types";

export type LabState = "live" | "wip" | "archived";

export type LabExperiment = {
  id: string;
  code: string;
  name: string;
  summary?: string;
  state: LabState;
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
  startedAt?: string;
};

const MOCK: LabExperiment[] = [
  {
    id: "exp_004",
    code: "exp_004",
    name: "WebGPU compute shader",
    summary: "Compute shader running monochrome physically-based rendering on entry-level laptops.",
    state: "live",
    tags: ["webgpu", "perf"],
    sourceUrl: "https://github.com/StudioCavalli/foxstudio-lab",
    startedAt: "2026-03-12",
  },
  {
    id: "exp_005",
    code: "exp_005",
    name: "Edge AI inference",
    summary: "On-device LLM running entirely client-side. 14 ko of JS, no server call.",
    state: "live",
    tags: ["ai", "edge"],
    startedAt: "2026-02-04",
  },
  {
    id: "exp_006",
    code: "exp_006",
    name: "Haptic UI surface",
    summary: "Force-feedback grid driving consumer-grade haptic devices via WebHID.",
    state: "wip",
    tags: ["webhid", "haptic"],
    startedAt: "2026-04-02",
  },
  {
    id: "exp_007",
    code: "exp_007",
    name: "Spatial router",
    summary: "Content delivery routed by spatial proximity, not network topology.",
    state: "wip",
    tags: ["edge", "experimental"],
    startedAt: "2026-04-20",
  },
];

function fromDoc(doc: PayloadLabExperiment): LabExperiment {
  return {
    id: String(doc.id),
    code: doc.code,
    name: doc.name,
    summary: doc.summary ?? undefined,
    state: doc.state,
    tags: (doc.tags ?? []).map((t) => t.tag).filter((t): t is string => Boolean(t)),
    demoUrl: doc.demoUrl ?? undefined,
    sourceUrl: doc.sourceUrl ?? undefined,
    startedAt: doc.startedAt ?? undefined,
  };
}

type LabLocale = "fr" | "en" | "it";

export async function getLabExperiments(locale?: LabLocale): Promise<LabExperiment[]> {
  if (!process.env.DATABASE_URL) return MOCK;

  try {
    const [{ getPayload }, configMod] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config: configMod.default });

    const result = await payload.find({
      collection: "lab-experiments",
      limit: 50,
      sort: "-startedAt,code",
      depth: 0,
      locale: locale ?? "en",
    });

    if (result.docs.length === 0) return MOCK;
    return result.docs.map(fromDoc);
  } catch {
    return MOCK;
  }
}
