import { useTranslations } from "next-intl";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Link } from "@/i18n/navigation";

const LAB_EXPERIMENTS = [
  { id: "exp_004", name: "WebGPU compute shader", status: "live" as const },
  { id: "exp_005", name: "Edge AI inference", status: "live" as const },
  { id: "exp_006", name: "Haptic UI surface", status: "wip" as const },
];

export function LabTeaser() {
  const t = useTranslations("Home");

  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label={t("labLabel")}
    >
      <Container>
        <div className="mb-[var(--spacing-8)] flex items-end justify-between">
          <MonoLabel number="02">{t("labLabel")}</MonoLabel>
          <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
            {t("liveExperiments")}
          </span>
        </div>

        <ul className="grid gap-[var(--spacing-4)] md:grid-cols-3">
          {LAB_EXPERIMENTS.map((exp) => (
            <li
              key={exp.id}
              className="flex aspect-[4/3] flex-col justify-between border border-[var(--color-border)] p-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-strong)]"
            >
              <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                {exp.id}
              </span>
              <div>
                <p className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                  {exp.name}
                </p>
                <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                  <span aria-hidden className="text-[var(--color-fg)]">
                    {exp.status === "live" ? "◉" : "◯"}
                  </span>{" "}
                  {exp.status}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--spacing-7)] flex justify-end">
          <ArrowLink href="/lab">{t("enterLab")}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}

export function StudioTeaser() {
  const t = useTranslations("Home");

  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label={t("studioLabel")}
    >
      <Container>
        <MonoLabel number="03">{t("studioLabel")}</MonoLabel>

        <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
          <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
            <p>{t("studioLead")}</p>
            <p className="text-[var(--color-fg-secondary)]">{t("studioSecondary")}</p>
          </div>
          <div className="flex md:items-end md:justify-end">
            <ArrowLink href="/studio">{t("moreAboutStudio")}</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

const JOURNAL_PREVIEWS = [
  { date: "2026-04-15", title: "Rewriting a Next router in 80 lines", tag: "perf", read: "6 min" },
  {
    date: "2026-03-28",
    title: "Why we replaced WebGL with WebGPU on the X pipeline",
    tag: "3d",
    read: "12 min",
  },
  {
    date: "2026-03-12",
    title: "Notes on running compute shaders on entry-level laptops",
    tag: "perf",
    read: "8 min",
  },
];

export function JournalTeaser() {
  const t = useTranslations("Home");

  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label={t("journalLabel")}
    >
      <Container>
        <div className="mb-[var(--spacing-8)] flex items-end justify-between">
          <MonoLabel number="04">{t("journalLabel")}</MonoLabel>
          <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
            {t("latestNotes")}
          </span>
        </div>

        <ul className="border-t border-[var(--color-border)]">
          {JOURNAL_PREVIEWS.map((entry) => (
            <li key={entry.title} className="border-b border-[var(--color-border)]">
              <Link
                href="/journal"
                className="group flex flex-col gap-[var(--spacing-2)] py-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-bg-secondary)] md:flex-row md:items-baseline md:justify-between md:gap-[var(--spacing-7)]"
              >
                <span className="flex items-baseline gap-[var(--spacing-5)]">
                  <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                    {entry.date}
                  </span>
                  <span className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                    {entry.title}
                  </span>
                </span>
                <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                  {entry.tag} · {entry.read}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--spacing-7)] flex justify-end">
          <ArrowLink href="/journal">{t("allNotes")}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}

export function ContactTeaser() {
  const t = useTranslations("Home");

  const doors = [
    { number: "01", title: t("doorIncubators"), body: t("doorIncubatorsBody") },
    { number: "02", title: t("doorCompanies"), body: t("doorCompaniesBody") },
    { number: "03", title: t("doorTalents"), body: t("doorTalentsBody") },
  ];

  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label={t("talkLabel")}
    >
      <Container>
        <MonoLabel number="05">{t("talkLabel")}</MonoLabel>

        <h2 className="mt-[var(--spacing-6)] mb-[var(--spacing-8)] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-l)]">
          {t("pickYourDoor")}
        </h2>

        <ul className="grid gap-[var(--spacing-4)] md:grid-cols-3">
          {doors.map((door) => (
            <li key={door.number}>
              <Link
                href="/contact"
                className="group flex h-full flex-col justify-between border border-[var(--color-border)] p-[var(--spacing-6)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-strong)]"
              >
                <div>
                  <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                    {door.number}
                  </p>
                  <p className="mt-[var(--spacing-3)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                    {door.title}
                  </p>
                  <p className="mt-[var(--spacing-3)] text-[var(--color-fg-secondary)]">
                    {door.body}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mt-[var(--spacing-7)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]"
                >
                  {t("openDoor")} ▸
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
