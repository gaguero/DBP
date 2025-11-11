import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: "Sustainability & Our Impact",
  description:
    "100% solar-powered resort supporting community & conservation. Learn about our off-grid infrastructure, sustainable food cycle, and biodiversity protection.",
};

const impactMetrics = {
  solarCapacity: "100%",
  localProduce: "95%",
  conservationHours: "X",
  communityPartnerships: "4+",
};

export default function SustainabilityPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Our Impact"
        kicker="Sustainability"
        description="Every stay supports conservation work and community partnerships in Dolphin Bay"
        image="/images/dining-overwater.jpg"
      />

      {/* Off-Grid Infrastructure */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">OFF-GRID INFRASTRUCTURE</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">SOLAR SYSTEM</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                Our resort operates entirely on solar energy with advanced battery storage systems. We monitor energy 
                consumption in real-time to minimize our footprint while maintaining luxury comfort standards.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>100% renewable energy from solar panels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Advanced battery storage for 24/7 power</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Energy monitoring and optimization systems</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">WATER SYSTEMS</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                Closed-loop rainwater collection and purification provide all drinking water and daily use throughout 
                the resort. We minimize water waste through efficient fixtures and greywater recycling.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Rainwater collection and storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Purification for drinking water</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Greywater recycling for gardens</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Food Cycle */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">SUSTAINABLE FOOD CYCLE</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">FARM-TO-TABLE</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                Our 5-acre tropical garden, tended by head gardener Roque, provides 95% of our produce. We source 
                additional ingredients from local Ngäbe-Buglé farmers and sustainable fishers in Dolphin Bay.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Onsite tropical fruit and vegetable garden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Partnerships with indigenous cacao farmers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Sustainable seafood from local fishers</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">COMPOSTING & WASTE REDUCTION</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                All kitchen scraps are composted and returned to our gardens. We&apos;ve eliminated single-use plastics 
                and replaced them with refillable amenities and reusable materials.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>100% food waste composting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Zero single-use plastics policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Refillable toiletries and amenities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">COMMUNITY PROGRAMS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">NGÄBE-BUGLÉ COLLABORATION</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                We partner deeply with local Ngäbe-Buglé communities through cultural tours, cacao sourcing, 
                employment opportunities, and support for education and health initiatives.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Cultural immersion experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Fair-trade cacao sourcing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Local employment and training</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">YOUTH PROGRAMS</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                We support education initiatives, provide scholarships, and create opportunities for local youth 
                to learn about sustainable tourism and conservation.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Educational scholarships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Conservation education programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Volunteer opportunities for guests</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <Button href="/volunteering" variant="secondary">
              Learn About Volunteering Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Biodiversity Protection */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">BIODIVERSITY PROTECTION</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">DOLPHIN MONITORING</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                We work with marine biologists to monitor the resident bottlenose dolphin pod in Dolphin Bay. 
                Our eco-friendly observation practices ensure minimal disturbance to these intelligent mammals.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Regular dolphin population monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Eco-friendly observation guidelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Guest education on marine conservation</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">REFORESTATION & HABITAT PROTECTION</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                We protect and restore primary rainforest on our property, creating corridors for wildlife and 
                maintaining the incredible biodiversity that makes Dolphin Bay special.
              </p>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Primary rainforest preservation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Native tree planting programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>Wildlife habitat protection</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Card className="p-6 bg-white/80">
              <p className="text-[var(--color-text-primary)]">
                <strong>No Single-Use Plastic Policy:</strong> We&apos;ve completely eliminated single-use plastics 
                from our operations. All amenities are refillable, and we provide reusable water bottles, metal 
                straws, and sustainable alternatives throughout the resort.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">IMPACT METRICS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.solarCapacity}</div>
              <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Solar Powered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.localProduce}</div>
              <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Local Produce</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.conservationHours}</div>
              <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Conservation Hours</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">per stay</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.communityPartnerships}</div>
              <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Community Partners</div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-[var(--color-text-primary)] mb-6">
              Each stay supports conservation work, community partnerships, and sustainable practices that protect 
              Dolphin Bay for future generations.
            </p>
            <Button href="/about" variant="secondary">
              Learn More About Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-[var(--color-forest)] to-[var(--color-navy)] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Download Full Sustainability Report
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get detailed information about our environmental practices, community impact, and conservation initiatives.
          </p>
          <Button
            href="/sustainability-report.pdf"
            variant="secondary"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Download PDF →
          </Button>
        </div>
      </section>
    </div>
  );
}
