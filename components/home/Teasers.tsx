import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";

const LAB_EXPERIMENTS = [
  { id: "exp_004", name: "WebGPU compute shader", status: "live" as const },
  { id: "exp_005", name: "Edge AI inference", status: "live" as const },
  { id: "exp_006", name: "Haptic UI surface", status: "wip" as const },
];

export function LabTeaser() {
  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label="Lab"
    >
      <Container>
        <div className="mb-[var(--spacing-8)] flex items-end justify-between">
          <MonoLabel number="02">Lab</MonoLabel>
          <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
            Live experiments
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
          <ArrowLink href="/lab">Enter the lab</ArrowLink>
        </div>
      </Container>
    </section>
  );
}

export function StudioTeaser() {
  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label="Studio"
    >
      <Container>
        <MonoLabel number="03">Studio</MonoLabel>

        <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
          <div className="space-y-[var(--spacing-5)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
            <p>
              We&apos;re a small group of engineers and designers who picked R&amp;D over the
              roadmap.
            </p>
            <p className="text-[var(--color-fg-secondary)]">
              FoxStudio is what FoxCase explores when no client is asking — and what we propose when
              one does.
            </p>
          </div>
          <div className="flex md:items-end md:justify-end">
            <ArrowLink href="/studio">More about the studio</ArrowLink>
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
  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label="Journal"
    >
      <Container>
        <div className="mb-[var(--spacing-8)] flex items-end justify-between">
          <MonoLabel number="04">Journal</MonoLabel>
          <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
            Latest notes
          </span>
        </div>

        <ul className="border-t border-[var(--color-border)]">
          {JOURNAL_PREVIEWS.map((entry) => (
            <li key={entry.title} className="border-b border-[var(--color-border)]">
              <a
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
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--spacing-7)] flex justify-end">
          <ArrowLink href="/journal">All notes</ArrowLink>
        </div>
      </Container>
    </section>
  );
}

const DOORS = [
  { number: "01", title: "Incubators", body: "You run a program, a fund, an accelerator." },
  { number: "02", title: "Companies", body: "You have a problem, we might have an angle." },
  { number: "03", title: "Talents", body: "You build things, you'd like to build with us." },
];

export function ContactTeaser() {
  return (
    <section
      className="border-t border-[var(--color-border)] py-[var(--spacing-10)]"
      aria-label="Talk to us"
    >
      <Container>
        <MonoLabel number="05">Talk to us</MonoLabel>

        <h2 className="mt-[var(--spacing-6)] mb-[var(--spacing-8)] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-l)]">
          Pick your door.
        </h2>

        <ul className="grid gap-[var(--spacing-4)] md:grid-cols-3">
          {DOORS.map((door) => (
            <li key={door.number}>
              <a
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
                  Open ▸
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
