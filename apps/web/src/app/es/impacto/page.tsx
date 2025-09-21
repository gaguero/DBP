import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Impacto",
  description:
    "Conoce el compromiso de Dolphin Blue Paradise con la sostenibilidad y las comunidades locales.",
};

export default function ImpactoPage() {
  return <LegacyPage page="es_impacto" />;
}