import type { JournalArticle as PayloadJournalArticle } from "@/payload-types";

export type JournalArticle = {
  id: string;
  slug: string;
  title: string;
  lead?: string;
  tag: "perf" | "3d" | "tooling" | "opinion" | "process";
  readingTimeMinutes?: number;
  publishedAt?: string;
  body?: PayloadJournalArticle["body"];
};

const MOCK: JournalArticle[] = [
  {
    id: "1",
    slug: "rewriting-next-router-80-lines",
    title: "Rewriting a Next router in 80 lines",
    lead: "We hit a wall with the default router on a 12k-route site. Here's the lighter approach we shipped.",
    tag: "perf",
    readingTimeMinutes: 6,
    publishedAt: "2026-04-15T09:00:00.000Z",
  },
  {
    id: "2",
    slug: "webgl-to-webgpu-x-pipeline",
    title: "Why we replaced WebGL with WebGPU on the X pipeline",
    lead: "The migration cost us two weeks. The compute shader paid them back in one afternoon.",
    tag: "3d",
    readingTimeMinutes: 12,
    publishedAt: "2026-03-28T09:00:00.000Z",
  },
  {
    id: "3",
    slug: "compute-shaders-entry-level-laptops",
    title: "Notes on running compute shaders on entry-level laptops",
    lead: "Most users don't have RTX cards. Here's what we learned profiling on a 5-year-old MacBook Air.",
    tag: "perf",
    readingTimeMinutes: 8,
    publishedAt: "2026-03-12T09:00:00.000Z",
  },
];

function fromDoc(doc: PayloadJournalArticle): JournalArticle {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    lead: doc.lead ?? undefined,
    tag: doc.tag,
    readingTimeMinutes: doc.readingTimeMinutes ?? undefined,
    publishedAt: doc.publishedAt ?? undefined,
    body: doc.body,
  };
}

async function fromPayload(locale?: "fr" | "en" | "it"): Promise<JournalArticle[] | null> {
  if (!process.env.DATABASE_URL) return null;

  try {
    const [{ getPayload }, configMod] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config: configMod.default });

    const result = await payload.find({
      collection: "journal-articles",
      limit: 50,
      sort: "-publishedAt",
      depth: 0,
      locale: locale ?? "en",
    });

    if (result.docs.length === 0) return null;
    return result.docs.map(fromDoc);
  } catch {
    return null;
  }
}

type JournalLocale = "fr" | "en" | "it";

export async function getJournalArticles(locale?: JournalLocale): Promise<JournalArticle[]> {
  const fromCms = await fromPayload(locale);
  return fromCms ?? MOCK;
}

export async function getJournalArticleBySlug(
  slug: string,
  locale?: JournalLocale,
): Promise<JournalArticle | null> {
  const all = await getJournalArticles(locale);
  return all.find((a) => a.slug === slug) ?? null;
}
