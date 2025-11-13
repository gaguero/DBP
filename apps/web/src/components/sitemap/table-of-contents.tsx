"use client";

import { useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] p-8 rounded-lg my-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl text-[var(--color-navy)] mt-0 mb-0">
          Table of Contents
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--color-ocean)]"
          aria-expanded={isOpen}
          aria-label="Toggle table of contents"
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>
      <nav className={isOpen ? "block" : "hidden md:block"}>
        <ul className="list-none ml-0">
          {items.map((item, index) => (
            <li key={item.id} className="mb-2.5 pl-5">
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-[#3D7A94] text-left hover:underline transition-colors"
              >
                {index + 1}. {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

