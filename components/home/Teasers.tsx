import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/visual/Pattern";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { Link } from "@/i18n/navigation";
import { getJournalArticles } from "@/lib/data/journal";

const LAB_EXPERIMENTS = [
  { id: "exp_004", name: "WebGPU compute shader", state: "live" as const },
  { id: "exp_005", name: "Edge AI inference", state: "live" as const },
  { id: "exp_006", name: "Haptic UI surface", state: "wip" as const },
];

export function LabTeaser() {
  const t = useTranslations("Home");

  return (
    <section className="border-t border-border py-[var(--spacing-10)]" aria-label={t("labLabel")}>
      <Container>
        <SectionHeader
          number="03"
          label={t("labLabel")}
          meta={`${LAB_EXPERIMENTS.length} · ${t("liveExperiments")}`}
        />

        <ul className="grid gap-[var(--spacing-4)] md:grid-cols-3">
          {LAB_EXPERIMENTS.map((exp) => (
            <li key={exp.id}>
              <Link
                href="/lab"
                className="group flex aspect-[4/5] flex-col justify-between border border-border p-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] hover:border-border-strong relative overflow-hidden"
              >
                <div className="absolute inset-0 -z-10 opacity-30 transition-opacity duration-[var(--duration-base)] group-hover:opacity-60 text-fg">
                  <Pattern seed={exp.id} className="h-full w-full" />
                </div>

                <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {exp.id}
                </span>
                <div>
                  <p className="font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
                    {exp.name}
                  </p>
                  <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                    <span aria-hidden className="text-fg">
                      {exp.state === "live" ? "◉" : "◯"}
                    </span>{" "}
                    {exp.state}
                  </p>
                </div>
              </Link>
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
      className="border-t border-border py-[var(--spacing-10)]"
      aria-label={t("studioLabel")}
    >
      <Container>
        <SectionHeader number="04" label={t("studioLabel")} />

        <div className="grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
          <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
            <p>{t("studioLead")}</p>
            <p className="text-fg-secondary">{t("studioSecondary")}</p>
          </div>
          <div className="flex md:items-end md:justify-end">
            <ArrowLink href="/studio">{t("moreAboutStudio")}</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export async function JournalTeaser({ locale }: { locale: "fr" | "en" | "it" }) {
  const articles = (await getJournalArticles(locale)).slice(0, 3);
  const t = await getTranslations("Home");

  return (
    <section
      className="invert border-t border-border py-[var(--spacing-10)]"
      aria-label={t("journalLabel")}
    >
      <Container>
        <SectionHeader
          number="05"
          label={t("journalLabel")}
          meta={`${articles.length} · ${t("latestNotes")}`}
        />

        <ul>
          {articles.map((entry, i) => (
            <li key={entry.slug} className="border-t border-border last:border-b">
              <Link
                href={`/journal/${entry.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-[var(--spacing-5)] py-[var(--spacing-6)] transition-opacity duration-[var(--duration-fast)] md:gap-[var(--spacing-7)] md:py-[var(--spacing-7)]"
              >
                <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {String(i + 1).padStart(2, "0")} ·{" "}
                  <span className="tabular">{entry.publishedAt?.slice(0, 10) ?? "—"}</span>
                </span>
                <span className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] group-hover:underline underline-offset-[6px]">
                  {entry.title}
                </span>
                <span className="hidden font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary md:inline">
                  {entry.tag}
                  {entry.readingTimeMinutes ? ` · ${entry.readingTimeMinutes} min` : ""}
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
    {
      number: "01",
      title: t("doorIncubators"),
      body: t("doorIncubatorsBody"),
      seed: "door-incubator",
    },
    { number: "02", title: t("doorCompanies"), body: t("doorCompaniesBody"), seed: "door-company" },
    { number: "03", title: t("doorTalents"), body: t("doorTalentsBody"), seed: "door-talent" },
  ];

  return (
    <section className="border-t border-border py-[var(--spacing-10)]" aria-label={t("talkLabel")}>
      <Container>
        <SectionHeader number="06" label={t("talkLabel")} />

        <h2 className="mb-[var(--spacing-9)] font-[var(--font-display)] text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[clamp(64px,9vw,160px)]">
          {t("pickYourDoor")}
        </h2>

        <ul className="grid gap-[var(--spacing-4)] md:grid-cols-3">
          {doors.map((door) => (
            <li key={door.number}>
              <Link
                href="/contact"
                className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden border border-border p-[var(--spacing-6)] transition-colors duration-[var(--duration-fast)] hover:border-border-strong"
              >
                <div className="absolute inset-0 -z-10 opacity-25 transition-opacity duration-[var(--duration-base)] group-hover:opacity-50 text-fg">
                  <Pattern seed={door.seed} className="h-full w-full" />
                </div>

                <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
                  {door.number}
                </p>

                <div className="space-y-[var(--spacing-3)]">
                  <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)]">
                    {door.title}
                  </p>
                  <p className="text-fg-secondary">{door.body}</p>
                  <p
                    aria-hidden
                    className="pt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]"
                  >
                    {t("openDoor")} ▸
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
