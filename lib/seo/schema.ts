/**
 * Structured-data builders (schema.org). Returns plain objects ready to
 * pass to `<LdJson data={...} />`. Kept small and explicit — we only emit
 * the entities crawlers actually use.
 */

import type { Locale } from "@/i18n/routing";
import type { JournalArticle } from "@/lib/data/journal";
import type { Project } from "@/lib/data/projects";
import { SITE } from "@/lib/site";

const LOCALE_TAG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  it: "it-IT",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.contact.email,
    parentOrganization: {
      "@type": "Organization",
      name: SITE.parent.name,
      url: SITE.parent.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.contact.location,
      addressCountry: "FR",
    },
    sameAs: [
      "https://github.com/StudioCavalli",
      "https://www.linkedin.com/in/christopher-cvlli",
      "https://www.linkedin.com/in/chahine-benlahcen-tlemcani-999031202",
    ],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: `${SITE.url}/${locale}`,
    inLanguage: LOCALE_TAG[locale],
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export function creativeWorkSchema(project: Project, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${SITE.url}/${locale}/works/${project.slug}`,
    inLanguage: LOCALE_TAG[locale],
    dateCreated: `${project.year}`,
    creator: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    keywords: project.stack.join(", "),
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: `${SITE.url}/${locale}`,
    },
  };
}

export function articleSchema(article: JournalArticle, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.lead,
    url: `${SITE.url}/${locale}/journal/${article.slug}`,
    inLanguage: LOCALE_TAG[locale],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    keywords: article.tag,
    wordCount: article.readingTimeMinutes ? article.readingTimeMinutes * 220 : undefined,
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
