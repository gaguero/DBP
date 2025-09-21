import type { Metadata } from "next";
import GraciasPageClient from "./client";

export const metadata: Metadata = {
  title: "Gracias",
};

export default function GraciasPage() {
  return <GraciasPageClient />;
}
