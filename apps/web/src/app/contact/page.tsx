import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: "Get in touch with Dolphin Blue Paradise concierge to plan your stay, experiences, or community involvement.",
};

export default function ContactPage() {
  return <LegacyPage page="contact" />;
}