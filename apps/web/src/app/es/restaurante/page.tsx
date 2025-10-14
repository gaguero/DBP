import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const schedule = [
  { meal: "Desayuno", detail: "8:00 am - 9:30 am" },
  { meal: "Almuerzo", detail: "12:00 pm - 2:30 pm" },
  { meal: "Cena", detail: "7:00 pm - 9:30 pm - menu de tres tiempos" },
  { meal: "Blo Bar", detail: "Snacks y cocteles durante todo el dia" },
];

const testimonial =
  "Markus prepara cocteles excelentes y la cocina es espectacular. Probamos pescado fresco y postres de frutas locales que Yu elabora cada dia.";

const reservationNotes = [
  "Residentes y visitantes son bienvenidos a disfrutar una bebida, pero sugerimos escribir por WhatsApp o email para confirmar que estemos en el resort.",
  "Para almuerzo o cena solicitamos 48 horas de anticipacion. La cena siempre es un menu degustacion de tres tiempos.",
  "WhatsApp: +507 6346 0605 - contact@dolphinblueparadise.com",
];

export const metadata: Metadata = {
  title: "Blo Bar & Restaurant",
  description:
    "Cocina casera con productos organicos locales y menus europeos fusionados con ingredientes tropicales.",
};

export default function RestaurantePage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Blo Bar & Restaurant"
        kicker="Gastronomia"
        description="Comida casera, ingredientes organicos y menus inspirados en nuestro jardin sobre el agua de Bahia Delfines."
        image="/images/dining-overwater.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          <p>
            Servimos alimentos cultivados y abastecidos localmente, cocinados al momento y con un enfoque de cero desperdicio. El
            restaurante sobre el agua ofrece vistas panoramicas de la bahia mientras disfrutas cocina fusion europea con productos de la huerta.
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Horarios</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map((item) => (
              <Card key={item.meal} className="flex items-center justify-between p-4 text-sm uppercase tracking-[0.2em]">
                <span className="text-[var(--color-navy)]">{item.meal}</span>
                <span className="text-[var(--color-text-muted)]">{item.detail}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4">
          <Card className="space-y-3 bg-white/80 p-8 text-lg text-[var(--color-navy)] shadow-soft">
            <blockquote className="italic">{testimonial}</blockquote>
          </Card>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-3 text-sm text-muted">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">Reservaciones</h2>
          {reservationNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>
    </div>
  );
}


