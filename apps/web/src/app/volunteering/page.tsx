import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const introParagraphs = [
  "Dolphin Blue Paradise believes everyone should access safe, science-based healthcare. Whenever possible we volunteer with Floating Doctors, supporting indigenous communities across the Bocas del Toro archipelago.",
  "Many guests join volunteer initiatives and use the resort as their comfortable base while giving back."
];

const donationItems = [
  "Basic clothing and shoes",
  "Books, school bags, and school supplies",
  "Solar chargers",
  "Toiletries",
  "Rain barrels and rainwater catchment systems",
  "Mosquito nets",
  "Laptops",
  "Water treatment systems",
  "Life vests",
  "Sports equipment",
  "Headlamps or bike lights",
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Volunteering & Community",
  description:
    "Learn how Dolphin Blue Paradise partners with local communities and how you can support during your stay.",
};

export default function VolunteeringPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Support Indigenous Communities"
        kicker="Volunteering"
        description="Partner with Floating Doctors, contribute supplies, and sponsor education while staying in Dolphin Bay."
        image="/images/rooms-view.jpg"
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
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Donations Welcome</h2>
          <Card className="space-y-2 p-6 text-sm text-muted">
            <p>
              Dolphin Blue Paradise sits between the indigenous villages of Aldana, Bocastorito, Tierra Oscura, and Buena Esperanza-areas with limited access to healthcare, clean water, and fresh produce. We accept the following items with gratitude:
            </p>
            <ul className="space-y-2">
              {donationItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              To support medical care, visit www.floatingdoctors.com or contact us to coordinate a visit alongside their team.
            </p>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4 text-sm text-muted">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">Education Scholarships</h2>
          <p>
            We sponsor vocational training in healthcare and hospitality for staff members and their children. Email us if you would like to
            fund a student and help create long-term impact in our community.
          </p>
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