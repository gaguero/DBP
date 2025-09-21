import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { habitaciones } from "@/content/data-es";

export const metadata: Metadata = {
  title: "Habitaciones y suites",
  description: "Descubre cabanas y habitaciones con vista al mar y a la selva en Dolphin Blue Paradise.",
};

export default function HabitacionesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Habitaciones con vistas al mar y a la selva"
        kicker="Hospedaje"
        description="Cada espacio funciona con energia solar, agua de lluvia purificada y el toque artesanal de la isla."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2">
          {habitaciones.map((hab) => (
            <Card key={hab.slug} className="flex h-full flex-col gap-6">
              <div className="space-y-2">
                <h2 className="font-display text-2xl text-[var(--color-navy)]">{hab.nombre}</h2>
                <p className="text-muted">{hab.descripcion}</p>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm text-muted">
                <div>
                  <dt className="font-semibold text-[var(--color-navy)]">Tamano</dt>
                  <dd>{hab.tamano}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--color-navy)]">Capacidad</dt>
                  <dd>{hab.capacidad}</dd>
                </div>
              </dl>
              <ul className="space-y-2 text-sm text-muted">
                {hab.servicios.map((servicio) => (
                  <li key={servicio} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                    <span>{servicio}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  href={`/es/habitaciones/${hab.slug}`}
                  trackingEvent="habitaciones_ver_detalle"
                  trackingData={{ room: hab.slug }}
                >
                  Detalles
                </Button>
                <Button
                  href="#booking"
                  trackingEvent="habitaciones_disponibilidad"
                  trackingData={{ room: hab.slug }}
                >
                  Consultar disponibilidad
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
