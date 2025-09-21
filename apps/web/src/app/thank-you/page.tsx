import type { Metadata } from "next";
import ThankYouPageClient from "./client";

export const metadata: Metadata = {
  title: "Thank You",
};

export default function ThankYouPage() {
  return <ThankYouPageClient />;
}
