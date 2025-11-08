import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { travelRoutes, faqs } from "@/content/data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Dolphin Blue Paradise",
  description:
    "Plan your stay and contact us directly. Book your eco-luxury escape in Bocas del Toro via WhatsApp, email, or our booking widget.",
};

const packingList = [
  { category: "Essentials", items: ["Passport and travel documents", "Travel insurance", "Cash (USD)", "Credit cards"] },
  {
    category: "Clothing",
    items: [
      "Lightweight, breathable clothing",
      "Swimwear (multiple sets)",
      "Sun hat and sunglasses",
      "Light rain jacket",
      "Comfortable walking shoes",
      "Sandals or water shoes",
    ],
  },
  {
    category: "Health & Safety",
    items: [
      "Reef-safe sunscreen (SPF 30+)",
      "Insect repellent (DEET-free recommended)",
      "Prescription medications",
      "First aid kit",
      "Motion sickness medication (for boat transfers)",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Contact & Reservations"
        kicker="Plan Your Stay"
        description="Connect with our concierge team via WhatsApp, email, or book directly. We&apos;re here to help plan your perfect escape."
        image="/images/rooms-view.jpg"
      />

      {/* Multi-Channel Contact */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-display text-xl text-[var(--color-navy)] mb-3">WhatsApp</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">Instant messaging for quick questions</p>
              <Button
                href="https://wa.me/50763460605"
                variant="primary"
                className="w-full"
              >
                Message Us on WhatsApp
              </Button>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-display text-xl text-[var(--color-navy)] mb-3">Email</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">For detailed inquiries and planning</p>
              <Button
                href="mailto:contact@dolphinblueparadise.com"
                variant="secondary"
                className="w-full"
              >
                Send Email
              </Button>
            </Card>
          </div>
          <div className="mt-6 text-center text-[var(--color-text-muted)]">
            <p>Phone: +507 6346 0605</p>
            <p className="mt-2">Isla San Cristóbal - Bahia Delfines - Bocas del Toro - Panama</p>
          </div>
        </div>
      </section>

      {/* Live Booking Widget */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Book Your Stay</h2>
          <BookingWidgetPlaceholder />
        </div>
      </section>

      {/* Location Map */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 text-center">Location</h2>
          <div className="relative h-96 rounded overflow-hidden border border-black/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15766.123456789!2d-82.234567!3d9.345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjAnNDQuNCJOIDgywrAxNCcwNC40Ilc!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dolphin Blue Paradise Location Map"
            />
          </div>
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">
            Isla San Cristóbal, Dolphin Bay, Bocas del Toro, Panama
          </p>
        </div>
      </section>

      {/* Getting Here - Travel Logistics */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Getting Here</h2>
          
          {/* Visual Journey Map */}
          <div className="mb-12">
            <h3 className="font-display text-2xl text-[var(--color-navy)] mb-6 text-center">Your Journey to Paradise</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold mb-2">1</div>
                <p className="text-sm font-semibold">Panama City</p>
                <p className="text-xs text-[var(--color-text-muted)]">International Flight</p>
              </div>
              <div className="text-[var(--color-gold)] text-2xl">→</div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold mb-2">2</div>
                <p className="text-sm font-semibold">Bocas Town</p>
                <p className="text-xs text-[var(--color-text-muted)]">Regional Flight</p>
              </div>
              <div className="text-[var(--color-gold)] text-2xl">→</div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold mb-2">3</div>
                <p className="text-sm font-semibold">Isla San Cristóbal</p>
                <p className="text-xs text-[var(--color-text-muted)]">Water Taxi</p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="mb-12">
            <h3 className="font-display text-2xl text-[var(--color-navy)] mb-6">Travel Routes</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {travelRoutes.map((route, idx) => (
                <Card key={idx} className="p-6">
                  <h4 className="font-display text-xl text-[var(--color-navy)] mb-4">{route.title}</h4>
                  <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                    {route.options.map((option, optIdx) => (
                      <li key={optIdx} className="flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">•</span>
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* Packing List */}
          <div className="mb-8">
            <h3 className="font-display text-2xl text-[var(--color-navy)] mb-6">Recommended Packing List</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {packingList.map((category) => (
                <Card key={category.category} className="p-4">
                  <h4 className="font-semibold text-[var(--color-navy)] mb-3">{category.category}</h4>
                  <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* Best Travel Times */}
          <Card className="p-6 bg-white/80 mb-8">
            <h3 className="font-display text-xl text-[var(--color-navy)] mb-4">Best Travel Times by Season</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--color-text-muted)]">
              <div>
                <p className="font-semibold text-[var(--color-navy)] mb-2">Dry Season (December - April)</p>
                <p>Best weather, ideal for all activities including surfing. Peak season - book early.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-navy)] mb-2">Green Season (May - November)</p>
                <p>Lush landscapes, fewer crowds, occasional rain. Great for nature enthusiasts.</p>
              </div>
            </div>
          </Card>

          {/* Downloadable Travel Factsheet */}
          <div className="text-center">
            <Button
              href="/travel-factsheet.pdf"
              variant="primary"
              className="text-lg px-8 py-4"
            >
              Download Travel Factsheet (PDF) →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs - Interactive Accordion */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border border-black/10 rounded overflow-hidden">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-[var(--color-sand)] transition-colors">
                  <span className="font-semibold text-[var(--color-navy)] pr-4">{faq.question}</span>
                  <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-[var(--color-text-muted)] bg-white">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Support CTA */}
      <section className="section bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-forest)] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">Need Help Planning Your Trip?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our concierge team coordinates every detail—from flights to boat transfers. Share your travel dates and we&apos;ll handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="https://wa.me/50763460605"
              variant="secondary"
              className="bg-white text-[var(--color-ocean)] border-white hover:bg-white/90"
            >
              WhatsApp Concierge
            </Button>
            <Button
              href="mailto:contact@dolphinblueparadise.com"
              variant="secondary"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Email Concierge
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
