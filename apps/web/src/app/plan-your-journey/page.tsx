import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { travelRoutes, faqs } from "@/content/data";

export const metadata: Metadata = {
  title: "How to Get to Dolphin Blue Paradise",
  description:
    "Directions to our eco-luxury resort on Isla San Cristóbal. Travel options from Panama City, Costa Rica, and regional airports with step-by-step guidance.",
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
  {
    category: "Electronics",
    items: [
      "Camera and waterproof case",
      "Phone and charger",
      "Portable power bank",
      "Waterproof bag for electronics",
    ],
  },
  {
    category: "Optional",
    items: [
      "Binoculars for wildlife watching",
      "Snorkel gear (we provide, but you can bring your own)",
      "Books or e-reader",
      "Reusable water bottle",
    ],
  },
];

export default function PlanYourJourneyPage() {
  const description = "Step-by-step travel options from Panama City, Costa Rica, and regional airports to Isla San Cristóbal";
  
  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            GETTING HERE
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">Travel Logistics</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src="/images/hero-bay.jpg"
          alt="Getting here"
          fill
          className="object-cover"
          priority
        />
      </section>

    <div className="space-y-24 pb-24">

      {/* Interactive Map Section */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 text-center">Interactive Map</h2>
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

      {/* Step-by-Step Travel Options */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Step-by-Step Travel Options</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {travelRoutes.map((route, idx) => (
              <Card key={route.title} className="space-y-4 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="font-display text-xl text-[var(--color-navy)]">{route.title}</h3>
                </div>
                <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
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
          <div className="mt-8 text-center">
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              We coordinate every step of your journey—from domestic flights and private drivers to boat transfers and dock pickups.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Arrival support covers logistics from Panama City, Costa Rica, David, Boquete, and beyond so you can travel confidently to Isla San Cristóbal.
            </p>
          </div>
        </div>
      </section>

      {/* Packing List */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Packing List</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {packingList.map((category) => (
              <Card key={category.category} className="p-6">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                      <span className="text-[var(--color-gold)] mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-3">{faq.question}</h3>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  {faq.answerItems?.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-[var(--color-gold)] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Support */}
      <section className="section">
        <div className="container max-w-4xl">
          <Card className="p-8 bg-gradient-to-br from-[var(--color-ocean)] to-[var(--color-forest)] text-white">
            <h2 className="font-display text-3xl mb-4">Concierge Support</h2>
            <p className="text-lg text-white/90 mb-6">
              Share your flight details and we coordinate transfers from Bocas Town or Tierra Oscura at our scheduled 
              pick-up windows (12:30 pm and 5:00 pm). Late arrivals are available with advance notice.
            </p>
            <div className="space-y-2 mb-6">
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a href="https://wa.me/50763460605" className="underline hover:text-white/80">
                  +507 6346 0605
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@dolphinblueparadise.com" className="underline hover:text-white/80">
                  contact@dolphinblueparadise.com
                </a>
              </p>
            </div>
            <Button
              href="/contact"
              variant="secondary"
              className="bg-white text-[var(--color-ocean)] border-white hover:bg-white/90"
            >
              Plan My Trip
            </Button>
          </Card>
        </div>
      </section>

      {/* Downloadable Travel Factsheet */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6">Download Travel Factsheet</h2>
          <p className="text-lg text-[var(--color-text-primary)] mb-8">
            Get a comprehensive PDF guide with all travel information, packing tips, and helpful resources for your journey to Dolphin Blue Paradise.
          </p>
          <Button
            href="/travel-factsheet.pdf"
            variant="primary"
            className="text-lg px-8 py-4"
          >
            Download Travel Factsheet (PDF) →
          </Button>
        </div>
      </section>
    </div>
    </div>
  );
}
