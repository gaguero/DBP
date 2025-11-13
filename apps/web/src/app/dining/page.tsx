import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageNotesEditor } from "@/components/page-notes-editor";

export const metadata: Metadata = {
  title: "Farm-to-Table Dining Over the Water | Dolphin Blue Paradise",
  description:
    "Farm-to-table dining over the water at Blå Bar & Restaurant. European-inspired menus with locally sourced organic ingredients in Bocas del Toro. Reserve your table today.",
};

const description =
  "We prepare delicious homemade food sourced locally. Homegrown produce, locally sourced organic ingredients, and European-fusion menus at our over-the-water Blå Bar & Restaurant.";

const schedule = [
  { meal: "Breakfast", time: "8:00 am to 9:30 am", detail: "" },
  { meal: "Lunch", time: "12:00 pm to 2:30 pm", detail: "" },
  { meal: "Dinner", time: "7:00 pm to 9:30 pm", detail: "featuring a set 3-course menu" },
  { meal: "Blå Bar", time: "", detail: "Offers all-day snacks and delightful cocktails" },
];

const testimonial =
  "Markus makes excellent cocktails, and the cuisine is also remarkable. We had fantastic meat and fresh fish caught by Markus not far away. Yu prepares juices, ice creams, and other drinks with local fruit, all worth trying!";

