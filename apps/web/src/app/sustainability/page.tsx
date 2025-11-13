import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CollapsibleSection } from "@/components/collapsible-section";
import { PageNotesEditor } from "@/components/page-notes-editor";
import { stockPhotos } from "@/lib/stock-photos";

export const metadata: Metadata = {
  title: "Sustainability & Our Impact",
  description:
    "100% solar-powered off-grid eco-resort in Bocas del Toro. Learn about our 10kW solar system, sustainable food cycle, Ngäbe-Buglé partnerships, and biodiversity protection.",
};

const impactMetrics = {
  solarCapacity: "10kW",
  localProduce: "95%",
  conservationHours: "8",
  communityPartnerships: "4+",
  waterStorage: "15,000L",
  compostWaste: "100%",
};

export default function SustainabilityPage() {
  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-lg md:text-xl lg:text-2xl text-black mb-4 text-center uppercase whitespace-nowrap" style={{ fontWeight: 100 }}>
            SUSTAINABILITY
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[120px] bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black whitespace-nowrap">Eco Practices</span>
            <div className="h-px flex-1 max-w-[120px] bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
        <Image
          src="/images/impact/impact-hero-multicultural-community-partnership-diverse-team-dolphin-bay.jpeg"
          alt="Multicultural community partnership at Dolphin Blue Paradise, Bocas del Toro - diverse team of staff, Ngäbe-Buglé community members, and guests working together for sustainable tourism and conservation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white max-w-3xl px-4">
          <p className="text-lg md:text-xl font-light italic">
            Every stay supports conservation work and community partnerships in Dolphin Bay
          </p>
        </div>
      </section>

    <div className="space-y-8 pb-8">

      {/* Your Impact - Conserving Our Environment */}
      <section className="section bg-white">
        <div className="container max-w-5xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 text-center uppercase font-light">YOUR IMPACT</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/impact/conserving-environment-nature-trail-guided-walk-tropical-rainforest-dolphin-bay.jpeg"
                alt="Conserving our environment - guided nature walk through tropical rainforest at Dolphin Blue Paradise, Bocas del Toro - guests exploring protected primary rainforest on nature trail"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">CONSERVING OUR ENVIRONMENT</h3>
              <p className="text-lg text-[var(--color-text-primary)] leading-relaxed mb-4">
                By staying at Dolphin Blue Paradise, you become a responsible, mindful traveler who enjoys luxurious, 
                meaningful, and environmentally friendly experiences.
              </p>
            </div>
          </div>

          {/* Start Your Adventure */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="order-2 md:order-1">
              <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">START YOUR ADVENTURE</h3>
              <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
                We operate on green and sustainable energy to preserve our planet. As we adopt an eco-responsible attitude 
                we are always looking for ways to improve.
              </p>
            </div>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
              <Image
                src="/images/impact/start-adventure-sustainable-travel-dolphin-bay.jpeg"
                alt="Start your sustainable adventure at Dolphin Blue Paradise, Bocas del Toro - eco-luxury travel experience"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Our Steps Toward Reducing Our Footprint */}
          <div className="mb-8">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-4">
              <img
                src={stockPhotos.footprint}
                alt="Our Steps Toward Reducing Our Footprint - sustainable infrastructure and eco-friendly practices at Dolphin Blue Paradise"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-lg text-[var(--color-text-primary)] text-center max-w-3xl mx-auto">
              Our eco-resort is 100% off the grid, powered by solar energy and sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Off-Grid Infrastructure */}
      <section className="section bg-[var(--color-sand)]/30">
        <div className="container max-w-6xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">OFF-GRID INFRASTRUCTURE</h2>
          
          {/* Solar System - Full Width Split */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-xl bg-black">
              <img
                src={stockPhotos.solarPanels}
                alt="Solar panels on resort rooftops - 10kW solar installation and renewable energy infrastructure at Dolphin Blue Paradise, Bocas del Toro"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <Card className="p-8 bg-white">
              <div className="mb-4">
                <div className="text-6xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.solarCapacity}</div>
                <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider mb-4">Solar Capacity</div>
              </div>
              <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">SOLAR SYSTEM</h3>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                Our resort operates entirely on solar energy with advanced battery storage systems for 24/7 reliable power.
              </p>
              <CollapsibleSection>
                <ul className="space-y-3 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Advanced battery storage</strong> - 24/7 reliable power supply</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">100% renewable</strong> - Zero carbon emissions from energy</span>
                </li>
              </ul>
              </CollapsibleSection>
            </Card>
          </div>

          {/* Water Systems - Reversed Split */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-8 bg-white order-2 md:order-1">
              <div className="mb-4">
                <div className="text-6xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.waterStorage}</div>
                <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider mb-4">Water Storage Capacity</div>
            </div>
              <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">WATER SYSTEMS</h3>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                Closed-loop rainwater collection and purification provide all drinking water and daily use throughout the resort.
              </p>
              <CollapsibleSection>
                <ul className="space-y-3 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Multi-stage purification</strong> - Clean drinking water for all guests</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Greywater recycling</strong> - Irrigation for gardens and landscaping</span>
                </li>
              </ul>
              </CollapsibleSection>
            </Card>
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-xl bg-black order-1 md:order-2">
              <img
                src={stockPhotos.rainwater}
                alt="15,000L rainwater collection tanks and water filtration system at Dolphin Blue Paradise, Bocas del Toro - sustainable water infrastructure"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Food Cycle */}
      <section className="section bg-white">
        <div className="container max-w-6xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">SUSTAINABLE FOOD CYCLE</h2>
          
          {/* Farm-to-Table - Large Featured Card */}
          <div className="mb-8">
            <Card className="p-0 bg-white overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative w-full h-[400px] md:h-auto min-h-[400px]">
                  <Image
                    src="/images/impact/farm-to-table-tropical-fruits-mangosteen-banana-custard-apple-wooden-bowl.jpeg"
                    alt="Farm-to-table tropical fruits from 5-acre garden at Dolphin Blue Paradise - mangosteen, banana, custard apple, and more, Bocas del Toro"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <div className="text-6xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.localProduce}</div>
                    <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider mb-4">Locally Sourced Produce</div>
                  </div>
                  <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">FARM-TO-TABLE</h3>
                  <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                    Our 5-acre tropical garden, maintained by head gardener Roque, provides 95% of our produce. We source additional ingredients from local Ngäbe-Buglé farmers and sustainable fishers.
                  </p>
                  <CollapsibleSection>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-[var(--color-navy)] mb-2">What We Grow On Site:</h4>
                        <p className="text-sm text-[var(--color-text-muted)] mb-2">
                          We grow tomatoes, cucumber, pepper fruits, eggplant, chili, herbs, katuk, pumpkin, zucchini, ginger, turmeric, vanilla, sometimes kale, lime, coconuts, cacao, mangosteen, mango, pineapple, 16 different types of bananas, rambutan, aqua manzana, mandarins, star fruit, papaya, yuca, potatoes, and many others on site.
                        </p>
                      </div>
                      <ul className="space-y-3 text-[var(--color-text-muted)]">
                        <li className="flex items-start gap-3">
                          <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                          <span><strong className="text-[var(--color-navy)]">Ngäbe-Buglé partnerships</strong> - Fair-trade cacao and indigenous crops</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                          <span><strong className="text-[var(--color-navy)]">Local fishers</strong> - Sustainable seafood from Dolphin Bay waters</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                          <span><strong className="text-[var(--color-navy)]">Neighbor&apos;s farm</strong> - Fresh eggs for our breakfast dishes</span>
                        </li>
                      </ul>
                    </div>
                  </CollapsibleSection>
                </div>
              </div>
            </Card>
          </div>

          {/* Composting & Reusable Materials - Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Composting Card */}
            <Card className="p-8 bg-[var(--color-sand)]/30">
              <div className="relative w-full h-[250px] mb-6 rounded-xl overflow-hidden shadow-lg bg-black">
                <img
                  src={stockPhotos.compost}
                  alt="Composting and waste reduction at Dolphin Blue Paradise - kitchen scraps in compost bins, organic matter composting, sustainable waste management, Bocas del Toro"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mb-4">
                <div className="text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.compostWaste}</div>
                <div className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider mb-4">Food Waste Composted</div>
            </div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">COMPOSTING & WASTE REDUCTION</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                All kitchen scraps are composted and returned to our gardens, creating a closed-loop nutrient cycle.
              </p>
              <CollapsibleSection>
                <ul className="space-y-3 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">100% food waste composting</strong> - All vegetable and fruit scraps</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Zero single-use plastics</strong> - Complete elimination policy</span>
                </li>
              </ul>
              </CollapsibleSection>
            </Card>

            {/* Reusable Materials - Highlighted */}
            <Card className="p-8 bg-gradient-to-br from-[var(--color-forest)]/10 to-[var(--color-ocean)]/10 border-2 border-[var(--color-forest)] shadow-lg">
              <div className="relative w-full h-[250px] mb-6 rounded-xl overflow-hidden bg-black ring-2 ring-[var(--color-forest)]/20">
                <img
                  src={stockPhotos.reusable}
                  alt="Reusable materials at Dolphin Blue Paradise - refillable dispensers, metal silverware, reusable straws, eco-friendly amenities, zero-plastic setup, Bocas del Toro"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-[var(--color-forest)] rounded-full"></div>
                <h4 className="font-display text-2xl text-[var(--color-forest)] uppercase font-semibold">REUSABLE MATERIALS</h4>
              </div>
              <p className="text-[var(--color-text-primary)] text-lg font-medium leading-relaxed mb-3">
                We use reusable shampoos, soaps, body lotions, metal silverware, and straws to eliminate plastic usage.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] italic pt-3 border-t border-[var(--color-forest)]/20">
                Note: Please review this section regarding reusable materials (shampoos, soaps, body lotions, etc.)
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="section bg-[var(--color-sand)]/30">
        <div className="container max-w-6xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">COMMUNITY PROGRAMS</h2>
          
          {/* Ngäbe-Buglé - Split Layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
            <Card className="p-8 bg-white">
              <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">NGÄBE-BUGLÉ COLLABORATION</h3>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                We partner with local Ngäbe-Buglé communities through cultural tours, cacao sourcing, employment, and education support. Partnership established: 2018.
              </p>
              <CollapsibleSection>
                <ul className="space-y-3 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Cultural immersion experiences</strong> - Authentic community tours and workshops</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Fair-trade cacao sourcing</strong> - Direct partnerships with indigenous farmers</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Local employment</strong> - 60% of staff from Ngäbe-Buglé communities</span>
                </li>
              </ul>
              </CollapsibleSection>
            </Card>
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-xl bg-black">
              <img
                src={stockPhotos.community}
                alt="Ngäbe-Buglé community collaboration at Dolphin Blue Paradise - indigenous community members working with resort staff, cultural workshops, cacao farming, community partnerships, Bocas del Toro"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Healthcare & Support - Reversed Split */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-xl bg-black order-2 md:order-1">
              <img
                src={stockPhotos.healthcare}
                alt="Healthcare and support at Dolphin Blue Paradise - Floating Doctors medical mission, healthcare workers with patients, community health outreach, medical volunteers, Bocas del Toro"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <Card className="p-8 bg-white order-1 md:order-2">
              <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">HEALTHCARE & SUPPORT</h3>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                We partner with <strong>Floating Doctors</strong> to provide healthcare to underserved indigenous communities. Many guests use our resort as a base while volunteering.
              </p>
              <div className="pt-4 border-t border-[var(--color-sand)] mb-4">
                <Button 
                  href="https://www.floatingdoctors.com" 
                  variant="secondary"
                  className="w-full md:w-auto mb-4"
                >
                  Visit Floating Doctors →
                </Button>
              </div>
              <CollapsibleSection>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-lg text-[var(--color-navy)] mb-3 uppercase font-light">DONATIONS NEEDED</h4>
                    <p className="text-sm text-[var(--color-text-primary)] mb-3">
                      We are located between the villages of <strong>Aldana, Bocastorito, Tierra Oscura, and Buena Esperanza</strong>. 
                      Needed items: clothing, books, school supplies, solar chargers, mosquito nets, water treatment systems, life vests, sports equipment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-[var(--color-navy)] mb-3 uppercase font-light">EDUCATION SCHOLARSHIPS</h4>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      We support staff and their children with scholarships for vocational training in healthcare or hospitality. 
                      Contact us at{" "}
                      <a 
                        href="mailto:contact@dolphinblueparadise.com" 
                        className="text-[var(--color-ocean)] hover:underline font-semibold"
                      >
                        contact@dolphinblueparadise.com
                      </a>
                      {" "}to sponsor a student.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>
            </Card>
          </div>
        </div>
      </section>

      {/* Biodiversity Protection */}
      <section className="section bg-white">
        <div className="container max-w-6xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">BIODIVERSITY PROTECTION</h2>
          
          {/* Dolphin Monitoring - Full Width Featured */}
          <div className="mb-8">
            <Card className="p-0 bg-white overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative w-full h-[400px] md:h-auto min-h-[400px]">
                  <Image
                    src="/images/impact/dolphin-monitoring-bottlenose-dolphins-breaching-dolphin-bay-conservation.jpeg"
                    alt="Dolphin monitoring in Dolphin Bay - two bottlenose dolphins breaching the water surface at Dolphin Blue Paradise, Bocas del Toro - marine conservation and wildlife protection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="font-display text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">DOLPHIN MONITORING</h3>
                  <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                    We work with marine biologists to monitor the resident bottlenose dolphin pod in Dolphin Bay using eco-friendly observation practices.
                  </p>
                  <CollapsibleSection>
                    <ul className="space-y-3 text-[var(--color-text-muted)]">
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                        <span><strong className="text-[var(--color-navy)]">Regular population monitoring</strong> - Weekly surveys and data collection</span>
                    </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                        <span><strong className="text-[var(--color-navy)]">Eco-friendly guidelines</strong> - Maintain safe distance, no feeding, quiet approach</span>
                    </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                        <span><strong className="text-[var(--color-navy)]">Guest education</strong> - Marine conservation workshops and responsible viewing</span>
                    </li>
                  </ul>
                  </CollapsibleSection>
                </div>
              </div>
            </Card>
          </div>

          {/* Reforestation & Pest Control - Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Reforestation Card */}
            <Card className="p-8 bg-[var(--color-sand)]/30">
              <div className="relative w-full h-[250px] mb-6 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/impact/biodiversity-woodpecker-wildlife-conservation-primary-rainforest.jpeg"
                  alt="Reforestation and habitat protection - woodpecker in primary rainforest habitat at Dolphin Blue Paradise, Bocas del Toro - wildlife conservation and biodiversity protection in protected forest areas"
                  fill
                  className="object-cover"
                />
            </div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">REFORESTATION & HABITAT PROTECTION</h3>
              <p className="text-[var(--color-text-primary)] mb-4">
                We protect and restore primary rainforest on our property, creating wildlife corridors and maintaining the biodiversity that makes Dolphin Bay special.
              </p>
              <CollapsibleSection>
                <ul className="space-y-3 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Primary rainforest preservation</strong> - Protected areas on resort property</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Native tree planting</strong> - 500+ trees planted annually</span>
                </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-gold)] mt-1 font-bold">•</span>
                    <span><strong className="text-[var(--color-navy)]">Wildlife corridors</strong> - Connecting fragmented habitats</span>
                </li>
              </ul>
              </CollapsibleSection>
            </Card>

            {/* Natural Pest Control */}
            <Card className="p-8 bg-white">
              <div className="relative w-full h-[250px] mb-6 rounded-xl overflow-hidden shadow-lg bg-black">
                <img
                  src={stockPhotos.mosquitoNet}
                  alt="Natural pest control at Dolphin Blue Paradise - mosquito net over bed, essential oils for pest control, eco-friendly pest management, Bocas del Toro"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h4 className="font-display text-2xl text-[var(--color-navy)] mb-3 uppercase font-light">NATURAL PEST CONTROL</h4>
              <p className="text-[var(--color-text-primary)]">
                We utilize essential oils for pest control, avoiding harsh chemicals. We recommend using repellent, closing windows at dusk, and using the mosquito nets provided in your rooms.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section bg-[var(--color-sand)]/30">
        <div className="container max-w-6xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-4 text-center uppercase font-light">IMPACT METRICS</h2>
          <p className="text-center text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
            Each stay supports <strong className="text-[var(--color-navy)]">{impactMetrics.conservationHours} hours</strong> of conservation work, 
            community partnerships, and sustainable practices that protect Dolphin Bay for future generations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <Card className="p-6 text-center bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.solarCapacity}</div>
              <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Solar Capacity</div>
            </Card>
            <Card className="p-6 text-center bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.localProduce}</div>
              <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Local Produce</div>
            </Card>
            <Card className="p-6 text-center bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.conservationHours}</div>
              <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Conservation Hours</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">per stay</div>
            </Card>
            <Card className="p-6 text-center bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.communityPartnerships}</div>
              <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Community Partners</div>
            </Card>
            <Card className="p-6 text-center bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.waterStorage}</div>
              <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Water Storage</div>
            </Card>
            <Card className="p-6 text-center bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{impactMetrics.compostWaste}</div>
              <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">Waste Composted</div>
            </Card>
          </div>

          <div className="text-center">
            <Button href="/about" variant="secondary">
              Learn More About Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-[var(--color-forest)] via-[var(--color-navy)] to-[var(--color-forest)] text-white">
        <div className="container max-w-4xl text-center">
          <div className="mb-6">
            <h2 className="font-display text-4xl md:text-5xl mb-4 uppercase font-light">
            Experience Sustainable Luxury
          </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Stay with us and become part of our sustainability story. Every visit supports conservation work, 
            community partnerships, and environmental protection in Dolphin Bay.
          </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="/rooms"
            variant="secondary"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              View Our Rooms →
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Book Your Stay
          </Button>
          </div>
          <p className="text-sm text-white/70 mt-6">
            Questions about our sustainability practices? Contact us for more information.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-4xl">
          <PageNotesEditor pageId="sustainability" />
        </div>
      </section>
    </div>
    </div>
  );
}
