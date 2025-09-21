import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { trackEvent } from "@/lib/analytics";

const pilares = [
  {
    titulo: "Eco lujo consciente",
    descripcion:
      "Cabanas fuera de la red con vistas al mar, acabados artesanales y comodidades pensadas para descansar.",
    icono: "♢",
  },
  {
    titulo: "Experiencias a medida",
    descripcion:
      "Encuentros con delfines, caminatas guiadas por la selva y excursiones privadas por el archipielago.",
    icono: "✦",
  },
  {
    titulo: "Gastronomia de la huerta",
    descripcion:
      "Menus de temporada inspirados en nuestro jardin tropical y cocteles de autor en Blo Bar.",
    icono: "✽",
  },
  {
    titulo: "Impacto positivo",
    descripcion:
      "Tu estancia apoya proyectos de salud, educacion y conservacion en las comunidades indigenas vecinas.",
    icono: "✺",
  },
];

const historias = [
  {
    titulo: "Suites con terraza panoramica",
    descripcion: "Espacios creados para vivir la bahia desde tu terraza y con concierge personalizado.",
    imagen: "/images/rooms-view.jpg",
    enlace: "/es/habitaciones",
    tracking: "es_rooms_highlight",
  },
  {
    titulo: "Restaurante sobre el agua",
    descripcion: "Blo Bar sirve cocina inspirada en el jardin y cocteleria de autor frente al atardecer.",
    imagen: "/images/dining-overwater.jpg",
    enlace: "/es/restaurante",
    tracking: "es_dining_highlight",
  },
];

export const metadata: Metadata = {
  title: "Dolphin Blue Paradise – Paraiso en Bahia Delfines",
  description:
    "Escapate a Dolphin Blue Paradise, un eco-resort de lujo fuera de la red en Bahia Delfines, Panama. Experiencias personalizadas, gastronomia de la huerta y compromiso con la comunidad.",
};

export default function HogarPage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image src="/images/hero-bay.jpg" alt="Vista aerea de Bahia Delfines" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative container flex min-h-[80vh] flex-col justify-center gap-8 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">Paraiso entre la selva y el mar</p>
          <h1 className="max-w-3xl font-display text-4xl md:text-6xl">Un refugio eco-lujo personalizado en Bahia Delfines, Panama</h1>
          <p className="max-w-2xl text-lg text-white/80">
            Descubre un santuario fuera de la red alimentado por energia solar, abastecido por nuestros jardines y diseñado por anfitriones que anticipan cada detalle.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#booking" trackingEvent="es_cta_plan_escape" trackingData={{ section: "hero" }}>
              Planifica tu escape
            </Button>
            <Button
              href="/es/experiencias"
              variant="secondary"
              trackingEvent="es_cta_explora_experiencias"
              trackingData={{ section: "hero" }}
            >
              Explora experiencias
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-4">
          {pilares.map((pilar) => (
            <Card key={pilar.titulo} className="h-full space-y-3">
              <span className="text-2xl" aria-hidden>
                {pilar.icono}
              </span>
              <h3 className="font-display text-xl text-[var(--color-navy)]">{pilar.titulo}</h3>
              <p className="text-muted text-sm leading-relajed">{pilar.descripcion}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-2">
          {historias.map((historia) => (
            <article key={historia.titulo} className="relative overflow-hidden rounded-3xl shadow-soft">
              <Image
                src={historia.imagen}
                alt={historia.titulo}
                width={800}
                height={540}
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="space-y-4 bg-white p-8">
                <h3 className="section-heading text-3xl md:text-[2.5rem]">{historia.titulo}</h3>
                <p className="text-muted">{historia.descripcion}</p>
                <Link
                  href={historia.enlace}
                  onClick={() => trackEvent({ event: historia.tracking, data: { section: "highlight" } })}
                  className="inline-flex items-center gap-2 font-semibold text-[var(--color-ocean)]"
                >
                  Descubrir mas
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BookingWidgetPlaceholder />
    </div>
  );
}
