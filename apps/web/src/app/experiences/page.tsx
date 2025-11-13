import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { activities } from "@/content/data";
import { ExperiencesGridLayout } from "@/components/experiences/experiences-grid-layout";
import { ExperiencesSplitLayout } from "@/components/experiences/experiences-split-layout";
import { ExperiencesMasonryLayout } from "@/components/experiences/experiences-masonry-layout";
import { stockPhotos } from "@/lib/stock-photos";
import { FeedbackRoot } from "@/components/feedback/feedback-root";
import { FeedbackSection } from "@/components/feedback/feedback-section";
import { PageNotesEditor } from "@/components/page-notes-editor";

export const metadata: Metadata = {
  title: "Dolphin Bay Experiences",
  description:
    "Personalized eco-adventures and tours in Bocas del Toro. From dolphin encounters to rainforest hikes, discover Panama&apos;s incredible biodiversity.",
};

// Layout style can be changed here: "grid" | "split" | "masonry"
const LAYOUT_STYLE: "grid" | "split" | "masonry" = "grid";

// Activities to exclude from the experiences page (shown in free activities section)
const EXCLUDED_SLUGS = ["snorkeling", "stand-up-paddle", "kayak"];

export default function ExperiencesPage() {
  // Filter out free activities and sort alphabetically by name
  const paidActivities = activities
    .filter((activity) => !EXCLUDED_SLUGS.includes(activity.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const pageContent = (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-lg md:text-xl lg:text-2xl text-black mb-4 text-center uppercase px-4" style={{ fontWeight: 100 }}>
            DISCOVER OUR CURATED ECO-ADVENTURES
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[120px] bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">Experiences</span>
            <div className="h-px flex-1 max-w-[120px] bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
        <Image
          src={stockPhotos.snorkeling}
          alt="Dolphin Bay Paradise Experiences - snorkeling, kayaking, hiking, and adventure activities in Bocas del Toro, Panama"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </section>

      {/* Free Activities Section */}
      <FeedbackSection id="free-activities" label="Actividades Gratuitas">
        <section className="section bg-[var(--color-sand)]">
          <div className="container max-w-4xl">
            <p className="text-lg mb-4 text-center uppercase font-semibold text-[var(--color-navy)]">
              FREE ACTIVITIES INCLUDED IN YOUR STAY
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm mb-0.5 uppercase font-light text-[var(--color-navy)]">
                  Snorkeling
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Free from swim platform
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-0.5 uppercase font-light text-[var(--color-navy)]">
                  Kayaking
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Explore at your own pace
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-0.5 uppercase font-light text-[var(--color-navy)]">
                  Stand Up Paddle
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Paddle through calm waters
                </p>
              </div>
            </div>
        </div>
      </section>
      </FeedbackSection>

      <div className="space-y-24 pb-24">
        {/* Activities Section - Layout Style 1: Grid Cards */}
        {LAYOUT_STYLE === "grid" && (
          <ExperiencesGridLayout activities={paidActivities} />
        )}

        {/* Activities Section - Layout Style 2: Split Screen Alternating */}
        {LAYOUT_STYLE === "split" && (
          <ExperiencesSplitLayout activities={paidActivities} />
        )}

        {/* Activities Section - Layout Style 3: Masonry/Staggered Grid */}
        {LAYOUT_STYLE === "masonry" && (
          <ExperiencesMasonryLayout activities={paidActivities} />
        )}

        {/* CTA Section */}
        <FeedbackSection id="cta-itinerary" label="CTA - Solicitar Itinerario">
          <section className="section bg-[var(--color-sand)]">
            <div className="container max-w-4xl text-center px-4">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-navy)] mb-4 md:mb-6 uppercase font-light">
                REQUEST CUSTOM ITINERARY
              </h2>
              <p className="text-base md:text-lg text-[var(--color-text-primary)] mb-6 md:mb-8">
                Share your travel dates, group size, and interests so our concierge can tailor experiences for your stay. 
                We arrange transportation, bilingual guides, refreshments, and any add-ons.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="primary" className="text-lg px-8 py-4">
                  Contact Concierge
                </Button>
                <Button
                  href="https://wa.me/50763460605"
                  variant="secondary"
                  className="text-lg px-8 py-4"
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </section>
        </FeedbackSection>

        <section className="section bg-white">
          <div className="container max-w-4xl">
            <PageNotesEditor pageId="experiences" />
          </div>
        </section>
      </div>
    </div>
  );

  return <FeedbackRoot pageId="experiences">{pageContent}</FeedbackRoot>;
}
