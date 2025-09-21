import Image from "next/image";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { TrackedLink } from "@/components/tracked-link";

const valuePillars = [
  {
    title: "Eco-Luxury Living",
    description:
      "Off-grid suites with sea views, artisanal finishes, and thoughtful amenities for restorative stays.",
    icon: "?",
  },
  {
    title: "Curated Experiences",
    description:
      "Private dolphin encounters, jungle hikes with our naturalist, and bespoke island excursions.",
    icon: "?",
  },
  {
    title: "Farm-to-Table Dining",
    description:
      "Seasonal tasting menus inspired by our tropical garden, paired with signature cocktails from Blo Bar.",
    icon: "?",
  },
  {
    title: "Community Impact",
    description:
      "Your stay supports indigenous communities through healthcare, education, and conservation initiatives.",
    icon: "?",
  },
];

const storyHighlights = [
  {
    title: "Rooms with panoramic bay views",
    description: "Private terraces, curated interiors, and tailored concierge services for every guest.",
    image: "/images/rooms-view.jpg",
    href: "/rooms",
    trackingEvent: "hero_rooms_highlight",
  },
  {
    title: "Dining over turquoise waters",
    description: "Blo Bar serves European-inspired cuisine using produce grown steps from your table.",
    image: "/images/dining-overwater.jpg",
    href: "/dining",
    trackingEvent: "hero_dining_highlight",
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src="/images/hero-bay.jpg"
          alt="Aerial view of Dolphin Bay with lush island and turquoise waters"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative container flex min-h-[80vh] flex-col justify-center gap-8 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            Paradise between the jungle &amp; the sea
          </p>
          <h1 className="max-w-3xl font-display text-4xl md:text-6xl">
            A personalized eco-luxury escape in Dolphin Bay, Panama
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Discover an off-grid sanctuary powered by the sun, nourished by our gardens, and crafted by hosts who
            anticipate every detail of your journey.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              href="#booking"
              trackingEvent="cta_plan_escape"
              trackingData={{ section: "hero" }}
            >
              Plan Your Escape
            </Button>
            <Button
              href="/experiences"
              variant="secondary"
              trackingEvent="cta_explore_experiences"
              trackingData={{ section: "hero" }}
            >
              Explore Experiences
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-4">
          {valuePillars.map((pillar) => (
            <Card key={pillar.title} className="h-full space-y-3">
              <span className="text-2xl" aria-hidden>
                {pillar.icon}
              </span>
              <h3 className="font-display text-xl text-[var(--color-navy)]">{pillar.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-2">
          {storyHighlights.map((highlight) => (
            <article key={highlight.title} className="relative overflow-hidden rounded-3xl shadow-soft">
              <Image
                src={highlight.image}
                alt={highlight.title}
                width={800}
                height={540}
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="space-y-4 bg-white p-8">
                <h3 className="section-heading text-3xl md:text-[2.5rem]">{highlight.title}</h3>
                <p className="text-muted">{highlight.description}</p>
                <TrackedLink
                  href={highlight.href}
                  trackingEvent={highlight.trackingEvent}
                  trackingData={{ section: "highlight" }}
                  className="inline-flex items-center gap-2 font-semibold text-[var(--color-ocean)]"
                >
                  Learn more
                  <span aria-hidden>&gt;</span>
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BookingWidgetPlaceholder />
    </div>
  );
}
