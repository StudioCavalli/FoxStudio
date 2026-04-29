import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/effects/Reveal";
import { LdJson } from "@/components/seo/LdJson";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/visual/Pattern";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";

type Args = {
  params: Promise<{ slug: string; locale: string }>;
};

type LocaleParam = "fr" | "en" | "it";

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale as LocaleParam);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export default async function ProjectPage({ params }: Args) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale as LocaleParam);
  if (!project) notFound();

  const t = await getTranslations("Project");
  const all = await getProjects(locale as LocaleParam);
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const stateLabel = t(`state.${project.state}` as `state.${typeof project.state}`);

  const ldData = [
    creativeWorkSchema(project, locale as LocaleParam),
    breadcrumbSchema([
      { name: SITE.name, url: `${SITE.url}/${locale}` },
      { name: "Works", url: `${SITE.url}/${locale}/works` },
      { name: project.name, url: `${SITE.url}/${locale}/works/${project.slug}` },
    ]),
  ];

  return (
    <article>
      <LdJson data={ldData} />
      {/* HERO — full bleed pattern + overlay text */}
      <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 opacity-40 text-fg">
          <Pattern seed={project.slug} className="h-full w-full" />
        </div>

        {/* Top metadata strip */}
        <div className="flex items-center justify-between border-b border-border px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
          <span className="tabular">
            {project.number} ▸ {project.year}
          </span>
          <span className="hidden md:inline">{project.stack.join(" · ")}</span>
          <span>
            <span aria-hidden className="text-fg">
              {project.state === "live" ? "◉" : project.state === "archived" ? "×" : "◯"}
            </span>{" "}
            {stateLabel}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-1 flex-col justify-end px-[var(--grid-margin)] py-[var(--spacing-9)]">
          <Reveal>
            <h1 className="font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(56px,11vw,220px)]">
              {project.name}
            </h1>
          </Reveal>

          {project.summary && (
            <Reveal delay={120}>
              <p className="mt-[var(--spacing-7)] max-w-[60ch] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-fg-secondary">
                {project.summary}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ACT 1 — CONTEXT */}
      <section className="py-[var(--spacing-10)]">
        <Container>
          <SectionHeader
            number="01"
            label={t("context")}
            meta={`${project.year} · ${stateLabel}`}
          />

          <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
            <aside className="md:sticky md:top-[80px] md:self-start">
              <dl className="space-y-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
                <Row label={t("year")} value={String(project.year)} />
                <Row label={t("status")} value={stateLabel} />
                <Row label={t("stack")} value={project.stack.join(" · ")} stacked />
                {project.partners.length > 0 && (
                  <Row
                    label={t("partners")}
                    value={project.partners.map((p) => p.name).join(" · ")}
                    stacked
                  />
                )}
              </dl>
            </aside>

            <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
              {project.context ? (
                project.context.split(/\n\n+/).map((paragraph, i) => (
                  <p key={paragraph.slice(0, 32)} className={i === 0 ? "" : "text-fg-secondary"}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{project.summary}</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ACT 2 — APPROACH */}
      <section className="tone-flip border-t border-border py-[var(--spacing-10)]">
        <Container>
          <SectionHeader number="02" label={t("approach")} />

          <Reveal>
            <div className="relative isolate aspect-[16/9] w-full overflow-hidden border border-border bg-bg-secondary">
              <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-border bg-bg-tertiary px-[var(--spacing-3)] py-[var(--spacing-2)] font-[var(--font-mono)] text-[var(--text-mono-s)] text-fg-tertiary">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full border border-fg-tertiary" />
                  <span className="h-2 w-2 rounded-full border border-fg-tertiary" />
                  <span className="h-2 w-2 rounded-full border border-fg-tertiary" />
                </span>
                <span className="ml-3 truncate">{`${SITE.url.replace(/^https?:\/\//, "")}/works/${project.slug}`}</span>
              </div>
              <div className="absolute inset-0 mt-[28px] opacity-50 text-fg">
                <Pattern seed={`${project.slug}-approach`} className="h-full w-full" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-[var(--spacing-7)] max-w-[65ch] space-y-[var(--spacing-4)] text-[var(--text-body-l)] leading-[var(--leading-relaxed)] text-fg">
              {project.approach ? (
                project.approach
                  .split(/\n\n+/)
                  .map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)
              ) : (
                <p className="text-fg-secondary">{t("approachPlaceholder")}</p>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ACT 3 — RESULTS */}
      <section className="border-t border-border py-[var(--spacing-10)]">
        <Container>
          <SectionHeader number="03" label={t("results")} />

          <div className="grid gap-[var(--spacing-5)] md:grid-cols-3">
            {(project.results.length > 0
              ? project.results
              : ([1, 2, 3].map(() => ({
                  value: "—",
                  label: t("metricPending"),
                })) as typeof project.results)
            ).map((r, i) => (
              <ResultCard
                key={`${r.value}-${r.label}-${i}`}
                index={i + 1}
                value={r.value}
                label={r.label}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* NEXT PROJECT */}
      {next && next.slug !== project.slug && (
        <section className="border-t border-border">
          <Link
            href={`/works/${next.slug}`}
            className="group relative isolate flex min-h-[40vh] flex-col justify-between overflow-hidden p-[var(--grid-margin)] transition-colors duration-[var(--duration-fast)] hover:bg-bg-secondary"
          >
            <div className="absolute inset-0 -z-10 opacity-15 transition-opacity duration-[var(--duration-base)] group-hover:opacity-40 text-fg">
              <Pattern seed={next.slug} className="h-full w-full" />
            </div>
            <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
              {t("next")} ▸ {next.number}
            </p>
            <p className="font-[var(--font-display)] font-medium leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[clamp(48px,8vw,144px)]">
              {next.name}
            </p>
          </Link>
        </section>
      )}
    </article>
  );
}

function Row({
  label,
  value,
  stacked = false,
}: {
  label: string;
  value: string;
  stacked?: boolean;
}) {
  return (
    <div
      className={`border-t border-border pt-[var(--spacing-3)] ${
        stacked
          ? "flex flex-col gap-[var(--spacing-2)]"
          : "flex justify-between gap-[var(--spacing-3)]"
      }`}
    >
      <dt className="text-fg-secondary">{label}</dt>
      <dd className={stacked ? "" : "text-right"}>{value}</dd>
    </div>
  );
}

/**
 * A single Result card. Auto-scales the value font based on character
 * length: short tokens (numbers, "MIT", "PWA") get the full display
 * size, longer ones ("WebSocket", "Drizzle") get a smaller scale that
 * actually fits inside the card.
 */
function ResultCard({
  index,
  value,
  label,
}: {
  index: number;
  value: string;
  label: string;
}) {
  // Scale tier based on token length — keeps long words inside the card.
  const len = value.length;
  const valueClass =
    len <= 4
      ? "text-[clamp(56px,7vw,112px)]"
      : len <= 7
        ? "text-[clamp(40px,5vw,80px)]"
        : "text-[clamp(28px,3.6vw,56px)]";

  return (
    <div className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden border border-border bg-bg p-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] hover:border-border-strong md:p-[var(--spacing-6)]">
      <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-tertiary">
        {String(index).padStart(2, "0")}
      </span>

      <p
        className={`font-[var(--font-display)] font-medium leading-[0.95] tracking-[-0.03em] tabular break-words ${valueClass}`}
      >
        {value}
      </p>

      <p className="border-t border-border pt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg">
        {label}
      </p>
    </div>
  );
}
