import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const description =
  "Homegrown produce, locally sourced organic ingredients, and European-fusion menus come together at our over-the-water Blo Bar & Restaurant.";

const schedule = [
  { meal: "Breakfast", detail: "8:00 am - 9:30 am" },
  { meal: "Lunch", detail: "12:00 pm - 2:30 pm" },
  { meal: "Dinner", detail: "7:00 pm - 9:30 pm - set three-course menu" },
  { meal: "Blo Bar", detail: "All-day snacks and handcrafted cocktails" },
];

const testimonial =
  "Markus makes excellent cocktails, and the cuisine is remarkable. We enjoyed fresh fish caught nearby while Yu prepared juices, ice creams, and desserts from local fruit-everything was worth trying.";

const reservationNotes = [
  "Locals and non-hotel guests are always welcome for a drink, but please WhatsApp or email in advance in case we are touring with guests.",
  "48 hours notice is required for lunch or dinner reservations. Dinner is always a delicious set three-course menu.",
  "WhatsApp: +507 6346 0605 - contact@dolphinblueparadise.com",
];

export const metadata: Metadata = {
  title: "Blo Bar & Restaurant",
  description,
};

export default function DiningPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Blo Bar & Restaurant"
        kicker="Dining"
        description={description}
        image="/images/dining-overwater.jpg"
      />

      <section className="section">
        <div className="container space-y-6 text-lg leading-8 text-[var(--color-text-primary)]">
          <p>
            At Dolphin Blue Paradise we prepare delicious homemade food sourced locally. Sustainability guides every plate: we
            cook each dish fresh, minimize food waste, and partner with farmers and fishers across Dolphin Bay.
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Dining Schedule</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map((item) => (
              <Card key={item.meal} className="flex items-center justify-between p-4 text-sm uppercase tracking-[0.2em]">
                <span className="text-[var(--color-navy)]">{item.meal}</span>
                <span className="text-[var(--color-text-muted)]">{item.detail}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4">
          <Card className="space-y-3 bg-white/80 p-8 text-lg text-[var(--color-navy)] shadow-soft">
            <blockquote className="italic">{testimonial}</blockquote>
          </Card>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-3 text-sm text-muted">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">Reservations</h2>
          {reservationNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
