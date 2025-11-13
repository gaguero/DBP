import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNavigation({ items, className }: BreadcrumbNavigationProps) {
  return (
    <nav aria-label="Breadcrumb" className={clsx("py-4", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[var(--color-text-muted)]">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-[var(--color-ocean)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? "text-[var(--color-navy)] font-semibold" : ""}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

