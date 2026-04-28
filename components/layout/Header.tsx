import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { LOCALES, NAV, SITE } from "@/lib/site";

export function Header() {
  return (
    <header
      className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm"
      aria-label="Site header"
    >
      <Container>
        <div className="flex h-[64px] items-center justify-between">
          <Link
            href="/"
            className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]"
            aria-label={`${SITE.name} home`}
          >
            {SITE.name}
          </Link>

          <nav className="hidden gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-fg)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
            {LOCALES.map((locale, i) => (
              <span key={locale} className="flex items-center gap-3">
                <button
                  type="button"
                  className={`transition-colors duration-[var(--duration-fast)] ${
                    locale === "en"
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)]"
                  }`}
                  aria-label={`Switch to ${locale.toUpperCase()}`}
                  aria-current={locale === "en" ? "true" : undefined}
                >
                  {locale.toUpperCase()}
                </button>
                {i < LOCALES.length - 1 && (
                  <span aria-hidden className="text-[var(--color-fg-tertiary)]">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}
