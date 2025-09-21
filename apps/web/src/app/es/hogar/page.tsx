import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Dolphin Blue Paradise - Paraiso en Bahia Delfines",
  description:
    "Escapate a Dolphin Blue Paradise, un eco-resort de lujo fuera de la red en Bahia Delfines, Panama. Experiencias personalizadas, gastronomia de la huerta y compromiso con la comunidad.",
};

export default function HogarPage() {
  return <LegacyPage page="es_hogar" />;
}