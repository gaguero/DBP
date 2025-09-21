import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Restaurante Blo Bar",
  description:
    "Descubre la propuesta gastronomica de Blo Bar & Restaurant: menus de temporada y cocteles artesanales sobre el agua.",
};

const horario = [
  { etiqueta: "Desayuno", detalle: "8:00 – 9:30 am" },
  { etiqueta: "Almuerzo", detalle: "12:00 – 2:30 pm" },
  { etiqueta: "Cena", detalle: "7:00 – 9:30 pm • menu degustacion" },
  { etiqueta: "Blo Bar", detalle: "Snacks, jugos frescos y cocteles todo el dia" },
];

export default function RestaurantePage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Blo Bar & Restaurant"
        kicker="Gastronomia"
        description="Sabores europeos reinterpretados con cosechas del jardin tropical y productos locales de Bocas del Toro."
        image="/images/dining-overwater.jpg"
      />

      <section className="section">
        <div className="container grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Cocina de origen</h2>
            <p className="text-muted text-lg leading-relajed">
              Panes artesanales al amanecer, pescados del Caribe, frutas tropicales y botanicos de nuestro jardin se convierten en menus degustacion que se adaptan a la temporada.
            </p>
            <p className="text-muted">
              Minimizamos residuos gracias al compostaje y al uso de amenidades reutilizables. Con 48 horas de aviso creamos menus veganos, sin gluten o segun alergias. Markus disena cocteles con destilados locales mientras Yu transforma frutas en sorbetes y petit fours.
            </p>
          </div>
          <Card className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Horario</h3>
            <ul className="space-y-3 text-sm text-muted">
              {horario.map((franja) => (
                <li key={franja.etiqueta} className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--color-navy)]">{franja.etiqueta}</span>
                  <span>{franja.detalle}</span>
                </li>
              ))}
            </ul>
            <Button href="/es/contacto" variant="secondary" className="w-full">
              Reservar mesa
            </Button>
            <Button href="mailto:contact@dolphinblueparadise.com" className="w-full">
              Compartir necesidades alimenticias
            </Button>
          </Card>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Momentos del chef</h2>
            <p className="text-muted">
              Desde ceviche en la playa hasta cenas a la luz de las velas, el equipo culinario crea experiencias que celebran confort y descubrimiento. Cuentanos que celebras y lo diseniamos.
            </p>
            <Button href="#booking" variant="secondary">
              Agregar gastronomia a tu estancia
            </Button>
          </div>
          <Card className="space-y-3 bg-white/90 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">Testimonio</p>
            <blockquote className="text-lg text-[var(--color-navy)]">
              Las degustaciones y cocteles fueron inolvidables. Cada plato contaba la historia de la Bahia.
            </blockquote>
            <cite className="block text-sm text-muted">– Comentario de huesped</cite>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Menus de ejemplo</h2>
          <p className="text-muted">
            Actualizamos las cartas semanalmente. Pide la version completa a concierge y la adaptaremos a tus gustos y fechas.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {["Desayuno", "Almuerzo", "Cena"].map((curso) => (
              <Card key={curso} className="space-y-3">
                <h3 className="font-display text-xl text-[var(--color-navy)]">{curso}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Cafe local e infusiones botanicas</li>
                  <li>Frutas tropicales cosechadas onsite</li>
                  <li>Especialidades del chef segun temporada</li>
                </ul>
                <Link href="/es/contacto" className="inline-flex text-sm font-semibold text-[var(--color-ocean)]">
                  Solicitar menu completo
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
