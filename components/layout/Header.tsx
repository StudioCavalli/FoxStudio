"use client";

import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { FoxLogo } from "@/components/visual/FoxLogo";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

const NAV_ITEMS = [
  { key: "works", href: "/works" },
  { key: "lab", href: "/lab" },
  { key: "studio", href: "/studio" },
  { key: "team", href: "/team" },
  { key: "journal", href: "/journal" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-[var(--z-sticky)] border-b border-border bg-bg/80 backdrop-blur-sm"
      aria-label="Site header"
    >
      <Container>
        <div className="flex h-[64px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] transition-colors duration-[var(--duration-fast)] hover:text-fg-secondary"
            aria-label={`${SITE.name} home`}
          >
            <FoxLogo className="h-[20px] w-[20px] shrink-0" />
            <span>{SITE.name}</span>
          </Link>

          <nav className="hidden gap-7 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/"}
                className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary transition-colors duration-[var(--duration-fast)] hover:text-fg"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
            {routing.locales.map((l, i) => (
              <span key={l} className="flex items-center gap-3">
                <Link
                  href={pathname as "/"}
                  locale={l}
                  className={`transition-colors duration-[var(--duration-fast)] ${
                    l === locale ? "text-fg" : "text-fg-secondary hover:text-fg"
                  }`}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                  aria-current={l === locale ? "true" : undefined}
                >
                  {l.toUpperCase()}
                </Link>
                {i < routing.locales.length - 1 && (
                  <span aria-hidden className="text-fg-tertiary">
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
