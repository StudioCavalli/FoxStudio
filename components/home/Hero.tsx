import { useTranslations } from "next-intl";

import { Reveal } from "@/components/effects/Reveal";
import { SITE } from "@/lib/site";

import { SignatureScene } from "./SignatureScene";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-[var(--color-border)]"
      aria-label={t("manifestoLabel")}
    >
      {/* 3D scene as background — dominates the viewport */}
      <div className="absolute inset-0 -z-10">
        <SignatureScene />
      </div>

      {/* Top metadata strip */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
        <span>00 ▸ {t("manifestoLabel")}</span>
        <span className="hidden md:inline">
          {SITE.contact.location} · {SITE.contact.timezone}
        </span>
        <span>v{SITE.version}</span>
      </div>

      {/* Title — top left, full bleed */}
      <div className="flex flex-1 flex-col justify-between px-[var(--grid-margin)] py-[var(--spacing-9)]">
        <Reveal>
          <h1 className="font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[0.92] tracking-[var(--tracking-display)] md:text-[clamp(64px,11vw,200px)]">
            FoxStudio
            <br />
            <span className="text-[var(--color-fg-secondary)]">R&amp;D Lab.</span>
          </h1>
        </Reveal>

        <div className="mt-[var(--spacing-9)] grid gap-[var(--spacing-6)] md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-[var(--spacing-2)] font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:max-w-[28ch]">
            <Reveal>
              <p>{t("manifestoLine1")}</p>
            </Reveal>
            <Reveal delay={100}>
              <p>{t("manifestoLine2")}</p>
            </Reveal>
            <Reveal delay={200}>
              <p>{t("manifestoLine3")}</p>
            </Reveal>
          </div>

          <Reveal delay={350}>
            <p className="max-w-[42ch] text-[var(--color-fg-secondary)] md:text-right md:justify-self-end">
              {t("manifestoCoda")}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
        <span aria-hidden>↓ {t("scrollHint")}</span>
        <span>
          <span className="text-[var(--color-fg)]">~ 0.18 g CO₂</span>
        </span>
      </div>
    </section>
  );
}
