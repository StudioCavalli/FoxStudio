"use client";

import { useState } from "react";

import { Pattern } from "@/components/visual/Pattern";
import { Link } from "@/i18n/navigation";

type Item = {
  id: string;
  number: string;
  slug: string;
  name: string;
  meta?: string;
};

type HoverIndexProps = {
  items: Item[];
  /** Path prefix (e.g. "/works"). Item slug is appended. */
  basePath: string;
};

/**
 * Project list with image preview swap on hover (Lando Norris style).
 * Left column: dense list of links with mono metadata.
 * Right column: large pattern visual that swaps to match the hovered row.
 *
 * On mobile (no hover), the pattern is shown above the list, picking the
 * first item by default.
 */
export function HoverIndex({ items, basePath }: HoverIndexProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_1fr] md:gap-[var(--spacing-9)]">
      {/* Pattern preview — sticks to the top on desktop while scrolling */}
      <div className="order-1 md:order-2 md:sticky md:top-[80px] md:self-start">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-bg-secondary text-fg md:aspect-square">
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute inset-0 transition-opacity duration-[var(--duration-base)]"
              style={{ opacity: item.id === active?.id ? 1 : 0 }}
              aria-hidden={item.id !== active?.id}
            >
              <Pattern seed={item.slug} className="h-full w-full" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-end justify-between p-[var(--spacing-5)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] mix-blend-difference">
            <span>{active?.number}</span>
            <span>{active?.meta}</span>
          </div>
        </div>
      </div>

      {/* List */}
      <ul className="order-2 md:order-1">
        {items.map((item) => {
          const isActive = item.id === active?.id;
          return (
            <li key={item.id} className="border-t border-border last:border-b">
              <Link
                href={`${basePath}/${item.slug}`}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                className={`grid grid-cols-[auto_1fr] items-baseline gap-[var(--spacing-5)] py-[var(--spacing-5)] transition-colors duration-[var(--duration-fast)] md:py-[var(--spacing-6)] ${
                  isActive ? "text-fg" : "text-fg-secondary"
                }`}
              >
                <span className="font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
                  {item.number}
                </span>
                <span>
                  <span className="block font-[var(--font-display)] text-[var(--text-display-m)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)]">
                    {item.name}
                  </span>
                  {item.meta && (
                    <span className="mt-[var(--spacing-2)] block font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
                      {item.meta}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
