import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Imagenes de Dolphin Blue Paradise: suites, gastronomia y aventuras.",
};

export default function GaleriaPage() {
  return <LegacyPage page="es_instalaciones" />;
}