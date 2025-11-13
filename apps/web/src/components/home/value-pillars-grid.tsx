import { ValuePillarCard } from "./value-pillar-card";
import type { ReactNode } from "react";

interface Pillar {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface ValuePillarsGridProps {
  pillars: Pillar[];
}

export function ValuePillarsGrid({ pillars }: ValuePillarsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {pillars.map((pillar, index) => (
        <ValuePillarCard key={index} {...pillar} />
      ))}
    </div>
  );
}





