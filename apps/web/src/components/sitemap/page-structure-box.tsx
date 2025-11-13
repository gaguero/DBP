import type { ReactNode } from "react";
import clsx from "clsx";

interface PageStructureBoxProps {
  children: ReactNode;
  className?: string;
}

export function PageStructureBox({ children, className }: PageStructureBoxProps) {
  return (
    <div
      className={clsx(
        "bg-[#E8F5E9] border-l-[5px] border-[#10B981] p-5 my-5 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

