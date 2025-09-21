import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta al concierge de Dolphin Blue Paradise para planificar tu estancia.",
};

export default function ContactoPage() {
  return <LegacyPage page="es_contacto" />;
}