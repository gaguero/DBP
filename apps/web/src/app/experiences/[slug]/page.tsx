import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHero } from "@/components/page-hero";
import { activities } from "@/content/data";

type ExperienceParams = {
  params: { slug: string };
};

const activityIndex = new Map(activities.map((activity) => [activity.slug, activity]));

export function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }));
}

export function generateMetadata({ params }: ExperienceParams): Metadata {
  const activity = activityIndex.get(params.slug);

  if (!activity) {
    return { title: "Experience Not Found" };
  }

  return {
    title: `${activity.name} | Dolphin Blue Paradise`,
    description: activity.summary,
  } satisfies Metadata;
}

export default function ExperienceDetailPage({ params }: ExperienceParams) {
  const activity = activityIndex.get(params.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title={activity.name}
        kicker="Experience"
        description={activity.summary}
        image={activity.image}
      />

      {/* Summary Paragraph */}
      <section className="section">
        <div className="container max-w-4xl">
          <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
            {activity.summary}
          </p>
        </div>
      </section>

      {/* Logistics and Highlights */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={activity.image || "/images/hero-bay.jpg"}
                alt={activity.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 p-8">
              <h2 className="font-display text-3xl text-[var(--color-navy)] mb-4">Logistics</h2>
              <dl className="space-y-4">
                <div className="flex items-start gap-4">
                  <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Duration:</dt>
                  <dd className="text-[var(--color-text-muted)]">{activity.duration}</dd>
                </div>
                {activity.difficulty && (
                  <div className="flex items-start gap-4">
                    <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Difficulty:</dt>
                    <dd className="text-[var(--color-text-muted)]">{activity.difficulty}</dd>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Suitable for:</dt>
                  <dd className="text-[var(--color-text-muted)]">{activity.suitability}</dd>
                </div>
              </dl>

              <div className="pt-6 border-t border-black/10">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {activity.included?.map((item, idx) => (
                    <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                      <span className="text-[var(--color-gold)] mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-black/10">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {activity.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                      <span className="text-[var(--color-gold)] mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Add to Your Itinerary</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Share your travel dates, group size, and interests so our concierge can tailor this experience for your stay. 
              We arrange transportation, bilingual guides, refreshments, and any add-ons like photography or wellness pairings.
            </p>
            <div className="space-y-4">
              <Button
                href="/contact"
                variant="primary"
                className="w-full"
                trackingEvent="experience_inquiry"
                trackingData={{ experience: activity.slug }}
              >
                Add to Your Itinerary
              </Button>
              <Button
                variant="secondary"
                href="https://wa.me/50763460605"
                className="w-full"
                trackingEvent="experience_whatsapp"
                trackingData={{ experience: activity.slug }}
              >
                WhatsApp Concierge
              </Button>
              <Button
                variant="secondary"
                href="mailto:contact@dolphinblueparadise.com"
                className="w-full"
                trackingEvent="experience_email"
                trackingData={{ experience: activity.slug }}
              >
                Email Concierge
              </Button>
            </div>
            <div className="pt-6 border-t border-black/10">
              <p className="text-sm text-[var(--color-text-muted)]">
                <strong>Note:</strong> Some experiences may be seasonal or weather-dependent. Our concierge will confirm 
                availability and provide detailed information when you inquire.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
