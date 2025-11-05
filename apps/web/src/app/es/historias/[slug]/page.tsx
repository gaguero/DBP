import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { BlogPostRenderer } from "@/components/blog-post-renderer";

interface HistoriaPageProps {
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
  return [];
}

export async function generateMetadata({ params }: HistoriaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function HistoriaDetalle({ params }: HistoriaPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.locale !== "es") {
    notFound();
  }

  return (
    <article className="space-y-12 pb-24">
      <section className="relative isolate overflow-hidden">
        <Image
          src={post.image || post.featuredImage || "/images/rooms-view.jpg"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />
        <div className="relative container flex min-h-[50vh] flex-col justify-center gap-4 py-20 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">Journal</p>
          <h1 className="font-display text-4xl md:text-[3.5rem]">{post.title}</h1>
          <p className="text-sm text-white/70">
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      <div className="container space-y-6 text-lg leading-relaxed text-[var(--color-text-primary)]">
        <BlogPostRenderer blocks={post.contentBlocks || []} />
        <div className="flex flex-wrap gap-3 pt-6">
          <Link href="/es/historias" className="button-secondary">
            Volver a historias
          </Link>
          <Button href="/es/contacto">Planifica tu estancia</Button>
        </div>
      </div>
    </article>
  );
}