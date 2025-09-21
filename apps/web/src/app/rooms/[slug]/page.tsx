import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { rooms } from "@/content/data";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) {
    return {};
  }
  return {
    title: room.name,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      <section className="relative isolate overflow-hidden">
        <Image
          src={room.heroImage}
          alt="Sea view room at Dolphin Blue Paradise"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="relative container flex min-h-[60vh] flex-col justify-center gap-6 py-24 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">Our rooms</p>
          <h1 className="max-w-3xl font-display text-4xl md:text-5xl">{room.name}</h1>
          <p className="max-w-2xl text-lg text-white/80">{room.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#booking" trackingEvent="room_reserve_now" trackingData={{ room: room.slug }}>
              Reserve Now
            </Button>
            <Button
              href="/rooms"
              variant="secondary"
              trackingEvent="room_back_to_list"
              trackingData={{ room: room.slug }}
            >
              Back to Rooms
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[var(--color-navy)]">What&apos;s Included</h2>
            <ul className="space-y-3 text-muted">
              {room.amenities.map((amenity) => (
                <li key={amenity} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="card space-y-4">
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-semibold text-[var(--color-navy)]">Suite Size</span>
              <span>{room.size}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-semibold text-[var(--color-navy)]">Capacity</span>
              <span>{room.capacity}</span>
            </div>
            <p className="text-sm text-muted">
              Looking for a personalized itinerary? Our concierge can coordinate flights, island transfers, and curated experiences. Include your travel dates in the booking request and we&apos;ll take care of the rest.
            </p>
            <Link href="#booking" className="button-primary">
              Check Availability
            </Link>
            <Link href="/contact" className="button-secondary">
              Speak with Concierge
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
