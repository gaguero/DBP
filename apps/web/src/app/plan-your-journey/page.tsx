import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Plan Your Journey",
  description:
    "Everything you need to reach Dolphin Blue Paradise: travel routes, transfers, packing tips, and FAQs.",
};

export default function PlanYourJourneyPage() {
  return <LegacyPage page="plan" />;
}