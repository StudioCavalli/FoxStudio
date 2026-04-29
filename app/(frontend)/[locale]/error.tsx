"use client";

import { useEffect } from "react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocalizedError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Surface error to telemetry (Sentry, console, etc.).
    // For now we just log — Sentry wired in J6.
    console.error("[runtime error]", error);
  }, [error]);

  return (
    <article className="flex min-h-[calc(100vh-64px)] flex-col items-stretch justify-between pt-[var(--spacing-9)] pb-[var(--spacing-9)]">
      <Container>
        <SectionHeader number="500" label="Erreur" meta={error.digest ?? "runtime"} />

        <h1 className="mt-[var(--spacing-7)] mb-[var(--spacing-7)] font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(48px,8vw,160px)]">
          On a cassé
          <br />
          quelque chose.
        </h1>

        <p className="max-w-[60ch] font-[var(--font-display)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[clamp(20px,2vw,28px)] text-[var(--color-fg-secondary)]">
          On répare. Si le problème persiste, écris-nous — l'erreur a été enregistrée côté serveur
          et on la verra.
        </p>
      </Container>

      <Container>
        <div className="mt-[var(--spacing-9)] flex flex-wrap items-baseline justify-between gap-[var(--spacing-5)] border-t border-[var(--color-border)] pt-[var(--spacing-5)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
          <button
            type="button"
            onClick={reset}
            className="border border-[var(--color-fg)] px-[var(--spacing-5)] py-[var(--spacing-3)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors duration-[var(--duration-fast)]"
          >
            Réessayer ▸
          </button>
          <ArrowLink href="/">Retour à l'accueil</ArrowLink>
        </div>
      </Container>
    </article>
  );
}
