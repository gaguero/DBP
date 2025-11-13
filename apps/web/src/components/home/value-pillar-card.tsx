import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/card";

interface ValuePillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function ValuePillarCard({
  icon,
  title,
  description,
  href,
  className,
}: ValuePillarCardProps) {
  const content = (
    <Card className={clsx("text-center space-y-4 p-6 group", className)}>
      <div className="flex justify-center mb-4 [&_svg]:w-8 [&_svg]:h-8 [&_svg]:text-[var(--color-gold)] group-hover:[&_svg]:text-[var(--color-ocean)] transition-colors">
        {icon}
      </div>
      <div className="border-t-2 border-[var(--color-gold)] pt-4">
        <h3 className="font-display text-xl text-[var(--color-navy)] mb-2">{title}</h3>
        <p className="text-base text-[var(--color-text-primary)] leading-relaxed">{description}</p>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}





