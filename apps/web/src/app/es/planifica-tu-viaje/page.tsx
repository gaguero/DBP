import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Planifica tu viaje",
  description: "Todo lo que necesitas para llegar a Dolphin Blue Paradise.",
};

export default function PlanificaTuViajePage() {
  return <LegacyPage page="es_plan" />;
}