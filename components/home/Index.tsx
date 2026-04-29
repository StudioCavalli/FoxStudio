import { getTranslations } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { getProjects } from "@/lib/data/projects";

import { HoverIndex } from "./HoverIndex";

export async function Index() {
  const projects = (await getProjects()).slice(0, 4);
  const t = await getTranslations("Home");

  const items = projects.map((p) => ({
    id: p.id,
    number: p.number,
    slug: p.slug,
    name: p.name,
    meta: `${p.year} · ${p.stack.join(" · ")}`,
  }));

  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label={t("latestWorks")}
    >
      <Container>
        <SectionHeader
          number="01"
          label={t("indexLabel")}
          meta={`${projects.length} · ${t("latestWorks")}`}
        />

        <HoverIndex items={items} basePath="/works" />

        <div className="mt-[var(--spacing-7)] flex justify-end">
          <ArrowLink href="/works">{t("viewAll")}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
