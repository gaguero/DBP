import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { activities } from "@/content/data";

type ExperienceParams = {
  params: Promise<{ slug: string }>;
};

const activityIndex = new Map(activities.map((activity) => [activity.slug, activity]));

export async function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({ params }: ExperienceParams): Promise<Metadata> {
  const { slug } = await params;
  const activity = activityIndex.get(slug);

  if (!activity) {
    return { title: "Experience Not Found" };
  }

  return {
    title: `${activity.name} | Dolphin Blue Paradise`,
    description: activity.summary,
  };
}

export default async function ExperienceDetailPage({ params }: ExperienceParams) {
  const { slug } = await params;
  const activity = activityIndex.get(slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section !py-6 bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            {activity.name.toUpperCase()}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">Experience</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src={activity.image || "/images/hero-bay.jpg"}
          alt={activity.name}
          fill
          className="object-cover"
          priority
        />
      </section>

    <div className="space-y-24 pb-24">

      {/* Logistics and Highlights */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={activity.image || "/images/hero-bay.jpg"}
                alt={activity.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 p-8">
              <h2 className="font-display text-3xl text-[var(--color-navy)] mb-4">Logistics</h2>
              <dl className="space-y-4">
                <div className="flex items-start gap-4">
                  <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Duration:</dt>
                  <dd className="text-[var(--color-text-muted)]">{activity.duration}</dd>
                </div>
                {"difficulty" in activity && typeof (activity as Record<string, unknown>).difficulty === "string" && (
                  <div className="flex items-start gap-4">
                    <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Difficulty:</dt>
                    <dd className="text-[var(--color-text-muted)]">{(activity as Record<string, unknown>).difficulty as string}</dd>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Suitable for:</dt>
                  <dd className="text-[var(--color-text-muted)]">{activity.suitability}</dd>
                </div>
                {"pricing" in activity && (
                  <div className="flex items-start gap-4">
                    <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Pricing:</dt>
                    <dd className="text-[var(--color-text-muted)]">
                      {Array.isArray((activity as Record<string, unknown>).pricing) ? (
                        <ul className="space-y-1">
                          {((activity as Record<string, unknown>).pricing as string[]).map((price, idx) => {
                            // Check if line starts with spaces (indented service item)
                            const trimmedPrice = price.trimStart();
                            const leadingSpaces = price.length - trimmedPrice.length;
                            const isIndented = leadingSpaces > 0;
                            
                            // Check if the line contains a colon (provider/category name)
                            const colonIndex = trimmedPrice.indexOf(':');
                            if (colonIndex > 0 && colonIndex < 50 && !isIndented) {
                              // Split at colon and bold the first part (provider name)
                              const providerName = trimmedPrice.substring(0, colonIndex);
                              const rest = trimmedPrice.substring(colonIndex + 1).trim();
                              return (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[var(--color-gold)] mt-1">•</span>
                                  <span>
                                    <strong className="font-semibold text-[var(--color-navy)]">{providerName}:</strong>
                                    {rest && ` ${rest}`}
                                  </span>
                                </li>
                              );
                            }
                            // Check if line starts with a name in parentheses (like "Alexia (therapeutic...")
                            const parenMatch = trimmedPrice.match(/^([A-Z][a-z]+(?:\s+\([^)]+\))?):/);
                            if (parenMatch && !isIndented) {
                              const providerName = parenMatch[1];
                              const rest = trimmedPrice.substring(providerName.length + 1).trim();
                              return (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[var(--color-gold)] mt-1">•</span>
                                  <span>
                                    <strong className="font-semibold text-[var(--color-navy)]">{providerName}:</strong>
                                    {rest && ` ${rest}`}
                                  </span>
                                </li>
                              );
                            }
                            // Indented service item - render with more indentation
                            if (isIndented) {
                              return (
                                <li key={idx} className="flex items-start gap-2 pl-8">
                                  <span className="text-[var(--color-gold)] mt-1">•</span>
                                  <span>{trimmedPrice}</span>
                                </li>
                              );
                            }
                            // Regular line without provider name
                            return (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[var(--color-gold)] mt-1">•</span>
                                <span>{trimmedPrice}</span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <span>{(activity as Record<string, unknown>).pricing as string}</span>
                      )}
                    </dd>
                  </div>
                )}
                {"seasonal" in activity && (activity as Record<string, unknown>).seasonal === true && "seasonNote" in activity && typeof (activity as Record<string, unknown>).seasonNote === "string" && (
                  <div className="flex items-start gap-4">
                    <dt className="font-semibold text-[var(--color-navy)] min-w-[100px]">Season:</dt>
                    <dd className="text-[var(--color-text-muted)] italic text-[var(--color-gold)]">{(activity as Record<string, unknown>).seasonNote as string}</dd>
                  </div>
                )}
              </dl>

              {"bookingNote" in activity && typeof (activity as Record<string, unknown>).bookingNote === "string" && (
                <div className="pt-4 pb-2">
                  <p className="text-sm text-[var(--color-text-muted)] bg-[var(--color-sand)]/30 p-4 rounded border-l-4 border-[var(--color-gold)]">
                    <strong className="text-[var(--color-navy)]">Booking Note:</strong> {(activity as Record<string, unknown>).bookingNote as string}
                  </p>
                </div>
              )}

              {"included" in activity && Array.isArray((activity as Record<string, unknown>).included) && ((activity as Record<string, unknown>).included as unknown[]).length > 0 && (
                <div className="pt-6 border-t border-black/10">
                  <h3 className="font-display text-xl text-[var(--color-navy)] mb-4">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {((activity as Record<string, unknown>).included as string[]).map((item, idx) => (
                      <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 border-t border-black/10">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {activity.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                      <span className="text-[var(--color-gold)] mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Add to Your Itinerary</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Share your travel dates, group size, and interests so our concierge can tailor this experience for your stay. 
              We arrange transportation, bilingual guides, refreshments, and any add-ons like photography or wellness pairings.
            </p>
            <div className="space-y-4">
              <Button
                variant="secondary"
                href="https://wa.me/50763460605"
                className="w-full"
                trackingEvent="experience_whatsapp"
                trackingData={{ experience: activity.slug }}
              >
                WhatsApp Concierge
              </Button>
              <Button
                variant="secondary"
                href="mailto:contact@dolphinblueparadise.com"
                className="w-full"
                trackingEvent="experience_email"
                trackingData={{ experience: activity.slug }}
              >
                Email Concierge
              </Button>
            </div>
            <div className="pt-6 border-t border-black/10">
              <p className="text-sm text-[var(--color-text-muted)]">
                <strong>Note:</strong> Some experiences may be seasonal or weather-dependent. Our concierge will confirm 
                availability and provide detailed information when you inquire.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
