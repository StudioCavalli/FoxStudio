import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HoverIndex } from "@/components/home/HoverIndex";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";
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

  const projects = await getProjects(locale as "fr" | "en" | "it");
  const t = await getTranslations("Works");

  const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a);
  const items = projects.map((p) => ({
    id: p.id,
    number: p.number,
    slug: p.slug,
    name: p.name,
    meta: `${p.year} · ${p.stack.join(" · ")}`,
  }));

  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-10)]">
      <Container>
        <SectionHeader
          number="01"
          label={t("label")}
          meta={`${years[0] ?? "—"}–${years[years.length - 1] ?? "—"}`}
        />

        <h1 className="mb-[var(--spacing-9)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[0.95] tracking-[var(--tracking-display)] md:text-[clamp(72px,10vw,180px)]">
          {t("projectCount", { count: projects.length })}
        </h1>

        <HoverIndex items={items} basePath="/works" />
      </Container>
    </section>
  );
}
