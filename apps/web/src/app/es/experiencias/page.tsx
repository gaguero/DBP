import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Explora aventuras personalizadas en Dolphin Blue Paradise, desde encuentros con delfines hasta caminatas en la selva.",
};

export default function ExperienciasEsPage() {
  return <LegacyPage page="es_experiencias" />;
}