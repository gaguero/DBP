import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const intro =
  "Cada suite cuenta con balcon o terraza privada. Camastros, hamacas y una plataforma de nado te acercan a la vida marina de Bahia Delfines.";

const sections = [
  {
    title: "Natacion y sol",
    description:
      "Relajate en la plataforma, toma el sol en un camastro o disfruta de una hamaca con vista al mar tranquilo.",
  },
  {
    title: "Jardin tropical",
    description:
      "Recorre el jardin cuidado por Roque con frutas como mango, pina, maracuya, rambutan, carambola, guanabana y mas.",
  },
  {
    title: "Cosecha de la huerta",
    description:
      "Cultivamos jengibre, curcuma, lechuga, espinaca, cilantro, limoncillo, tomates y pimientos que llevamos directo a la mesa.",
  },
  {
    title: "Salon Azul",
    description:
      "Sala renovada para leer, meditar o jugar, con un patio exterior equipado con pesas, balon de ejercicio y tapetes de yoga.",
  },
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Galeria",
  description: "Escenas de Dolphin Blue Paradise: espacios, jardin y vida marina.",
};

export default function GaleriaPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Instalaciones y entorno"
        kicker="Galeria"
        description={intro}
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} className="space-y-3 p-6">
              <h2 className="font-display text-2xl text-[var(--color-navy)]">{section.title}</h2>
              <p className="text-sm text-muted">{section.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-3 text-sm text-muted">
          <p>Contactanos para conocer disponibilidad o planificar una estancia personalizada.</p>
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