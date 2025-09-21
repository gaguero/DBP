import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { activities } from "@/content/data";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Experiences & Excursions",
  description:
    "Discover curated adventures at Dolphin Blue Paradise—from dolphin encounters to rainforest hikes and wellness rituals.",
};

export default function ExperiencesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Curated Adventures on Sea and Shore"
        kicker="Experiences"
        description="Every itinerary is tailored: explore Dolphin Bay with our naturalists, kayak through mangroves at sunrise, or volunteer alongside local partners."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container space-y-8">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Signature Experiences</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {activities.map((activity) => (
              <Card key={activity.slug} className="flex h-full flex-col gap-5 p-0 overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  width={800}
                  height={520}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-4 p-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-[var(--color-navy)]">{activity.name}</h3>
                    <p className="text-muted">{activity.summary}</p>
                  </div>
                  <dl className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--color-navy)]">Duration</span>
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--color-navy)]">Suitable for</span>
                      <span>{activity.suitability}</span>
                    </div>
                  </dl>
                  <ul className="space-y-2 text-sm text-muted">
                    {activity.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      variant="secondary"
                      href={`/experiences/${activity.slug}`}
                      trackingEvent="experiences_view_details"
                      trackingData={{ experience: activity.slug }}
                    >
                      View Details
                    </Button>
                    <Button
                      href="/contact"
                      trackingEvent="experiences_request_itinerary"
                      trackingData={{ experience: activity.slug }}
                    >
                      Request Itinerary
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Wellness & Private Retreats</h2>
            <p className="text-muted">
              Sunrise yoga on the overwater deck, guided breathwork in the rainforest, and bespoke detox menus curated by our chef—wellness moments can be threaded through every stay. Share your goals and we&apos;ll design a schedule of rituals, treatments, and downtime.
            </p>
            <Button
              href="mailto:contact@dolphinblueparadise.com"
              variant="secondary"
              trackingEvent="experiences_plan_retreat"
              trackingData={{ section: "wellness" }}
            >
              Plan a Retreat
            </Button>
          </div>
          <Card className="space-y-3 bg-white/90 text-sm text-muted">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">Pro Tip</p>
            <p>
              Visiting between November and April? Add a surf day on world-ranked breaks. Traveling with family? Ask about educational wildlife programming for young explorers.
            </p>
            <Button
              href="#booking"
              variant="secondary"
              trackingEvent="experiences_pair_with_booking"
              trackingData={{ section: "wellness" }}
            >
              Combine with your booking
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
