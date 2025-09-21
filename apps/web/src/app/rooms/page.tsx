import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Discover sea-view cabanas and spacious jungle suites at Dolphin Blue Paradise. Each stay includes breakfast, Wi-Fi, and tailored concierge service.",
};

export default function RoomsPage() {
  return <LegacyPage page="rooms" />;
}