"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageHero } from "@/components/page-hero";

// Component definitions based on STYLEGUIDE.md
const components = [
  {
    id: "navigation-bar",
    name: "Navigation Bar",
    description: "Transparent overlay on hero, solid Cloud White or Deep Navy on scroll. Logo left, contact snippet + CTA right.",
    category: "Navigation",
  },
  {
    id: "hero-welcome",
    name: "Hero / Welcome Block",
    description: "Two-column system: left text card (Playfair Display headline, body copy, CTA), right or background hero image.",
    category: "Hero",
  },
  {
    id: "value-pillars",
    name: "Value Pillars (Features)",
    description: "Four-card row introducing Pristine Nature, Yacht Service, Culinary, Sustainability. Icon above title, Golden Accent rule.",
    category: "Features",
  },
  {
    id: "story-blocks",
    name: "Highlighted Story Blocks",
    description: "Split layout: full-width image on left, text column on right with layered Warm Sand card. Includes testimonial speech bubble.",
    category: "Content",
  },
  {
    id: "blog-feed",
    name: "Latest News / Blog Feed",
    description: "Two-column list with thumbnail on left, excerpt on right. Meta data (date, author) in Golden Accent small caps.",
    category: "Content",
  },
  {
    id: "activity-carousel",
    name: "Activity Carousel",
    description: "Three/four image tiles with overlay gradient and title tag. Small icons representing activity type.",
    category: "Carousel",
  },
  {
    id: "contact-footer",
    name: "Contact & Footer",
    description: "Footer background Deep Navy; links in Warm Sand or Cloud White. Contact form fields with 12px radius.",
    category: "Footer",
  },
  {
    id: "buttons",
    name: "Buttons & Interactions",
    description: "Primary CTA (Ocean), Secondary CTA (Outlined), Tertiary Link. Smooth 200ms ease transitions.",
    category: "Interactive",
  },
  {
    id: "forms",
    name: "Forms & Inputs",
    description: "Input background Cloud White, border 1px solid rgba(27,35,48,0.16). Label uppercase Source Sans 600 / 12px.",
    category: "Forms",
  },
];

