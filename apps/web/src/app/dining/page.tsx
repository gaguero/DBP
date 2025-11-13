import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageNotesEditor } from "@/components/page-notes-editor";
import { CollapsibleSection } from "@/components/collapsible-section";

export const metadata: Metadata = {
  title: "Farm-to-Table Dining Over the Water | Dolphin Blue Paradise",
  description:
    "Farm-to-table dining over the water at Blå Bar & Restaurant. European-inspired menus with locally sourced organic ingredients in Bocas del Toro. Reserve your table today.",
};

const description =
  "We prepare delicious homemade food sourced locally. Homegrown produce, locally sourced organic ingredients, and European-fusion menus at our over-the-water Blå Bar & Restaurant.";

const schedule = [
  { 
    meal: "Breakfast", 
    time: "8:00 am to 9:30 am", 
    detail: "Breakfast for 2 included in the room rate. Always served with fresh tropical fruits, fresh made juice, home baked bread, homemade jams, homemade yogurt with homemade coconut granola, and a different main dish (egg) each day. Filter coffee and tea included." 
  },
  { 
    meal: "Lunch", 
    time: "12:00 pm to 2:30 pm", 
    detail: "French-based menu with quiche, flatbreads, homemade pasta, croque madame, croque monsieur, and salads. A la carte menu. We also provide guests with lunch packs if they order in advance." 
  },
  { 
    meal: "Dinner", 
    time: "7:00 pm to 9:30 pm", 
    detail: "3-course prix fixe menu in an intimate, tranquil setting. Food is sourced locally when possible. We grow as much of our fruit and vegetables as possible and we catch our fish ourselves. Our staff catches lobster, crabs, conch, and octopus when possible." 
  },
  { 
    meal: "Blå Bar", 
    time: "Open anytime for hotel guests", 
    detail: "Blå Bar is open for our guests any time they wish. For outside guests, we are open upon reservation. Hours are flexible. Offers all-day snacks and delightful cocktails." 
  },
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
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
        <Image
          src="/images/dining/dining-hero-bla-bar-restaurant-over-water-dolphin-bay.avif"
          alt="Blå Bar & Restaurant over-the-water dining at Dolphin Blue Paradise, Bocas del Toro - farm-to-table restaurant extending over turquoise Dolphin Bay"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Overview - Chef Philosophy & Locally Sourced Ingredients */}
      {/* Chef Philosophy - Split Screen 50/50 */}
      <section className="section">
        <div className="container max-w-7xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 md:mb-12 text-center uppercase font-light">CHEF PHILOSOPHY</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Side - Left */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-black order-2 md:order-1">
              <Image
                src="/images/dining/chef-philosophy-farm-to-table-fresh-ingredients-kitchen.avif"
                alt="Chef preparing farm-to-table dishes with fresh local ingredients at Blå Bar Restaurant, Dolphin Blue Paradise, Bocas del Toro"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Text Side - Right */}
            <div className="prose prose-lg order-1 md:order-2">
              <p className="text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed">
                I believe in serving fresh, nutritional food for everyone. I create the menu weekly with our gardener, basing the menu 
                on the week&apos;s harvest so we can use as much as possible from our own garden. I believe in reducing food waste and 
                we compost as much of our waste as possible.
              </p>
              
              <p className="text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed">
                I like to experiment with new ingredients and techniques and try to cook every produce how the locals cook it. How it 
                would fit in French cuisine, Asian cuisine, and other nations the ingredient may grow. That way I figure out how best 
                to incorporate the ingredient in our menu.
              </p>
              
              <p className="text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed">
                I started working in restaurants at 18 years old to fund my student years. I catered business dinners (Japanese dinners) 
                through my student years when Japanese food was still not mainstream. Later, I honed my craft as a chef in a French 
                restaurant in Copenhagen, which taught me how food connects people.
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
              <Image
                src="/images/dining/garden-to-table-tropical-produce-fresh-vegetables-fruits.jpg"
                alt="Fresh organic produce from 5-acre tropical garden at Dolphin Blue Paradise - garden-to-table ingredients for Blå Bar Restaurant, Bocas del Toro"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Two Stacked Images - 1/3 width */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full h-[290px] md:h-[290px] rounded-lg overflow-hidden bg-black">
                <Image
                  src="/images/dining/bay-to-plate-sustainable-fishing-fresh-seafood-dolphin-bay.jpg"
                  alt="Sustainable fishing and fresh seafood from Dolphin Bay - bay-to-plate sourcing for Blå Bar Restaurant at Dolphin Blue Paradise, Bocas del Toro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-[290px] md:h-[290px] rounded-lg overflow-hidden bg-black">
                <Image
                  src="/images/dining/ngabe-bugle-cacao-farmer-community-partnership-chocolate.jpg"
                  alt="Ngäbe-Buglé community member with fresh cacao pods - community partnership for farm-to-table ingredients at Dolphin Blue Paradise, Bocas del Toro"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Content Below Images */}
          <div className="prose prose-lg mx-auto max-w-4xl mt-8">
            <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
              <strong>Garden-to-Table:</strong> Our 5-acre tropical garden provides fresh herbs, vegetables, and fruits 
              that change with the seasons. We grow tomatoes, cucumber, pepper fruits, eggplant, chili, herbs, katuk, pumpkin, 
              zucchini, ginger, turmeric, vanilla, sometimes kale, lime, coconuts, cacao, mangosteen, mango, pineapple, 16 different 
              types of bananas, rambutan, aqua manzana, mandarins, star fruit, papaya, yuca, potatoes, and many others on site. 
              Roque, our head gardener and naturalist, works closely with the kitchen to plan menus centered around what&apos;s 
              flourishing in the area.
            </p>
            
            <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
              <strong>Bay-to-Plate:</strong> We catch our own seafood daily from Dolphin Bay, ensuring the freshest fish 
              and shellfish. Our staff catches lobster, crabs, conch, and octopus when possible. Marcus, our activities manager 
              and experienced deep-sea fisherman, practices sustainable fishing methods that protect the marine ecosystem. As our 
              Grill Pit Master, Marcus brings his expertise to every seafood dish, and his Old Fashioned cocktails are legendary.
            </p>
            
            <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
              <strong>Farm Fresh Eggs:</strong> We get eggs from a neighbor&apos;s farm, ensuring the freshest eggs for our 
              breakfast dishes.
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
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl text-[var(--color-navy)] uppercase font-light">{item.meal.toUpperCase()}</h3>
                  {item.time && (
                    <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider whitespace-nowrap ml-4">
                      {item.time}
                    </span>
                  )}
                </div>
                {item.detail && (
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{item.detail}</p>
                )}
              </Card>
            ))}
          </div>

          <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-black">
            {/* Note: Menu image can be added here when available */}
          </div>

          <div className="text-center">
            <Button href="/menus" variant="secondary" className="text-lg px-8 py-4">
              View Sample Menus (PDF) →
            </Button>
            <p className="text-sm text-[var(--color-text-muted)] mt-4 italic">
              Download our seasonal menus featuring current garden harvests and daily specials. We always vary what we serve based on our own harvest. We prioritize food allergy awareness and can accommodate dietary restrictions with 48-hour advance notice.
            </p>
            
            {/* Dietary Accommodations */}
            <div className="mt-8 max-w-4xl mx-auto">
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 text-center uppercase font-light">DIETARY ACCOMMODATIONS</h3>
              <CollapsibleSection>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <Card className="p-4 bg-white/50">
                    <h4 className="font-semibold text-[var(--color-navy)] mb-2">Vegetarian</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">Yes, most dishes can be made vegetarian.</p>
                  </Card>
                  <Card className="p-4 bg-white/50">
                    <h4 className="font-semibold text-[var(--color-navy)] mb-2">Vegan</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">We have a number of dishes that are vegan.</p>
                  </Card>
                  <Card className="p-4 bg-white/50">
                    <h4 className="font-semibold text-[var(--color-navy)] mb-2">Gluten-Free</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">We can cater to gluten-free dietary choices. Being remote, we cannot guarantee 100% gluten-free environment. When a guest notifies us of gluten sensitivities, our chef contacts the guest to find out severity and options. We do bake our own gluten-free breads for guests and are able to accommodate most sensitivities. Guests with Celiac disease should consult with their doctor to determine if our precautions are enough.</p>
                  </Card>
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section">
        <div className="container max-w-3xl">
          <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden bg-black">
            <Image
              src="/images/dining/testimonial-chef-plating-fresh-dish-kitchen.jpg"
              alt="Chef carefully plating farm-to-table dish at Blå Bar Restaurant, Dolphin Blue Paradise, Bocas del Toro"
              fill
              className="object-cover"
            />
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
          
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-black">
            <Image
              src="/images/dining/locals-welcome-restaurant-exterior-entrance.jpg"
              alt="Welcoming exterior of Blå Bar & Restaurant - open to locals and hotel guests, Dolphin Blue Paradise, Bocas del Toro"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm mb-6">
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                <strong>Locals and non-hotel guests are always welcome!</strong> We&apos;d love to have you join us for a drink 
                or meal at Blå Bar & Restaurant. Our over-the-water dining experience is open to everyone who appreciates 
                farm-to-table cuisine and stunning Dolphin Bay views.
              </p>
              <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed">
                Blå Bar is open for our hotel guests any time they wish. For outside guests, we are open upon reservation. 
                Hours are flexible. Please contact us in advance, especially if we&apos;re touring with guests or during peak seasons. 
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
      <section className="section !pt-0 bg-gradient-to-b from-[var(--color-sand)] to-white">
        <div className="container max-w-4xl">
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-black">
            <Image
              src="/images/dining/reserve-table-empty-table-golden-hour-bay-view.jpg"
              alt="Reserve your table at Blå Bar Restaurant - elegant dining setting with Dolphin Bay view, Dolphin Blue Paradise, Bocas del Toro"
              fill
              className="object-cover"
            />
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
