import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
};

export function Container({ children, className = "", bleed = false }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${
        bleed ? "" : "px-[var(--grid-margin)]"
      } max-w-[var(--grid-max)] ${className}`}
    >
      {children}
    </div>
  );
}
