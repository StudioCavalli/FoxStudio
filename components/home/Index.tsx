import { getTranslations } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/data/projects";

export async function Index() {
  const projects = (await getProjects()).slice(0, 4);
  const t = await getTranslations("Home");

  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label={t("latestWorks")}
    >
      <Container>
        <div className="mb-[var(--spacing-8)] flex items-end justify-between">
          <MonoLabel number="01">{t("indexLabel")}</MonoLabel>
          <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
            {t("latestWorks")}
          </span>
        </div>

        <ul className="border-t border-[var(--color-border)]">
          {projects.map((project) => (
            <li key={project.id} className="border-b border-[var(--color-border)]">
              <Link
                href={`/works/${project.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-[var(--spacing-5)] py-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-secondary)] md:gap-[var(--spacing-7)] md:py-[var(--spacing-6)]"
              >
                <span className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                  {project.number}
                </span>
                <span className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                  {project.name}
                </span>
                <span className="hidden text-right font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)] md:block">
                  {project.year} · {project.stack.join(", ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--spacing-7)] flex justify-end">
          <ArrowLink href="/works">{t("viewAll")}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
