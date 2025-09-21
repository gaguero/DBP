import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse highlights from Dolphin Blue Paradise-from sea-view suites to curated adventures.",
};

export default function GalleryPage() {
  return <LegacyPage page="facilities" />;
}