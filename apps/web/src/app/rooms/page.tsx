import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import Image from "next/image";
import { rooms } from "@/content/data";

export const metadata: Metadata = {
  title: "Accommodations | Dolphin Blue Paradise, Bocas del Toro",
  description:
    "Sea view cabanas and eco-luxury rooms in Bocas del Toro. Choose from Premium Deluxe, Sea View Cabanas, Dolphin View Rooms, or Family Jungle Rooms.",
};

const heroDescription =
  "Savor panoramic sea views from every cabana and room. Each stay includes plush robes, swim towels, eco-friendly amenities, and fresh purified rainwater delivered daily.";

export default function RoomsPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Cabanas & Rooms with Sea View"
        kicker="Accommodations"
        description={heroDescription}
        image="/images/rooms-view.jpg"
      />

      {/* Intro Paragraph */}
      <section className="section">
        <div className="container max-w-4xl">
          <p className="text-lg text-[var(--color-text-primary)] text-center leading-relaxed">
            Each accommodation is thoughtfully designed to provide comfort while maintaining our commitment to sustainability 
            and eco-friendly practices. Wake to the sounds of the bay, enjoy sunrise coffee on your private terrace, and 
            let our concierge tailor each day of your stay.
          </p>
        </div>
      </section>

      {/* Room Comparison Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <div
                key={room.slug}
                className="group border border-black/10 rounded overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.heroImage || "/images/rooms-view.jpg"}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl text-[var(--color-navy)] mb-3">{room.name}</h2>
                  <div className="flex items-center gap-4 mb-4 text-sm text-[var(--color-text-muted)]">
                    <span>{room.size}</span>
                    <span>•</span>
                    <span>{room.capacity}</span>
                  </div>
                  <p className="text-[var(--color-text-primary)] mb-4 line-clamp-2">{room.description}</p>
                  <ul className="space-y-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">✓</span>
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href={`/rooms/${room.slug}`} variant="primary" className="w-full">
                    Book Your Room
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers & Packages */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--color-navy)] mb-4">
              Special Offers & Packages
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Enhance your stay with curated packages that combine accommodations with unforgettable experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Romantic Escape */}
            <div className="bg-white rounded overflow-hidden border border-black/10 hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/rooms-view.jpg"
                  alt="Romantic Escape Package"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-3">Romantic Escape</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Perfect for couples seeking an intimate, luxurious getaway with personalized experiences.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Private Premium Deluxe Cabana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Romantic dinner on terrace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Couples massage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Sunset dolphin cruise</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                  Best seasons: Year-round. Honeymoon add-ons available.
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Request Custom Quote
                </Button>
              </div>
            </div>

            {/* Adventure Package */}
            <div className="bg-white rounded overflow-hidden border border-black/10 hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/hero-bay.jpg"
                  alt="Adventure Package"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-3">Adventure Package</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  For active travelers who want to experience the best of Dolphin Bay&apos;s outdoor adventures.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Multiple activity excursions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Snorkeling and kayaking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Rainforest hike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Chocolate farm tour</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                  Best seasons: Year-round. Surfing add-on available November to April.
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Request Custom Quote
                </Button>
              </div>
            </div>

            {/* Private Island Buyout */}
            <div className="bg-white rounded overflow-hidden border border-black/10 hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/dining-overwater.jpg"
                  alt="Private Island Buyout"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-3">Private Island Buyout</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Exclusive resort buyout for groups, families, or corporate retreats seeking complete privacy.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Entire resort exclusivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Customized itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Private chef and staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Flexible dates</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                  Minimum group size: 8 guests. Advance booking required (3+ months recommended).
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Request Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-forest)] text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Find Your Place Between the Jungle and the Sea
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience personalized eco-luxury in one of Panama&apos;s most biodiverse destinations.
          </p>
          <Button href="/contact" variant="secondary" className="bg-white text-[var(--color-ocean)] border-white hover:bg-white/90">
            Book Now
          </Button>
        </div>
      </section>

      {/* Internal Links */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div>
              <Button href="/dining" variant="secondary">
                Dining
              </Button>
            </div>
            <div>
              <Button href="/experiences" variant="secondary">
                Activities
              </Button>
            </div>
            <div>
              <Button href="/sustainability" variant="secondary">
                Impact
              </Button>
            </div>
            <div>
              <Button href="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
