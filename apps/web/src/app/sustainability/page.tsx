import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { impactHighlights } from "@/content/data";
import { Button } from "@/components/button";
import { LegacyContent } from "@/components/legacy-content";

const impactStatements = [
  {
    heading: "100% Off-Grid Operations",
    body: "Solar panels power the resort, with energy monitoring to ensure mindful usage and battery backups for evening comfort.",
  },
  {
    heading: "Closed-Loop Water Systems",
    body: "Rainwater is harvested, filtered, and remineralized onsite. We provide glass bottles and refill stations across the property.",
  },
  {
    heading: "Compost & Reuse",
    body: "Kitchen scraps feed our compost program, and we partner with local artisans to repurpose materials and reduce landfill waste.",
  },
  {
    heading: "Community Partnerships",
    body: "We support Floating Doctors, fund scholarships, and source produce and services from neighboring villages.",
  },
];

export const metadata: Metadata = {
  title: "Sustainability & Impact",
  description:
    "Discover how Dolphin Blue Paradise operates off-grid, nurtures local ecosystems, and partners with indigenous communities.",
};

export default function SustainabilityPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Travel Lightly, Leave a Lasting Positive Impact"
        kicker="Our Promise"
        description="We blend barefoot luxury with regenerative practices so every guest experience supports the biodiversity and communities of Dolphin Bay."
        image="/images/dining-overwater.jpg"
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          {impactHighlights.map((item) => (
            <Card key={item.title} className="space-y-3">
              <h3 className="font-display text-xl text-[var(--color-navy)]">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">How You Can Join the Journey</h2>
            <ul className="space-y-3 text-muted">
              {impactStatements.map((statement) => (
                <li key={statement.heading} className="space-y-1">
                  <p className="font-semibold text-[var(--color-navy)]">{statement.heading}</p>
                  <p className="text-sm">{statement.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <Card className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Before You Arrive</h3>
            <p className="text-sm text-muted">
              Pack reef-safe sunscreen, reusable water bottles, and light long sleeves for evenings. We&apos;ll provide biodegradable
              toiletries, mosquito nets, and refillable amenities.
            </p>
            <Button href="/volunteering" variant="secondary" className="w-full">
              Support Community Initiatives
            </Button>
            <Button href="/plan-your-journey" className="w-full">
              Plan Sustainable Travel
            </Button>
          </Card>
        </div>
      </section>

      <LegacyContent
        page="sustainability"
        description="Legacy sustainability messaging remains accessible for reference."
      />
    </div>
  );
}