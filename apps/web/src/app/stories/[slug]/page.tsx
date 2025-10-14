import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/content/stories";

type StoryParams = {
  params: { slug: string };
};

const storyIndex = new Map(stories.map((story) => [story.slug, story]));

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export function generateMetadata({ params }: StoryParams): Metadata {
  const story = storyIndex.get(params.slug);

  if (!story) {
    return { title: "Story Not Found" };
  }

  return {
    title: `${story.title} | Dolphin Blue Paradise`,
    description: story.excerpt,
  } satisfies Metadata;
}

export default function StoryDetailPage({ params }: StoryParams) {
  const story = storyIndex.get(params.slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title={story.title}
        kicker={story.category}
        description={story.excerpt}
        image={story.image}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-6 text-base leading-7 text-[var(--color-text-primary)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {story.date}  /  {story.author}  /  {story.readingTime}
            </p>
            {story.content.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="space-y-6">
            <Card className="space-y-4 bg-white/80 p-6 text-sm text-muted">
              <h2 className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">Plan Your Stay</h2>
              <p>
                Inspired by this story? Reach out to our concierge team to weave the featured experience into your itinerary or
                request volunteer opportunities during your visit.
              </p>
              <a
                href="mailto:contact@dolphinblueparadise.com"
                className="inline-flex items-center gap-2 font-semibold text-[var(--color-ocean)]"
              >
                Email concierge &gt;
              </a>
            </Card>
            <Card className="overflow-hidden">
              <Image
                src="/images/hero-bay.jpg"
                alt="Sunset over Dolphin Bay"
                width={800}
                height={600}
                className="h-48 w-full object-cover"
              />
              <div className="space-y-3 p-6 text-sm text-muted">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">Stay Connected</p>
                <p>Subscribe to monthly updates for seasonal menus, conservation notes, and travel offers.</p>
                <a href="mailto:contact@dolphinblueparadise.com" className="font-semibold text-[var(--color-ocean)]">
                  Join the list &gt;
                </a>
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}


