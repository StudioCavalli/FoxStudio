/**
 * Seed script — populates the local DB with FoxStudio's 12 real projects
 * and 6 lab experiments, all localized in fr/en/it.
 *
 * Strategy : create with `en` payload (default locale), then payload.update
 * once per non-default locale to fill localized fields. Idempotent: skips
 * any document whose unique key (slug for projects, code for experiments)
 * already exists. To force a fresh seed, run `pnpm services:reset` first.
 *
 * Usage : pnpm payload:seed
 */

import dotenv from "dotenv";

import { LAB_EXPERIMENTS, type LabExperimentSeed } from "./seed-data/lab";
import { type Locale, PROJECTS, type ProjectSeed } from "./seed-data/projects";

dotenv.config({ path: ".env.local" });
dotenv.config();

const SECONDARY_LOCALES: Locale[] = ["fr", "it"];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("✖ DATABASE_URL is not set. Did you `cp .env.docker.example .env.local`?");
    process.exit(1);
  }

  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const payload = await getPayload({ config });

  await seedProjects(payload);
  await seedLab(payload);

  console.log("\n✓ Seed complete.");
  process.exit(0);
}

async function seedProjects(payload: Awaited<ReturnType<typeof import("payload").getPayload>>) {
  console.log(`→ Seeding ${PROJECTS.length} projects (en + fr + it)…`);

  let created = 0;
  let skipped = 0;

  for (const project of PROJECTS) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
      locale: "en",
    });

    if (existing.docs.length > 0) {
      console.log(`  · ${project.slug} already exists, skipping`);
      skipped++;
      continue;
    }

    const enDoc = await payload.create({
      collection: "projects",
      locale: "en",
      data: enPayload(project),
      draft: false,
    });

    for (const locale of SECONDARY_LOCALES) {
      await payload.update({
        collection: "projects",
        id: enDoc.id,
        locale,
        data: localePayload(project, locale),
      });
    }

    console.log(`  ✓ ${project.slug}`);
    created++;
  }

  console.log(`  → Projects: ${created} created, ${skipped} skipped.`);
}

async function seedLab(payload: Awaited<ReturnType<typeof import("payload").getPayload>>) {
  console.log(`\n→ Seeding ${LAB_EXPERIMENTS.length} lab experiments (en + fr + it)…`);

  let created = 0;
  let skipped = 0;

  for (const exp of LAB_EXPERIMENTS) {
    const existing = await payload.find({
      collection: "lab-experiments",
      where: { code: { equals: exp.code } },
      limit: 1,
      locale: "en",
    });

    if (existing.docs.length > 0) {
      console.log(`  · ${exp.code} already exists, skipping`);
      skipped++;
      continue;
    }

    const enDoc = await payload.create({
      collection: "lab-experiments",
      locale: "en",
      data: labEnPayload(exp) as never,
      draft: false,
    });

    for (const locale of SECONDARY_LOCALES) {
      await payload.update({
        collection: "lab-experiments",
        id: enDoc.id,
        locale,
        data: labLocalePayload(exp, locale),
      });
    }

    console.log(`  ✓ ${exp.code}`);
    created++;
  }

  console.log(`  → Lab experiments: ${created} created, ${skipped} skipped.`);
}

/* ─── Project payload builders ─────────────────────────────────── */

function enPayload(p: ProjectSeed) {
  return {
    number: p.number,
    slug: p.slug,
    name: p.name.en,
    summary: p.summary.en,
    year: p.year,
    state: p.state,
    stack: p.stack,
    partners: p.partners ?? [],
    results: p.results.map((r) => ({ value: r.value, label: r.label.en })),
    publishedAt: new Date().toISOString(),
  };
}

function localePayload(p: ProjectSeed, locale: Locale) {
  return {
    name: p.name[locale],
    summary: p.summary[locale],
    results: p.results.map((r) => ({ value: r.value, label: r.label[locale] })),
  };
}

/* ─── Lab payload builders ─────────────────────────────────────── */

function labEnPayload(e: LabExperimentSeed) {
  const base: Record<string, unknown> = {
    code: e.code,
    name: e.name.en,
    summary: e.summary.en,
    state: e.state,
    tags: e.tags,
    startedAt: e.startedAt,
  };
  if (e.sourceUrl) base.sourceUrl = e.sourceUrl;
  if (e.demoUrl) base.demoUrl = e.demoUrl;
  return base;
}

function labLocalePayload(e: LabExperimentSeed, locale: Locale) {
  return {
    name: e.name[locale],
    summary: e.summary[locale],
  };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
