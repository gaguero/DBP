import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const articulos = [
  {
    slug: "menu-temporada",
    titulo: "Menu de temporada: del jardin a la mesa",
    resumen: "El chef cuenta como el jardin inspira cada plato en Blo Bar.",
    fecha: "8 ene 2025",
    imagen: "/images/dining-overwater.jpg",
  },
  {
    slug: "floating-doctors",
    titulo: "Alianza con Floating Doctors",
    resumen: "Cronica de una semana de clinicas y como apoyar futuras misiones.",
    fecha: "20 dic 2024",
    imagen: "/images/rooms-view.jpg",
  },
  {
    slug: "delfines-respeto",
    titulo: "Encuentros responsables con delfines",
    resumen: "Nuestro naturalista comparte buenas practicas para observar a las manadas residentes.",
    fecha: "30 nov 2024",
    imagen: "/images/hero-bay.jpg",
  },
];

export const metadata: Metadata = {
  title: "Historias",
  description: "Historias y novedades desde Dolphin Blue Paradise.",
};

export default function HistoriasPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Historias desde BahÃ­a Delfines"
        kicker="Journal"
        description="Descubre lo que sucede en el resort, nuestros proyectos con la comunidad y consejos de viaje."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-3">
          {articulos.map((articulo) => (
            <Card key={articulo.slug} className="overflow-hidden p-0">
              <Image src={articulo.imagen} alt={articulo.titulo} width={600} height={400} className="h-48 w-full object-cover" />
              <div className="space-y-3 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{articulo.fecha}</p>
                <h2 className="font-display text-xl text-[var(--color-navy)]">{articulo.titulo}</h2>
                <p className="text-sm text-muted">{articulo.resumen}</p>
                <Link href={`/es/historias/${articulo.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ocean)]">
                  Leer mas
                  <span aria-hidden>&gt;</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
