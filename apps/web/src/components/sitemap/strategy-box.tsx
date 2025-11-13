import type { ReactNode } from "react";
import clsx from "clsx";

interface StrategyBoxProps {
  children: ReactNode;
  className?: string;
}

export function StrategyBox({ children, className }: StrategyBoxProps) {
  return (
    <div
      className={clsx(
        "bg-[rgba(168,218,220,0.15)] border-l-[5px] border-[#A8DADC] p-5 my-5 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

