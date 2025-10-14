import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Contact & Book",
  description: "Reach the Dolphin Blue Paradise concierge team to plan your stay.",
};

export default function ContactPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Contact Us"
        kicker="Reserve your stay"
        description="Connect with our concierge team via WhatsApp or email to confirm availability, transportation, and custom itineraries."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container">
          <Card className="space-y-3 p-6 text-sm text-muted">
            {contactInfo.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
}