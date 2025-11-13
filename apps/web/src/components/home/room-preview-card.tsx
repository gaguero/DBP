import Image from "next/image";
import clsx from "clsx";
import { Card } from "@/components/card";
import { Button } from "@/components/button";

interface RoomPreviewCardProps {
  name: string;
  image: string;
  highlights: string[];
  startingRate?: string;
  href: string;
  className?: string;
}

export function RoomPreviewCard({
  name,
  image,
  highlights,
  startingRate,
  href,
  className,
}: RoomPreviewCardProps) {
  return (
    <Card className={clsx("group overflow-hidden", className)}>
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-[var(--color-navy)] mb-2">{name}</h3>
        <ul className="space-y-2 mb-4">
          {highlights.map((highlight, idx) => (
            <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
              <span className="text-[var(--color-gold)] mt-1">✓</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        {startingRate && (
          <p className="text-[var(--color-gold)] font-semibold mb-4">From {startingRate}</p>
        )}
        <Button href={href} variant="secondary" className="w-full">
          View Details
        </Button>
      </div>
    </Card>
  );
}





