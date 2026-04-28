import { Reveal } from "@/components/effects/Reveal";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SignatureScene } from "./SignatureScene";

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

        <div
          aria-hidden
          className="my-[var(--spacing-8)] aspect-[16/9] w-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] md:my-[var(--spacing-9)]"
        >
          <SignatureScene />
        </div>

        <div className="max-w-[40ch] space-y-[var(--spacing-3)] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
          <Reveal>
            <p>We build what we wish existed.</p>
          </Reveal>
          <Reveal delay={100}>
            <p>We break what we don&apos;t understand.</p>
          </Reveal>
          <Reveal delay={200}>
            <p>We publish what holds up.</p>
          </Reveal>
        </div>

        <Reveal delay={350}>
          <p className="mt-[var(--spacing-7)] max-w-[60ch] text-[var(--color-fg-secondary)]">
            No commercial roadmap. No jargon. Prototypes that actually run, technical notes, use
            cases that survive production.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
