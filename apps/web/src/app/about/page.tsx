import type { Metadata } from "next";
import Image from "next/image";
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
    image: "/images/about/team-yuh-schabacker-koppel-managing-director.jpg",
    bio: "Owner and creator of the Dolphin Blue Paradise concept. A passionate entrepreneur dedicated to innovation and creating meaningful change, Yuh curates farm-to-table experiences and trains locals in sustainable cooking, nutritional wellness, and regenerative food systems.",
    quote: "We believe that eco tourism can be luxurious without compromising on main comforts. Every aspect of our operation reflects our commitment to sustainability, community, and exceptional hospitality.",
  },
  {
    name: "Oscar Santos",
    role: "Operations & Guest Experience",
    image: "/images/about/team-oscar-santos-operations-guest-experience.jpg",
    bio: "Oscar came to us in 2024 and started as a trainee. He is working in all departments from helping with bookkeeping to tours and has quickly demonstrated his talent for fine cuisine. Guests love Oscar's big smile and helpful soul. Oscar is responsible for our popular medium hike from Dolphin Bay to San Cristobal, a 3 hour hike crossing 2 rivers, which he did himself every day through high school.",
    quote: "I'm learning something new every day here. Whether it's in the kitchen, on a tour, or helping guests, I love being part of the Dolphin Blue Paradise family.",
  },
  {
    name: "Marcus Schabacker, MD, PhD",
    role: "Activities Manager",
    image: "/images/about/team-marcus-schabacker-activities-manager.jpg",
    bio: "Responsible for boat & fishing tours. An avid deep sea fisher who has fished oceans around the world, Marcus has a sound understanding for sustainable fishing and boat safety. He is an Auxiliary US Coast Guard and volunteers for Floating Doctors providing essential health care to indigenous communities.",
    quote: "Being able to fish year round in Bocas Del Toro without freezing is one of the great perks of living here. We practice sustainable fishing and ensure every guest experience is both safe and memorable.",
  },
  {
    name: "Roque Small",
    role: "Head Gardener, Naturalist (Nature Expert)",
    image: "/images/about/team-roque-small-head-gardener-naturalist.jpg",
    bio: "Roque has worked at Dolphin Blue Paradise for 24 years and was responsible for creating the hiking paths on the southern part of Isla San Cristobal. Roque is a living encyclopedia of all the animals and plants in the archipelago. Taking a hiking tour with Roque through our primary rainforest is an unforgettable nature experience.",
    quote: "The rainforest has so many stories to tell. Every plant, every animal has a purpose. I love sharing this knowledge with our guests and showing them the beauty of our island.",
  },
];

const pressLogos = [
  { 
    name: "Finans.dk", 
    description: "Danish business and finance media outlet",
    link: "https://finans.dk/karriere/ECE14292863/hun-faldt-pladask-for-panamas-skoenne-natur-og-venlige-befolkning/",
  },
];

const promisePillars = [
  {
    title: "Personalization",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    description:
      "Every stay is tailored to your interests, dietary needs, and travel style. We provide fully personalized experiences with farm-to-table meals, customized excursions, and special dietary accommodations. Our attentive service ensures every detail is perfectly suited to you.",
  },
  {
    title: "Sustainability",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "100% solar-powered and rainwater-operated, zero-waste operations, and deep community partnerships. We grow our own produce, catch our own seafood, and make everything from scratch. Your stay directly supports conservation and local communities.",
  },
  {
    title: "Comfort",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    description:
      "Luxurious accommodations with organic linens, modern amenities, and thoughtful touches. We believe that eco tourism can be luxurious without compromising on main comforts. Experience eco-luxury without compromise.",
  },
];

