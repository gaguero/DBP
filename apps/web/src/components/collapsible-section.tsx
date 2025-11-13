"use client";

import { useState } from "react";

interface CollapsibleSectionProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[var(--color-ocean)] hover:text-[var(--color-navy)] transition-colors mt-4 text-sm font-semibold uppercase tracking-wider"
      >
        <span>{isOpen ? "Hide" : "Show"} Details</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}


