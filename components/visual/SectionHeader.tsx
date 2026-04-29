import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Sequential code: "01", "02"... */
  number: string;
  /** Main label (e.g. "INDEX", "WORKS") */
  label: ReactNode;
  /** Optional right-side metadata (count, year, GMT). */
  meta?: ReactNode;
  /** Optional subtitle below the rule. */
  subtitle?: ReactNode;
  className?: string;
};

/**
 * Rich section header — number, label, optional meta, full-width rule.
 * Mirrors Terminal Industries' visual language for section breaks.
 */
export function SectionHeader({
  number,
  label,
  meta,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`mb-[var(--spacing-7)] ${className}`}>
      <div className="flex items-baseline justify-between gap-[var(--spacing-5)] border-t border-[var(--color-fg)] pt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
        <span className="flex items-baseline gap-[var(--spacing-3)]">
          <span className="text-[var(--color-fg)]">{number}</span>
          <span aria-hidden className="text-[var(--color-fg-tertiary)]">
            ▸
          </span>
          <span className="text-[var(--color-fg)]">{label}</span>
        </span>
        {meta && <span className="text-[var(--color-fg-secondary)]">{meta}</span>}
      </div>
      {subtitle && (
        <p className="mt-[var(--spacing-3)] max-w-[60ch] text-[var(--color-fg-secondary)]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
