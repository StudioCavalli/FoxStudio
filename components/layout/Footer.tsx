import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { NAV, SITE } from "@/lib/site";

const FOOTER_GROUPS: ReadonlyArray<{
  title: string;
  items: ReadonlyArray<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "Navigate",
    items: NAV.map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "Contact",
    items: [
      { label: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
      { label: SITE.contact.location, href: "/studio" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Mentions", href: "/legal/mentions" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Footprint", href: "/footprint" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="mt-[var(--spacing-12)] border-t border-[var(--color-border)] py-[var(--spacing-9)]"
      aria-label="Site footer"
    >
      <Container>
        <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
              {SITE.name}
            </p>
            <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
              Subsidiary of{" "}
              <a
                href={SITE.parent.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[var(--color-fg)] underline underline-offset-[6px]"
              >
                {SITE.parent.name}
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[var(--spacing-5)]">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-[var(--spacing-4)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                  {group.title}
                </p>
                <ul className="space-y-[var(--spacing-2)]">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      {item.href.startsWith("mailto:") || item.external ? (
                        <a
                          href={item.href}
                          className="text-[var(--text-body)] text-[var(--color-fg)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-fg-secondary)]"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href as never}
                          className="text-[var(--text-body)] text-[var(--color-fg)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-fg-secondary)]"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-[var(--spacing-7)] border-0 border-t border-[var(--color-border)]" />

        <div className="flex flex-col gap-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)] md:flex-row md:items-center md:justify-between">
          <span>
            {SITE.contact.location} · {SITE.contact.timezone}
          </span>
          <span aria-label="Carbon footprint placeholder">
            <span className="text-[var(--color-fg)]">~ 0.18 g CO₂</span> · this view
          </span>
          <span>v{SITE.version}</span>
        </div>
      </Container>
    </footer>
  );
}
