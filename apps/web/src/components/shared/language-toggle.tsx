"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isSpanish = pathname.startsWith("/es");
  const currentPath = isSpanish ? pathname.replace("/es", "") : pathname;
  const targetPath = isSpanish ? currentPath : `/es${currentPath}`;

  const handleToggle = () => {
    router.push(targetPath || "/");
  };

  return (
    <button
      onClick={handleToggle}
      className={clsx(
        "px-4 py-2 text-sm font-semibold uppercase tracking-wider",
        "border-2 border-[var(--color-navy)] text-[var(--color-navy)]",
        "hover:bg-[var(--color-sand)] transition-colors",
        className
      )}
      aria-label={`Switch to ${isSpanish ? "English" : "Spanish"}`}
    >
      {isSpanish ? "EN" : "ES"}
    </button>
  );
}





