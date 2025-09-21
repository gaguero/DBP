import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { impactoEs } from "@/content/data-es";

export const metadata: Metadata = {
  title: "Impacto y sostenibilidad",
  description: "Como Dolphin Blue Paradise opera de forma regenerativa en Bahía Delfines.",
};

const acciones = [
  {
    titulo: "Energia fuera de la red",
    texto: "Paneles solares y baterias respaldan suites, cocina y embarcaciones. Monitoreamos el consumo en tiempo real para mantener la huella al minimo.",
  },
  {
    titulo: "Agua circular",
    texto: "Recolectamos lluvia, la purificamos y la servimos filtrada. Cada cabana cuenta con estaciones de recarga y amenidades rellenables.",
  },
  {
    titulo: "Compost y reutilizacion",
    texto: "Residuos organicos vuelven al jardin como compost, y colaboramos con artesanos locales para reutilizar materiales.",
  },
  {
    titulo: "Alianzas comunitarias",
    texto: "Apoyamos a Floating Doctors y financiamos becas para miembros del equipo y sus familias en estudios de turismo y salud.",
  },
];

export default function ImpactoPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Tu viaje, su impacto positivo"
        kicker="Impacto"
        description="Cada estancia mantiene viva la biodiversidad de Bahía Delfines y fortalece a las comunidades Ngabe vecinas."
        image="/images/hero-bay.jpg"
      />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          {impactoEs.map((item) => (
            <Card key={item.titulo} className="space-y-3">
              <h3 className="font-display text-xl text-[var(--color-navy)]">{item.titulo}</h3>
              <p className="text-muted text-sm leading-relajed">{item.descripcion}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Que hacemos cada dia</h2>
            <ul className="space-y-3 text-muted">
              {acciones.map((accion) => (
                <li key={accion.titulo} className="space-y-1">
                  <p className="font-semibold text-[var(--color-navy)]">{accion.titulo}</p>
                  <p className="text-sm">{accion.texto}</p>
                </li>
              ))}
            </ul>
          </div>
          <Card className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Antes de llegar</h3>
            <p className="text-sm text-muted">
              Empaca bloqueador amigable con arrecifes, una botella reutilizable y prendas ligeras para la tarde. Nosotros te proporcionamos amenities biodegradables, mosquiteros y guias de buenas practicas.
            </p>
            <Button href="/es/voluntariado" variant="secondary" className="w-full">
              Apoya proyectos locales
            </Button>
            <Button href="/es/planifica-tu-viaje" className="w-full">
              Planifica viaje sostenible
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}