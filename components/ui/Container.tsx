import type { ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
};

export function Container({ as, children, className = "", bleed = false }: ContainerProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={`mx-auto w-full ${
        bleed ? "" : "px-[var(--grid-margin)]"
      } max-w-[var(--grid-max)] ${className}`}
    >
      {children}
    </Tag>
  );
}
