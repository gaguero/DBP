import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Habitaciones & Cabanas",
  description:
    "Descubre suites con vistas al mar y habitaciones en la selva en Dolphin Blue Paradise.",
};

export default function HabitacionesPage() {
  return <LegacyPage page="es_habitaciones" />;
}