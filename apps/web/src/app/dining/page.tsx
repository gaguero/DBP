import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Dining at Blo Bar & Restaurant",
  description:
    "Explore seasonal tasting menus, garden-to-table ingredients, and bespoke dining experiences at Dolphin Blue Paradise.",
};

export default function DiningPage() {
  return <LegacyPage page="dining" />;
}