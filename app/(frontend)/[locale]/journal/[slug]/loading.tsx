import { Container } from "@/components/ui/Container";
import { SkeletonLine, SkeletonText } from "@/components/ui/Skeleton";

/**
 * Skeleton for /[locale]/journal/[slug] — date strip + title + lead +
 * long-form body paragraphs.
 */
export default function ArticleLoading() {
  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-10)]">
      <Container>
        <div className="flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)]">
          <SkeletonLine width="22ch" height="13px" />
          <SkeletonLine width="14ch" height="13px" />
        </div>

        <div className="mt-[var(--spacing-5)]">
          <SkeletonLine width="80%" height="clamp(48px, 8vw, 144px)" />
        </div>

        <div className="mt-[var(--spacing-7)] max-w-[60ch]">
          <SkeletonText lines={2} gap="var(--spacing-3)" />
        </div>

        <hr className="my-[var(--spacing-9)] border-0 border-t border-border" />

        <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
          <div />
          <div className="space-y-[var(--spacing-5)]">
            <SkeletonText lines={5} gap="var(--spacing-4)" maxWidth="65ch" />
            <SkeletonText lines={4} gap="var(--spacing-4)" maxWidth="65ch" />
            <SkeletonText lines={6} gap="var(--spacing-4)" maxWidth="65ch" />
          </div>
        </div>
      </Container>
    </article>
  );
}
