import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { LegacyContent } from "@/components/legacy-content";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: "Get in touch with Dolphin Blue Paradise concierge to plan your stay, experiences, or community involvement.",
};

export default function ContactPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const hasError = typeof searchParams?.error === "string";

  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Let&apos;s Plan Your Escape"
        kicker="Contact"
        description="Share your travel dates, interests, and any special requests. Our concierge will respond within 24 hours with tailored options."
        image="/images/rooms-view.jpg"
      />

      {hasError ? (
        <div className="container mt-10">
          <div className="card bg-[var(--color-sand)] text-sm text-[var(--color-navy)]">
            There was an issue submitting your request. Please try again or email us directly at
            contact@dolphinblueparadise.com.
          </div>
        </div>
      ) : null}

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <form className="card space-y-4" action="/api/lead" method="post" data-crm="espocrm">
            <input type="hidden" name="locale" value="en" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Full Name *</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Email *</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Preferred WhatsApp/Phone</span>
                <input
                  type="tel"
                  name="phone"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Preferred Language</span>
                <select
                  name="language"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Arrival Date</span>
                <input
                  type="date"
                  name="arrival"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Departure Date</span>
                <input
                  type="date"
                  name="departure"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
            </div>
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-[var(--color-navy)]">Interests</span>
              <select
                name="interests"
                multiple
                className="h-28 w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
              >
                <option value="rooms">Rooms &amp; Suites</option>
                <option value="dining">Private Dining</option>
                <option value="experiences">Activities &amp; Excursions</option>
                <option value="wellness">Wellness Retreats</option>
                <option value="volunteering">Volunteering</option>
              </select>
              <span className="block text-xs text-muted">Hold Ctrl or Command to select multiple.</span>
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-[var(--color-navy)]">Tell us about your trip *</span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" name="consent" required />
              <span>
                I agree to the privacy policy and consent to receive trip planning communications from Dolphin Blue
                Paradise.
              </span>
            </label>
            <Button type="submit" className="w-full" trackingEvent="lead_form_submit" trackingData={{ locale: "en" }}>
              Submit Inquiry
            </Button>
          </form>

          <Card className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Direct Lines</h2>
            <div className="space-y-2 text-sm text-muted">
              <p>
                WhatsApp: <Link href="https://wa.me/50763460605" className="font-semibold">+507 6346 0605</Link>
              </p>
              <p>
                Email: <a href="mailto:contact@dolphinblueparadise.com" className="font-semibold">contact@dolphinblueparadise.com</a>
              </p>
              <p>Address: Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama</p>
            </div>
            <Button
              href="https://maps.app.goo.gl/VLQArMMMjA3a7EB59"
              variant="secondary"
              className="w-full"
              target="_blank"
              trackingEvent="contact_map_click"
              trackingData={{ locale: "en" }}
            >
              View Dock Pickup Map
            </Button>
            <Button
              href="#booking"
              className="w-full"
              trackingEvent="contact_jump_booking"
              trackingData={{ locale: "en" }}
            >
              Jump to Booking Widget
            </Button>
          </Card>
        </div>
      </section>

      <LegacyContent
        page="contact"
        description="Legacy reservation instructions are retained here for reference."
      />
    </div>
  );
}
