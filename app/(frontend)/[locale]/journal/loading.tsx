import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine, SkeletonSectionHeader } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/journal — list of articles with date / tag /
 * title / lead, mirroring the index card layout.
 */
export default function JournalLoading() {
  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-10)]">
      <Container>
        <SkeletonSectionHeader />

        <div className="mt-[var(--spacing-6)] mb-[var(--spacing-7)]">
          <SkeletonLine width="55%" height="clamp(48px, 8vw, 144px)" />
        </div>

        <ul className="border-t border-border">
          {["a", "b", "c", "d", "e"].map((k) => (
            <li
              key={`journal-${k}`}
              className="grid grid-cols-1 gap-[var(--spacing-3)] border-b border-border py-[var(--spacing-7)] md:grid-cols-[16ch_1fr]"
            >
              <SkeletonLine width="20ch" height="13px" />
              <div className="space-y-[var(--spacing-3)]">
                <SkeletonLine width="80%" height="clamp(28px, 3.5vw, 44px)" />
                <SkeletonLine width="95%" height="18px" />
                <SkeletonLine width="65%" height="18px" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
