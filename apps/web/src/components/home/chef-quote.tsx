import clsx from "clsx";
import { Card } from "@/components/card";

interface ChefQuoteProps {
  quote: string;
  chefName: string;
  chefTitle?: string;
  background?: "sand" | "cloud";
}

export function ChefQuote({ quote, chefName, chefTitle, background = "sand" }: ChefQuoteProps) {
  return (
    <Card className={clsx("p-8", background === "sand" && "bg-[var(--color-sand)]")}>
      <blockquote className="text-2xl font-display italic text-[var(--color-navy)] mb-4">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="text-[var(--color-text-muted)]">
        <p className="font-semibold">{chefName}</p>
        {chefTitle && <p className="text-sm">{chefTitle}</p>}
      </div>
    </Card>
  );
}





