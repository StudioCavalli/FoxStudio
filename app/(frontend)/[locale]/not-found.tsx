import { useTranslations } from "next-intl";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";

export default function LocalizedNotFound() {
  const t = useTranslations("NotFound");

  return (
    <article className="flex min-h-[calc(100vh-64px)] flex-col items-stretch justify-between pt-[var(--spacing-9)] pb-[var(--spacing-9)]">
      <Container>
        <SectionHeader number="404" label={t("label")} meta="page introuvable" />

        <h1 className="mt-[var(--spacing-7)] mb-[var(--spacing-7)] font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(48px,8vw,160px)]">
          {t("title")}
        </h1>

        <p className="max-w-[60ch] font-[var(--font-display)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[clamp(20px,2vw,28px)] text-fg-secondary">
          {t("body")}
        </p>
      </Container>

      <Container>
        <div className="mt-[var(--spacing-9)] flex flex-wrap items-baseline justify-between gap-[var(--spacing-5)] border-t border-border pt-[var(--spacing-5)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
          <span className="text-fg-secondary">{t("hint")}</span>
          <ArrowLink href="/">{t("backHome")}</ArrowLink>
        </div>
      </Container>
    </article>
  );
}
