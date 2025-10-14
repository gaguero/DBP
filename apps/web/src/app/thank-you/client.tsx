"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { trackEvent } from "@/lib/analytics";

export default function ThankYouPageClient() {
  useEffect(() => {
    trackEvent({ event: "lead_submission_success", data: { locale: "en" } });
  }, []);

  return (
    <div className="space-y-12 pb-24">
      <section className="section">
        <div className="container max-w-2xl space-y-6 text-center">
          <h1 className="font-display text-4xl text-[var(--color-navy)]">Thank you for reaching out</h1>
          <p className="text-muted">
            Our concierge team has received your request and will respond within 24 hours with tailored
            recommendations. In the meantime, explore more experiences or download our travel guide.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/experiences">Plan Activities</Button>
            <Button href="/plan-your-journey" variant="secondary">
              Travel Guide
            </Button>
            <Link href="/" className="text-sm font-semibold text-[var(--color-ocean)]">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
