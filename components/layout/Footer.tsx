import { useTranslations } from "next-intl";
import { Children } from "react";

import { FootprintLive } from "@/components/layout/FootprintLive";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="border-t border-border py-[var(--spacing-9)]" aria-label="Site footer">
      <Container>
        <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
              {SITE.name}
            </p>
            <p className="mt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
              {t("subsidiary")}{" "}
              <a
                href={SITE.parent.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-fg underline underline-offset-[6px]"
              >
                {SITE.parent.name}
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[var(--spacing-5)]">
            <FooterGroup title={t("navigate")}>
              <Link href="/works">{tNav("works")}</Link>
              <Link href="/lab">{tNav("lab")}</Link>
              <Link href="/studio">{tNav("studio")}</Link>
              <Link href="/team">{tNav("team")}</Link>
              <Link href="/journal">{tNav("journal")}</Link>
            </FooterGroup>

            <FooterGroup title={t("contact")}>
              <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
              <Link href="/studio">{SITE.contact.location}</Link>
              <Link href="/ombrys">{t("ombrys")}</Link>
            </FooterGroup>

            <FooterGroup title={t("legal")}>
              <Link href="/legal/mentions">{t("mentions")}</Link>
              <Link href="/legal/privacy">{t("privacy")}</Link>
              <Link href="/footprint">{t("footprint")}</Link>
            </FooterGroup>
          </div>
        </div>

        <hr className="my-[var(--spacing-7)] border-0 border-t border-border" />

        <div className="flex flex-col gap-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary md:flex-row md:items-center md:justify-between">
          <span>
            {SITE.contact.location} · {SITE.contact.timezone}
          </span>
          <FootprintLive />
          <span>v{SITE.version}</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-[var(--spacing-4)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
        {title}
      </p>
      <ul className="space-y-[var(--spacing-2)] [&_a]:text-[var(--text-body)] [&_a]:text-fg [&_a]:transition-colors [&_a]:duration-[var(--duration-fast)] hover:[&_a]:text-fg-secondary">
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  );
}
