import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { donacionesEs } from "@/content/data-es";

export const metadata: Metadata = {
  title: "Voluntariado y comunidad",
  description:
    "Colabora con Dolphin Blue Paradise para apoyar a las comunidades indigenas en Bahía Delfines.",
};

export default function VoluntariadoPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Apoya a las comunidades de Bahía Delfines"
        kicker="Comunidad"
        description="Trabajamos con Floating Doctors y lideres locales para ampliar acceso a salud, educacion e infraestructura. Los huespedes pueden donar insumos, ofrecer voluntariado o patrocinar becas."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[var(--color-navy)]">Formas de participar</h2>
            <div className="space-y-4 text-muted">
              <p>
                Floating Doctors ofrece clinicas moviles durante todo el ano. Coordinamos transporte y hospedaje para personal medico y aliados que quieran sumarse a las misiones.
              </p>
              <p>
                Tambien existen proyectos en hospitalidad, educacion ambiental y sostenibilidad. Cuéntanos tus habilidades y encontraremos la iniciativa adecuada.
              </p>
            </div>
            <Button href="mailto:contact@dolphinblueparadise.com">Hablar sobre voluntariado</Button>
          </div>
          <Card className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Fondo de becas</h3>
            <p className="text-sm text-muted">
              Patrocina estudios tecnicos de turismo o salud para colaboradores y sus familias. El aporte anual cubre matricula, materiales y acompanamiento.
            </p>
            <Button href="/es/contacto" variant="secondary" className="w-full">
              Solicitar informacion
            </Button>
          </Card>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Lista de donaciones</h2>
          <p className="text-muted">
            Empaca articulos en bolsas plegables; coordinamos la entrega con lideres de Aldana, Bocastorito, Tierra Oscura y Buena Esperanza.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {donacionesEs.map((item) => (
              <Card key={item} className="text-sm text-muted">
                {item}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}