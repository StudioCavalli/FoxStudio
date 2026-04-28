import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/data/projects";

type Args = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Works" });
  return {
    title: t("label"),
    description: "FoxStudio works — projects, prototypes, case studies.",
  };
}

export default async function WorksPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getProjects();
  const t = await getTranslations("Works");

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
        <MonoLabel number="01">{t("label")}</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-9)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
          {t("projectCount", { count: projects.length })}
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
                {t("yearProjectCount", { count: (byYear[year] ?? []).length })}
              </span>
            </div>

            <ul>
              {(byYear[year] ?? []).map((project) => (
                <li key={project.id} className="border-b border-[var(--color-border)]">
                  <Link
                    href={`/works/${project.slug}`}
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
