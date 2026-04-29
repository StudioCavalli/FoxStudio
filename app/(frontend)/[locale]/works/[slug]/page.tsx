import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/effects/Reveal";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/visual/Pattern";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";

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

  return (
    <article>
      {/* HERO — full bleed pattern + overlay text */}
      <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 -z-10 opacity-40 text-[var(--color-fg)]">
          <Pattern seed={project.slug} className="h-full w-full" />
        </div>

        {/* Top metadata strip */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
          <span className="tabular">
            {project.number} ▸ {project.year}
          </span>
          <span className="hidden md:inline">{project.stack.join(" · ")}</span>
          <span>
            <span aria-hidden className="text-[var(--color-fg)]">
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
              <p className="mt-[var(--spacing-7)] max-w-[60ch] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--color-fg-secondary)]">
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
              <p>{project.summary}</p>
              <p className="text-[var(--color-fg-secondary)]">{t("placeholderSubBody")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ACT 2 — APPROACH */}
      <section className="invert border-t border-[var(--color-border)] py-[var(--spacing-10)]">
        <Container>
          <SectionHeader number="02" label={t("approach")} />

          <Reveal>
            <div className="relative isolate aspect-[16/9] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-[var(--spacing-3)] py-[var(--spacing-2)] font-[var(--font-mono)] text-[var(--text-mono-s)] text-[var(--color-fg-tertiary)]">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full border border-[var(--color-fg-tertiary)]" />
                  <span className="h-2 w-2 rounded-full border border-[var(--color-fg-tertiary)]" />
                  <span className="h-2 w-2 rounded-full border border-[var(--color-fg-tertiary)]" />
                </span>
                <span className="ml-3 truncate">{`foxstudio.fr/works/${project.slug}`}</span>
              </div>
              <div className="absolute inset-0 mt-[28px] opacity-50 text-[var(--color-fg)]">
                <Pattern seed={`${project.slug}-approach`} className="h-full w-full" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-[var(--spacing-7)] max-w-[60ch] text-[var(--color-fg-secondary)]">
              {t("approachPlaceholder")}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ACT 3 — RESULTS */}
      <section className="border-t border-[var(--color-border)] py-[var(--spacing-10)]">
        <Container>
          <SectionHeader number="03" label={t("results")} />

          {project.results.length > 0 ? (
            <div className="grid gap-[var(--spacing-5)] md:grid-cols-3">
              {project.results.map((r) => (
                <div
                  key={`${r.value}-${r.label}`}
                  className="flex flex-col justify-between gap-[var(--spacing-7)] border border-[var(--color-border)] p-[var(--spacing-6)]"
                >
                  <p className="font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(48px,6vw,96px)] tabular">
                    {r.value}
                  </p>
                  <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-[var(--spacing-5)] md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={`result-${i}`}
                  className="border border-[var(--color-border)] p-[var(--spacing-6)]"
                >
                  <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)]">
                    —
                  </p>
                  <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                    {t("metricPending")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* NEXT PROJECT */}
      {next && next.slug !== project.slug && (
        <section className="border-t border-[var(--color-border)]">
          <Link
            href={`/works/${next.slug}`}
            className="group relative isolate flex min-h-[40vh] flex-col justify-between overflow-hidden p-[var(--grid-margin)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-secondary)]"
          >
            <div className="absolute inset-0 -z-10 opacity-15 transition-opacity duration-[var(--duration-base)] group-hover:opacity-40 text-[var(--color-fg)]">
              <Pattern seed={next.slug} className="h-full w-full" />
            </div>
            <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
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
      className={`border-t border-[var(--color-border)] pt-[var(--spacing-3)] ${
        stacked
          ? "flex flex-col gap-[var(--spacing-2)]"
          : "flex justify-between gap-[var(--spacing-3)]"
      }`}
    >
      <dt className="text-[var(--color-fg-secondary)]">{label}</dt>
      <dd className={stacked ? "" : "text-right"}>{value}</dd>
    </div>
  );
}
