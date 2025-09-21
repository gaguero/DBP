import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Voluntariado",
  description:
    "Descubre como apoyar a las comunidades locales durante tu estadia en Dolphin Blue Paradise.",
};

export default function VoluntariadoPage() {
  return <LegacyPage page="es_voluntariado" />;
}