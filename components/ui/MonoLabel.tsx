import type { ReactNode } from "react";

export function MonoLabel({
  number,
  children,
  className = "",
}: {
  number?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-fg-secondary ${className}`}
    >
      {number && (
        <span aria-hidden className="text-fg">
          {number}
        </span>
      )}
      {number && <span aria-hidden>▸</span>}
      <span>{children}</span>
    </div>
  );
}
