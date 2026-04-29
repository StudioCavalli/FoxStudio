import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale] (the home page).
 *
 * Mirrors Hero (manifesto strip + huge title + tagline + bottom strip),
 * StatsBand (4 large stats), Index (4 latest project rows), Teasers
 * (3 cards). Designed to take up the same vertical real estate so the
 * paint doesn't shift when the real page hydrates.
 */
export default function HomeLoading() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col overflow-hidden border-b border-border">
        <div className="flex items-center justify-between border-b border-border px-[var(--grid-margin)] py-[var(--spacing-3)]">
          <SkeletonLine width="22ch" height="13px" />
          <SkeletonLine width="22ch" height="13px" className="hidden md:block" />
          <SkeletonLine width="6ch" height="13px" />
        </div>

        <div className="flex flex-1 flex-col justify-between px-[var(--grid-margin)] py-[var(--spacing-9)]">
          <SkeletonLine width="80%" height="clamp(72px, 14vw, 240px)" />

          <div className="mt-[var(--spacing-9)] grid gap-[var(--spacing-6)] md:grid-cols-[1fr_1fr] md:items-end">
            <div className="space-y-[var(--spacing-3)] max-w-[28ch]">
              <SkeletonLine width="100%" height="clamp(20px, 2.4vw, 40px)" />
              <SkeletonLine width="90%" height="clamp(20px, 2.4vw, 40px)" />
              <SkeletonLine width="70%" height="clamp(20px, 2.4vw, 40px)" />
            </div>
            <div className="max-w-[42ch] md:justify-self-end">
              <SkeletonLine width="100%" height="20px" />
              <div className="mt-[var(--spacing-3)]">
                <SkeletonLine width="80%" height="20px" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border px-[var(--grid-margin)] py-[var(--spacing-3)]">
          <SkeletonLine width="14ch" height="13px" />
          <SkeletonLine width="32ch" height="13px" className="hidden md:block" />
          <SkeletonLine width="14ch" height="13px" />
        </div>
      </section>

      {/* STATS BAND */}
      <section className="tone-flip border-t border-b border-border">
        <Container>
          <div className="py-[var(--spacing-9)]">
            <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
              <SkeletonLine width="22ch" height="13px" />
              <SkeletonLine width="14ch" height="13px" />
            </div>
            <ul className="mt-[var(--spacing-7)] grid grid-cols-2 gap-y-[var(--spacing-7)] md:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <li
                  key={`stat-${i}`}
                  className="flex flex-col gap-[var(--spacing-3)] md:border-l md:border-border md:pl-[var(--spacing-5)] md:first:border-l-0 md:first:pl-0"
                >
                  <SkeletonLine width="60%" height="clamp(64px, 8vw, 112px)" />
                  <SkeletonLine width="80%" height="13px" />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* INDEX (latest projects) */}
      <section className="border-t border-border py-[var(--spacing-10)]">
        <Container>
          <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
            <SkeletonLine width="22ch" height="13px" />
            <SkeletonLine width="20ch" height="13px" />
          </div>
          <ul className="mt-[var(--spacing-7)] space-y-[var(--spacing-5)] border-t border-border pt-[var(--spacing-5)]">
            {["a", "b", "c", "d"].map((k) => (
              <li
                key={`idx-${k}`}
                className="grid grid-cols-[6ch_1fr_minmax(20ch,_28ch)] items-center gap-[var(--spacing-5)] border-b border-border pb-[var(--spacing-5)]"
              >
                <SkeletonLine width="4ch" height="13px" />
                <SkeletonLine width="60%" height="clamp(28px, 3vw, 44px)" />
                <SkeletonLine width="100%" height="13px" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* TEASERS */}
      <section className="border-t border-border py-[var(--spacing-10)]">
        <Container>
          <div className="grid gap-[var(--spacing-5)] md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <SkeletonBlock key={`teaser-${i}`} aspect="3 / 4" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
