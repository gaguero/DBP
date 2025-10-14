import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";

const heroDescription =
  "Disfruta vistas panoramicas al mar desde cada cabana o habitacion. Todas incluyen batas, toallas de playa, amenidades rellenables y agua de lluvia purificada a diario.";

const rooms = [
  {
    slug: "premium-deluxe-cabana",
    name: "Premium Deluxe Sea View Cabana",
    highlights: [
      "Cama California king con colchon de espuma memory foam organico",
      "Bano privado",
      "Amplia terraza privada con camastros y espacio de trabajo",
      "Vista al mar con electricidad y ventilador",
      "Wi-Fi gratuito y desayuno incluido",
      "33 m2 aproximadamente, hasta 2 personas",
    ],
  },
  {
    slug: "sea-view-cabana",
    name: "Sea View Cabana",
    highlights: [
      "Renovada en febrero de 2024",
      "Cama king y terraza privada",
      "Electricidad, ventilador y vistas al mar",
      "Bano privado y desayuno incluido",
      "Wi-Fi gratuito",
      "20 m2 aproximadamente, hasta 2 personas",
    ],
  },
  {
    slug: "dolphin-view-room",
    name: "Dolphin View Room",
    highlights: [
      "Cama king-size",
      "Bano privado",
      "Gran terraza privada",
      "Vista al mar, electricidad y ventilador",
      "Escritorio y silla",
      "Wi-Fi gratuito, desayuno incluido (30 m2, hasta 2 personas)",
    ],
  },
  {
    slug: "family-jungle-room",
    name: "Family Jungle Room",
    highlights: [
      "1 cama king y sofa cama tipo twin",
      "Bano privado con tina y ducha",
      "Terraza privada con vistas al mar y la selva",
      "Wi-Fi gratuito, desayuno incluido",
      "60+ m2, capacidad hasta 3 personas",
    ],
  },
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Habitaciones & Cabanas",
  description:
    "Descubre cabanas y habitaciones con vista al mar en Dolphin Blue Paradise; amenidades premium y desayuno incluido.",
};

export default function HabitacionesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Cabanas y habitaciones con vista al mar"
        kicker="Hospedaje"
        description={heroDescription}
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container space-y-6">
          {rooms.map((room) => (
            <Card key={room.slug} className="space-y-4 border border-black/5 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h2 className="font-display text-2xl text-[var(--color-navy)]">{room.name}</h2>
                <Button href={`/rooms/${room.slug}`} variant="secondary">
                  Reservar
                </Button>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {room.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-3 text-sm text-muted">
          <p>Contactanos para personalizar tu estancia o confirmar disponibilidad.</p>
          <ul className="space-y-1">
            {contactInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}