import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "../globals.css";
import { SiteHeaderEs } from "@/components/site-header-es";
import { SiteFooterEs } from "@/components/site-footer-es";
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
    default: "Dolphin Blue Paradise",
    template: "%s | Dolphin Blue Paradise",
  },
};

export default function EsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${sourceSans.variable} antialiased bg-[var(--color-background)] text-[var(--color-text-primary)]`}>
        <GtmScript />
        <ChatwootScript />
        <SiteHeaderEs />
        <main>{children}</main>
        <SiteFooterEs />
        <GtmNoScript />
      </body>
    </html>
  );
}
