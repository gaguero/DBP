import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { experienciasEs } from "@/content/data-es";
import { activities } from "@/content/data";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Vive aventuras personalizadas en Dolphin Blue Paradise: encuentros con delfines, caminatas en la selva y rituales de bienestar.",
};

const experiencesMap = experienciasEs.map((exp) => ({
  ...exp,
  image: activities.find((act) => act.slug === exp.slug)?.image ?? "/images/hero-bay.jpg",
  highlights: activities.find((act) => act.slug === exp.slug)?.highlights ?? [],
}));

export default function ExperienciasEsPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Aventuras a tu medida"
        kicker="Experiencias"
        description="Descubre Bahia Delfines con nuestros naturalistas, explora plantaciones de cacao o vive rituales de bienestar en tu terraza privada."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2">
          {experiencesMap.map((exp) => (
            <Card key={exp.slug} className="flex h-full flex-col gap-5 p-0 overflow-hidden">
              <Image src={exp.image} alt={exp.nombre} width={800} height={520} className="h-56 w-full object-cover" />
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-[var(--color-navy)]">{exp.nombre}</h3>
                  <p className="text-muted">{exp.resumen}</p>
                </div>
                <dl className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--color-navy)]">Duracion</span>
                    <span>{exp.duracion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--color-navy)]">Ideal para</span>
                    <span>{exp.perfil}</span>
                  </div>
                </dl>
                <ul className="space-y-2 text-sm text-muted">
                  {exp.highlights.map((detalle) => (
                    <li key={detalle} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                      <span>{detalle}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    href={`/es/experiencias/${exp.slug}`}
                    trackingEvent="es_experiencias_detalle"
                    trackingData={{ experience: exp.slug }}
                  >
                    Ver detalles
                  </Button>
                  <Button
                    href="/es/contacto"
                    trackingEvent="es_experiencias_itinerario"
                    trackingData={{ experience: exp.slug }}
                  >
                    Solicitar itinerario
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Retiro de bienestar</h2>
            <p className="text-muted">
              Yoga al amanecer sobre el muelle, meditaciones guiadas en la selva y masaje en tu terraza acompañado de infusiones botanicas. Podemos diseñar un programa completo segun tus objetivos.
            </p>
            <Button
              href="mailto:contact@dolphinblueparadise.com"
              variant="secondary"
              trackingEvent="es_experiencias_retiro"
              trackingData={{ section: "wellness" }}
            >
              Planear retiro
            </Button>
          </div>
          <Card className="space-y-3 bg-white/90 text-sm text-muted">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">Sugerencia</p>
            <p>
              Entre noviembre y abril agrega surf en playas reconocidas mundialmente. Viajando en familia? Consulta sobre programas educativos para ninos.
            </p>
            <Button
              href="#booking"
              variant="secondary"
              trackingEvent="es_experiencias_vincular"
              trackingData={{ section: "wellness" }}
            >
              Vincular con tu reserva
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
