import Image from "next/image";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

const introParagraphs = [
  "Discovering a travel destination that truly aligns with your values can be challenging.",
  "You need a place that combines comfort, unique and personalized experiences, and sustainability without compromising your ethical and environmental values.",
  "Dolphin Blue Paradise is here. We provide a fully personalized stay with farm-to-table meals, customized excursions, and a commitment to sustainability. We handle every travel detail from flights to the final boat ride, operate on green energy, use eco-friendly materials, and source local produce so your experience remains both luxurious and responsible.",
  "Immerse yourself in one of the most biodiverse environments on the planet. Witness how your visit supports the environment and local communities through our extensive sustainable practices, attentive service, tailored itineraries, and special dietary accommodations."
];

const locationParagraph =
  "Dolphin Blue Paradise is a 100% off-the-grid luxury eco-resort on Isla San Cristobal in Dolphin Bay. Plantations, farms, and the indigenous villages of Bocastorito and Aldana surround our hilly island home to the Ngabe and Guayami Tribe. A primary rainforest stretches behind us while around 80 resident bottlenose dolphins live in the bay year-round.";

const amenities = [
  {
    title: "Breakfast",
    description:
      "Start the day with fresh garden fruit, juices, eggs from Dolphin Bay, homemade bread, and jams served steps from the water.",
  },
  {
    title: "Free Wi-Fi",
    description: "Stay connected with complimentary high-speed internet across the entire property.",
  },
  {
    title: "Tropical Garden",
    description:
      "Explore our five-acre garden filled with fruit trees, herbs, and tropical wildlife guided by our head gardener, Roque.",
  },
  {
    title: "Sea View",
    description:
      "Swim in crystal-clear water directly from our platform and watch marine life drift past your terrace.",
  },
  {
    title: "Primary Rainforest",
    description:
      "Schedule a hike through the rainforest that surrounds the resort to spot sloths, monkeys, birds, and cacao trees.",
  },
  {
    title: "Blo Bar & Restaurant",
    description:
      "Dine over the water at Blo Bar with panoramic views of Dolphin Bay and seasonal menus inspired by our garden.",
  },
];

const activities = [
  {
    title: "Dolphin Bay",
    description: "Cruise the bay to observe resident bottlenose dolphins in their natural habitat.",
  },
  {
    title: "Snorkeling",
    description: "Slip into Caribbean waters from our platform or join us on guided snorkel excursions.",
  },
  {
    title: "Excursions & Tours",
    description: "Discover hidden beaches and vibrant communities throughout Bocas del Toro by boat.",
  },
  {
    title: "Water Ski & Wakeboard",
    description: "Add adrenaline to your itinerary with waterski, wakeboard, or tubing sessions in the calm bay.",
  },
  {
    title: "Chocolate Farm Tour",
    description:
      "Visit an indigenous Ngabe cacao community or kayak to our neighbors to learn about award-winning chocolate making.",
  },
  {
    title: "Stand Up Paddle",
    description: "Paddle at your own pace with complimentary SUP boards available throughout your stay.",
  },
  {
    title: "Surfing",
    description:
      "From November through April, catch world-class beach breaks. We coordinate transportation and surf packages.",
  },
  {
    title: "Kayak",
    description: "Explore the mangroves and coastline with complimentary kayaks.",
  },
  {
    title: "Monkey Island",
    description:
      "Visit a sanctuary for orphaned monkeys and observe several species up close while learning about their rehabilitation.",
  },
  {
    title: "Fishing",
    description:
      "Fish year-round for snapper, jack, wahoo, kingfish, or tuna with half-day and full-day charters.",
  },
  {
    title: "Massages",
    description: "Unwind with relaxing or therapeutic treatments arranged on-site by local therapists.",
  },
];

const testimonial = {
  quote:
    "My wife and I have traveled to over 50 countries and stayed in hotels, resorts, and destinations of all types. Dolphin Blue Paradise is one of the most breathtaking, gorgeous, and hospitable locations we have experienced.",
  author: "Recent Guest Review",
};

const disclaimer =
  "Dolphin Blue Paradise is not liable for guest belongings. Dolphin Bay is one of the safest places in the world, but we encourage guests to secure valuables when away from their rooms.";

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src="/images/hero-bay.jpg"
          alt="Aerial view of Dolphin Bay with lush island and turquoise waters"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative container flex min-h-[80vh] flex-col justify-center gap-8 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            Paradise between the jungle &amp; the sea
          </p>
          <h1 className="max-w-3xl font-display text-4xl md:text-6xl">A personalized eco-luxury escape</h1>
          <p className="max-w-2xl text-lg text-white/80">
            We design every journey around your values with off-grid comfort, curated experiences, and regenerative practices in Dolphin Bay, Panama.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#booking" trackingEvent="cta_plan_escape" trackingData={{ section: "hero" }}>
              Plan Your Escape
            </Button>
            <Button
              href="/experiences"
              variant="secondary"
              trackingEvent="cta_explore_experiences"
              trackingData={{ section: "hero" }}
            >
              Explore Experiences
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-6">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted text-lg leading-8">
              {paragraph}
            </p>
          ))}
          <p className="text-muted text-lg leading-8">{locationParagraph}</p>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Amenities &amp; Signature Spaces</h2>
            <p className="text-muted">
              Every stay includes thoughtfully curated comforts, immersive nature access, and fresh cuisine inspired by our surroundings.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <Card key={amenity.title} className="space-y-3">
                <h3 className="font-display text-xl text-[var(--color-navy)]">{amenity.title}</h3>
                <p className="text-sm text-muted">{amenity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Experiences in Dolphin Bay</h2>
            <p className="text-muted">
              Tailor your itinerary with marine encounters, cultural excursions, wellness rituals, and day trips across Bocas del Toro.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Card key={activity.title} className="space-y-2 border border-black/5 p-6">
                <h3 className="font-display text-lg text-[var(--color-navy)]">{activity.title}</h3>
                <p className="text-sm text-muted">{activity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <blockquote className="rounded-3xl bg-white/80 p-8 text-lg italic text-[var(--color-navy)] shadow-soft">
            "{testimonial.quote}"
          </blockquote>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">{testimonial.author}</p>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4 text-sm text-muted">
          <p>{disclaimer}</p>
        </div>
      </section>

      <BookingWidgetPlaceholder />
    </div>
  );
}