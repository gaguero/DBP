import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: "Stories & Updates",
  description: "Latest news, guest reflections, and travel inspiration from Dolphin Blue Paradise.",
};

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blog?locale=en&published=true`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch {
    return [];
  }
}

export default async function StoriesPage() {
  const posts = await getPosts();

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
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              <p>No stories available at the moment.</p>
            </div>
          ) : (
            posts.map((post: { slug: string; title: string; excerpt: string; date: string; image?: string; featuredImage?: string }) => (
              <Card key={post.slug} className="overflow-hidden p-0">
                <Image
                  src={post.image || post.featuredImage || "/images/rooms-view.jpg"}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                />
                <div className="space-y-3 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-display text-xl text-[var(--color-navy)]">{post.title}</h2>
                  <p className="text-sm text-muted">{post.excerpt}</p>
                  <Link
                    href={`/stories/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ocean)]"
                  >
                    Read more &gt;
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


