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

import { JOURNAL_ARTICLES, type JournalArticleSeed } from "./seed-data/journal";
import { LAB_EXPERIMENTS, type LabExperimentSeed } from "./seed-data/lab";
import { type Locale, PROJECTS, type ProjectSeed } from "./seed-data/projects";
import { TEAM, type TeamMemberSeed } from "./seed-data/team";

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
  await seedJournal(payload);
  await seedTeam(payload);

  console.log("\n✓ Seed complete.");
  process.exit(0);
}

/* ─── Lexical helpers ──────────────────────────────────────────── */

function lexicalFromParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            format: 0,
            mode: "normal" as const,
            style: "",
            text,
            version: 1,
            detail: 0,
          },
        ],
      })),
    },
  };
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
    context: p.context.en,
    approach: p.approach.en,
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
    context: p.context[locale],
    approach: p.approach[locale],
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

/* ─── Journal seeding ──────────────────────────────────────────── */

async function seedJournal(payload: Awaited<ReturnType<typeof import("payload").getPayload>>) {
  console.log(`\n→ Seeding ${JOURNAL_ARTICLES.length} journal articles (en + fr + it)…`);

  let created = 0;
  let skipped = 0;

  for (const article of JOURNAL_ARTICLES) {
    const existing = await payload.find({
      collection: "journal-articles",
      where: { slug: { equals: article.slug } },
      limit: 1,
      locale: "en",
    });

    if (existing.docs.length > 0) {
      console.log(`  · ${article.slug} already exists, skipping`);
      skipped++;
      continue;
    }

    const enDoc = await payload.create({
      collection: "journal-articles",
      locale: "en",
      data: journalEnPayload(article) as never,
      draft: false,
    });

    for (const locale of SECONDARY_LOCALES) {
      await payload.update({
        collection: "journal-articles",
        id: enDoc.id,
        locale,
        data: journalLocalePayload(article, locale),
      });
    }

    console.log(`  ✓ ${article.slug}`);
    created++;
  }

  console.log(`  → Journal: ${created} created, ${skipped} skipped.`);
}

function journalEnPayload(a: JournalArticleSeed) {
  return {
    slug: a.slug,
    title: a.title.en,
    lead: a.lead.en,
    body: lexicalFromParagraphs(a.body.en),
    tag: a.tag,
    readingTimeMinutes: a.readingTimeMinutes,
    publishedAt: a.publishedAt,
  };
}

function journalLocalePayload(a: JournalArticleSeed, locale: Locale) {
  return {
    title: a.title[locale],
    lead: a.lead[locale],
    body: lexicalFromParagraphs(a.body[locale]),
  };
}

/* ─── Team seeding ─────────────────────────────────────────────── */

async function seedTeam(payload: Awaited<ReturnType<typeof import("payload").getPayload>>) {
  console.log(`\n→ Seeding ${TEAM.length} team members (en + fr + it)…`);

  let created = 0;
  let skipped = 0;

  for (const member of TEAM) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
      limit: 1,
      locale: "en",
    });

    if (existing.docs.length > 0) {
      console.log(`  · ${member.name} already exists, skipping`);
      skipped++;
      continue;
    }

    const enDoc = await payload.create({
      collection: "team-members",
      locale: "en",
      data: teamEnPayload(member),
    });

    for (const locale of SECONDARY_LOCALES) {
      await payload.update({
        collection: "team-members",
        id: enDoc.id,
        locale,
        data: teamLocalePayload(member, locale),
      });
    }

    console.log(`  ✓ ${member.name}`);
    created++;
  }

  console.log(`  → Team: ${created} created, ${skipped} skipped.`);
}

function teamEnPayload(m: TeamMemberSeed) {
  return {
    name: m.name,
    role: m.role.en,
    bio: m.bio.en,
    location: m.location,
    order: m.order,
    links: m.links,
  };
}

function teamLocalePayload(m: TeamMemberSeed, locale: Locale) {
  return {
    role: m.role[locale],
    bio: m.bio[locale],
  };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
