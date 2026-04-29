import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Link } from "@/i18n/navigation";
import { getJournalArticles } from "@/lib/data/journal";

type Args = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Journal" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const TAGS = ["all", "perf", "3d", "tooling", "opinion", "process"] as const;

export default async function JournalPage({ params, searchParams }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { tag: filter } = await searchParams;

  const articles = await getJournalArticles(locale as "fr" | "en" | "it");
  const filtered = filter && filter !== "all" ? articles.filter((a) => a.tag === filter) : articles;
  const t = await getTranslations("Journal");

  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-10)]">
      <Container>
        <MonoLabel number="01">{t("label")}</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-3)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
          {t("title")}
        </h1>
        <p className="mb-[var(--spacing-7)] max-w-[60ch] text-fg-secondary">{t("subtitle")}</p>

        {/* Tag filters */}
        <ul className="mb-[var(--spacing-7)] flex flex-wrap gap-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
          {TAGS.map((tag) => {
            const active = (filter ?? "all") === tag;
            return (
              <li key={tag}>
                <Link
                  href={tag === "all" ? "/journal" : `/journal?tag=${tag}`}
                  className={`border border-border px-[var(--spacing-3)] py-[var(--spacing-2)] transition-colors duration-[var(--duration-fast)] ${
                    active
                      ? "border-fg bg-fg text-bg"
                      : "text-fg-secondary hover:border-border-strong hover:text-fg"
                  }`}
                >
                  {tag === "all" ? t("filterAll") : tag}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="border-t border-border">
          {filtered.map((article) => (
            <li key={article.id} className="border-b border-border">
              <Link
                href={`/journal/${article.slug}`}
                className="flex flex-col gap-[var(--spacing-3)] py-[var(--spacing-6)] transition-colors duration-[var(--duration-fast)] hover:bg-bg-secondary md:flex-row md:items-baseline md:justify-between md:gap-[var(--spacing-7)]"
              >
                <span className="flex flex-col gap-[var(--spacing-2)] md:flex-row md:items-baseline md:gap-[var(--spacing-5)]">
                  <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                    {article.publishedAt?.slice(0, 10) ?? "—"}
                  </span>
                  <span className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
                    {article.title}
                  </span>
                </span>
                <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {article.tag} ·{" "}
                  {article.readingTimeMinutes ? `${article.readingTimeMinutes} min` : "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-[var(--spacing-7)] text-fg-secondary">{t("empty")}</p>
        )}
      </Container>
    </section>
  );
}
