import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";

type LegalLayoutProps = {
  number: string;
  label: string;
  title: string;
  intro?: string;
  meta?: string;
  children: ReactNode;
};

/**
 * Shared layout for legal-style pages (Mentions, Privacy, Footprint).
 * Same hero rhythm as the rest of the site, with a more readable body
 * column for long-form content.
 */
export function LegalLayout({ number, label, title, intro, meta, children }: LegalLayoutProps) {
  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <SectionHeader number={number} label={label} meta={meta} />

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-7)] font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(48px,8vw,144px)]">
          {title}
        </h1>

        {intro && (
          <p className="mb-[var(--spacing-9)] max-w-[60ch] font-[var(--font-display)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[clamp(20px,2vw,28px)] text-fg-secondary">
            {intro}
          </p>
        )}

        <div className="space-y-[var(--spacing-9)]">{children}</div>
      </Container>
    </article>
  );
}

type LegalSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <section>
      <header className="mb-[var(--spacing-5)] flex items-baseline gap-[var(--spacing-3)] border-t border-fg pt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
        <span className="tabular text-fg">{number}</span>
        <span aria-hidden className="text-fg-tertiary">
          ▸
        </span>
        <span className="text-fg">{title}</span>
      </header>
      <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
        <div />
        <div className="max-w-[65ch] space-y-[var(--spacing-4)] text-[var(--text-body-l)] leading-[var(--leading-relaxed)] text-fg">
          {children}
        </div>
      </div>
    </section>
  );
}

type LegalRowProps = {
  label: string;
  value: ReactNode;
};

/** Mono-labelled row (key/value pair) for definition-style content. */
export function LegalRow({ label, value }: LegalRowProps) {
  return (
    <div className="grid grid-cols-[12ch_1fr] gap-[var(--spacing-3)] border-b border-border pb-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
      <span className="text-fg-secondary">{label}</span>
      <span className="text-fg">{value}</span>
    </div>
  );
}
