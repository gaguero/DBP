import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { donationWishList } from "@/content/data";
import { Button } from "@/components/button";
import { LegacyContent } from "@/components/legacy-content";

export const metadata: Metadata = {
  title: "Volunteering & Community",
  description:
    "Learn how Dolphin Blue Paradise partners with local communities and how you can support during your stay.",
};

export default function VolunteeringPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Support the Communities of Dolphin Bay"
        kicker="Volunteering"
        description="From supply drives to on-the-ground medical support, we collaborate with local partners to create lasting impact."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">How Guests Can Help</h2>
            <p className="text-muted">
              Floating Doctors and neighboring villages rely on volunteer energy and essential supplies. We collect donations onsite,
              coordinate drop-offs, and can arrange introductions if you wish to lend a hand during your stay.
            </p>
            <Card className="space-y-3 bg-[var(--color-sand)] p-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Most Requested Items</h3>
              <ul className="space-y-2 text-sm text-muted">
                {donationWishList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="space-y-3 p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Coordinate Before Arrival</h3>
            <p className="text-sm text-muted">
              Email our concierge with the dates of your visit and how you&apos;d like to contribute. We&apos;ll liaise with community leaders
              to align on schedules, transportation, and priority needs.
            </p>
            <Button href="mailto:contact@dolphinblueparadise.com" className="w-full">
              Email Concierge
            </Button>
            <Button href="https://wa.me/50763460605" variant="secondary" className="w-full">
              WhatsApp Concierge
            </Button>
          </Card>
        </div>
      </section>

      <LegacyContent
        page="volunteering"
        description="Legacy volunteer program details are preserved below."
      />
    </div>
  );
}