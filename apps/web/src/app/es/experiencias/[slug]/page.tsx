import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { experienciasEs } from "@/content/data-es";
import { activities } from "@/content/data";

interface ExperienciaEsProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experienciasEs.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({ params }: ExperienciaEsProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = experienciasEs.find((item) => item.slug === slug);
  if (!exp) {
    return {};
  }
  return {
    title: exp.nombre,
    description: exp.resumen,
  };
}

export default async function ExperienciaDetalle({ params }: ExperienciaEsProps) {
  const { slug } = await params;
  const expEs = experienciasEs.find((item) => item.slug === slug);
  const expEn = activities.find((item) => item.slug === slug);

  if (!expEs || !expEn) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      <section className="relative isolate overflow-hidden">
        <Image src={expEn.image} alt={expEs.nombre} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/70" />
        <div className="relative container flex min-h-[60vh] flex-col justify-center gap-6 py-24 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">Experiencia</p>
          <h1 className="max-w-3xl font-display text-4xl md:text-5xl">{expEs.nombre}</h1>
          <p className="max-w-2xl text-lg text-white/80">{expEs.resumen}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/es/contacto">Solicitar reserva</Button>
            <Button href="/es/experiencias" variant="secondary">
              Volver a experiencias
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[var(--color-navy)]">Destacados</h2>
            <ul className="space-y-3 text-muted">
              {(expEn.highlights ?? []).map((detalle) => (
                <li key={detalle} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">â€¢</span>
                  <span>{detalle}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="card space-y-4">
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-semibold text-[var(--color-navy)]">Duracion</span>
              <span>{expEs.duracion}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-semibold text-[var(--color-navy)]">Perfil ideal</span>
              <span>{expEs.perfil}</span>
            </div>
            <p className="text-sm text-muted">
              Podemos organizar traslados privados, refrigerios y fotografias. Indica tus horarios y preferencias para ajustar la experiencia a tu ritmo.
            </p>
            <Link href="/es/planifica-tu-viaje" className="button-secondary">
              Detalles logÃ­sticos
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}