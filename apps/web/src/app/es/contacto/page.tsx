import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Contacto",
  description: "Comunicate con el concierge de Dolphin Blue Paradise para planificar tu viaje.",
};

export default function ContactoPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Contactanos"
        kicker="Reserva"
        description="Escribenos por WhatsApp o correo para confirmar disponibilidad, traslados y experiencias personalizadas."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container">
          <Card className="space-y-3 p-6 text-sm text-muted">
            {contactInfo.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
}