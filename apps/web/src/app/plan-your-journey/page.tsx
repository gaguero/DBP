import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { travelRoutes, faqs } from "@/content/data";

const introduction = [
  "We coordinate every step of your journey to Dolphin Blue Paradise-from domestic flights and private drivers to boat transfers and dock pickups.",
  "Arrival support covers logistics from Panama City, Costa Rica, David, Boquete, and beyond so you can travel confidently to Isla San Cristobal." ,
];

export const metadata: Metadata = {
  title: "Plan Your Journey",
  description:
    "Everything you need to reach Dolphin Blue Paradise: travel routes, transfers, packing tips, and FAQs.",
};

export default function PlanYourJourneyPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="From Airport to Paradise"
        kicker="Travel logistics"
        description="Review travel routes, transfer options, and concierge support for your arrival in Dolphin Bay."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          {introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Travel Routes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {travelRoutes.map((route) => (
              <Card key={route.title} className="space-y-3 p-6">
                <h3 className="font-display text-xl text-[var(--color-navy)]">{route.title}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  {route.options.map((option) => (
                    <li key={option} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <p className="font-semibold text-[var(--color-navy)]">{faq.question}</p>
                  <p className="text-sm text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="space-y-3 p-6 text-sm text-muted">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Concierge Support</h3>
            <p>
              Share your flight details and we coordinate transfers from Bocas Town or Tierra Oscura at our scheduled pick-up
              windows (12:30 pm and 5:00 pm). Late arrivals are available with advance notice.
            </p>
            <p>WhatsApp: +507 6346 0605 - contact@dolphinblueparadise.com</p>
          </Card>
        </div>
      </section>
    </div>
  );
}