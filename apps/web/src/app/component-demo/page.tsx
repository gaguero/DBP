"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHero } from "@/components/page-hero";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TrackedLink } from "@/components/tracked-link";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { BlogPostRenderer } from "@/components/blog-post-renderer";
import { ChatwootScript } from "@/components/chatwoot-script";
import { GtmScript } from "@/components/gtm";
import { ContentBlock } from "@/types/content-blocks";

const demoContentBlocks: ContentBlock[] = [
  {
    id: "demo-para",
    type: "paragraph",
    content: "This is a sample paragraph with <strong>bold text</strong> and <em>italic text</em> to demonstrate the blog post renderer."
  },
  {
    id: "demo-heading",
    type: "heading",
    level: 2,
    content: "Sample Heading"
  },
  {
    id: "demo-quote",
    type: "quote",
    content: "This is a beautiful quote that showcases the quote component styling.",
    author: "Demo Author"
  }
];

const componentOptions = [
  { id: "button", name: "Button Component", description: "Interactive buttons with primary/secondary variants" },
  { id: "card", name: "Card Component", description: "Container component with card styling" },
  { id: "page-hero", name: "Page Hero", description: "Hero section with title, description, and background image" },
  { id: "newsletter-popup", name: "Newsletter Popup", description: "Modal popup for newsletter signup" },
  { id: "site-header", name: "Site Header", description: "Navigation header with logo and menu" },
  { id: "site-footer", name: "Site Footer", description: "Footer with links and social media" },
  { id: "tracked-link", name: "Tracked Link", description: "Links with analytics tracking" },
  { id: "booking-widget", name: "Booking Widget Placeholder", description: "Placeholder for booking system" },
  { id: "blog-renderer", name: "Blog Post Renderer", description: "Renders rich content blocks for blog posts" },
  { id: "chatwoot-script", name: "Chatwoot Script", description: "Chat widget integration script" },
  { id: "gtm-script", name: "GTM Script", description: "Google Tag Manager integration" }
];

export default function ComponentDemoPage() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const toggleComponent = (componentId: string) => {
    setSelectedComponents(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  return (
    <>
      <GtmScript />
      <ChatwootScript />
      <SiteHeader />

      <main className="min-h-screen">
        <PageHero
          title="Component Demo Page"
          kicker="UI Components"
          description="Explore and select from our collection of reusable UI components"
          image="/images/hero-bay.jpg"
        />

        <section className="section">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-display mb-6">Component Selection</h2>
                <p className="text-muted mb-6">
                  Check the components you&apos;d like to include in your selection. A summary will appear below.
                </p>

                <div className="space-y-4">
                  {componentOptions.map((component) => (
                    <label key={component.id} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedComponents.includes(component.id)}
                        onChange={() => toggleComponent(component.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">{component.name}</div>
                        <div className="text-sm text-muted">{component.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display mb-6">Your Selection</h2>
                {selectedComponents.length === 0 ? (
                  <p className="text-muted">No components selected yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedComponents.map((id) => {
                      const component = componentOptions.find(c => c.id === id);
                      return (
                        <div key={id} className="flex items-center gap-2 text-sm">
                          <span className="text-[var(--color-gold)]">✓</span>
                          {component?.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Component Demonstrations */}
        <section className="section bg-[var(--color-sand)]">
          <div className="container">
            <h2 className="text-3xl font-display mb-8 text-center">Component Gallery</h2>

            {/* Button Examples */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Button Component</h3>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button href="/test">Link Button</Button>
                <Button variant="secondary" href="/test">Secondary Link</Button>
              </div>
            </div>

            {/* Card Examples */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Card Component</h3>
              <Card className="p-6">
                <h4 className="font-semibold mb-2">Sample Card</h4>
                <p className="text-muted">This is a card component containing some sample content.</p>
              </Card>
            </div>

            {/* Tracked Link Examples */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Tracked Link Component</h3>
              <p className="mb-4">Links with analytics tracking:</p>
              <ul className="space-y-2">
                <li><TrackedLink href="/test" trackingEvent="demo_link_click">Sample Tracked Link</TrackedLink></li>
                <li><TrackedLink href="/contact" trackingEvent="contact_link_click" trackingData={{ source: "demo" }}>Contact Us Link</TrackedLink></li>
              </ul>
            </div>

            {/* Blog Post Renderer */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Blog Post Renderer</h3>
              <div className="max-w-2xl">
                <BlogPostRenderer blocks={demoContentBlocks} />
              </div>
            </div>

            {/* Booking Widget Placeholder */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Booking Widget Placeholder</h3>
              <BookingWidgetPlaceholder />
            </div>

            {/* Newsletter Popup Trigger */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Newsletter Popup</h3>
              <Button onClick={() => setShowNewsletter(true)}>
                Show Newsletter Popup
              </Button>
              <p className="text-sm text-muted mt-2">
                The popup normally appears automatically after 10 seconds, but you can trigger it here.
              </p>
            </div>

            {/* Scripts Info */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Integration Scripts</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Google Tag Manager</h4>
                  <p className="text-sm text-muted">GTM script is loaded in the page head when GTM_ID environment variable is set.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Chatwoot Widget</h4>
                  <p className="text-sm text-muted">Chat script is loaded when CHATWOOT_BASE_URL and CHATWOOT_TOKEN are configured.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {showNewsletter && (
        <NewsletterPopup />
      )}
    </>
  );
}