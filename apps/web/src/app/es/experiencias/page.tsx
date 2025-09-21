import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

const introParagraphs = [
  "Elige entre experiencias a medida que celebran Bahia Delfines: avistamiento de delfines, snorkel caribeno y playas escondidas en todo Bocas del Toro.",
  "Coordinamos transporte, equipo y guias para que te concentres en la aventura, el descanso y la conexion con la comunidad.",
];

const experiences = [
  { title: "Bahia de los delfines", description: "Observa a los delfines residentes en la tranquila Bahia Delfines." },
  { title: "Snorkel", description: "Disfruta del mar caribeno desde nuestra plataforma o en salidas guiadas." },
  { title: "Excursiones y tours", description: "Descubre playas, manglares y comunidades en lancha." },
  { title: "Esqui y wakeboard", description: "Agrega emocion con sesiones de esqui, wakeboard o tubing." },
  { title: "Tour de cacao", description: "Visita a una comunidad Ngabe o a nuestros vecinos chocolateros para conocer el proceso del cacao." },
  { title: "Paddle surf", description: "Explora la bahia a tu ritmo con tablas de paddle incluidas." },
  { title: "Surf", description: "De noviembre a abril te llevamos a olas de clase mundial." },
  { title: "Kayak", description: "Recorre los manglares con nuestros kayaks disponibles." },
  { title: "Isla de los monos", description: "Visita un santuario que alberga varias especies de monos rescatados." },
  { title: "Pesca", description: "Pesca especies como pargo, jack, wahoo o atun durante todo el ano." },
  { title: "Masajes", description: "Relajate con masajes terapeuticos organizados en el resort." },
];

const contactParagraph =
  "Escribenos por WhatsApp al +507 6346 0605 o a contact@dolphinblueparadise.com para personalizar tu itinerario.";

export const metadata: Metadata = {
  title: "Experiencias",
  description: "Explora aventuras personalizadas en Dolphin Blue Paradise, desde encuentros con delfines hasta caminatas en la selva.",
};

export default function ExperienciasPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Tours cortos y de medio dia"
        kicker="Experiencias"
        description="Vive Bahia Delfines por agua, selva y cultura local."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container space-y-5 text-lg text-[var(--color-text-primary)]">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <Card key={experience.title} className="space-y-2 p-6">
              <h3 className="font-display text-xl text-[var(--color-navy)]">{experience.title}</h3>
              <p className="text-sm text-muted">{experience.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container text-sm text-muted">
          <p>{contactParagraph}</p>
        </div>
      </section>
    </div>
  );
}