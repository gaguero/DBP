import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";

import { Card } from "@/components/card";

import { Button } from "@/components/button";

import { LegacyContent } from "@/components/legacy-content";

import { rooms } from "@/content/data";



export const metadata: Metadata = {

  title: "Rooms & Suites",

  description:

    "Discover sea-view cabanas and spacious jungle suites at Dolphin Blue Paradise. Each stay includes breakfast, Wi-Fi, and tailored concierge service.",

};



export default function RoomsPage() {

  return (

    <div className="space-y-24 pb-24">

      <PageHero

        title="Rooms & Suites with Sea and Jungle Views"

        kicker="Stay with us"

        description="Each accommodation is powered by solar energy, refreshed with purified rainwater, and curated with artisanal touchesâ€”ready for bespoke itineraries and mindful rest."

        image="/images/rooms-view.jpg"

      />



      <section className="section">

        <div className="container grid gap-8 md:grid-cols-2">

          {rooms.map((room) => (

            <Card key={room.slug} className="flex h-full flex-col gap-6">

              <div className="space-y-2">

                <h2 className="font-display text-2xl text-[var(--color-navy)]">{room.name}</h2>

                <p className="text-muted">{room.description}</p>

              </div>

              <dl className="grid grid-cols-2 gap-4 text-sm text-muted">

                <div>

                  <dt className="font-semibold text-[var(--color-navy)]">Size</dt>

                  <dd>{room.size}</dd>

                </div>

                <div>

                  <dt className="font-semibold text-[var(--color-navy)]">Capacity</dt>

                  <dd>{room.capacity}</dd>

                </div>

              </dl>

              <ul className="space-y-2 text-sm text-muted">

                {room.amenities.map((amenity) => (

                  <li key={amenity} className="flex items-start gap-2">

                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>

                    <span>{amenity}</span>

                  </li>

                ))}

              </ul>

              <div className="mt-auto flex flex-wrap gap-3">

                <Button

                  variant="secondary"

                  href={`/rooms/${room.slug}`}

                  trackingEvent="rooms_view_details"

                  trackingData={{ room: room.slug }}

                >

                  View Details

                </Button>

                <Button

                  href="#booking"

                  trackingEvent="rooms_check_availability"

                  trackingData={{ room: room.slug }}

                >

                  Check Availability

                </Button>

              </div>

            </Card>

          ))}

        </div>

      </section>



      <LegacyContent

        page="rooms"

        description="Original room descriptions from the legacy site are preserved below."

      />

    </div>

  );

}

