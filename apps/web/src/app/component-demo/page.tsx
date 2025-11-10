'use client';

import { useState } from 'react';

// Define component types based on STYLEGUIDE.md
type ComponentType = {
  id: string;
  name: string;
  description: string;
  category: string;
};

const components: ComponentType[] = [
  // Navigation
  {
    id: 'nav-transparent',
    name: 'Navigation Bar - Transparent',
    description: 'Transparent overlay on hero with logo left, contact + CTA right',
    category: 'Navigation',
  },
  {
    id: 'nav-solid',
    name: 'Navigation Bar - Solid',
    description: 'Solid background (Cloud White or Deep Navy) with active state indicators',
    category: 'Navigation',
  },
  
  // Hero Sections
  {
    id: 'hero-split',
    name: 'Hero - Split Layout',
    description: 'Two-column: left text card with headline + CTA, right/background hero image',
    category: 'Hero',
  },
  {
    id: 'hero-fullwidth',
    name: 'Hero - Full Width',
    description: 'Full-width video or image with overlay headline and CTAs',
    category: 'Hero',
  },
  
  // Feature Sections
  {
    id: 'value-pillars-4',
    name: 'Value Pillars - 4 Column',
    description: 'Four-card row with icon, title, Golden Accent rule, body text, hover lift effect',
    category: 'Features',
  },
  {
    id: 'value-pillars-3',
    name: 'Value Pillars - 3 Column',
    description: 'Three-card row variation of value pillars',
    category: 'Features',
  },
  
  // Content Blocks
  {
    id: 'story-block-left',
    name: 'Story Block - Image Left',
    description: 'Split layout: full-width image left, text column right with layered card',
    category: 'Content',
  },
  {
    id: 'story-block-right',
    name: 'Story Block - Image Right',
    description: 'Split layout: text column left, full-width image right',
    category: 'Content',
  },
  {
    id: 'testimonial-bubble',
    name: 'Testimonial Speech Bubble',
    description: 'Golden Accent background with white text, speech bubble style',
    category: 'Content',
  },
  
  // Blog/News
  {
    id: 'blog-feed-2col',
    name: 'Blog Feed - 2 Column',
    description: 'Two-column list with thumbnail left, excerpt right, meta data in Golden Accent',
    category: 'Blog',
  },
  {
    id: 'blog-feed-grid',
    name: 'Blog Feed - Grid',
    description: 'Grid layout of blog cards with featured image and excerpt',
    category: 'Blog',
  },
  
  // Carousels
  {
    id: 'activity-carousel-3',
    name: 'Activity Carousel - 3 Tiles',
    description: 'Three image tiles with overlay gradient, title tag, and activity icons',
    category: 'Carousel',
  },
  {
    id: 'activity-carousel-4',
    name: 'Activity Carousel - 4 Tiles',
    description: 'Four image tiles with overlay gradient and title tag',
    category: 'Carousel',
  },
  
  // Buttons
  {
    id: 'btn-primary',
    name: 'Primary CTA Button',
    description: 'Ocean background, white text, hover to Golden Accent',
    category: 'Buttons',
  },
  {
    id: 'btn-secondary',
    name: 'Secondary CTA Button',
    description: 'Outlined Deep Navy, transparent background, hover fill Warm Sand',
    category: 'Buttons',
  },
  {
    id: 'btn-tertiary',
    name: 'Tertiary Link',
    description: 'Text-only link in Primary Ocean with underline on hover',
    category: 'Buttons',
  },
  
  // Forms
  {
    id: 'form-contact',
    name: 'Contact Form',
    description: 'Full contact form with inputs, labels, validation states',
    category: 'Forms',
  },
  {
    id: 'form-newsletter',
    name: 'Newsletter Signup',
    description: 'Compact email signup form',
    category: 'Forms',
  },
  {
    id: 'form-booking',
    name: 'Booking Request Form',
    description: 'Multi-field booking inquiry form with date pickers',
    category: 'Forms',
  },
  
  // Cards
  {
    id: 'card-room',
    name: 'Room Card',
    description: 'Room category card with image, stats, amenities, and CTA',
    category: 'Cards',
  },
  {
    id: 'card-experience',
    name: 'Experience Card',
    description: 'Activity card with image, duration, difficulty, and booking CTA',
    category: 'Cards',
  },
  {
    id: 'card-generic',
    name: 'Generic Content Card',
    description: 'Flexible content card with Warm Sand background and shadow',
    category: 'Cards',
  },
  
  // Footer
  {
    id: 'footer-standard',
    name: 'Footer - Standard',
    description: 'Deep Navy background, links in Warm Sand/Cloud White, social icons',
    category: 'Footer',
  },
  {
    id: 'footer-minimal',
    name: 'Footer - Minimal',
    description: 'Compact footer with essential links and contact info',
    category: 'Footer',
  },
];