export default function ComponentsDemoPage() {
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());
  const [showList, setShowList] = useState(false);

  const toggleComponent = (id: string) => {
    const newSelected = new Set(selectedComponents);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedComponents(newSelected);
  };

  const selectedList = components.filter((comp) => selectedComponents.has(comp.id));

  return (
    <div className="min-h-screen bg-[#F5EDE3]">
      {/* Header */}
      <div className="bg-[#1B2330] text-white py-6">
        <div className="container">
          <h1 className="text-4xl font-display mb-2">Component Demo Gallery</h1>
          <p className="text-white/80">Select components you like using the checkboxes below</p>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-[#1B2330]">
                {selectedComponents.size} component{selectedComponents.size !== 1 ? "s" : ""} selected
              </span>
              {selectedComponents.size > 0 && (
                <button
                  onClick={() => setShowList(!showList)}
                  className="text-sm text-[#0E8BA8] hover:text-[#C7A46B] underline"
                >
                  {showList ? "Hide" : "Show"} Selected List
                </button>
              )}
            </div>
            {selectedComponents.size > 0 && (
              <button
                onClick={() => {
                  const list = selectedList.map((c) => `- ${c.name} (${c.category})`).join("\n");
                  navigator.clipboard.writeText(list);
                  alert("Selected components copied to clipboard!");
                }}
                className="px-4 py-2 bg-[#0E8BA8] text-white rounded hover:bg-[#C7A46B] transition-colors"
              >
                Copy Selected List
              </button>
            )}
          </div>
          {showList && selectedList.length > 0 && (
            <div className="mt-4 p-4 bg-[#F5EDE3] rounded">
              <h3 className="font-semibold mb-2 text-[#1B2330]">Selected Components:</h3>
              <ul className="space-y-1">
                {selectedList.map((comp) => (
                  <li key={comp.id} className="text-sm text-[#1B2330]">
                    • {comp.name} ({comp.category})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Components Demo */}
      <div className="container py-12 space-y-24">
        {/* Navigation Bar Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="navigation-bar"
              checked={selectedComponents.has("navigation-bar")}
              onChange={() => toggleComponent("navigation-bar")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Navigation Bar</h2>
              <p className="text-sm text-gray-600 mb-4">
                Transparent overlay on hero, solid Cloud White or Deep Navy on scroll
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <nav className="bg-[#1B2330] text-white px-8 py-4 flex items-center justify-between">
              <div className="text-xl font-display">Dolphin Blue Paradise</div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-[#C7A46B] transition-colors">Rooms</a>
                <a href="#" className="hover:text-[#C7A46B] transition-colors">Experiences</a>
                <a href="#" className="hover:text-[#C7A46B] transition-colors">Dining</a>
                <Button variant="primary" className="!bg-[#0E8BA8] hover:!bg-[#C7A46B]">
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        </section>

        {/* Hero / Welcome Block Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="hero-welcome"
              checked={selectedComponents.has("hero-welcome")}
              onChange={() => toggleComponent("hero-welcome")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Hero / Welcome Block</h2>
              <p className="text-sm text-gray-600 mb-4">
                Two-column system with text card and hero image
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <PageHero
              title="Paradise Between the Jungle & the Sea"
              description="A Personalized Eco-Luxury Escape"
              image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop"
              actions={
                <div className="flex gap-4 mt-4">
                  <Button variant="primary">Book Now</Button>
                  <Button variant="secondary">Plan Your Escape</Button>
                </div>
              }
            />
          </div>
        </section>

        {/* Value Pillars Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="value-pillars"
              checked={selectedComponents.has("value-pillars")}
              onChange={() => toggleComponent("value-pillars")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Value Pillars (Features)</h2>
              <p className="text-sm text-gray-600 mb-4">
                Four-card row with icons, titles, and descriptions
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Pristine Nature",
                description: "Immerse yourself in untouched rainforest and crystal-clear waters",
              },
              {
                title: "Yacht Service",
                description: "Personalized yacht excursions to hidden coves and dolphin encounters",
              },
              {
                title: "Culinary Excellence",
                description: "Farm-to-table dining with locally sourced ingredients",
              },
              {
                title: "Sustainability",
                description: "100% off-grid eco-luxury with solar power and rainwater systems",
              },
            ].map((pillar, idx) => (
              <Card
                key={idx}
                className="bg-[#F5EDE3] p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-1 w-12 bg-[#C7A46B] mb-4"></div>
                <h3 className="text-xl font-semibold text-[#1B2330] mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Highlighted Story Blocks Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="story-blocks"
              checked={selectedComponents.has("story-blocks")}
              onChange={() => toggleComponent("story-blocks")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Highlighted Story Blocks</h2>
              <p className="text-sm text-gray-600 mb-4">
                Split layout with image and text column with testimonial card
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                  alt="Tropical paradise"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#F5EDE3] p-8 flex flex-col justify-center relative">
                <h3 className="text-3xl font-display text-[#1B2330] mb-4">Our Story</h3>
                <p className="text-gray-700 mb-6">
                  Dolphin Blue Paradise was born from a vision to create a sanctuary where luxury meets
                  sustainability. Nestled between the jungle and the sea, we offer an escape that honors
                  both nature and comfort.
                </p>
                <Button variant="primary">Learn More</Button>
                <div className="mt-8 bg-[#C7A46B] text-white p-6 rounded-lg relative">
                  <div className="text-4xl absolute -top-2 -left-2">"</div>
                  <blockquote className="text-lg italic relative z-10">
                    One of the most breathtaking and hospitable locations we have experienced.
                  </blockquote>
                  <cite className="block mt-4 text-sm not-italic">— Recent Guest, USA</cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Feed Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="blog-feed"
              checked={selectedComponents.has("blog-feed")}
              onChange={() => toggleComponent("blog-feed")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Latest News / Blog Feed</h2>
              <p className="text-sm text-gray-600 mb-4">
                Two-column list with thumbnails and excerpts
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
                title: "Sustainable Practices at Dolphin Blue Paradise",
                excerpt: "Discover how we maintain our commitment to eco-luxury through solar power, rainwater collection, and local sourcing.",
                date: "March 15, 2024",
                author: "Sustainability Team",
              },
              {
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
                title: "New Dolphin Watching Experience",
                excerpt: "Join us for an unforgettable encounter with the resident bottlenose dolphins in Dolphin Bay.",
                date: "March 10, 2024",
                author: "Experiences Team",
              },
              {
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                title: "Farm-to-Table Dining Highlights",
                excerpt: "Meet our chef and learn about the garden-to-table journey of our signature dishes.",
                date: "March 5, 2024",
                author: "Culinary Team",
              },
            ].map((post, idx) => (
              <div key={idx} className="grid md:grid-cols-[200px_1fr] gap-6 pb-6 border-b border-gray-200 last:border-0">
                <div className="relative h-32 rounded overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B2330] mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[#C7A46B] uppercase tracking-wider">{post.date}</span>
                    <span className="text-gray-500">by {post.author}</span>
                    <a href="#" className="text-[#0E8BA8] hover:underline">Read More →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Carousel Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="activity-carousel"
              checked={selectedComponents.has("activity-carousel")}
              onChange={() => toggleComponent("activity-carousel")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Activity Carousel</h2>
              <p className="text-sm text-gray-600 mb-4">
                Image tiles with overlay gradient and activity icons
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Dolphin Watching", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=500&fit=crop" },
              { title: "Snorkeling", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop" },
              { title: "Kayaking", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop" },
              { title: "Rainforest Hike", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop" },
            ].map((activity, idx) => (
              <div key={idx} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{activity.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Footer Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="contact-footer"
              checked={selectedComponents.has("contact-footer")}
              onChange={() => toggleComponent("contact-footer")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Contact & Footer</h2>
              <p className="text-sm text-gray-600 mb-4">
                Footer with contact form and links
              </p>
            </div>
          </div>
          <div className="bg-[#1B2330] text-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-display mb-4 text-[#F5EDE3]">Contact Us</h3>
                <div className="space-y-3 text-[#F5EDE3]">
                  <p>WhatsApp: +507 6346 0605</p>
                  <p>contact@dolphinblueparadise.com</p>
                  <p>Isla San Cristóbal - Bahia delfines - Bocas Del Toro - Panama</p>
                </div>
                <div className="flex gap-4 mt-6">
                  <div className="w-12 h-12 rounded-full bg-[#0E8BA8] flex items-center justify-center cursor-pointer hover:bg-[#C7A46B] transition-colors">
                    <span className="text-xl">f</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#0E8BA8] flex items-center justify-center cursor-pointer hover:bg-[#C7A46B] transition-colors">
                    <span className="text-xl">in</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#0E8BA8] flex items-center justify-center cursor-pointer hover:bg-[#C7A46B] transition-colors">
                    <span className="text-xl">@</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#F5EDE3] mb-2 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-white/24 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#F5EDE3] mb-2 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-white/24 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#F5EDE3] mb-2 font-semibold">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-white/24 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                      placeholder="Your message"
                    />
                  </div>
                  <Button variant="primary" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-[#F5EDE3]/80">
              <p>© 2024 Dolphin Blue Paradise. All rights reserved.</p>
            </div>
          </div>
        </section>

        {/* Buttons & Interactions Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="buttons"
              checked={selectedComponents.has("buttons")}
              onChange={() => toggleComponent("buttons")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Buttons & Interactions</h2>
              <p className="text-sm text-gray-600 mb-4">
                Primary, Secondary, and Tertiary button styles
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary CTA</Button>
              <Button variant="secondary">Secondary CTA</Button>
              <a href="#" className="text-[#0E8BA8] hover:underline">Tertiary Link</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Hover states and transitions:</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#0E8BA8] text-white rounded hover:bg-[#C7A46B] transition-colors duration-200">
                  Hover Me
                </button>
                <button className="px-6 py-3 border-2 border-[#1B2330] text-[#1B2330] rounded hover:bg-[#F5EDE3] transition-colors duration-200">
                  Hover Me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Forms & Inputs Demo */}
        <section className="component-demo">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="forms"
              checked={selectedComponents.has("forms")}
              onChange={() => toggleComponent("forms")}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-display text-[#1B2330] mb-2">Forms & Inputs</h2>
              <p className="text-sm text-gray-600 mb-4">
                Form inputs with labels, placeholders, and validation states
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B2330] mb-2 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-[#1B2330]/16 placeholder:text-[#1B2330]/40 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B2330] mb-2 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-[#1B2330]/16 placeholder:text-[#1B2330]/40 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B2330] mb-2 font-semibold">
                  Travel Dates
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-[#1B2330]/16 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B2330] mb-2 font-semibold">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border border-[#1B2330]/16 placeholder:text-[#1B2330]/40 focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
                  placeholder="Tell us about your travel plans..."
                />
              </div>
              <div className="flex gap-4">
                <Button variant="primary">Submit</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </form>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-[#1B2330] mb-4">Form States:</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8684B] mb-2 font-semibold">
                    Error State
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border-2 border-[#D8684B] focus:outline-none"
                    placeholder="This field has an error"
                  />
                  <p className="text-sm text-[#D8684B] mt-1">Please enter a valid email address</p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3E5C4A] mb-2 font-semibold">
                    Success State
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded bg-white text-[#1B2330] border-2 border-[#3E5C4A] focus:outline-none"
                    placeholder="This field is valid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Export Section */}
      {selectedComponents.size > 0 && (
        <div className="bg-[#1B2330] text-white py-12 mt-12">
          <div className="container">
            <h2 className="text-3xl font-display mb-4">Selected Components Export</h2>
            <div className="bg-[#F5EDE3] text-[#1B2330] p-6 rounded-lg mb-4">
              <pre className="whitespace-pre-wrap text-sm">
                {selectedList.map((comp) => `- ${comp.name} (${comp.category})\n  ${comp.description}`).join("\n\n")}
              </pre>
            </div>
            <button
              onClick={() => {
                const exportText = selectedList
                  .map((comp) => `## ${comp.name}\n**Category:** ${comp.category}\n**Description:** ${comp.description}\n`)
                  .join("\n---\n\n");
                navigator.clipboard.writeText(exportText);
                alert("Component list exported to clipboard!");
              }}
              className="px-6 py-3 bg-[#0E8BA8] text-white rounded hover:bg-[#C7A46B] transition-colors"
            >
              Export as Markdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
