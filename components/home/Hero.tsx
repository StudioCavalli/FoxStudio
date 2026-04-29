import { useTranslations } from "next-intl";

import { Reveal } from "@/components/effects/Reveal";
import { Pattern } from "@/components/visual/Pattern";
import { SITE } from "@/lib/site";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-border"
      aria-label={t("manifestoLabel")}
    >
      {/* Subtle blueprint grid as base */}
      <div className="absolute inset-0 -z-20 blueprint opacity-40" aria-hidden="true" />

      {/* Big decorative pattern, anchored to the right side */}
      <div
        className="absolute -right-[10%] top-[40%] -z-10 hidden h-[80%] w-[60%] -translate-y-1/2 text-fg opacity-[0.06] md:block"
        aria-hidden="true"
      >
        <Pattern seed="foxstudio-hero" variant="halftone" className="h-full w-full" />
      </div>

      {/* Top metadata strip */}
      <div className="flex items-center justify-between border-b border-border px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
        <span>00 ▸ {t("manifestoLabel")}</span>
        <span className="hidden md:inline tabular">
          {SITE.contact.location} · {SITE.contact.timezone}
        </span>
        <span className="tabular">v{SITE.version}</span>
      </div>

      {/* Title — top, full bleed.
          Note: NOT wrapped in <Reveal> on purpose. This is the LCP element
          on the home page; pre-hydration <Reveal> renders it at opacity:0
          which pushes LCP past 3 s on mobile 4G. Visual entry is provided
          by the parent layout's natural paint. */}
      <div className="flex flex-1 flex-col justify-between px-[var(--grid-margin)] py-[var(--spacing-9)]">
        <h1 className="font-[var(--font-display)] font-medium leading-[0.88] tracking-[-0.03em] text-[clamp(72px,14vw,240px)]">
          FoxStudio<span className="text-fg-tertiary">.</span>
          <br />
          <span className="text-fg-secondary">R&amp;D Lab.</span>
        </h1>

        <div className="mt-[var(--spacing-9)] grid gap-[var(--spacing-6)] md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-[var(--spacing-2)] font-[var(--font-display)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[clamp(20px,2.4vw,40px)] md:max-w-[28ch]">
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
            <p className="max-w-[42ch] text-fg-secondary md:text-right md:justify-self-end">
              {t("manifestoCoda")}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex items-center justify-between border-t border-border px-[var(--grid-margin)] py-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary">
        <span aria-hidden>↓ {t("scrollHint")}</span>
        <span className="hidden md:inline">FoxStudio · subsidiary of FoxCase</span>
        <span className="tabular">
          <span className="text-fg">~ 0.18 g CO₂</span>
        </span>
      </div>
    </section>
  );
}
