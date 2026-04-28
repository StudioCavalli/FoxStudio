import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";

export function Hero() {
  return (
    <section
      className="relative pt-[var(--spacing-9)] pb-[var(--spacing-10)] md:pt-[var(--spacing-10)] md:pb-[var(--spacing-12)]"
      aria-label="Manifesto"
    >
      <Container>
        <MonoLabel number="00">Manifesto</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
          FoxStudio
          <br />
          is the R&amp;D lab
          <br />
          of FoxCase.
        </h1>

        {/* J2 task #26 — 3D R3F signature scene placeholder */}
        <div
          aria-hidden
          className="my-[var(--spacing-8)] flex aspect-[16/9] w-full items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-secondary)] md:my-[var(--spacing-9)]"
        >
          <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-tertiary)]">
            [ signature scene · R3F · pending ]
          </span>
        </div>

        <div className="max-w-[40ch] space-y-[var(--spacing-3)] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
          <p>We build what we wish existed.</p>
          <p>We break what we don&apos;t understand.</p>
          <p>We publish what holds up.</p>
        </div>

        <p className="mt-[var(--spacing-7)] max-w-[60ch] text-[var(--color-fg-secondary)]">
          No commercial roadmap. No jargon. Prototypes that actually run, technical notes, use cases
          that survive production.
        </p>
      </Container>
    </section>
  );
}
