import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine, SkeletonText } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/team — alternating photo / bio rows.
 */
export default function TeamLoading() {
  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
          <SkeletonLine width="22ch" height="13px" />
          <SkeletonLine width="14ch" height="13px" />
        </div>

        <div className="mt-[var(--spacing-6)] mb-[var(--spacing-7)]">
          <SkeletonLine width="60%" height="clamp(48px, 8vw, 144px)" />
        </div>

        <div className="mb-[var(--spacing-9)] max-w-[60ch]">
          <SkeletonText lines={2} gap="var(--spacing-3)" />
        </div>
      </Container>

      {[0, 1].map((idx) => (
        <Container key={`team-row-${idx}`}>
          <div
            className={`grid gap-[var(--spacing-7)] border-b border-border py-[var(--spacing-9)] md:gap-[var(--spacing-9)] md:py-[var(--spacing-11)] ${
              idx % 2 === 1 ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-[1fr_2fr]"
            }`}
          >
            <SkeletonBlock aspect="1 / 1" className={idx % 2 === 1 ? "md:order-2" : "md:order-1"} />
            <div
              className={`flex flex-col justify-center gap-[var(--spacing-5)] ${
                idx % 2 === 1 ? "md:order-1" : "md:order-2"
              }`}
            >
              <SkeletonLine width="14ch" height="13px" />
              <SkeletonLine width="60%" height="clamp(36px, 6vw, 72px)" />
              <SkeletonLine width="40%" height="13px" />
              <SkeletonText lines={4} gap="var(--spacing-3)" />
            </div>
          </div>
        </Container>
      ))}
    </article>
  );
}
