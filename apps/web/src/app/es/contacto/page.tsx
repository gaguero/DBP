import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { contactoEs } from "@/content/data-es";
import { LegacyContent } from "@/components/legacy-content";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta al concierge de Dolphin Blue Paradise para planear tu estancia.",
};

export default function ContactoPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const hasError = typeof searchParams?.error === "string";

  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Planifiquemos tu escapada"
        kicker="Contacto"
        description={contactoEs.aviso}
        image="/images/rooms-view.jpg"
      />

      {hasError ? (
        <div className="container mt-10">
          <div className="card bg-[var(--color-sand)] text-sm text-[var(--color-navy)]">
            Ocurrio un problema al enviar la solicitud. Intentalo de nuevo o escribe a contact@dolphinblueparadise.com.
          </div>
        </div>
      ) : null}

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <form className="card space-y-4" data-crm="espocrm" method="post" action="/api/lead">
            <input type="hidden" name="locale" value="es" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Nombre completo *</span>
                <input
                  name="name"
                  required
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Email *</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">WhatsApp/Telefono</span>
                <input
                  name="phone"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Idioma preferido</span>
                <select
                  name="language"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                >
                  <option value="Spanish">Espanol</option>
                  <option value="English">Ingles</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Fecha de llegada</span>
                <input
                  type="date"
                  name="arrival"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold text-[var(--color-navy)]">Fecha de salida</span>
                <input
                  type="date"
                  name="departure"
                  className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
                />
              </label>
            </div>
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-[var(--color-navy)]">Intereses</span>
              <select
                name="interests"
                multiple
                className="h-28 w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
              >
                <option value="rooms">Habitaciones</option>
                <option value="dining">Gastronomia privada</option>
                <option value="experiences">Experiencias</option>
                <option value="wellness">Bienestar</option>
                <option value="volunteering">Voluntariado</option>
              </select>
              <span className="block text-xs text-muted">Mantener Ctrl o Command para seleccionar varias opciones.</span>
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-[var(--color-navy)]">Cuenta sobre tu viaje *</span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-md border border-black/10 px-3 py-2 focus:border-[var(--color-ocean)] focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" name="consent" required />
              <span>Acepto la politica de privacidad y recibir informacion para planificar mi viaje.</span>
            </label>
            <Button
              type="submit"
              className="w-full"
              trackingEvent="lead_form_submit"
              trackingData={{ locale: "es" }}
            >
              Enviar consulta
            </Button>
          </form>

          <Card className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Linea directa</h2>
            <div className="space-y-2 text-sm text-muted">
              <p>WhatsApp: <Link href="https://wa.me/50763460605" className="font-semibold">+507 6346 0605</Link></p>
              <p>Email: <Link href="mailto:contact@dolphinblueparadise.com" className="font-semibold">contact@dolphinblueparadise.com</Link></p>
              <p>Direccion: Isla San Cristobal – Bahia Delfines – Bocas del Toro – Panama</p>
            </div>
            <Button
              href="https://maps.app.goo.gl/VLQArMMMjA3a7EB59"
              variant="secondary"
              className="w-full"
              target="_blank"
              trackingEvent="es_contacto_mapa"
              trackingData={{ locale: "es" }}
            >
              Ver mapa de muelle
            </Button>
            <Button
              href="#booking"
              className="w-full"
              trackingEvent="es_contacto_widget"
              trackingData={{ locale: "es" }}
            >
              Ir al widget de reservas
            </Button>
          </Card>
        </div>
      </section>

      <LegacyContent
        page="es_contacto"
        description="Instrucciones de reserva heredadas del sitio original."
      />
    </div>
  );
}
