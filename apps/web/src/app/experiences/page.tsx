import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const introParagraphs = [
  "Choose from curated adventures that celebrate Dolphin Bay: observe resident dolphins, snorkel warm Caribbean reefs, and explore secluded beaches throughout Bocas del Toro.",
  "We organize every detail-from transport and equipment to expert guides-so your time can focus on discovery, relaxation, and community connection.",
];

const experiences = [
  {
    title: "Dolphin Bay",
    description: "Experience the beauty of resident bottlenose dolphins and the calm of Dolphin Bay." ,
  },
  {
    title: "Snorkeling",
    description: "Slip into crystal water directly from our swim platform or join guided reef excursions.",
  },
  {
    title: "Excursions & Tours",
    description: "Board our boat to discover beaches, mangroves, and island communities across Bocas del Toro.",
  },
  {
    title: "Water Ski & Wakeboard",
    description: "Add a thrill to your itinerary with waterski, wakeboard, or tubing sessions in the bay.",
  },
  {
    title: "Chocolate Farm Tour",
    description:
      "Visit an indigenous Ngabe cacao farm or our neighboring chocolatiers to learn traditional and Belgian-style techniques.",
  },
  {
    title: "Stand Up Paddle",
    description: "Enjoy complimentary SUP boards whenever you want to explore the bay at your own pace.",
  },
  {
    title: "Surfing",
    description:
      "From November to April, ride world-ranked breaks in Bocas del Toro. We coordinate transport and surf packages.",
  },
  {
    title: "Kayak",
    description: "Take a free kayak to glide through calm inlets and mangroves surrounding the property.",
  },
  {
    title: "Monkey Island",
    description:
      "Meet rescued monkeys on a private island sanctuary and learn about their rehabilitation journey.",
  },
  {
    title: "Fishing",
    description:
      "Fish year-round for snapper, jack, wahoo, kingfish, or tuna with half-day and full-day charters.",
  },
  {
    title: "Massages",
    description: "Restore balance with relaxing or therapeutic treatments arranged on-site by local therapists.",
  },
];

const contactParagraph =
  "Message us via WhatsApp at +507 6346 0605 or contact@dolphinblueparadise.com to customize any excursion or build a multi-day itinerary.";

export const metadata: Metadata = {
  title: "Experiences & Excursions",
  description:
    "Discover curated adventures at Dolphin Blue Paradise-from dolphin encounters to rainforest hikes and wellness rituals.",
};

export default function ExperiencesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Short & Half-Day Tours"
        kicker="Experiences"
        description="Explore Dolphin Bay by water, rainforest trails, and cultural encounters."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <Card key={experience.title} className="space-y-2 p-6">
              <h3 className="font-display text-xl text-[var(--color-navy)]">{experience.title}</h3>
              <p className="text-sm text-muted">{experience.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container text-sm text-muted">
          <p>{contactParagraph}</p>
        </div>
      </section>
    </div>
  );
}