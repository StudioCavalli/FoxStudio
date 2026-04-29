import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine, SkeletonSectionHeader } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/lab — title + dense list of experiments.
 */
export default function LabLoading() {
  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-10)]">
      <Container>
        <SkeletonSectionHeader />

        <div className="mt-[var(--spacing-6)] mb-[var(--spacing-7)]">
          <SkeletonLine width="60%" height="clamp(48px, 8vw, 144px)" />
        </div>

        <div className="mb-[var(--spacing-9)] max-w-[60ch]">
          <SkeletonLine width="100%" height="24px" />
          <div className="mt-[var(--spacing-3)]">
            <SkeletonLine width="85%" height="24px" />
          </div>
        </div>

        <ul className="border-t border-border">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <li
              key={`lab-${k}`}
              className="grid grid-cols-[6ch_minmax(20ch,_2fr)_3fr] items-baseline gap-[var(--spacing-5)] border-b border-border py-[var(--spacing-5)]"
            >
              <SkeletonLine width="4ch" height="13px" />
              <SkeletonLine width="80%" height="clamp(20px, 2vw, 28px)" />
              <SkeletonBlock height="48px" />
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
