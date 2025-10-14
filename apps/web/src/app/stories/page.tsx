import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Stories & Updates",
  description: "Latest news, guest reflections, and travel inspiration from Dolphin Blue Paradise.",
};

export default function StoriesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Stories from Dolphin Bay"
        kicker="Journal"
        description="Peek behind the scenes of resort life, sustainability milestones, and guest adventures."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.slug} className="overflow-hidden p-0">
              <Image
                src={story.image}
                alt={story.title}
                width={600}
                height={400}
                className="h-48 w-full object-cover"
              />
              <div className="space-y-3 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {story.date}
                </p>
                <h2 className="font-display text-xl text-[var(--color-navy)]">{story.title}</h2>
                <p className="text-sm text-muted">{story.excerpt}</p>
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ocean)]"
                >
                  Read more &gt;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}


