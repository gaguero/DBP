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

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <Image
              src={activity.image}
              alt={activity.name}
              width={1200}
              height={800}
              className="h-80 w-full object-cover"
            />
            <div className="space-y-6 p-8">
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
              <ul className="space-y-3 text-sm text-muted">
                {activity.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Plan Your Adventure</h2>
            <p className="text-muted">
              Share your travel dates, group size, and interests so our concierge can tailor this experience for your stay. We
              arrange transportation, bilingual guides, refreshments, and any add-ons like photography or wellness pairings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                href="/contact"
                trackingEvent="experience_inquiry"
                trackingData={{ experience: activity.slug }}
              >
                Request Itinerary
              </Button>
              <Button
                variant="secondary"
                href="mailto:contact@dolphinblueparadise.com"
                trackingEvent="experience_email"
                trackingData={{ experience: activity.slug }}
              >
                Email Concierge
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


