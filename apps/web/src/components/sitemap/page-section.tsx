import type { ReactNode } from "react";
import clsx from "clsx";

interface PageSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  pageBreak?: boolean;
}

export function PageSection({
  id,
  title,
  children,
  className,
  pageBreak = false,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "mb-12 p-8 bg-white border border-[#E5E7EB] rounded-lg",
        pageBreak && "sitemap-page-break",
        className
      )}
    >
      <h1 className="text-4xl text-[#1D3557] font-display font-bold mt-12 mb-5 pb-4 border-b-4 border-[#5A9FBD]">
        {title}
      </h1>
      {children}
    </section>
  );
}

