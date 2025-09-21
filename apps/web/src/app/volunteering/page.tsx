import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Volunteering & Community",
  description:
    "Learn how Dolphin Blue Paradise partners with local communities and how you can support during your stay.",
};

export default function VolunteeringPage() {
  return <LegacyPage page="volunteering" />;
}