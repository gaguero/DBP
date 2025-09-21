import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { rutasEs, faqsEs } from "@/content/data-es";
import { LegacyContent } from "@/components/legacy-content";

export const metadata: Metadata = {
  title: "Planifica tu viaje",
  description: "Rutas, traslados y preguntas frecuentes para llegar a Dolphin Blue Paradise.",
};

export default function PlanificaPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="De la ciudad al paraiso"
        kicker="Planifica"
        description="Coordinamos vuelos, choferes y traslados en lancha para que llegar a Bahía Delfines sea sencillo."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-3">
          {rutasEs.map((ruta) => (
            <Card key={ruta.titulo} className="space-y-3">
              <h2 className="font-display text-xl text-[var(--color-navy)]">{ruta.titulo}</h2>
              <ul className="space-y-2 text-sm text-muted">
                {ruta.opciones.map((opcion) => (
                  <li key={opcion} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 text-[var(--color-gold)]">•</span>
                    <span>{opcion}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="space-y-5">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {faqsEs.map((faq) => (
                <div key={faq.pregunta} className="space-y-2">
                  <p className="font-semibold text-[var(--color-navy)]">{faq.pregunta}</p>
                  <p className="text-sm text-muted">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Concierge</h3>
            <p className="text-sm text-muted">
              Comparte tus vuelos para coordinar pick-ups desde Bocas Town o Tierra Oscura. Horarios oficiales: 12:30 pm y 5:00 pm.
            </p>
            <Button href="mailto:contact@dolphinblueparadise.com" className="w-full">
              Solicitar ayuda de viaje
            </Button>
            <Button href="https://wa.me/50763460605" variant="secondary" className="w-full">
              WhatsApp concierge
            </Button>
          </Card>
        </div>
      </section>

      <LegacyContent
        page="es_plan"
        description="Guia de viaje heredada incluida a continuacion."
      />
    </div>
  );
}