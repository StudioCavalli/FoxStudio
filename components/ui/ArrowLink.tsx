import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

const SHARED_CLASS =
  "inline-flex items-center gap-2 font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] underline-offset-[6px] transition-colors duration-[var(--duration-fast)] hover:underline";

export function ArrowLink({ href, children, external = false, className = "" }: ArrowLinkProps) {
  const arrow = external ? "↗" : "▸";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={`${SHARED_CLASS} ${className}`}
      >
        <span>{children}</span>
        <span aria-hidden>{arrow}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={`${SHARED_CLASS} ${className}`}>
      <span>{children}</span>
      <span aria-hidden>{arrow}</span>
    </Link>
  );
}
