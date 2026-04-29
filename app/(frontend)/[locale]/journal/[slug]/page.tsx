import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LdJson } from "@/components/seo/LdJson";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { getJournalArticleBySlug, getJournalArticles } from "@/lib/data/journal";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";

type Args = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getJournalArticleBySlug(slug, locale as "fr" | "en" | "it");
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.lead,
      publishedTime: article.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getJournalArticles();
  return routing.locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export default async function JournalArticlePage({ params }: Args) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const article = await getJournalArticleBySlug(slug, locale as "fr" | "en" | "it");
  if (!article) notFound();

  const t = await getTranslations("Journal");

  const ldData = [
    articleSchema(article, locale as Locale),
    breadcrumbSchema([
      { name: SITE.name, url: `${SITE.url}/${locale}` },
      { name: "Journal", url: `${SITE.url}/${locale}/journal` },
      { name: article.title, url: `${SITE.url}/${locale}/journal/${article.slug}` },
    ]),
  ];

  return (
    <article className="pt-[var(--spacing-7)] pb-[var(--spacing-10)]">
      <LdJson data={ldData} />
      <Container>
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary hover:text-fg"
        >
          ◂ {t("backToJournal")}
        </Link>

        <header className="mt-[var(--spacing-7)] mb-[var(--spacing-9)] border-b border-border pb-[var(--spacing-9)]">
          <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
            {article.publishedAt?.slice(0, 10) ?? "—"} · {article.tag}
            {article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} min` : ""}
          </p>
          <h1 className="mt-[var(--spacing-5)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
            {article.title}
          </h1>
          {article.lead && (
            <p className="mt-[var(--spacing-7)] max-w-[60ch] font-[var(--font-display)] text-[var(--text-display-m)] italic leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-fg-secondary">
              {article.lead}
            </p>
          )}
        </header>

        {article.body ? (
          <div className="prose-foxstudio max-w-[65ch] space-y-[var(--spacing-5)] text-[var(--text-body-l)] leading-[var(--leading-relaxed)]">
            <RichText data={article.body} />
          </div>
        ) : (
          <div className="max-w-[65ch] space-y-[var(--spacing-5)] text-[var(--text-body-l)] leading-[var(--leading-relaxed)] text-fg-secondary">
            <p>{t("bodyPlaceholder")}</p>
            <p>{t("bodyPlaceholderHint")}</p>
          </div>
        )}
      </Container>
    </article>
  );
}
