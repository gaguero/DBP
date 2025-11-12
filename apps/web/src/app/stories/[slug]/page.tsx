import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { BlogPostRenderer } from "@/components/blog-post-renderer";

interface StoryParams {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blog/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  // Return empty array for dynamic generation
  // In production, you might want to fetch all slugs here
  return [];
}

export async function generateMetadata({ params }: StoryParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Story Not Found" };
  }

  return {
    title: `${post.title} | Dolphin Blue Paradise`,
    description: post.excerpt,
  };
}

export default async function StoryDetailPage({ params }: StoryParams) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section !py-6 bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            {post.title.toUpperCase()}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">{post.category || "Story"}</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src={post.image || post.featuredImage || "/images/rooms-view.jpg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </section>

    <div className="space-y-24 pb-24">

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-6 text-base leading-7 text-[var(--color-text-primary)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              / {post.author} / {post.readingTime}
            </p>
            <BlogPostRenderer blocks={post.contentBlocks || []} />
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
    </div>
  );
}


