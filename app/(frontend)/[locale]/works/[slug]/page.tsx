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

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export default async function ProjectPage({ params }: Args) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("Project");
  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article>
      {/* HERO — full bleed pattern + overlay text */}
      <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 -z-10 opacity-40 text-[var(--color-fg)]">
          <Pattern seed={project.slug} className="h-full w-full" />
        </div>

        {/* Top metadata strip */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
          <span>
            {project.number} ▸ {project.year}
          </span>
          <span className="hidden md:inline">{project.stack.join(" · ")}</span>
          <span>
            <span aria-hidden className="text-[var(--color-fg)]">
              {project.state === "live" ? "◉" : project.state === "archived" ? "×" : "◯"}
            </span>{" "}
            {project.state}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-1 flex-col justify-end px-[var(--grid-margin)] py-[var(--spacing-9)]">
          <Reveal>
            <h1 className="font-[var(--font-display)] font-medium leading-[0.92] tracking-[var(--tracking-display)] text-[clamp(56px,10vw,200px)]">
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
            meta={`${project.year} · ${project.state}`}
          />

          <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
            <aside className="md:sticky md:top-[80px] md:self-start">
              <dl className="space-y-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
                <div className="flex justify-between gap-[var(--spacing-3)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">{t("year")}</dt>
                  <dd>{project.year}</dd>
                </div>
                <div className="flex justify-between gap-[var(--spacing-3)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">{t("status")}</dt>
                  <dd>{project.state}</dd>
                </div>
                <div className="flex flex-col gap-[var(--spacing-2)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">{t("stack")}</dt>
                  <dd className="text-right">{project.stack.join(" · ")}</dd>
                </div>
              </dl>
            </aside>

            <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
              <p>{t("placeholderBody")}</p>
              <p className="text-[var(--color-fg-secondary)]">{t("placeholderSubBody")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ACT 2 — APPROACH (inverted section, mockup-style frame) */}
      <section className="invert border-t border-[var(--color-border)] py-[var(--spacing-10)]">
        <Container>
          <SectionHeader number="02" label={t("approach")} />

          <Reveal>
            <div className="relative isolate aspect-[16/9] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              {/* Browser-style mockup frame */}
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

          <div className="grid gap-[var(--spacing-5)] md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={`result-${i}`}
                className="border border-[var(--color-border)] p-[var(--spacing-6)]"
              >
                <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-l)]">
                  —
                </p>
                <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                  {t("metricPending")}
                </p>
              </div>
            ))}
          </div>
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
