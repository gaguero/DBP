import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";

const historias = {
  "menu-temporada": {
    titulo: "Menu de temporada: del jardin a la mesa",
    fecha: "8 ene 2025",
    imagen: "/images/dining-overwater.jpg",
    parrafos: [
      "Cada manana el equipo culinario camina el jardin con Roque para elegir frutas, hierbas y flores comestibles en su punto optimo. El resultado son menus que siguen los ritmos de la bahia.",
      "El desayuno incluye jugos prensados en frio de rambutan y carambola, mientras que la cena destaca pescado del dia con salsas de cacao fermentado. Los citricos se convierten en bitters y las cascaras de coco en carbon para la parrilla.",
      "Los huespedes pueden reservar una experiencia chef's table para aprender tecnicas de emplatado y cocteleria botanica."],
  },
  "floating-doctors": {
    titulo: "Alianza con Floating Doctors",
    fecha: "20 dic 2024",
    imagen: "/images/rooms-view.jpg",
    parrafos: [
      "Esta temporada recibimos medicos y enfermeras voluntarios que navegaron a Aldana y Tierra Oscura para ofrecer consultas. En cinco dias se atendieron 320 pacientes.",
      "Los huespedes donaron insumos medicos y acompaÃ±aron operaciones para conocer la realidad sanitaria local. Parte de cada reserva financia combustible y logistica.",
      "Â¿Quieres sumarte a la proxima mision? Contacta al concierge para recibir agenda, lista de empaque y requisitos."],
  },
  "delfines-respeto": {
    titulo: "Encuentros responsables con delfines",
    fecha: "30 nov 2024",
    imagen: "/images/hero-bay.jpg",
    parrafos: [
      "Bahia Delfines alberga alrededor de 80 delfines nariz de botella. Nuestro equipo trabaja con biologos marinos para monitorear las manadas y promover observacion responsable.",
      "Limitamos a dos botes por avistamiento, apagamos motores a 100 metros y evitamos persecuciones. Asi se puede apreciar el juego de los delfines sin alterar su comportamiento.",
      "Comparte tus fotografias con concierge: sirven para identificar individuos y apoyar investigaciones sobre salud y migracion."],
  },
} as const;

type HistoriaKey = keyof typeof historias;

interface HistoriaPageProps {
  params: Promise<{ slug: HistoriaKey }>;
}

export async function generateStaticParams() {
  return Object.keys(historias).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HistoriaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const historia = historias[slug];
  if (!historia) {
    return {};
  }
  return {
    title: historia.titulo,
    description: historia.parrafos[0],
  };
}

export default async function HistoriaDetalle({ params }: HistoriaPageProps) {
  const { slug } = await params;
  const historia = historias[slug];

  if (!historia) {
    notFound();
  }

  return (
    <article className="space-y-12 pb-24">
      <section className="relative isolate overflow-hidden">
        <Image src={historia.imagen} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />
        <div className="relative container flex min-h-[50vh] flex-col justify-center gap-4 py-20 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">Journal</p>
          <h1 className="font-display text-4xl md:text-[3.5rem]">{historia.titulo}</h1>
          <p className="text-sm text-white/70">{historia.fecha}</p>
        </div>
      </section>

      <div className="container space-y-6 text-lg leading-relajed text-[var(--color-text-primary)]">
        {historia.parrafos.map((parrafo, index) => (
          <p key={index} className="text-muted">
            {parrafo}
          </p>
        ))}
        <div className="flex flex-wrap gap-3 pt-6">
          <Link href="/es/historias" className="button-secondary">
            Volver a historias
          </Link>
          <Button href="/es/contacto">Planifica tu estancia</Button>
        </div>
      </div>
    </article>
  );
}