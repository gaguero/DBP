"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { trackEvent } from "@/lib/analytics";

export default function GraciasPageClient() {
  useEffect(() => {
    trackEvent({ event: "lead_submission_success", data: { locale: "es" } });
  }, []);

  return (
    <div className="space-y-12 pb-24">
      <section className="section">
        <div className="container max-w-2xl space-y-6 text-center">
          <h1 className="font-display text-4xl text-[var(--color-navy)]">Gracias por escribirnos</h1>
          <p className="text-muted">
            Nuestro equipo de concierge recibio tu solicitud y respondera en menos de 24 horas con opciones
            personalizadas. Mientras tanto, descubre mas experiencias o consulta nuestra guia de viaje.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/es/experiencias">Planificar actividades</Button>
            <Button href="/es/planifica-tu-viaje" variant="secondary">
              Guia de viaje
            </Button>
            <Link href="/es/hogar" className="text-sm font-semibold text-[var(--color-ocean)]">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
