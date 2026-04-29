import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine, SkeletonText } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/works/[slug] — mirrors the project page :
 * full-bleed hero with metadata strip + huge title + summary, then
 * three "acts" (context, approach, results).
 */
export default function ProjectLoading() {
  return (
    <article>
      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-border">
        <div className="flex items-center justify-between border-b border-border px-[var(--grid-margin)] py-[var(--spacing-3)]">
          <SkeletonLine width="14ch" height="13px" />
          <SkeletonLine width="32ch" height="13px" className="hidden md:block" />
          <SkeletonLine width="10ch" height="13px" />
        </div>

        <div className="flex flex-1 flex-col justify-end px-[var(--grid-margin)] py-[var(--spacing-9)]">
          <SkeletonLine width="70%" height="clamp(56px, 11vw, 220px)" />
          <div className="mt-[var(--spacing-7)] max-w-[60ch]">
            <SkeletonText lines={2} gap="var(--spacing-3)" />
          </div>
        </div>
      </section>

      {/* ACT 1 — CONTEXT */}
      <section className="py-[var(--spacing-10)]">
        <Container>
          <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
            <SkeletonLine width="22ch" height="13px" />
            <SkeletonLine width="16ch" height="13px" />
          </div>
          <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
            <aside className="space-y-[var(--spacing-3)]">
              <SkeletonLine height="13px" />
              <SkeletonLine height="13px" />
              <SkeletonLine width="80%" height="13px" />
              <SkeletonLine width="60%" height="13px" />
            </aside>
            <SkeletonText lines={6} maxWidth="65ch" gap="var(--spacing-5)" />
          </div>
        </Container>
      </section>

      {/* ACT 2 — APPROACH */}
      <section className="tone-flip border-t border-border py-[var(--spacing-10)]">
        <Container>
          <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
            <SkeletonLine width="22ch" height="13px" />
          </div>
          <div className="mt-[var(--spacing-7)]">
            <SkeletonBlock aspect="16 / 9" />
          </div>
          <div className="mt-[var(--spacing-7)] max-w-[65ch]">
            <SkeletonText lines={5} gap="var(--spacing-4)" />
          </div>
        </Container>
      </section>

      {/* ACT 3 — RESULTS */}
      <section className="border-t border-border py-[var(--spacing-10)]">
        <Container>
          <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
            <SkeletonLine width="22ch" height="13px" />
          </div>
          <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-5)] md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <SkeletonBlock key={`result-${i}`} aspect="5 / 4" />
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
