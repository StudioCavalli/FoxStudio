import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { getTeamMembers } from "@/lib/data/team";
import { SITE } from "@/lib/site";

type Args = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Studio" });
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function StudioPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);

  const team = await getTeamMembers();
  const t = await getTranslations("Studio");

  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      {/* MANIFESTO */}
      <section className="border-b border-border pb-[var(--spacing-10)]">
        <Container>
          <MonoLabel number="00">{t("label")}</MonoLabel>

          <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-7)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
            {t("title")}
          </h1>

          <div className="grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
            <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
              <p>{t("manifesto1")}</p>
              <p className="text-fg-secondary">{t("manifesto2")}</p>
              <p className="text-fg-secondary">{t("manifesto3")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className="border-b border-border py-[var(--spacing-10)]">
        <Container>
          <MonoLabel number="01">{t("teamLabel")}</MonoLabel>

          <ul className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li
                key={member.id}
                className="flex flex-col gap-[var(--spacing-3)] border-t border-border pt-[var(--spacing-5)]"
              >
                <div className="aspect-[4/5] w-full border border-border bg-bg-secondary" />
                <p className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                  {member.name}
                </p>
                <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {member.role}
                </p>
                {member.bio && <p className="text-fg-secondary">{member.bio}</p>}
                {member.links.length > 0 && (
                  <ul className="mt-[var(--spacing-2)] flex flex-wrap gap-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
                    {member.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="underline underline-offset-[6px]"
                        >
                          {link.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FOXCASE LINK */}
      <section className="border-b border-border py-[var(--spacing-10)]">
        <Container>
          <MonoLabel number="02">{t("foxcaseLabel")}</MonoLabel>

          <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
            <p className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
              {t("foxcaseBody")}
            </p>
            <div className="flex md:items-end md:justify-end">
              <ArrowLink href={SITE.parent.url} external>
                {t("visitFoxcase")}
              </ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <section className="py-[var(--spacing-10)]">
        <Container>
          <MonoLabel number="03">{t("principlesLabel")}</MonoLabel>

          <ul className="mt-[var(--spacing-7)] space-y-[var(--spacing-5)] border-t border-border">
            {[1, 2, 3, 4].map((i) => (
              <li key={`principle-${i}`} className="border-b border-border py-[var(--spacing-5)]">
                <p className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
                  → {t(`principle${i}` as `principle${1 | 2 | 3 | 4}`)}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}
