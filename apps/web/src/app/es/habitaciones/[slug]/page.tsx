import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { habitaciones } from "@/content/data-es";
import { rooms } from "@/content/data";

interface HabitacionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return habitaciones.map((hab) => ({ slug: hab.slug }));
}

export async function generateMetadata({ params }: HabitacionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hab = habitaciones.find((item) => item.slug === slug);
  if (!hab) {
    return {};
  }
  return {
    title: hab.nombre,
    description: hab.descripcion,
  };
}

export default async function HabitacionDetalle({ params }: HabitacionPageProps) {
  const { slug } = await params;
  const habEs = habitaciones.find((item) => item.slug === slug);
  const habEn = rooms.find((item) => item.slug === slug);

  if (!habEs || !habEn) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      <section className="relative isolate overflow-hidden">
        <Image src={habEn.heroImage} alt="Habitacion en Dolphin Blue Paradise" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="relative container flex min-h-[60vh] flex-col justify-center gap-6 py-24 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">Habitaciones</p>
          <h1 className="max-w-3xl font-display text-4xl md:text-5xl">{habEs.nombre}</h1>
          <p className="max-w-2xl text-lg text-white/80">{habEs.descripcion}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#booking" trackingEvent="es_room_reserva" trackingData={{ room: habEs.slug }}>
              Reservar ahora
            </Button>
            <Button
              href="/es/habitaciones"
              variant="secondary"
              trackingEvent="es_room_regresar"
              trackingData={{ room: habEs.slug }}
            >
              Volver a habitaciones
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[var(--color-navy)]">Servicios incluidos</h2>
            <ul className="space-y-3 text-muted">
              {habEs.servicios.map((servicio) => (
                <li key={servicio} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                  <span>{servicio}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="card space-y-4">
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-semibold text-[var(--color-navy)]">Tamano</span>
              <span>{habEs.tamano}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-semibold text-[var(--color-navy)]">Capacidad</span>
              <span>{habEs.capacidad}</span>
            </div>
            <p className="text-sm text-muted">
              Nuestro concierge puede coordinar vuelos, traslados y experiencias personalizadas. Incluye tus fechas en la solicitud y nos encargamos del resto.
            </p>
            <Link href="#booking" className="button-primary">
              Consultar fechas
            </Link>
            <Link href="/es/contacto" className="button-secondary">
              Habla con concierge
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
