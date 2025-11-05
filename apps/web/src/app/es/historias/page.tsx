import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: "Historias",
  description: "Historias y novedades desde Dolphin Blue Paradise.",
};

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blog?locale=es&published=true`, {
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

export default async function HistoriasPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Historias desde Bahía Delfines"
        kicker="Journal"
        description="Descubre lo que sucede en el resort, nuestros proyectos con la comunidad y consejos de viaje."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              <p>No hay historias disponibles en este momento.</p>
            </div>
          ) : (
            posts.map((post: any) => (
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
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-display text-xl text-[var(--color-navy)]">{post.title}</h2>
                  <p className="text-sm text-muted">{post.excerpt}</p>
                  <Link
                    href={`/es/historias/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ocean)]"
                  >
                    Leer más
                    <span aria-hidden>&gt;</span>
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
