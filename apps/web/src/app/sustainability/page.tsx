import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Sustainability & Impact",
  description:
    "Discover how Dolphin Blue Paradise operates off-grid, nurtures local ecosystems, and partners with indigenous communities.",
};

export default function SustainabilityPage() {
  return <LegacyPage page="sustainability" />;
}