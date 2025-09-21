import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";

const heroDescription =
  "Savor panoramic sea views from every cabana and room. Each stay includes plush robes, swim towels, eco-friendly amenities, and fresh purified rainwater delivered daily.";

const rooms = [
  {
    slug: "premium-deluxe-cabana",
    name: "Premium Deluxe Sea View Cabana",
    highlights: [
      "California king-size bed with certified organic memory foam mattress",
      "Private bathroom",
      "Large private terrace with loungers and workspace",
      "Sea views with electricity and ceiling fan",
      "Free Wi-Fi and breakfast included",
      "Approximately 33 square meters, accommodates up to 2 guests",
    ],
  },
  {
    slug: "sea-view-cabana",
    name: "Sea View Cabana",
    highlights: [
      "Renovated February 2024",
      "King-size bed with private terrace",
      "Electricity, fan, and dedicated sea views",
      "Private bathroom with breakfast included",
      "Free Wi-Fi",
      "Approximately 20 square meters, accommodates up to 2 guests",
    ],
  },
  {
    slug: "dolphin-view-room",
    name: "Dolphin View Room",
    highlights: [
      "King-size bed with private bathroom",
      "Large private terrace and balcony",
      "Sea views with electricity and fan",
      "Desk and chair for relaxed work",
      "Free Wi-Fi and breakfast included",
      "Approximately 30 square meters, accommodates up to 2 guests",
    ],
  },
  {
    slug: "family-jungle-room",
    name: "Family Jungle Room",
    highlights: [
      "King-size bed plus twin day bed",
      "Private bathroom with bathtub and shower",
      "Private terrace with combined sea and jungle views",
      "Free Wi-Fi and breakfast included",
      "60+ square meters, sleeps up to 3 guests",
    ],
  },
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Choose from sea-view cabanas and spacious jungle suites at Dolphin Blue Paradise. Luxurious amenities, daily breakfast, and panoramic terraces come standard.",
};

export default function RoomsPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Cabanas & Rooms with Sea View"
        kicker="Stay with us"
        description={heroDescription}
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container space-y-6">
          {rooms.map((room) => (
            <Card key={room.slug} className="space-y-4 border border-black/5 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h2 className="font-display text-2xl text-[var(--color-navy)]">{room.name}</h2>
                <Button href={`/rooms/${room.slug}`} variant="secondary">
                  Book This Room
                </Button>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {room.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-4 text-sm text-muted">
          <p>Contact us to tailor your stay or confirm availability.</p>
          <ul className="space-y-1">
            {contactInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}