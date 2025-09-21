import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { diningHighlights } from "@/content/data";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Dining at Blo Bar & Restaurant",
  description:
    "Savor seasonal tasting menus and handcrafted cocktails at Blo Bar & Restaurant, overlooking Dolphin Bay.",
};

export default function DiningPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Blo Bar & Restaurant"
        kicker="Dining"
        description="Overwater dining where European-inspired menus meet produce grown mere steps away in our tropical garden."
        image={diningHighlights.heroImage}
      />

      <section className="section">
        <div className="container grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Our Culinary Philosophy</h2>
            <p className="text-muted text-lg leading-relaxed">
              Every plate tells the story of Dolphin Bay: artisan breads baked at dawn, herbs clipped from the
              garden, freshly caught Caribbean seafood, and tropical fruit sorbets churned in-house. Markus crafts
              cocktails from locally distilled spirits while Yu spins island botanicals into tonics, granitas, and
              petit fours.
            </p>
            <p className="text-muted">
              Sustainability guides each service. We minimize waste through composting, reusable amenities, and
              intimate seatings planned around seasonal availability. Guests with dietary preferences can expect
              personalized menus with 48 hours notice.
            </p>
          </div>
          <Card className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Service Hours</h3>
            <ul className="space-y-3 text-sm text-muted">
              {diningHighlights.schedule.map((slot) => (
                <li key={slot.label} className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--color-navy)]">{slot.label}</span>
                  <span>{slot.detail}</span>
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="secondary" className="w-full">
              Reserve a Table
            </Button>
            <Button href="mailto:contact@dolphinblueparadise.com" className="w-full">
              Share Dietary Needs
            </Button>
          </Card>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Chef&apos;s Moments</h2>
            <p className="text-muted">
              From beachside ceviche lunches to candlelit degustations under the stars, our culinary team crafts
              experiences that celebrate both comfort and discovery. Looking for a private tasting, celebratory
              dessert, or bespoke wine flight? Consider it done.
            </p>
            <Button href="#booking" variant="secondary">
              Add Dining to Your Stay
            </Button>
          </div>
          <Card className="space-y-3 bg-white/90 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">Guest Praise</p>
            <blockquote className="text-lg text-[var(--color-navy)]">
              &quot;{diningHighlights.testimonial}&quot;
            </blockquote>
            <cite className="block text-sm text-muted">- Guest Review</cite>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Sample Menus</h2>
          <p className="text-muted">
            We refresh menus weekly. Preview a sample breakfast, lunch, and dinner lineup to spark inspiration.
            Final selections will be curated once we know your preferences and travel dates.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {["Breakfast", "Lunch", "Dinner"].map((course) => (
              <Card key={course} className="space-y-3">
                <h3 className="font-display text-xl text-[var(--color-navy)]">{course}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Locally roasted coffee and herbal infusions</li>
                  <li>Tropical fruit harvested onsite</li>
                  <li>Chef&apos;s seasonal specialties</li>
                </ul>
                <Link href="/contact" className="inline-flex text-sm font-semibold text-[var(--color-ocean)]">
                  Request full menu
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}