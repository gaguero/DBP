import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Restaurante Blo",
  description: "Menus de temporada inspirados en el jardin tropical y cocteles de autor en Blo Bar.",
};

export default function RestaurantePage() {
  return <LegacyPage page="es_restaurante" />;
}