import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "About Dolphin Blue Paradise",
  description:
    "Learn about our mission, team, and sustainability practices. Discover the story behind Panama&apos;s premier eco-luxury resort.",
};

const teamMembers = [
  {
    name: "Managing Director",
    role: "Operations & Guest Experience",
    quote: "We believe luxury and sustainability are not mutually exclusive—they enhance each other.",
  },
  {
    name: "Head Chef",
    role: "Culinary Excellence",
    quote: "Every dish tells a story of our local partnerships and commitment to farm-to-table dining.",
  },
  {
    name: "Activities Manager",
    role: "Curated Experiences",
    quote: "Our goal is to connect guests with Panama&apos;s incredible biodiversity while respecting nature.",
  },
  {
    name: "Sustainability Lead",
    role: "Environmental Stewardship",
    quote: "100% solar power, zero-waste practices, and community partnerships drive everything we do.",
  },
];

const pressLogos = [
  { name: "Virtuoso", image: "/images/press-virtuoso.svg" },
  { name: "Condé Nast", image: "/images/press-conde-nast.svg" },
  { name: "Booking.com Traveller Review Award", image: "/images/press-booking.svg" },
];

const promisePillars = [
  {
    title: "Personalization",
    description:
      "Every stay is tailored to your interests, dietary needs, and travel style. Our concierge team crafts custom itineraries that reflect your values and desires.",
  },
  {
    title: "Sustainability",
    description:
      "100% solar-powered, zero-waste operations, and deep community partnerships. Your stay directly supports conservation and local communities.",
  },
  {
    title: "Comfort",
    description:
      "Luxurious accommodations with organic linens, private terraces, and thoughtful amenities. Experience eco-luxury without compromise.",
  },
];

const partners = [
  { name: "Ngäbe-Buglé Indigenous Communities", description: "Cultural tours, cacao sourcing, and community support programs" },
  { name: "Local Farms & Fishers", description: "Fresh produce and sustainable seafood partnerships" },
  { name: "Floating Doctors", description: "Medical volunteer opportunities and community health initiatives" },
  { name: "Conservation Organizations", description: "Dolphin monitoring, reforestation, and biodiversity protection" },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Our Story"
        kicker="About Us"
        description="Building a sustainable future for eco-luxury travel in Panama"
        image="/images/dolphin-bay-location.jpg"
      />

      {/* Our Story */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6">Our Story</h2>
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              Dolphin Blue Paradise was born from a vision to create a luxury resort that doesn&apos;t compromise on environmental 
              responsibility or community impact. Located on Isla San Cristóbal in Dolphin Bay, we&apos;ve built a 100% off-the-grid 
              eco-resort that proves sustainability and luxury can coexist beautifully.
            </p>
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              Our founders recognized that discerning travelers want more than just beautiful accommodations—they want experiences 
              that align with their values. Every aspect of our operation, from solar power to farm-to-table dining, reflects our 
              commitment to sustainable hospitality.
            </p>
            <p className="text-lg text-[var(--color-text-primary)]">
              We partner deeply with local Ngäbe-Buglé communities, support conservation efforts, and create meaningful connections 
              between our guests and Panama&apos;s incredible biodiversity. This isn&apos;t just a resort—it&apos;s a movement toward 
              responsible, regenerative travel.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded shadow-sm">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-2">{member.name}</h3>
                <p className="text-sm uppercase tracking-wider text-[var(--color-gold)] mb-4">{member.role}</p>
                <blockquote className="text-[var(--color-text-primary)] italic border-l-4 border-[var(--color-gold)] pl-4">
                  &quot;{member.quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Recognition */}
      <section className="section">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Press & Recognition</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {pressLogos.map((press, idx) => (
              <div key={idx} className="flex items-center justify-center h-16">
                <span className="text-lg font-semibold text-[var(--color-text-muted)]">{press.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Our Promise to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promisePillars.map((pillar, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-ocean)] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">{idx + 1}</span>
                </div>
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4">{pillar.title}</h3>
                <p className="text-[var(--color-text-primary)]">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Our Partners</h2>
          <div className="space-y-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="border-l-4 border-[var(--color-gold)] pl-6">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-2">{partner.name}</h3>
                <p className="text-[var(--color-text-muted)]">{partner.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/sustainability" variant="primary">
              Learn About Our Impact
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

