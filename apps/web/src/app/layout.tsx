import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatwootScript } from "@/components/chatwoot-script";
import { GtmScript, GtmNoScript } from "@/components/gtm";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dolphin Blue Paradise - Eco Luxury Resort in Panama",
    template: "%s | Dolphin Blue Paradise",
  },
  description:
    "Dolphin Blue Paradise is an off-grid eco-luxury resort in Dolphin Bay, Panama. Enjoy bespoke experiences, farm-to-table dining, and sustainable adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} antialiased bg-[var(--color-background)] text-[var(--color-text-primary)]`}>
        <GtmScript />
        <ChatwootScript />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <GtmNoScript />
      </body>
    </html>
  );
}