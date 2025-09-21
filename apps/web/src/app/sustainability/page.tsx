import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const introParagraphs = [
  "By staying at Dolphin Blue Paradise you relax, reconnect with nature, and support a resort committed to sustainability and community impact.",
  "We operate entirely off the grid with continual improvements that reduce our footprint while maintaining a high standard of comfort for every guest.",
];

const initiatives = [
  "100% off-grid operations powered by solar energy.",
  "Rainwater collection and purification systems provide drinking water throughout the resort.",
  "Produce and fruit are harvested from our garden, tended by head gardener Roque, who has called the island home for more than 18 years.",
  "Vegetable and fruit scraps are composted to minimize food waste.",
  "We replace single-use plastics with refillable toiletries, metal silverware, and reusable straws.",
  "Essential oils and mindful practices help manage pests so we can avoid harsh chemicals-mosquito nets are provided in every room.",
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
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
        title="Conserving Our Environment"
        kicker="Your impact"
        description="Every guest becomes part of our regenerative approach to hospitality in Dolphin Bay."
        image="/images/dining-overwater.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Our Steps to Reduce Our Footprint</h2>
          <Card className="space-y-2 p-6 text-sm text-muted">
            <ul className="space-y-2">
              {initiatives.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-3 text-sm text-muted">
          <p>Contact us for more details about our sustainability practices or to learn how you can support them.</p>
          <ul className="space-y-1">
            {contactInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}