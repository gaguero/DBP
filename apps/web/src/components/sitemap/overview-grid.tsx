import type { ReactNode } from "react";

interface OverviewCard {
  icon?: string;
  title: string;
  description: string;
}

interface OverviewGridProps {
  cards: OverviewCard[];
}

export function OverviewGrid({ cards }: OverviewGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#F5F7FA] border-2 border-[#E5E7EB] rounded-lg p-5"
        >
          <h4 className="text-[var(--color-navy)] mt-0 mb-2.5 font-display text-xl font-semibold">
            {card.title}
          </h4>
          <p className="text-[var(--color-text-muted)]">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

