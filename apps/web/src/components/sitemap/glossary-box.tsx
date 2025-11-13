import type { ReactNode } from "react";
import clsx from "clsx";

interface GlossaryBoxProps {
  children: ReactNode;
  className?: string;
}

export function GlossaryBox({ children, className }: GlossaryBoxProps) {
  return (
    <div
      className={clsx(
        "bg-[#FFF9E6] border-l-[5px] border-[#F59E0B] p-5 my-8 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

interface GlossaryTermProps {
  term: string;
  definition: string;
}

export function GlossaryTerm({ term, definition }: GlossaryTermProps) {
  return (
    <div className="mb-4 p-3 bg-white rounded-md border border-[#FDE68A]">
      <strong className="text-[#B45309] block mb-1">{term}:</strong>
      <span>{definition}</span>
    </div>
  );
}

