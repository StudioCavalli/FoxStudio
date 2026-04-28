import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";

type Args = {
  params: Promise<{ slug: string }>;
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
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Args) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // Find adjacent project for the "Next" link
  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article>
      {/* HERO */}
      <section className="border-b border-[var(--color-border)] py-[var(--spacing-9)] md:py-[var(--spacing-11)]">
        <Container>
          <MonoLabel number={project.number}>
            {project.year} · {project.status}
          </MonoLabel>

          <h1 className="mt-[var(--spacing-6)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
            {project.name}
          </h1>

          {project.summary && (
            <p className="mt-[var(--spacing-7)] max-w-[60ch] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--color-fg-secondary)]">
              {project.summary}
            </p>
          )}
        </Container>
      </section>

      {/* ACT 1 — CONTEXT */}
      <section className="py-[var(--spacing-10)]">
        <Container>
          <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
            <aside className="md:sticky md:top-[80px] md:self-start">
              <MonoLabel>Context</MonoLabel>
              <dl className="mt-[var(--spacing-5)] space-y-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
                <div className="flex justify-between gap-[var(--spacing-3)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div className="flex justify-between gap-[var(--spacing-3)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">Status</dt>
                  <dd>{project.status}</dd>
                </div>
                <div className="flex flex-col justify-between gap-[var(--spacing-2)] border-t border-[var(--color-border)] pt-[var(--spacing-3)]">
                  <dt className="text-[var(--color-fg-secondary)]">Stack</dt>
                  <dd className="text-right">{project.stack.join(" · ")}</dd>
                </div>
              </dl>
            </aside>

            <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
              <p>
                The full case study (long-form narrative, media, technical breakdown) is stored in
                Payload and rendered here once the CMS is wired to a database.
              </p>
              <p className="text-[var(--color-fg-secondary)]">
                For now, this is a structural placeholder showing the 3-act layout (Context /
                Approach / Results) defined in the J1 wireframes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ACT 2 — APPROACH */}
      <section className="border-t border-[var(--color-border)] py-[var(--spacing-10)]">
        <Container>
          <MonoLabel number="02">Approach</MonoLabel>
          <div className="mt-[var(--spacing-7)] aspect-[16/9] w-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]" />
          <p className="mt-[var(--spacing-7)] max-w-[60ch] text-[var(--color-fg-secondary)]">
            Visual material and detailed approach narrative go here. Will be sourced from Payload's{" "}
            <code>narrative</code> rich text field once content is added.
          </p>
        </Container>
      </section>

      {/* ACT 3 — RESULTS */}
      <section className="border-t border-[var(--color-border)] py-[var(--spacing-10)]">
        <Container>
          <MonoLabel number="03">Results</MonoLabel>
          <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-5)] md:grid-cols-3">
            {[
              { value: "—", label: "metric pending" },
              { value: "—", label: "metric pending" },
              { value: "—", label: "metric pending" },
            ].map((r, i) => (
              <div
                key={`result-${i + 1}`}
                className="border border-[var(--color-border)] p-[var(--spacing-6)]"
              >
                <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)]">
                  {r.value}
                </p>
                <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                  {r.label}
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
              href={`/works/${next.slug}` as never}
              className="group block transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-secondary)] -mx-[var(--grid-margin)] px-[var(--grid-margin)] py-[var(--spacing-6)]"
            >
              <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                Next ▸ {next.number}
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
