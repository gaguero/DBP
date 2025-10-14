import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { travelRoutes } from "@/content/data";

const introduction = [
  "Coordinamos cada tramo de tu viaje hacia Dolphin Blue Paradise: vuelos domesticos, conductores privados y traslados en lancha.",
  "Te asistimos con llegadas desde Ciudad de Panama, Costa Rica, David, Boquete y otros puntos para que llegues con tranquilidad a Isla San Cristobal.",
];

const spanishRoutes = travelRoutes.map((route) => ({
  title: route.title,
  options: route.options,
}));

export const metadata: Metadata = {
  title: "Planifica tu viaje",
  description: "Rutas, traslados y asistencia para llegar a Dolphin Blue Paradise.",
};

export default function PlanificaTuViajePage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="De la ciudad al paraiso"
        kicker="Logistica"
        description="Revisa rutas de viaje, opciones de traslado y soporte de concierge para llegar a Bahia Delfines."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          {introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Rutas de acceso</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {spanishRoutes.map((route) => (
              <Card key={route.title} className="space-y-3 p-6">
                <h3 className="font-display text-xl text-[var(--color-navy)]">{route.title}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  {route.options.map((option) => (
                    <li key={option} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-sm text-muted">
          <p>
            Comparte tus datos de vuelo y coordinamos traslados desde Bocas Town o Tierra Oscura en nuestros horarios programados (12:30 pm y 5:00 pm). Para llegadas tardias solo necesitamos aviso previo.
          </p>
          <p>WhatsApp: +507 6346 0605 - contact@dolphinblueparadise.com</p>
        </div>
      </section>
    </div>
  );
}