export default function ComponentDemoPage() {
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());
  const [showExport, setShowExport] = useState(false);

  const toggleComponent = (id: string) => {
    const newSelected = new Set(selectedComponents);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedComponents(newSelected);
  };

  const selectAll = () => {
    setSelectedComponents(new Set(components.map((c) => c.id)));
  };

  const clearAll = () => {
    setSelectedComponents(new Set());
  };

  const exportSelection = () => {
    const selected = components.filter((c) => selectedComponents.has(c.id));
    const exportData = {
      timestamp: new Date().toISOString(),
      selectedCount: selected.length,
      components: selected,
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `component-selection-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories = Array.from(new Set(components.map((c) => c.category)));

  return (
    <div className="min-h-screen bg-[#F5EDE3]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1B2330] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Component Demo Library</h1>
              <p className="text-sm text-gray-300">
                Select components you like for the new site design
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {selectedComponents.size} / {components.length} selected
              </span>
              <button
                onClick={selectAll}
                className="px-4 py-2 text-sm bg-[#0E8BA8] hover:bg-[#C7A46B] rounded transition-colors"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 rounded transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowExport(true)}
                disabled={selectedComponents.size === 0}
                className="px-6 py-2 text-sm bg-[#D8684B] hover:bg-[#C7A46B] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Export Selection
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-4 overflow-x-auto">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="px-4 py-2 text-sm font-semibold text-[#1B2330] hover:text-[#0E8BA8] whitespace-nowrap border-b-2 border-transparent hover:border-[#0E8BA8] transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {categories.map((category) => (
          <section key={category} id={category.toLowerCase()} className="mb-16">
            <h2 className="text-3xl font-bold text-[#1B2330] mb-6 pb-2 border-b-2 border-[#C7A46B]">
              {category}
            </h2>
            <div className="grid gap-6">
              {components
                .filter((c) => c.category === category)
                .map((component) => (
                  <ComponentPreview
                    key={component.id}
                    component={component}
                    isSelected={selectedComponents.has(component.id)}
                    onToggle={() => toggleComponent(component.id)}
                  />
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-[#1B2330]">Your Selection</h3>
              <button
                onClick={() => setShowExport(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              You have selected {selectedComponents.size} component{selectedComponents.size !== 1 ? 's' : ''} for your design.
            </p>

            <div className="space-y-4 mb-6">
              {Array.from(selectedComponents).map((id) => {
                const component = components.find((c) => c.id === id);
                if (!component) return null;
                return (
                  <div key={id} className="border border-gray-200 rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-[#1B2330]">{component.name}</h4>
                        <p className="text-sm text-gray-600">{component.description}</p>
                      </div>
                      <span className="text-xs bg-[#0E8BA8] text-white px-2 py-1 rounded">
                        {component.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={exportSelection}
                className="flex-1 px-6 py-3 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded font-semibold transition-colors"
              >
                Download JSON
              </button>
              <button
                onClick={() => setShowExport(false)}
                className="px-6 py-3 border-2 border-[#1B2330] text-[#1B2330] hover:bg-[#F5EDE3] rounded font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentPreview({
  component,
  isSelected,
  onToggle,
}: {
  component: ComponentType;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
        isSelected ? 'ring-4 ring-[#0E8BA8] ring-opacity-50' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggle}
                className="w-6 h-6 text-[#0E8BA8] border-gray-300 rounded focus:ring-[#0E8BA8] cursor-pointer"
                id={component.id}
              />
              <label htmlFor={component.id} className="cursor-pointer">
                <h3 className="text-xl font-bold text-[#1B2330]">{component.name}</h3>
              </label>
            </div>
            <p className="text-gray-600 ml-9">{component.description}</p>
          </div>
          <span className="ml-4 px-3 py-1 bg-[#F5EDE3] text-[#1B2330] text-sm font-semibold rounded">
            {component.category}
          </span>
        </div>

        {/* Component Preview */}
        <div className="mt-4 p-4 bg-[#F5EDE3] rounded-lg">
          <ComponentDemo component={component} />
        </div>
      </div>
    </div>
  );
}

function ComponentDemo({ component }: { component: ComponentType }) {
  // Render actual component previews
  switch (component.id) {
    case 'nav-transparent':
      return (
        <div className="relative h-20 bg-gradient-to-b from-gray-800 to-gray-600 rounded overflow-hidden">
          <nav className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-4 bg-transparent text-white">
            <div className="text-lg font-bold">DBP Logo</div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#C7A46B]">Rooms</a>
              <a href="#" className="hover:text-[#C7A46B]">Dining</a>
              <a href="#" className="hover:text-[#C7A46B]">Experiences</a>
              <a href="#" className="hover:text-[#C7A46B] border-b-2 border-[#C7A46B]">Contact</a>
            </div>
            <button className="px-4 py-2 bg-[#0E8BA8] hover:bg-[#C7A46B] rounded text-sm transition-colors">
              Book Now
            </button>
          </nav>
        </div>
      );

    case 'nav-solid':
      return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded">
          <div className="text-lg font-bold text-[#1B2330]">DBP Logo</div>
          <div className="flex gap-6 text-sm text-[#1B2330]">
            <a href="#" className="hover:text-[#0E8BA8]">Rooms</a>
            <a href="#" className="hover:text-[#0E8BA8]">Dining</a>
            <a href="#" className="hover:text-[#0E8BA8] border-b-2 border-[#C7A46B]">Experiences</a>
            <a href="#" className="hover:text-[#0E8BA8]">Contact</a>
          </div>
          <button className="px-4 py-2 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded text-sm transition-colors">
            Book Now
          </button>
        </nav>
      );

    case 'hero-split':
      return (
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-[#F5EDE3] p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-[#1B2330] mb-4" style={{ fontFamily: 'serif' }}>
              Paradise Between Jungle & Sea
            </h1>
            <p className="text-[#1B2330] mb-6">
              Experience authentic eco-luxury in Bocas del Toro, where pristine nature meets personalized service.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded transition-colors">
                Book Your Stay
              </button>
              <button className="px-6 py-3 border-2 border-[#1B2330] text-[#1B2330] hover:bg-white rounded transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-[#0E8BA8] to-[#3E5C4A] rounded-lg flex items-center justify-center text-white text-sm">
            Hero Image
          </div>
        </div>
      );

    case 'hero-fullwidth':
      return (
        <div className="relative h-80 bg-gradient-to-br from-[#0E8BA8] via-[#1B2330] to-[#3E5C4A] rounded-lg flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative text-center z-10 px-4">
            <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
              Escape to Paradise
            </h1>
            <p className="text-xl mb-8">Where the jungle meets the Caribbean</p>
            <button className="px-8 py-4 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded text-lg transition-colors">
              Discover Dolphin Blue
            </button>
          </div>
        </div>
      );

    case 'value-pillars-4':
    case 'value-pillars-3':
      const cols = component.id === 'value-pillars-4' ? 4 : 3;
      return (
        <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#C7A46B] rounded-full flex items-center justify-center text-white mb-4">
                ★
              </div>
              <div className="h-1 w-12 bg-[#C7A46B] mb-3"></div>
              <h3 className="text-lg font-bold text-[#1B2330] mb-2">Feature {i + 1}</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      );

    case 'story-block-left':
      return (
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="h-64 bg-gradient-to-br from-[#3E5C4A] to-[#0E8BA8] rounded-lg flex items-center justify-center text-white">
            Story Image
          </div>
          <div className="bg-[#F5EDE3] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-[#1B2330] mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Nestled between lush rainforest and crystal-clear Caribbean waters, Dolphin Blue Paradise offers an authentic escape from the ordinary.
            </p>
            <a href="#" className="text-[#0E8BA8] hover:underline font-semibold">
              Read More →
            </a>
          </div>
        </div>
      );

    case 'story-block-right':
      return (
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-[#F5EDE3] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-[#1B2330] mb-4">Sustainability</h3>
            <p className="text-gray-700 mb-4">
              100% solar powered, rainwater harvesting, and farm-to-table dining showcase our commitment to the environment.
            </p>
            <a href="#" className="text-[#0E8BA8] hover:underline font-semibold">
              Learn About Our Impact →
            </a>
          </div>
          <div className="h-64 bg-gradient-to-br from-[#3E5C4A] to-[#C7A46B] rounded-lg flex items-center justify-center text-white">
            Sustainability Image
          </div>
        </div>
      );

    case 'testimonial-bubble':
      return (
        <div className="bg-[#C7A46B] text-white p-6 rounded-2xl shadow-lg relative">
          <div className="absolute -top-2 left-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#C7A46B]"></div>
          <p className="text-lg italic mb-4">
            &ldquo;An absolutely magical experience! The perfect blend of luxury and nature. We can&apos;t wait to return.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full"></div>
            <div>
              <p className="font-bold">Sarah & James</p>
              <p className="text-sm opacity-90">Seattle, USA</p>
            </div>
          </div>
        </div>
      );

    case 'blog-feed-2col':
      return (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 bg-white p-4 rounded-lg shadow">
              <div className="w-32 h-32 bg-[#0E8BA8] rounded flex-shrink-0"></div>
              <div className="flex-1">
                <div className="text-xs text-[#C7A46B] font-semibold uppercase mb-2">
                  May 15, 2025 · John Doe
                </div>
                <h4 className="text-lg font-bold text-[#1B2330] mb-2">
                  Discovering the Dolphins of Bocas del Toro
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Learn about the 80+ dolphins that call our bay home...
                </p>
                <a href="#" className="text-[#0E8BA8] hover:underline text-sm font-semibold">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      );

    case 'blog-feed-grid':
      return (
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#0E8BA8] to-[#3E5C4A]"></div>
              <div className="p-4">
                <div className="text-xs text-[#C7A46B] font-semibold uppercase mb-2">
                  Travel Tips
                </div>
                <h4 className="text-lg font-bold text-[#1B2330] mb-2">
                  Blog Post Title {i}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  A brief excerpt of the blog post content...
                </p>
                <a href="#" className="text-[#0E8BA8] hover:underline text-sm font-semibold">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      );

    case 'activity-carousel-3':
    case 'activity-carousel-4':
      const count = component.id === 'activity-carousel-4' ? 4 : 3;
      return (
        <div className={`grid grid-cols-1 md:grid-cols-${count} gap-4`}>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="relative h-64 bg-gradient-to-b from-transparent to-black rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(27,35,48,0) 0%, rgba(27,35,48,0.75) 100%)',
                backgroundColor: i % 2 === 0 ? '#0E8BA8' : '#3E5C4A',
              }}
            >
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                🌊
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="text-xl font-bold mb-2">Activity {i + 1}</h4>
                <div className="flex gap-2 text-xs">
                  <span className="bg-white/20 px-2 py-1 rounded">3 hours</span>
                  <span className="bg-white/20 px-2 py-1 rounded">Easy</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'btn-primary':
      return (
        <button className="px-6 py-3 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded font-semibold transition-colors uppercase tracking-wider text-sm">
          Primary CTA Button
        </button>
      );

    case 'btn-secondary':
      return (
        <button className="px-6 py-3 border-2 border-[#1B2330] text-[#1B2330] hover:bg-[#F5EDE3] bg-transparent rounded font-semibold transition-colors uppercase tracking-wider text-sm">
          Secondary CTA Button
        </button>
      );

    case 'btn-tertiary':
      return (
        <a href="#" className="text-[#0E8BA8] hover:underline font-semibold">
          Tertiary Link Button →
        </a>
      );

    case 'form-contact':
      return (
        <form className="space-y-4 bg-white p-6 rounded-lg">
          <div>
            <label className="block text-xs font-semibold text-[#1B2330] uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8] placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1B2330] uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8] placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1B2330] uppercase mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="How can we help you?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8] placeholder-gray-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded-xl font-semibold transition-colors"
          >
            Send Message
          </button>
        </form>
      );

    case 'form-newsletter':
      return (
        <form className="flex gap-2 bg-white p-4 rounded-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8] placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded-xl font-semibold transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      );

    case 'form-booking':
      return (
        <form className="space-y-4 bg-white p-6 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B2330] uppercase mb-2">
                Check-in
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1B2330] uppercase mb-2">
                Check-out
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1B2330] uppercase mb-2">
              Guests
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E8BA8]">
              <option>1 guest</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4+ guests</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#D8684B] hover:bg-[#C7A46B] text-white rounded-xl font-semibold transition-colors"
          >
            Request Booking
          </button>
        </form>
      );

    case 'card-room':
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-[#0E8BA8] to-[#3E5C4A]"></div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#1B2330] mb-2">Premium Deluxe Cabana</h3>
            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span>33 m²</span>
              <span>•</span>
              <span>2 guests</span>
              <span>•</span>
              <span>King bed</span>
            </div>
            <p className="text-gray-700 mb-4">
              Spectacular sea views with private terrace overlooking the bay.
            </p>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 bg-[#F5EDE3] text-[#1B2330] text-xs rounded">A/C</span>
              <span className="px-2 py-1 bg-[#F5EDE3] text-[#1B2330] text-xs rounded">Terrace</span>
              <span className="px-2 py-1 bg-[#F5EDE3] text-[#1B2330] text-xs rounded">Sea View</span>
            </div>
            <button className="w-full px-6 py-3 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded transition-colors font-semibold">
              View Details
            </button>
          </div>
        </div>
      );

    case 'card-experience':
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-[#3E5C4A] to-[#0E8BA8]">
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
              🐬
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#1B2330] mb-2">Dolphin Watching</h3>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 bg-[#F5EDE3] text-[#1B2330] text-xs rounded">3 hours</span>
              <span className="px-2 py-1 bg-[#F5EDE3] text-[#1B2330] text-xs rounded">Easy</span>
              <span className="px-2 py-1 bg-[#3E5C4A] text-white text-xs rounded">Eco-Tour</span>
            </div>
            <p className="text-gray-700 mb-4">
              Observe 80+ resident dolphins in their natural habitat with our expert guides.
            </p>
            <button className="w-full px-6 py-3 bg-[#0E8BA8] hover:bg-[#C7A46B] text-white rounded transition-colors font-semibold">
              Book Experience
            </button>
          </div>
        </div>
      );

    case 'card-generic':
      return (
        <div className="bg-[#F5EDE3] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[#1B2330] mb-3">Generic Content Card</h3>
          <p className="text-gray-700 mb-4">
            A flexible card component with Warm Sand background and subtle shadow. Perfect for various content types.
          </p>
          <a href="#" className="text-[#0E8BA8] hover:underline font-semibold">
            Learn More →
          </a>
        </div>
      );

    case 'footer-standard':
      return (
        <footer className="bg-[#1B2330] text-white p-6 rounded-lg">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <h4 className="font-bold mb-3">About</h4>
              <ul className="space-y-2 text-sm text-[#F5EDE3]">
                <li><a href="#" className="hover:text-[#C7A46B]">Our Story</a></li>
                <li><a href="#" className="hover:text-[#C7A46B]">Sustainability</a></li>
                <li><a href="#" className="hover:text-[#C7A46B]">Team</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Stay</h4>
              <ul className="space-y-2 text-sm text-[#F5EDE3]">
                <li><a href="#" className="hover:text-[#C7A46B]">Rooms</a></li>
                <li><a href="#" className="hover:text-[#C7A46B]">Dining</a></li>
                <li><a href="#" className="hover:text-[#C7A46B]">Experiences</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-[#F5EDE3]">
                <li><a href="#" className="hover:text-[#C7A46B]">Plan Your Journey</a></li>
                <li><a href="#" className="hover:text-[#C7A46B]">FAQ</a></li>
                <li><a href="#" className="hover:text-[#C7A46B]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Connect</h4>
              <div className="flex gap-3 mb-4">
                {['FB', 'IG', 'TW'].map((social) => (
                  <div
                    key={social}
                    className="w-8 h-8 bg-[#0E8BA8] rounded-full flex items-center justify-center text-xs hover:bg-[#C7A46B] cursor-pointer transition-colors"
                  >
                    {social}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#F5EDE3]">contact@dolphinblue.com</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center text-sm text-[#F5EDE3]">
            © 2025 Dolphin Blue Paradise. All rights reserved.
          </div>
        </footer>
      );

    case 'footer-minimal':
      return (
        <footer className="bg-[#1B2330] text-white p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[#F5EDE3]">
              © 2025 Dolphin Blue Paradise
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#F5EDE3] hover:text-[#C7A46B]">Privacy</a>
              <a href="#" className="text-[#F5EDE3] hover:text-[#C7A46B]">Terms</a>
              <a href="#" className="text-[#F5EDE3] hover:text-[#C7A46B]">Contact</a>
            </div>
            <div className="flex gap-3">
              {['FB', 'IG', 'TW'].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 bg-[#0E8BA8] rounded-full flex items-center justify-center text-xs hover:bg-[#C7A46B] cursor-pointer transition-colors"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>
        </footer>
      );

    default:
      return (
        <div className="text-center py-8 text-gray-500 text-sm">
          Component preview coming soon
        </div>
      );
  }
}
