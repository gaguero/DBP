import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import Image from "next/image";
import { activities } from "@/content/data";

export const metadata: Metadata = {
  title: "Dolphin Bay Experiences",
  description:
    "Personalized eco-adventures and tours in Bocas del Toro. From dolphin encounters to rainforest hikes, discover Panama&apos;s incredible biodiversity.",
};

export default function ExperiencesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Discover Our Curated Eco-Adventures"
        kicker="Experiences"
        description="From dolphin encounters to rainforest hikes, immerse yourself in Panama&apos;s incredible biodiversity"
        image="/images/hero-bay.jpg"
      />

      {/* Activities Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.slug}
                className="group relative overflow-hidden rounded border border-black/10 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={activity.image || "/images/hero-bay.jpg"}
                    alt={activity.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl text-white mb-1 uppercase font-light">{activity.name.toUpperCase()}</h3>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <span>{activity.duration}</span>
                      {"difficulty" in activity && typeof (activity as Record<string, unknown>).difficulty === "string" && (
                        <>
                          <span>•</span>
                          <span>{(activity as Record<string, unknown>).difficulty as string}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-3">{activity.summary}</p>
                  <Button href={`/experiences/${activity.slug}`} variant="primary" className="w-full">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">
            REQUEST CUSTOM ITINERARY
          </h2>
          <p className="text-lg text-[var(--color-text-primary)] mb-8">
            Share your travel dates, group size, and interests so our concierge can tailor experiences for your stay. 
            We arrange transportation, bilingual guides, refreshments, and any add-ons.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" className="text-lg px-8 py-4">
              Contact Concierge
            </Button>
            <Button
              href="https://wa.me/50763460605"
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
