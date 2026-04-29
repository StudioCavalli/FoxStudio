import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine, SkeletonText } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/studio — manifesto + team grid + foxcase
 * link + principles. Same outline as the rendered page.
 */
export default function StudioLoading() {
  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      {/* MANIFESTO */}
      <section className="border-b border-border pb-[var(--spacing-10)]">
        <Container>
          <SkeletonLine width="22ch" height="13px" />

          <div className="mt-[var(--spacing-6)] mb-[var(--spacing-7)]">
            <SkeletonLine width="65%" height="clamp(48px, 8vw, 144px)" />
          </div>

          <div className="grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
            <div className="space-y-[var(--spacing-5)]">
              <SkeletonText lines={3} gap="var(--spacing-3)" />
              <SkeletonText lines={3} gap="var(--spacing-3)" />
              <SkeletonText lines={2} gap="var(--spacing-3)" />
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className="border-b border-border py-[var(--spacing-10)]">
        <Container>
          <SkeletonLine width="14ch" height="13px" />
          <ul className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li
                key={`studio-team-${i}`}
                className="flex flex-col gap-[var(--spacing-3)] border-t border-border pt-[var(--spacing-5)]"
              >
                <SkeletonBlock aspect="4 / 5" />
                <SkeletonLine width="70%" height="24px" />
                <SkeletonLine width="40%" height="13px" />
                <SkeletonText lines={3} gap="var(--spacing-2)" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FOXCASE LINK */}
      <section className="border-b border-border py-[var(--spacing-10)]">
        <Container>
          <SkeletonLine width="14ch" height="13px" />
          <div className="mt-[var(--spacing-7)] grid gap-[var(--spacing-7)] md:grid-cols-[2fr_1fr]">
            <SkeletonText lines={2} gap="var(--spacing-3)" />
            <div />
          </div>
        </Container>
      </section>
    </article>
  );
}
