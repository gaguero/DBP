import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "About Dolphin Blue Paradise",
  description:
    "Learn about our mission, team, and sustainability practices. Discover the story behind Panama&apos;s premier eco-luxury resort.",
};

const teamMembers = [
  {
    name: "Yuh Schabacker-Koppel",
    role: "Managing Director",
    bio: "Owner and creator of the Dolphin Blue Paradise concept. A passionate entrepreneur dedicated to innovation and creating meaningful change, Yuh curates farm-to-table experiences and trains locals in sustainable cooking, nutritional wellness, and regenerative food systems.",
    quote: "We believe that eco tourism can be luxurious without compromising on main comforts. Every aspect of our operation reflects our commitment to sustainability, community, and exceptional hospitality.",
  },
  {
    name: "Oscar Santos",
    role: "Operations & Guest Experience",
    bio: "Oscar came to us in 2024 and started as a trainee. He is working in all departments from helping with bookkeeping to tours and has quickly demonstrated his talent for fine cuisine. Guests love Oscar's big smile and helpful soul. Oscar is responsible for our popular medium hike from Dolphin Bay to San Cristobal, a 3 hour hike crossing 2 rivers, which he did himself every day through high school.",
    quote: "I'm learning something new every day here. Whether it's in the kitchen, on a tour, or helping guests, I love being part of the Dolphin Blue Paradise family.",
  },
  {
    name: "Marcus Schabacker, MD, PhD",
    role: "Activities Manager",
    bio: "Responsible for boat & fishing tours. An avid deep sea fisher who has fished oceans around the world, Marcus has a sound understanding for sustainable fishing and boat safety. He is an Auxiliary US Coast Guard and volunteers for Floating Doctors providing essential health care to indigenous communities.",
    quote: "Being able to fish year round in Bocas Del Toro without freezing is one of the great perks of living here. We practice sustainable fishing and ensure every guest experience is both safe and memorable.",
  },
  {
    name: "Roque Small",
    role: "Head Gardener, Naturalist (Nature Expert)",
    bio: "Roque has worked at Dolphin Blue Paradise for 24 years and was responsible for creating the hiking paths on the southern part of Isla San Cristobal. Roque is a living encyclopedia of all the animals and plants in the archipelago. Taking a hiking tour with Roque through our primary rainforest is an unforgettable nature experience.",
    quote: "The rainforest has so many stories to tell. Every plant, every animal has a purpose. I love sharing this knowledge with our guests and showing them the beauty of our island.",
  },
];

const pressLogos = [
  { 
    name: "Finans.dk", 
    description: "Featured in Danish newspaper and magazines",
    link: "https://finans.dk/karriere/ECE14292863/hun-faldt-pladask-for-panamas-skoenne-natur-og-venlige-befolkning/",
  },
];

const promisePillars = [
  {
    title: "Personalization",
    description:
      "Every stay is tailored to your interests, dietary needs, and travel style. We provide fully personalized and memorable experiences with farm-to-table meals, customized excursions, and special dietary accommodations. To alleviate any concerns, we address all travel details, from flights to the final boat ride. Our attentive service and tailored itineraries ensure every detail is perfectly suited to you.",
  },
  {
    title: "Sustainability",
    description:
      "100% solar-powered and rainwater-operated, zero-waste operations, and deep community partnerships. We grow our own produce, catch our own seafood, and make everything from scratch. Your stay directly supports conservation and local communities.",
  },
  {
    title: "Comfort",
    description:
      "Luxurious accommodations with organic linens, modern amenities, and thoughtful touches. We believe that eco tourism can be luxurious without compromising on main comforts. Experience eco-luxury without compromise.",
  },
];

