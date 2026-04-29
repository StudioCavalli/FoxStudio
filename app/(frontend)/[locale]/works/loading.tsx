import { Container } from "@/components/ui/Container";
import { SkeletonBlock, SkeletonLine, SkeletonSectionHeader } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/works — mirrors the project index :
 * section header strip, big display heading, then a long
 * mono-typographic list of project rows (HoverIndex shape).
 */
export default function WorksLoading() {
  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-10)]">
      <Container>
        <SkeletonSectionHeader />

        <div className="mt-[var(--spacing-6)] mb-[var(--spacing-9)]">
          <SkeletonLine width="80%" height="clamp(72px, 10vw, 180px)" />
        </div>

        <ul className="space-y-[var(--spacing-5)] border-t border-border pt-[var(--spacing-5)]">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <li
              key={`work-row-${k}`}
              className="grid grid-cols-[6ch_1fr_minmax(20ch,_28ch)] items-center gap-[var(--spacing-5)] border-b border-border pb-[var(--spacing-5)]"
            >
              <SkeletonLine width="4ch" height="13px" />
              <SkeletonLine width="60%" height="clamp(28px, 3vw, 44px)" />
              <SkeletonLine width="100%" height="13px" />
            </li>
          ))}
        </ul>

        <div className="mt-[var(--spacing-9)]">
          <SkeletonBlock width="100%" height="120px" />
        </div>
      </Container>
    </section>
  );
}
