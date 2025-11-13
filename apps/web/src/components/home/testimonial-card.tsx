import Image from "next/image";
import clsx from "clsx";
import { Card } from "@/components/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  authorImage?: string;
  rating: number;
  source: "Google" | "Booking.com" | "TripAdvisor";
  sourceBadge?: string;
  category?: "accommodations" | "dining" | "experiences" | "sustainability";
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  authorImage,
  rating,
  source,
  sourceBadge,
  category,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={clsx("p-8 space-y-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < rating ? "text-[var(--color-gold)]" : "text-gray-300"}
          >
            ★
          </span>
        ))}
        {sourceBadge && (
          <Image src={sourceBadge} alt={source} width={80} height={20} className="ml-2" />
        )}
      </div>
      <blockquote className="text-lg italic text-[var(--color-text-primary)] leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-sand)]">
        {authorImage && (
          <Image
            src={authorImage}
            alt={author}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold text-[var(--color-navy)]">{author}</p>
          {category && (
            <p className="text-sm text-[var(--color-text-muted)] capitalize">{category}</p>
          )}
        </div>
      </div>
    </Card>
  );
}





