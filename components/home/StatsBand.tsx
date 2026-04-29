import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/visual/Counter";
import { SectionHeader } from "@/components/visual/SectionHeader";

const STATS = [
  { key: "statYears", to: 7, suffix: "" },
  { key: "statProjects", to: 24, suffix: "" },
  { key: "statLocales", to: 3, suffix: "" },
  { key: "statBundle", to: 122, suffix: " kB" },
] as const;

export function StatsBand() {
  const t = useTranslations("Home");

  return (
    <section className="invert border-t border-b border-border" aria-label={t("statsBandLabel")}>
      <Container>
        <div className="py-[var(--spacing-9)]">
          <SectionHeader number="02" label={t("statsBandLabel")} meta="Q2 · 2026" />

          <ul className="grid grid-cols-2 gap-y-[var(--spacing-7)] md:grid-cols-4">
            {STATS.map((s) => (
              <li
                key={s.key}
                className="flex flex-col gap-[var(--spacing-3)] md:border-l md:border-border md:pl-[var(--spacing-5)] md:first:border-l-0 md:first:pl-0"
              >
                <span className="whitespace-nowrap font-[var(--font-display)] text-[var(--text-display-l)] leading-[0.9] tracking-[var(--tracking-display)] md:text-[clamp(56px,7vw,112px)]">
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {t(s.key)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
