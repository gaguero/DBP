import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const intro =
  "Every suite opens to a private balcony or patio with jungle or sea views. Lounge chairs, hammocks, and a swim platform invite you to soak up the sun and observe starfish, sea urchins, and other marine life below.";

const sections = [
  {
    title: "Swimming & Sunbathing",
    description:
      "Relax on the swim platform, sunbathe on a lounger, or sway in a hammock-the calm waters of Dolphin Bay are always a few steps away.",
  },
  {
    title: "Tropical Garden",
    description:
      "Explore gardens cared for by Roque and his team. Seasonal fruits-mango, pineapple, passion fruit, rambutan, starfruit, guava, mangosteen, water apple, soursop, mandarins, coconut, and more-appear daily on the menu.",
  },
  {
    title: "Farm-to-Table Harvest",
    description:
      "Herbs and vegetables like ginger, turmeric, lettuce, spinach, cilantro, lemongrass, tomatoes, and peppers are grown onsite and served fresh at Blo Bar.",
  },
  {
    title: "Salon Azul",
    description:
      "Our renovated Salon Azul offers a serene indoor lounge for reading, meditation, and board games, plus an outdoor patio with weights, dumbbells, a fitness ball, and yoga mats for gentle workouts.",
  },
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Gallery",
  description: "Preview the spaces and experiences waiting at Dolphin Blue Paradise.",
};

export default function GalleryPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Facilities & Grounds"
        kicker="Gallery"
        description={intro}
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} className="space-y-3 p-6">
              <h2 className="font-display text-2xl text-[var(--color-navy)]">{section.title}</h2>
              <p className="text-sm text-muted">{section.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-3 text-sm text-muted">
          <p>Contact us for availability or to arrange a personalized stay.</p>
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