import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { galleryFilters } from "@/content/data";

const imagenes = [
  { src: "/images/hero-bay.jpg", alt: "Vista aerea de Bahía Delfines", categoria: "Naturaleza" },
  { src: "/images/rooms-view.jpg", alt: "Terraza con vista al mar", categoria: "Habitaciones" },
  { src: "/images/dining-overwater.jpg", alt: "Restaurante sobre el agua", categoria: "Gastronomia" },
  { src: "/images/rooms-view.jpg", alt: "Interior habitacion familiar", categoria: "Habitaciones" },
  { src: "/images/dining-overwater.jpg", alt: "Plato del menu degustacion", categoria: "Gastronomia" },
  { src: "/images/hero-bay.jpg", alt: "Kayak al amanecer", categoria: "Experiencias" },
];

export const metadata: Metadata = {
  title: "Galeria",
  description: "Imagenes de Dolphin Blue Paradise: suites, gastronomia y aventuras.",
};

export default function GaleriaPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Galeria"
        kicker="Inspira tu viaje"
        description="Una vista previa de la experiencia en Dolphin Blue Paradise. Las imagenes finales para diseno estaran disponibles en la biblioteca de medios."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container space-y-6">
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            {galleryFilters.map((filtro) => (
              <span key={filtro} className="rounded-full border border-[var(--color-text-muted)] px-4 py-2">
                {filtro}
              </span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {imagenes.map((item, index) => (
              <figure key={index} className="overflow-hidden rounded-3xl shadow-soft">
                <Image src={item.src} alt={item.alt} width={800} height={600} className="h-60 w-full object-cover" />
                <figcaption className="bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {item.categoria}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}