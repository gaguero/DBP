import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const introParagraphs = [
  "En Dolphin Blue Paradise apoyamos el derecho a la salud digna. Colaboramos con Floating Doctors y otras organizaciones que brindan atencion medica y desarrollo comunitario en el archipielago de Bocas del Toro.",
  "Muchos huespedes combinan su estancia con voluntariados y utilizan el resort como base confortable." ,
];

const donationItems = [
  "Ropa y calzado basico",
  "Libros, mochilas y utiles escolares",
  "Cargadores solares",
  "Articulos de aseo",
  "Barriles o sistemas para captar lluvia",
  "Mosquiteros",
  "Computadoras portatiles",
  "Sistemas de potabilizacion de agua",
  "Chalecos salvavidas",
  "Equipo deportivo",
  "Lamparas frontales o luces para bicicleta",
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Voluntariado",
  description: "Apoya a las comunidades indigenas durante tu visita a Dolphin Blue Paradise.",
};

export default function VoluntariadoPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Apoyo a comunidades indigenas"
        kicker="Voluntariado"
        description="Colabora con Floating Doctors, dona insumos y patrocina educacion mientras disfrutas Bahia Delfines."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Donaciones sugeridas</h2>
          <Card className="space-y-2 p-6 text-sm text-muted">
            <p>
              Nos ubicamos cerca de las comunidades de Aldana, Bocastorito, Tierra Oscura y Buena Esperanza, que enfrentan desafios en
              acceso a salud, agua y alimentos. Agradecemos las siguientes donaciones:
            </p>
            <ul className="space-y-2">
              {donationItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Si deseas apoyar servicios medicos, visita www.floatingdoctors.com o contactanos para coordinar una visita.</p>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4 text-sm text-muted">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">Becas educativas</h2>
          <p>
            Contamos con un programa de becas para colaboradores y sus hijos en carreras de salud y hospitalidad. Escribenos si deseas patrocinar a un estudiante.
          </p>
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