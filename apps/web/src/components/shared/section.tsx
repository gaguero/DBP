import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: "sand" | "cloud" | "ocean" | "navy" | "none";
  className?: string;
}

export function Section({ children, background = "none", className, ...props }: SectionProps) {
  const backgroundClasses = {
    sand: "bg-[var(--color-sand)]",
    cloud: "bg-[var(--color-cloud)]",
    ocean: "bg-[var(--color-ocean)]",
    navy: "bg-[var(--color-navy)]",
    none: "",
  };

  return (
    <section
      {...props}
      className={clsx("section", backgroundClasses[background], className)}
    >
      {children}
    </section>
  );
}





