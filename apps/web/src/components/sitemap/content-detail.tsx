import type { ReactNode } from "react";
import clsx from "clsx";

interface ContentDetailProps {
  children: ReactNode;
  className?: string;
}

export function ContentDetail({ children, className }: ContentDetailProps) {
  return (
    <div
      className={clsx(
        "bg-[#FAFBFC] p-5 my-5 rounded-md border border-[#E5E7EB]",
        className
      )}
    >
      {children}
    </div>
  );
}

