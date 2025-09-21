import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Experiences & Excursions",
  description:
    "Discover curated adventures at Dolphin Blue Paradise-from dolphin encounters to rainforest hikes and wellness rituals.",
};

export default function ExperiencesPage() {
  return <LegacyPage page="experiences" />;
}