const partners = [
  { 
    name: "Ngäbe-Buglé Indigenous Communities", 
    image: "/images/about/partners-ngabe-bugle-indigenous-communities-cacao-coop.jpg",
    description: "We partner with Roque's mother's chocolate-nutmeg co-op on the mainland, procuring cacao and nutmeg directly from indigenous cooperatives. We also sell kra (traditional Ngäbe bags) from the ladies at the coop and bring our coconuts from our garden to the coop so they can make coconut oil from our own coconuts for our guests. We employ and train indigenous staff from villages surrounding us." 
  },
  { 
    name: "Local Farms & Fishers", 
    image: "/images/about/partners-local-farms-fishers-sustainable-seafood.jpg",
    description: "We grow as much of our produce as possible and work with our garden team to plan menus centered around what is possible to grow in the area. We catch our own seafood and source fresh ingredients from local farms." 
  },
  { 
    name: "Floating Doctors", 
    image: "/images/about/partners-floating-doctors-healthcare-community.png",
    description: "Our team volunteers with Floating Doctors in our free time, providing essential health care to indigenous communities in Bocas Del Toro." 
  },
];

export default function AboutPage() {
  const description = "Learn about our mission, team, and sustainability practices. Discover the story behind Panama's premier eco-luxury resort.";
  
  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            OUR STORY
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">About Us</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
        <Image
          src="/images/about/about-hero-aerial-view-isla-san-cristobal.jpg"
          alt="Aerial view of Dolphin Blue Paradise eco-resort on Isla San Cristobal, Bocas del Toro, Panama - luxury resort nestled between tropical rainforest and Dolphin Bay"
          fill
          className="object-cover"
          priority
        />
      </section>

    <div className="space-y-12 pb-24 pt-12">
      {/* Our Story */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-[var(--color-text-primary)] mb-6">
              Dolphin Blue Paradise is a 100% off-the-grid luxury eco-resort located on Isla San Cristobal in Dolphin Bay, just 20-30 minutes by boat from the main town in Bocas Del Toro. This hilly island features plantations, farms, and the indigenous villages of Bocastorito and Aldana, home to the Ngäbe-Buglé. The island&apos;s biodiversity includes a primary rainforest, and the bay hosts about 80 bottlenose dolphins living year-round in Dolphin Bay. Its natural beauty makes it a top tour destination in Panama.
            </p>

            {/* First image - Solar panels (mobile only, intercalated) */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 md:hidden">
              <Image
                src="/images/about/solar-panels-green-energy-eco-resort.jpg"
                alt="Solar panels at Dolphin Blue Paradise providing 100% renewable green energy for off-grid eco-resort in Bocas del Toro"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-lg text-[var(--color-text-primary)] mb-6">
              Dolphin Blue Paradise was born from a vision to create a luxury resort that doesn&apos;t compromise on environmental 
              responsibility or community impact. We acquired the property on June 15, 2022, and have been developing it into a premier 
              eco-luxury destination. We believe that eco tourism can be luxurious without compromising on main comforts. 
              We provide a fully personalized and memorable stay with farm-to-table meals, customized excursions, and a commitment to sustainability. 
              Our resort operates on green energy, uses eco-friendly materials, and sources local produce for a luxurious, environmentally responsible stay.
            </p>

            {/* Second image - Farm to table (mobile only, intercalated) */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 md:hidden">
              <Image
                src="/images/about/farm-to-table-dining-fresh-local-ingredients.jpg"
                alt="Farm-to-table dining at Blå Bar Restaurant with fresh local ingredients from tropical garden and Dolphin Bay"
                fill
                className="object-cover"
              />
            </div>

            {/* Grid de 3 imágenes: solar, comida, jardín (desktop only) */}
            <div className="hidden md:grid grid-cols-3 gap-4 mb-8">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/solar-panels-green-energy-eco-resort.jpg"
                  alt="Solar panels at Dolphin Blue Paradise providing 100% renewable green energy for off-grid eco-resort in Bocas del Toro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/farm-to-table-dining-fresh-local-ingredients.jpg"
                  alt="Farm-to-table dining at Blå Bar Restaurant with fresh local ingredients from tropical garden and Dolphin Bay"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/tropical-garden-fresh-produce-organic-vegetables.jpg"
                  alt="5-acre tropical garden at Dolphin Blue Paradise with fresh organic produce, exotic fruits, and vegetables"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <p className="text-lg text-[var(--color-text-primary)] mb-6">
              Staying with us offers a unique opportunity to immerse yourself in the tranquility and cultural richness of one of Panama&apos;s most picturesque areas. 
              You&apos;ll witness firsthand the positive impact of your visit on the environment and local communities through our extensive sustainable practices. 
              We partner deeply with local Ngäbe-Buglé communities, support conservation efforts, and create meaningful connections 
              between our guests and Panama&apos;s incredible biodiversity. This isn&apos;t just a resort—it&apos;s a movement toward 
              responsible, regenerative travel.
            </p>

            {/* Third image - Garden (mobile only, intercalated) */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 md:hidden">
              <Image
                src="/images/about/tropical-garden-fresh-produce-organic-vegetables.jpg"
                alt="5-acre tropical garden at Dolphin Blue Paradise with fresh organic produce, exotic fruits, and vegetables"
                fill
                className="object-cover"
              />
            </div>

            {/* Final image - Community/Biodiversity */}
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/about/ngabe-bugle-community-partnership-biodiversity.jpg"
                alt="Ngäbe-Buglé indigenous community partnership and biodiversity conservation at Dolphin Blue Paradise, Bocas del Toro"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--color-navy)] mb-8 md:mb-12 text-center uppercase font-light px-4">OUR TEAM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white p-4 md:p-6 rounded shadow-sm">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-[var(--color-ocean)] mb-4 ring-4 ring-white shadow-lg">
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold bg-[var(--color-ocean)] z-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role} at Dolphin Blue Paradise eco-resort, Bocas del Toro`}
                        fill
                        className="object-cover z-10"
                        unoptimized
                      />
                    )}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[var(--color-navy)] mb-2 text-center uppercase font-light px-2">{member.name.toUpperCase()}</h3>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-[var(--color-gold)] mb-4 text-center">{member.role}</p>
                </div>
                <p className="text-sm md:text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Recognition */}
      <section className="section">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--color-navy)] mb-8 md:mb-12 text-center uppercase font-light px-4">PRESS & RECOGNITION</h2>
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
                    <span className="text-lg font-light text-[var(--color-navy)] block uppercase">{press.name.toUpperCase()}</span>
                    {press.description && (
                      <span className="text-sm text-[var(--color-text-muted)] block mt-1">{press.description}</span>
                    )}
                  </a>
                ) : (
                  <div className="text-center opacity-60">
                    <span className="text-lg font-light text-[var(--color-text-muted)] uppercase">{press.name.toUpperCase()}</span>
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
          <h2 className="font-display text-3xl md:text-4xl text-[var(--color-navy)] mb-8 md:mb-12 text-center uppercase font-light px-4">OUR PROMISE TO YOU</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {promisePillars.map((pillar, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--color-ocean)] mx-auto mb-4 flex items-center justify-center text-white">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl md:text-2xl text-[var(--color-navy)] mb-4 uppercase font-light">{pillar.title.toUpperCase()}</h3>
                <p className="text-sm md:text-base text-[var(--color-text-primary)] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-12 text-center uppercase font-light">OUR PARTNERS</h2>
          <div className="space-y-8">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={partner.image}
                    alt={`${partner.name} partnership with Dolphin Blue Paradise eco-resort, Bocas del Toro, Panama`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 border-l-4 border-[var(--color-gold)] pl-6">
                  <h3 className="font-display text-xl text-[var(--color-navy)] mb-2 uppercase font-light">{partner.name.toUpperCase()}</h3>
                <p className="text-[var(--color-text-muted)]">{partner.description}</p>
                </div>
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
    </div>
  );
}