export default function DiningPage() {
  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            FARM-TO-TABLE DINING
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic text-sm md:text-base font-serif text-black">Blå Bar & Restaurant</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {/* VISUAL SUGGESTION: Wide shot of the over-the-water restaurant with turquoise waters below, 
          showing the dining deck extending over Dolphin Bay. Golden hour lighting preferred. 
          Alternative: Aerial view of the restaurant structure over the water. */}
      {/* PLACEHOLDER: Replace with actual image when available */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
      </section>

      {/* Overview - Chef Philosophy & Locally Sourced Ingredients */}
      {/* Chef Philosophy - Split Screen 50/50 */}
      <section className="section">
        <div className="container max-w-7xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 md:mb-12 text-center uppercase font-light">CHEF PHILOSOPHY</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Side - Left */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-black order-2 md:order-1">
              {/* VISUAL SUGGESTION: Chef in the kitchen preparing a dish, or close-up of hands plating food with fresh ingredients */}
              {/* PLACEHOLDER: Replace with actual image when available */}
            </div>
            
            {/* Text Side - Right */}
            <div className="prose prose-lg order-1 md:order-2">
              <p className="text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed">
                At Dolphin Blue Paradise, our culinary philosophy is rooted in three core principles: <strong>sustainability, 
                seasonality, and community</strong>. We believe that exceptional dining begins with exceptional ingredients, 
                which is why we source directly from our tropical gardens, local farms, and indigenous Ngäbe-Buglé communities 
                throughout Bocas del Toro.
              </p>
              
              <p className="text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed">
                Yuh, our owner and creator, brings her passion for haute cuisine to every dish. Having honed her craft as a chef 
                in a French restaurant in Copenhagen and catering private Japanese business dinners, she understands how food connects 
                people. Today, she curates farm-to-table experiences that combine European culinary techniques with Panamanian flavors, 
                creating dishes that honor both tradition and innovation.
              </p>
              
              <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
                Every plate tells a story—from the cacao harvested by Roque&apos;s mother&apos;s co-op to the fresh fish caught daily 
                in Dolphin Bay. We cook each dish fresh to order, minimize food waste through composting and careful menu planning, 
                and celebrate the natural flavors of ingredients at their peak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locally Sourced Organic Ingredients - Asymmetric Layout */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-7xl">
          <h3 className="font-display text-4xl text-[var(--color-navy)] mb-8 md:mb-12 text-center uppercase font-light">LOCALLY SOURCED ORGANIC INGREDIENTS</h3>
          
          {/* Asymmetric Layout: Large image (2/3) + Two stacked images (1/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Large Image - 2/3 width */}
            <div className="relative w-full h-[400px] md:h-[600px] md:col-span-2 rounded-lg overflow-hidden bg-black">
              {/* VISUAL SUGGESTION: Fresh organic produce from our tropical gardens - wide shot showing abundance */}
              {/* PLACEHOLDER: Replace with actual image when available */}
            </div>
            
            {/* Two Stacked Images - 1/3 width */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full h-[290px] md:h-[290px] rounded-lg overflow-hidden bg-black">
                {/* VISUAL SUGGESTION: Local fisherman with fresh catch from Dolphin Bay */}
                {/* PLACEHOLDER: Replace with actual image when available */}
              </div>
              <div className="relative w-full h-[290px] md:h-[290px] rounded-lg overflow-hidden bg-black">
                {/* VISUAL SUGGESTION: Indigenous farmer with cacao from Ngäbe-Buglé communities */}
                {/* PLACEHOLDER: Replace with actual image when available */}
              </div>
            </div>
          </div>

          {/* Text Content Below Images */}
          <div className="prose prose-lg mx-auto max-w-4xl mt-8">
            <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
              <strong>Garden-to-Table:</strong> Our 5-acre tropical garden provides fresh herbs, vegetables, and fruits 
              that change with the seasons. Roque, our head gardener and naturalist, works closely with the kitchen to plan 
              menus centered around what&apos;s flourishing in the area.
            </p>
            
            <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
              <strong>Bay-to-Plate:</strong> We catch our own seafood daily from Dolphin Bay, ensuring the freshest fish 
              and shellfish. Marcus, our activities manager and experienced deep-sea fisherman, practices sustainable fishing 
              methods that protect the marine ecosystem. As our Grill Pit Master, Marcus brings his expertise to every seafood 
              dish, and his Old Fashioned cocktails are legendary.
            </p>
            
            <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
              <strong>Community Partnerships:</strong> We partner directly with Ngäbe-Buglé indigenous communities for 
              cacao, nutmeg, and other specialty ingredients. We procure cacao and nutmeg from Roque&apos;s mother&apos;s 
              chocolate-nutmeg co-op on the mainland, and we bring our coconuts from our garden to the co-op so they can 
              make coconut oil from our own coconuts for our guests.
            </p>
            
            <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
              <strong>Made from Scratch:</strong> We believe in holistic nutrition and nutritional wellness. We make as much 
              of the food from scratch as possible—we ferment vegetables, bake our own breads, make homemade yogurt, and make 
              our own pasta. We will never compromise and use canned food or store-bought pre-made mixes. Every dish is prepared 
              fresh with care and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Menus & Schedule */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">MENUS & SCHEDULE</h2>
          
          {/* VISUAL SUGGESTION: Beautifully plated dishes representing each meal - breakfast spread, lunch dish, dinner presentation, cocktails */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-8">
            {schedule.map((item) => (
              <Card key={item.meal} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-2xl text-[var(--color-navy)] uppercase font-light">{item.meal.toUpperCase()}</h3>
                  {item.time && (
                    <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                      {item.time}
                    </span>
                  )}
                </div>
                {item.detail && (
                  <p className="text-[var(--color-text-muted)]">{item.detail}</p>
                )}
              </Card>
            ))}
          </div>

          {/* VISUAL SUGGESTION: Sample menu pages laid out on a table, or a close-up of a beautifully designed menu */}
          {/* PLACEHOLDER: Replace with actual image when available */}
          <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-black">
            {/* Image: Sample menu pages or beautifully designed menu */}
          </div>

          <div className="text-center">
            <Button href="/menus" variant="secondary" className="text-lg px-8 py-4">
              View Sample Menus (PDF) →
            </Button>
            <p className="text-sm text-[var(--color-text-muted)] mt-4 italic">
              Download our seasonal menus featuring current garden harvests and daily specials. We prioritize food allergy awareness and can accommodate dietary restrictions with 48-hour advance notice.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {/* VISUAL SUGGESTION: Guests enjoying dinner at sunset on the over-the-water deck, or a beautifully plated dinner with Dolphin Bay in background */}
      {/* PLACEHOLDER: Replace with actual image when available */}
      <section className="section">
        <div className="container max-w-3xl">
          <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden bg-black">
            {/* Image: Guests enjoying dinner at sunset or beautifully plated dinner with Dolphin Bay in background */}
          </div>
          <Card className="space-y-3 bg-white/80 p-8 text-lg text-[var(--color-navy)] shadow-soft">
            <blockquote className="italic text-xl leading-relaxed">&quot;{testimonial}&quot;</blockquote>
            <cite className="not-italic text-sm text-[var(--color-text-muted)]">— Recent Guest</cite>
          </Card>
        </div>
      </section>

      {/* Locals Dining Policy */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">LOCALS DINING POLICY</h2>
          
          {/* VISUAL SUGGESTION: Local guests or families enjoying a meal together, or a welcoming scene of the restaurant from the water approach */}
          {/* PLACEHOLDER: Replace with actual image when available */}
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-black">
            {/* Image: Local guests or families enjoying a meal, or welcoming scene of restaurant from water approach */}
          </div>

          <div className="prose prose-lg mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm mb-6">
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                <strong>Locals and non-hotel guests are always welcome!</strong> We&apos;d love to have you join us for a drink 
                or meal at Blå Bar & Restaurant. Our over-the-water dining experience is open to everyone who appreciates 
                farm-to-table cuisine and stunning Dolphin Bay views.
              </p>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                Please contact us in advance, especially if we&apos;re touring with guests or during peak seasons. 
                This helps us prepare for your visit.
              </p>
            </div>

            <div className="bg-[var(--color-ocean)]/5 border-l-4 border-[var(--color-gold)] p-6 rounded mb-0">
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">48-HOUR ADVANCE NOTICE REQUIRED</h3>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                <strong>For lunch or dinner reservations, we require 48-hour advance notice.</strong> This policy allows us to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[var(--color-text-primary)] mb-4 ml-4">
                <li>Source ingredients from our gardens and local suppliers</li>
                <li>Prepare our set 3-course dinner menu with care and attention to detail</li>
                <li>Accommodate dietary restrictions, food allergies, and preferences</li>
                <li>Ensure we have adequate staff to provide exceptional service</li>
                <li>Plan menus around seasonal availability</li>
              </ul>
              <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
                Dinner service features a set 3-course menu showcasing what&apos;s in season from our gardens and the bay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* VISUAL SUGGESTION: Sunset view from the restaurant deck, or an inviting wide shot of the restaurant with warm lighting */}
      {/* PLACEHOLDER: Replace with actual image when available */}
      <section className="section !pt-0 bg-gradient-to-b from-[var(--color-sand)] to-white">
        <div className="container max-w-4xl">
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-black">
            {/* Image: Sunset view from restaurant deck or inviting wide shot with warm lighting */}
          </div>
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-navy)] mb-6 uppercase font-light">
              RESERVE YOUR TABLE
            </h2>
            <p className="text-lg text-[var(--color-text-primary)] mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience our farm-to-table dining. Contact us to secure your reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                href="https://wa.me/50763460605" 
                variant="primary" 
                className="text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve via WhatsApp
              </Button>
              <Button 
                href="mailto:contact@dolphinblueparadise.com?subject=Dining Reservation Request" 
                variant="secondary" 
                className="text-lg px-8 py-4"
              >
                Reserve via Email
              </Button>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-6 italic">
              Remember: 48-hour advance notice required for lunch and dinner reservations
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-4xl">
          <PageNotesEditor pageId="dining" />
        </div>
      </section>
    </div>
  );
}
