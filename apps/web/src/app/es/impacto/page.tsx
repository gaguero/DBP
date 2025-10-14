import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const introParagraphs = [
  "Hospedarte en Dolphin Blue Paradise significa relajarte y, al mismo tiempo, apoyar practicas que cuidan el entorno y a las comunidades vecinas.",
  "Operamos con energia verde y trabajamos continuamente para reducir nuestra huella sin comprometer la comodidad de los huespedes.",
];

const iniciativas = [
  "Operamos 100% fuera de la red con energia solar.",
  "Recolectamos y purificamos agua de lluvia para todo el resort.",
  "Servimos frutas y productos cultivados en nuestro jardin, atendido por Roque, quien vive en la isla desde hace mas de 18 anos.",
  "Compostamos los restos de frutas y verduras para evitar desperdicios.",
  "Utilizamos amenidades rellenables, cubiertos de metal y popotes reutilizables para eliminar plasticos de un solo uso.",
  "Controlamos plagas con aceites esenciales y buenas practicas, evitando quimicos agresivos y proporcionando mosquiteros en las habitaciones.",
];

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

export const metadata: Metadata = {
  title: "Impacto",
  description: "Conoce como Dolphin Blue Paradise protege el entorno y apoya a las comunidades locales.",
};

export default function ImpactoPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Cuidamos el entorno"
        kicker="Tu impacto"
        description="Cada visita contribuye a un modelo de hospitalidad regenerativa en Bahia Delfines."
        image="/images/dining-overwater.jpg"
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
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Acciones sostenibles</h2>
          <Card className="space-y-2 p-6 text-sm text-muted">
            <ul className="space-y-2">
              {iniciativas.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-[var(--color-gold)]">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-3 text-sm text-muted">
          <p>Contactanos para conocer mas sobre nuestras iniciativas o colaborar con ellas.</p>
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