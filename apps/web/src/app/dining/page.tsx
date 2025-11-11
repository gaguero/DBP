import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: "Farm-to-Table Restaurant in Dolphin Bay",
  description:
    "Sustainable dining over the water at Blå Bar & Restaurant. European-inspired menus with locally sourced organic ingredients in Bocas del Toro.",
};

const description =
  "Homegrown produce, locally sourced organic ingredients, and European-fusion menus come together at our over-the-water Blå Bar & Restaurant.";

const schedule = [
  { meal: "Breakfast", time: "8:00 – 9:30 am", detail: "Fresh fruit, homemade bread, local eggs" },
  { meal: "Lunch", time: "12:00 – 2:30 pm", detail: "Light fare and daily specials" },
  { meal: "Dinner", time: "7:00 – 9:30 pm", detail: "Three-course set menu" },
  { meal: "Blå Bar", time: "All day", detail: "Snacks, fresh juices, and handcrafted cocktails" },
];

const testimonial =
  "Markus makes excellent cocktails, and the cuisine is remarkable. We enjoyed fresh fish caught nearby while Yu prepared juices, ice creams, and desserts from local fruit—everything was worth trying.";

export default function DiningPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Farm-to-Table Dining Over the Water"
        kicker="Blå Bar & Restaurant"
        description={description}
        image="/images/dining-overwater.jpg"
      />

      {/* Overview */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">CHEF PHILOSOPHY</h2>
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              At Dolphin Blue Paradise, we prepare delicious homemade food sourced locally. Sustainability guides every plate: 
              we cook each dish fresh, minimize food waste, and partner with farmers and fishers across Dolphin Bay.
            </p>
            <p className="text-lg text-[var(--color-text-primary)]">
              Our culinary team combines European techniques with Panamanian flavors, using organic ingredients harvested 
              from our tropical gardens and sourced from indigenous Ngäbe-Buglé communities. Every meal tells a story of 
              our commitment to farm-to-table excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Menus & Schedule */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">MENUS & SCHEDULE</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {schedule.map((item) => (
              <Card key={item.meal} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-2xl text-[var(--color-navy)] uppercase font-light">{item.meal.toUpperCase()}</h3>
                  <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                    {item.time}
                  </span>
                </div>
                <p className="text-[var(--color-text-muted)]">{item.detail}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/menus" variant="secondary">
              View Sample Menus (PDF) →
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section">
        <div className="container max-w-3xl">
          <Card className="space-y-3 bg-white/80 p-8 text-lg text-[var(--color-navy)] shadow-soft">
            <blockquote className="italic text-xl leading-relaxed">&quot;{testimonial}&quot;</blockquote>
            <cite className="not-italic text-sm text-[var(--color-text-muted)]">— Recent Guest</cite>
          </Card>
        </div>
      </section>

      {/* Locals Dining Policy */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 text-center uppercase font-light">DINING RESERVATIONS</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              <strong>Locals and non-hotel guests are always welcome!</strong> We&apos;d love to have you join us for a drink 
              or meal. Please WhatsApp or email us in advance, especially if we&apos;re touring with guests.
            </p>
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              <strong>48-hour notice is required</strong> for lunch or dinner reservations. Dinner is always a delicious 
              three-course set menu featuring the freshest local ingredients.
            </p>
            <div className="bg-white p-6 rounded mt-6">
              <p className="text-[var(--color-text-primary)] mb-2">
                <strong>Reserve a Table:</strong>
              </p>
              <p className="text-[var(--color-text-primary)]">
                WhatsApp: <a href="https://wa.me/50763460605" className="text-[var(--color-ocean)] hover:underline">+507 6346 0605</a>
              </p>
              <p className="text-[var(--color-text-primary)]">
                Email: <a href="mailto:contact@dolphinblueparadise.com" className="text-[var(--color-ocean)] hover:underline">contact@dolphinblueparadise.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <Button href="/contact" variant="primary" className="text-lg px-8 py-4">
            Reserve a Table via WhatsApp or Email
          </Button>
        </div>
      </section>
    </div>
  );
}
