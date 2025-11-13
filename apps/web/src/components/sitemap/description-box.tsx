import type { ReactNode } from "react";
import clsx from "clsx";

interface DescriptionBoxProps {
  children: ReactNode;
  className?: string;
}

export function DescriptionBox({ children, className }: DescriptionBoxProps) {
  return (
    <div
      className={clsx(
        "bg-[#F5F7FA] border-l-[5px] border-[var(--color-ocean)] p-5 my-5 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

