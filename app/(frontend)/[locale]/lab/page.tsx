import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { getLabExperiments } from "@/lib/data/lab";

type Args = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Lab" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function LabPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);

  const experiments = await getLabExperiments(locale as "fr" | "en" | "it");
  const t = await getTranslations("Lab");

  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <MonoLabel number="01">{t("label")}</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-3)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
          {t("title")}
        </h1>
        <p className="mb-[var(--spacing-9)] max-w-[60ch] text-fg-secondary">{t("subtitle")}</p>

        <ul className="border-t border-border">
          {experiments.map((exp) => (
            <li
              key={exp.id}
              className="grid gap-[var(--spacing-5)] border-b border-border py-[var(--spacing-7)] md:grid-cols-[1fr_2fr] md:gap-[var(--spacing-7)]"
            >
              <div>
                <p className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {exp.code}
                </p>
                <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  <span aria-hidden className="text-fg">
                    {exp.state === "live" ? "◉" : exp.state === "archived" ? "×" : "◯"}
                  </span>{" "}
                  {t(`status.${exp.state}`)}
                </p>
                {exp.startedAt && (
                  <p className="mt-[var(--spacing-2)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-tertiary">
                    {t("started")}: {exp.startedAt.slice(0, 10)}
                  </p>
                )}
              </div>

              <div>
                <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                  {exp.name}
                </p>
                {exp.summary && (
                  <p className="mt-[var(--spacing-4)] max-w-[60ch] text-fg-secondary">
                    {exp.summary}
                  </p>
                )}

                {(exp.demoUrl || exp.sourceUrl || exp.tags.length > 0) && (
                  <div className="mt-[var(--spacing-5)] flex flex-wrap items-center gap-[var(--spacing-5)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
                    {exp.demoUrl && (
                      <a
                        href={exp.demoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-[6px]"
                      >
                        {t("openDemo")} ↗
                      </a>
                    )}
                    {exp.sourceUrl && (
                      <a
                        href={exp.sourceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-[6px]"
                      >
                        {t("source")} ↗
                      </a>
                    )}
                    {exp.tags.length > 0 && (
                      <span className="text-fg-tertiary">{exp.tags.join(" · ")}</span>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
