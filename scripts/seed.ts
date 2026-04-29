/**
 * Seed script — populates the local DB with the 12 real FoxStudio projects.
 * Source of truth: README.md of each repo under github.com/StudioCavalli.
 *
 * Idempotent: skips any project whose slug already exists. To force a
 * fresh seed, use `pnpm services:reset` (wipes the Postgres volume) and
 * re-run.
 *
 * Usage: pnpm payload:seed
 */

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

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
    slug: "nonno-robot",
    name: "NonnoRobot",
    summary:
      "AI-powered robotic chef cooking pizza and pasta from scratch — vision, motion planning and recipe generation in one stack.",
    year: 2026,
    state: "wip",
    stack: [
      { tech: "FastAPI" },
      { tech: "ROS 2 Jazzy" },
      { tech: "PyTorch" },
      { tech: "Next.js 15" },
      { tech: "Postgres" },
      { tech: "Docker" },
    ],
  },
  {
    number: "002",
    slug: "memoria",
    name: "Memoria",
    summary:
      "Biographical AI for seniors 80+. Voice companion that gathers life memories, sends a weekly Gazette to families, and watches for early cognitive decline signals.",
    year: 2026,
    state: "live",
    stack: [
      { tech: "FastAPI" },
      { tech: "Postgres" },
      { tech: "React Native" },
      { tech: "Next.js 15" },
      { tech: "Tailwind v4" },
    ],
  },
  {
    number: "003",
    slug: "kidverse",
    name: "Kidverse",
    summary:
      "Phygital app for kids 3–15 that rewards them when they put down the phone and act in the real world. Quests, AI companion, parent dashboard.",
    year: 2026,
    state: "wip",
    stack: [
      { tech: "React Native" },
      { tech: "Expo" },
      { tech: "NestJS" },
      { tech: "Apollo Router" },
      { tech: "Claude" },
    ],
  },
  {
    number: "004",
    slug: "flov",
    name: "Flov.",
    summary:
      "Music & video streaming platform built in Cannes. No ads, no tracking, no compromise.",
    year: 2026,
    state: "live",
    stack: [{ tech: "Laravel 13" }, { tech: "React 19" }, { tech: "TypeScript" }],
  },
  {
    number: "005",
    slug: "ombrys",
    name: "Ombrys",
    summary:
      "A documented-truth collective. Investigative platform for citizens and journalists — long-form, verifiable, transparent.",
    year: 2026,
    state: "live",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "Sanity" }],
  },
  {
    number: "006",
    slug: "clayr",
    name: "Clayr",
    summary:
      "A digital cosmic refuge. Quotes, texts, music, AI companion, immersive therapy — a space to inspire, create and reconnect.",
    year: 2026,
    state: "live",
    stack: [
      { tech: "Next.js 16" },
      { tech: "Supabase" },
      { tech: "Tailwind v4" },
      { tech: "TypeScript" },
    ],
  },
  {
    number: "007",
    slug: "foxcube",
    name: "FoxCube",
    summary:
      "Multilingual e-commerce for an Italian embroidery import/export house. Variant-aware catalog, embroidery customisation, multi-currency checkout.",
    year: 2026,
    state: "live",
    stack: [
      { tech: "Laravel 12" },
      { tech: "Tailwind v4" },
      { tech: "PHP 8.4" },
      { tech: "Stripe" },
      { tech: "Docker" },
    ],
  },
  {
    number: "008",
    slug: "moes-coffee",
    name: "Moe's Coffee",
    summary:
      "Springfield's finest, au gramme près. A serious e-commerce skin wrapped in the universe of Moe Szyslak — built as a stress test of the stack.",
    year: 2026,
    state: "live",
    stack: [
      { tech: "React Router v7" },
      { tech: "TypeScript 5.9" },
      { tech: "Tailwind v4" },
      { tech: "SQLite" },
      { tech: "Drizzle" },
    ],
  },
  {
    number: "009",
    slug: "klown",
    name: "Klown",
    summary:
      "Cross-platform desktop framework for authorised ethical hacking and security research. Strict legal scope, audit logging, sandboxed modules.",
    year: 2025,
    state: "archived",
    stack: [{ tech: "TypeScript" }, { tech: "Electron" }, { tech: "Rust" }, { tech: "Node.js" }],
  },
  {
    number: "010",
    slug: "klown-network",
    name: "Klown Network",
    summary:
      "Community platform for the Klown ecosystem — social layer, content hub, identity service.",
    year: 2025,
    state: "wip",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "MongoDB" }],
  },
  {
    number: "011",
    slug: "klown-vitrine",
    name: "Klown Vitrine",
    summary:
      "Public-facing showcase for the Klown brand and product line — narrative-led, motion-light, server-rendered.",
    year: 2025,
    state: "archived",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "Tailwind" }],
  },
  {
    number: "012",
    slug: "foxcard",
    name: "FoxCard",
    summary:
      "Card-shaped roadmap and issue planner. Generates GitHub issues from a single source-of-truth markdown roadmap.",
    year: 2025,
    state: "archived",
    stack: [{ tech: "TypeScript" }, { tech: "GitHub CLI" }, { tech: "Markdown" }],
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

  console.log(`→ Seeding ${PROJECTS.length} projects…`);

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
