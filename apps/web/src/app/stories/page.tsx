import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/card";
import { PageNotesEditor } from "@/components/page-notes-editor";

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
  const description = "Peek behind the scenes of resort life, sustainability milestones, and guest adventures.";

  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            STORIES FROM DOLPHIN BAY
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">Journal</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src="/images/rooms-view.jpg"
          alt="Stories from Dolphin Bay"
          fill
          className="object-cover"
          priority
        />
      </section>

    <div className="space-y-24 pb-24">

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

      <section className="section bg-white">
        <div className="container max-w-4xl">
          <PageNotesEditor pageId="stories" />
        </div>
      </section>
    </div>
    </div>
  );
}


