import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { getProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Works",
  description: "FoxStudio works — projects, prototypes, case studies.",
};

export default async function WorksPage() {
  const projects = await getProjects();

  const byYear: Record<number, typeof projects> = {};
  for (const p of projects) {
    const bucket = byYear[p.year] ?? [];
    bucket.push(p);
    byYear[p.year] = bucket;
  }

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <MonoLabel number="01">Works</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-9)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
          {projects.length} project{projects.length !== 1 ? "s" : ""}.
          <br />
          <span className="text-[var(--color-fg-secondary)]">
            {years[0] ?? "—"}–{years[years.length - 1] ?? "—"}.
          </span>
        </h1>

        {years.map((year) => (
          <section key={year} className="mt-[var(--spacing-9)]">
            <div className="mb-[var(--spacing-5)] flex items-baseline justify-between border-b border-[var(--color-border)] pb-[var(--spacing-3)]">
              <span className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                {year}
              </span>
              <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-tertiary)]">
                {(byYear[year] ?? []).length} project
                {(byYear[year] ?? []).length !== 1 ? "s" : ""}
              </span>
            </div>

            <ul>
              {(byYear[year] ?? []).map((project) => (
                <li key={project.id} className="border-b border-[var(--color-border)]">
                  <Link
                    href={`/works/${project.slug}` as never}
                    className="grid grid-cols-[auto_1fr_auto] items-baseline gap-[var(--spacing-5)] py-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-secondary)] md:gap-[var(--spacing-7)] md:py-[var(--spacing-6)]"
                  >
                    <span className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                      {project.number}
                    </span>
                    <span>
                      <span className="block font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                        {project.name}
                      </span>
                      {project.summary && (
                        <span className="mt-[var(--spacing-2)] block max-w-[60ch] text-[var(--color-fg-secondary)]">
                          {project.summary}
                        </span>
                      )}
                    </span>
                    <span className="hidden text-right font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)] md:block">
                      {project.stack.join(", ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </section>
  );
}
