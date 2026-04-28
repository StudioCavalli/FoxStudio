import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/data/projects";
import { SITE } from "@/lib/site";

const STATIC_ROUTES = ["", "/works", "/lab", "/studio", "/journal", "/contact"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: `${SITE.url}/${routing.defaultLocale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE.url}/${l}${route}`])),
      },
    });
  }

  for (const project of projects) {
    const path = `/works/${project.slug}`;
    entries.push({
      url: `${SITE.url}/${routing.defaultLocale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE.url}/${l}${path}`])),
      },
    });
  }

  return entries;
}
