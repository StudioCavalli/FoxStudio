import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: Route | URL;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

export function ArrowLink({ href, children, external = false, className = "" }: ArrowLinkProps) {
  const arrow = external ? "↗" : "▸";

  if (external) {
    return (
      <a
        href={href.toString()}
        target="_blank"
        rel="noreferrer noopener"
        className={`inline-flex items-center gap-2 font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] underline-offset-[6px] transition-colors duration-[var(--duration-fast)] hover:underline ${className}`}
      >
        <span>{children}</span>
        <span aria-hidden>{arrow}</span>
      </a>
    );
  }

  return (
    <Link
      href={href as Route}
      className={`inline-flex items-center gap-2 font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)] underline-offset-[6px] transition-colors duration-[var(--duration-fast)] hover:underline ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden>{arrow}</span>
    </Link>
  );
}
