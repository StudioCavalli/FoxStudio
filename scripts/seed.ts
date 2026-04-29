/**
 * Seed script — populates the local DB with 4 demo projects.
 * Idempotent: skips any project whose slug already exists.
 *
 * Usage: pnpm dlx tsx scripts/seed.ts
 *   (assumes services up via `pnpm services:up` and DATABASE_URL set)
 */

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config(); // fallback to .env

type SeedProject = {
  number: string;
  slug: string;
  name: string;
  summary: string;
  year: number;
  state: "live" | "wip" | "archived";
  stack: { tech: string }[];
};

const PROJECTS: SeedProject[] = [
  {
    number: "001",
    slug: "edge-inference",
    name: "Edge inference at 14 ko",
    summary: "On-device LLM running entirely client-side. No server call.",
    year: 2026,
    state: "live",
    stack: [{ tech: "TS" }, { tech: "WebGPU" }, { tech: "ONNX" }],
  },
  {
    number: "002",
    slug: "haptic-mesh",
    name: "Haptic mesh prototype",
    summary: "Force-feedback grid driving consumer-grade haptic devices.",
    year: 2026,
    state: "live",
    stack: [{ tech: "Rust" }, { tech: "WASM" }, { tech: "WebHID" }],
  },
  {
    number: "003",
    slug: "render-pipe",
    name: "Render pipe — WebGPU",
    summary: "Custom deferred renderer for monochrome physically-based scenes.",
    year: 2025,
    state: "live",
    stack: [{ tech: "TS" }, { tech: "WGSL" }, { tech: "R3F" }],
  },
  {
    number: "004",
    slug: "spatial-router",
    name: "Spatial router",
    summary: "Content delivery routed by spatial proximity, not network topology.",
    year: 2025,
    state: "wip",
    stack: [{ tech: "TS" }, { tech: "Rust" }, { tech: "Edge" }],
  },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("✖ DATABASE_URL is not set. Did you `cp .env.docker.example .env.local`?");
    process.exit(1);
  }

  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const payload = await getPayload({ config });

  console.log("→ Seeding projects…");

  let created = 0;
  let skipped = 0;

  for (const project of PROJECTS) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  · ${project.slug} already exists, skipping`);
      skipped++;
      continue;
    }

    await payload.create({
      collection: "projects",
      data: {
        ...project,
        publishedAt: new Date().toISOString(),
      },
    });

    console.log(`  ✓ ${project.slug}`);
    created++;
  }

  console.log(`\nDone. ${created} created, ${skipped} skipped.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
