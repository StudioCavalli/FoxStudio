import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/effects/Reveal";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
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
      {/* HERO */}
      <section className="border-b border-[var(--color-border)] py-[var(--spacing-9)] md:py-[var(--spacing-11)]">
        <Container>
          <Reveal>
            <MonoLabel number={project.number}>
              {project.year} · {project.state}
            </MonoLabel>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-[var(--spacing-6)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
              {project.name}
            </h1>
          </Reveal>

          {project.summary && (
            <Reveal delay={160}>
              <p className="mt-[var(--spacing-7)] max-w-[60ch] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--color-fg-secondary)]">
                {project.summary}
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      {/* ACT 1 — CONTEXT */}
      <section className="py-[var(--spacing-10)]">
        <Container>
          <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
            <aside className="md:sticky md:top-[80px] md:self-start">
              <MonoLabel>{t("context")}</MonoLabel>
              <dl className="mt-[var(--spacing-5)] space-y-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
                <div className="flex justify-between gap-[var(--spacing-3)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">{t("year")}</dt>
                  <dd>{project.year}</dd>
                </div>
                <div className="flex justify-between gap-[var(--spacing-3)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">{t("status")}</dt>
                  <dd>{project.state}</dd>
                </div>
                <div className="flex flex-col justify-between gap-[var(--spacing-2)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
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

      {/* ACT 2 — APPROACH */}
      <section className="border-t border-[var(--color-border)] py-[var(--spacing-10)]">
        <Container>
          <Reveal>
            <MonoLabel number="02">{t("approach")}</MonoLabel>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-[var(--spacing-7)] aspect-[16/9] w-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]" />
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
          <MonoLabel number="03">{t("results")}</MonoLabel>
          <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-5)] md:grid-cols-3">
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
        </Container>
      </section>

      {/* NEXT PROJECT */}
      {next && next.slug !== project.slug && (
        <section className="border-t border-[var(--color-border)] py-[var(--spacing-10)]">
          <Container>
            <Link
              href={`/works/${next.slug}`}
              className="-mx-[var(--grid-margin)] group block px-[var(--grid-margin)] py-[var(--spacing-6)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-secondary)]"
            >
              <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                {t("next")} ▸ {next.number}
              </p>
              <p className="mt-[var(--spacing-3)] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                {next.name}
              </p>
            </Link>
          </Container>
        </section>
      )}
    </article>
  );
}
