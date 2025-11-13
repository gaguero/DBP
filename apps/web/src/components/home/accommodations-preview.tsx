import { RoomPreviewCard } from "./room-preview-card";
import { Button } from "@/components/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

interface Room {
  name: string;
  image: string;
  highlights: string[];
  startingRate?: string;
  href: string;
}

interface AccommodationsPreviewProps {
  title: string;
  description?: string;
  rooms: Room[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function AccommodationsPreview({
  title,
  description,
  rooms,
  ctaLabel = "Discover Our Rooms →",
  ctaHref = "/rooms",
}: AccommodationsPreviewProps) {
  return (
    <Section>
      <Container>
        <h2 className="section-heading text-center mb-4">{title}</h2>
        {description && <p className="text-center text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">{description}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {rooms.map((room, index) => (
            <RoomPreviewCard key={index} {...room} />
          ))}
        </div>
        <div className="text-center">
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}