const partners = [
  { 
    name: "Ngäbe-Buglé Indigenous Communities", 
    description: "We partner with Roque's mother's chocolate-nutmeg co-op on the mainland, procuring cacao and nutmeg directly from indigenous cooperatives. We also sell muchillas (traditional bags) from the ladies at the coop and bring our coconuts from our garden to the coop so they can make coconut oil from our own coconuts for our guests. We employ and train indigenous staff from villages surrounding us." 
  },
  { 
    name: "Local Farms & Fishers", 
    description: "We grow as much of our produce as possible and work with our garden team to plan menus centered around what is possible to grow in the area. We catch our own seafood and source fresh ingredients from local farms." 
  },
  { 
    name: "Floating Doctors", 
    description: "Our team volunteers with Floating Doctors in our free time, providing essential health care to indigenous communities in Bocas Del Toro." 
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Our Story"
        kicker="About Us"
        description="Building a sustainable future for eco-luxury travel in Panama"
        image="/images/dolphin-bay-location.jpg"
      />

      {/* Our Story */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6">Our Story</h2>
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              Dolphin Blue Paradise is a 100% off-the-grid luxury eco-resort located on Isla San Cristobal in Dolphin Bay, just 20-30 minutes by boat from the main town in Bocas Del Toro. This hilly island features plantations, farms, and the indigenous villages of Bocastorito and Aldana, home to the Ngabe and Guayami Tribe. The island&apos;s biodiversity includes a primary rainforest, and the bay hosts about 80 bottlenose dolphins living year-round in Dolphin Bay. Its natural beauty makes it a top tour destination in Panama.
            </p>
            <p className="text-lg text-[var(--color-text-primary)] mb-4">
              Dolphin Blue Paradise was born from a vision to create a luxury resort that doesn&apos;t compromise on environmental 
              responsibility or community impact. We believe that eco tourism can be luxurious without compromising on main comforts. 
              We provide a fully personalized and memorable stay with farm-to-table meals, customized excursions, and a commitment to sustainability. 
              Our resort operates on green energy, uses eco-friendly materials, and sources local produce for a luxurious, environmentally responsible stay.
            </p>
            <p className="text-lg text-[var(--color-text-primary)]">
              Staying with us offers a unique opportunity to immerse yourself in the tranquility and cultural richness of one of Panama&apos;s most picturesque areas. 
              You&apos;ll witness firsthand the positive impact of your visit on the environment and local communities through our extensive sustainable practices. 
              We partner deeply with local Ngäbe-Buglé communities, support conservation efforts, and create meaningful connections 
              between our guests and Panama&apos;s incredible biodiversity. This isn&apos;t just a resort—it&apos;s a movement toward 
              responsible, regenerative travel.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded shadow-sm">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-2">{member.name}</h3>
                <p className="text-sm uppercase tracking-wider text-[var(--color-gold)] mb-4">{member.role}</p>
                <p className="text-[var(--color-text-primary)] mb-4 text-sm">{member.bio}</p>
                <blockquote className="text-[var(--color-text-primary)] italic border-l-4 border-[var(--color-gold)] pl-4">
                  &quot;{member.quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Recognition */}
      <section className="section">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Press & Recognition</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {pressLogos.map((press, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4">
                {press.link ? (
                  <a 
                    href={press.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center hover:opacity-80 transition-opacity"
                  >
                    <span className="text-lg font-semibold text-[var(--color-navy)] block">{press.name}</span>
                    {press.description && (
                      <span className="text-sm text-[var(--color-text-muted)] block mt-1">{press.description}</span>
                    )}
                  </a>
                ) : (
                  <div className="text-center opacity-60">
                    <span className="text-lg font-semibold text-[var(--color-text-muted)]">{press.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Our Promise to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promisePillars.map((pillar, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-ocean)] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">{idx + 1}</span>
                </div>
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4">{pillar.title}</h3>
                <p className="text-[var(--color-text-primary)]">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center">Our Partners</h2>
          <div className="space-y-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="border-l-4 border-[var(--color-gold)] pl-6">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-2">{partner.name}</h3>
                <p className="text-[var(--color-text-muted)]">{partner.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/sustainability" variant="primary">
              Learn About Our Impact
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

