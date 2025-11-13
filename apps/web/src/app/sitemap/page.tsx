import { CoverPage } from "@/components/sitemap/cover-page";
import { TableOfContents } from "@/components/sitemap/table-of-contents";
import { PageSection } from "@/components/sitemap/page-section";
import { DescriptionBox } from "@/components/sitemap/description-box";
import { PageStructureBox } from "@/components/sitemap/page-structure-box";
import { ContentDetail } from "@/components/sitemap/content-detail";
import { StrategyBox } from "@/components/sitemap/strategy-box";
import { GlossaryBox, GlossaryTerm } from "@/components/sitemap/glossary-box";
import { OverviewGrid } from "@/components/sitemap/overview-grid";

export const metadata = {
  title: "Site Structure & Strategy Guide",
  description: "Complete site architecture documentation for Dolphin Blue Paradise",
};

const tocItems = [
  { id: "overview", label: "Site Architecture Overview" },
  { id: "home", label: "HOME Page" },
  { id: "about", label: "OUR STORY Page" },
  { id: "accommodations", label: "ACCOMMODATIONS Page" },
  { id: "dining", label: "DINING Page" },
  { id: "experiences", label: "EXPERIENCES Page" },
  { id: "sustainability", label: "SUSTAINABILITY Page" },
  { id: "contact", label: "CONTACT / RESERVATIONS Page" },
];

const overviewCards = [
  {
    title: "HOME",
    description: "Luxury Eco-Resort Between the Jungle & the Sea",
  },
  {
    title: "OUR STORY",
    description: "Build credibility and personality (E-E-A-T focus)",
  },
  {
    title: "ACCOMMODATIONS",
    description: "Cabanas & Rooms with Sea View",
  },
  {
    title: "DINING",
    description: "Farm-to-Table Dining Over the Water",
  },
  {
    title: "EXPERIENCES",
    description: "Discover Our Curated Eco-Adventures",
  },
  {
    title: "SUSTAINABILITY",
    description: "Standalone sustainability hub",
  },
  {
    title: "CONTACT",
    description: "Complete booking and planning hub",
  },
];

export default function SitemapPage() {
  return (
    <div className="max-w-6xl mx-auto px-10 py-10">
      <CoverPage />

      <TableOfContents items={tocItems} />

      {/* Overview Section */}
      <PageSection id="overview" title="Site Architecture Overview">
        <DescriptionBox>
          <p>
            <strong>7 Main Pages:</strong> A streamlined structure that reduces
            decision fatigue and guides visitors from discovery to booking.
          </p>
        </DescriptionBox>

        <OverviewGrid cards={overviewCards} />
      </PageSection>

      {/* HOME Page */}
      <PageSection id="home" title="HOME" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Luxury Eco-Resort Between the Jungle
            & the Sea
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Hero Section</li>
            <li>About Preview</li>
            <li>Accommodations Preview</li>
            <li>Experiences Carousel</li>
            <li>Blå Bar & Restaurant Feature</li>
            <li>Sustainability Highlight</li>
            <li>Guest Testimonials</li>
            <li>CTA Footer Strip</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content Structure
          </h3>

          <h4 className="text-lg text-[var(--color-navy)] font-semibold mt-5 mb-2.5">
            Hero Section
          </h4>
          <p>
            <strong>H1:</strong> "Luxury Eco-Resort Between the Jungle & the
            Sea — Bocas del Toro, Panama"
          </p>
          <p>
            <strong>Subheading:</strong> "A personalized, sustainable escape
            designed for your values."
          </p>
          <p>
            <strong>CTA buttons:</strong> Book Now | Plan Your Escape
          </p>

          <h4 className="text-lg text-[var(--color-navy)] font-semibold mt-5 mb-2.5">
            Content Flow (Storytelling & Conversion Architecture)
          </h4>

          <p>
            <strong>1. About Preview</strong> — Trust & Connection
          </p>
          <p>
            Short paragraph introducing the founders' vision and what makes
            Dolphin Blue Paradise unique
          </p>
          <p>
            <strong>CTA:</strong> "Our Story →"
          </p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: Establishes credibility and emotional connection
            immediately after hero
          </p>

          <p className="mt-4">
            <strong>2. Accommodations Preview</strong> — The Main Decision
          </p>
          <p>
            Visual card grid showcasing 4 room types with key features and
            starting rates
          </p>
          <p>
            <strong>CTA:</strong> "Discover Our Rooms →"
          </p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: Primary conversion driver - show where guests will stay
            early
          </p>

          <p className="mt-4">
            <strong>3. Experiences Carousel</strong> — What Awaits You
          </p>
          <p>
            Interactive slider featuring key activities: Dolphin Encounters,
            Rainforest Hike, Chocolate Farm, Snorkeling, etc.
          </p>
          <p>
            <strong>CTA:</strong> "Explore All Experiences →"
          </p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: Builds excitement about what guests will DO at the resort,
            increasing perceived value
          </p>

          <p className="mt-4">
            <strong>4. Blå Bar & Restaurant Feature</strong> — The Culinary
            Journey
          </p>
          <p>
            Full-width hero image: Over-the-water dining at sunset with fresh
            catch display
          </p>
          <p>
            <strong>Section Title:</strong> "Farm-to-Table Dining Over the
            Caribbean"
          </p>
          <p>
            2-3 sentence intro: Chef-crafted menus, 95% locally sourced
            ingredients, organic island farms
          </p>
          <p>
            <strong>Visual storytelling grid (4 photos):</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>Fresh seafood display from local fishermen</li>
            <li>Chef preparing dishes in open kitchen</li>
            <li>Signature cocktails at sunset bar</li>
            <li>Candlelit dinner on the dock</li>
          </ul>
          <p>
            <strong>Featured Quote:</strong> "We don't just serve food — we tell
            the story of Bocas del Toro on every plate." — [Chef Name]
          </p>
          <p>
            <strong>Key Highlights Box:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>✓ Breakfast, Lunch & Dinner Daily</li>
            <li>✓ Locally Caught Seafood</li>
            <li>✓ Organic Farm Partners</li>
            <li>✓ Craft Cocktails & Natural Wines</li>
            <li>✓ Vegetarian & Dietary Options</li>
            <li>✓ Open to Non-Guests (48hr advance notice)</li>
          </ul>
          <p>
            <strong>CTA:</strong> "View Menus & Reserve Your Table →"
          </p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: After establishing what guests will do, show them how
            they'll be nourished. Dining completes the "experience" narrative
            before moving to values/proof.
          </p>

          <p className="mt-4">
            <strong>5. Sustainability Highlight</strong> — Our Commitment
          </p>
          <p>
            <strong>Stats block:</strong> "100% Solar Powered | 95% Local
            Produce | Indigenous Partnerships Since 2018"
          </p>
          <p>Brief paragraph on environmental & community impact</p>
          <p>
            <strong>CTA:</strong> "Our Impact →"
          </p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: After painting the complete experience, reinforce VALUES
            that matter to conscious travelers
          </p>

          <p className="mt-4">
            <strong>6. Guest Testimonials</strong> — Social Proof
          </p>
          <p>
            Review slider featuring 5-star reviews with guest names, photos, and
            source badges (Google, Booking.com, TripAdvisor)
          </p>
          <p>
            Include mix of testimonials: accommodations, dining, experiences,
            sustainability
          </p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: Validates everything above with real guest experiences -
            critical final trust signal before CTA
          </p>

          <p className="mt-4">
            <strong>7. CTA Footer Strip</strong> — Final Conversion Push
          </p>
          <p>
            Full-width banner: "Ready to Experience Paradise? Book Your Stay
            Today"
          </p>
          <p>Dual CTAs: "Book Now" + "Contact Us"</p>
          <p className="text-[var(--color-text-muted)] italic">
            Why here: Final opportunity to convert after full story has been
            told
          </p>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>Primary Goal:</strong> Immediate clarity and instant
            emotional connection within 3 seconds of landing.
          </p>

          <p>
            <strong>User Psychology:</strong> Visitors make stay/leave decisions
            within seconds. The hero section must instantly communicate WHAT
            (luxury eco-resort), WHERE (Bocas del Toro, Panama), and WHY
            (sustainable escape for conscious travelers).
          </p>

          <p>
            <strong>Conversion Strategy:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              Dual CTAs ("Book Now" + "Plan Your Escape") cater to both
              ready-to-book and research-phase visitors
            </li>
            <li>
              Preview sections act as internal navigation, reducing bounce by
              offering clear next steps
            </li>
            <li>
              Social proof (testimonials) + authority signals build trust
              immediately
            </li>
            <li>
              Sustainability stats target the core audience: value-driven,
              eco-conscious travelers
            </li>
          </ul>

          <p>
            <strong>SEO Value:</strong> Homepage captures branded searches while
            preview sections internal-link to high-value pages, distributing
            page authority throughout the site.
          </p>
        </StrategyBox>

        <GlossaryBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Quick Reference Guide
          </h3>
          <p className="italic mb-4 text-[var(--color-text-muted)]">
            Key terms used on this page
          </p>

          <GlossaryTerm
            term="SEO"
            definition="Search Engine Optimization - Making your website show up when people search on Google. Think of it like putting up signs so customers can find your hotel easily."
          />
          <GlossaryTerm
            term="Conversion"
            definition="When a website visitor takes action you want - like booking a room, calling, or filling out a contact form. It's turning browsers into bookers."
          />
          <GlossaryTerm
            term="CTA (Call to Action)"
            definition="Buttons or links that tell visitors what to do next, like 'Book Now' or 'Contact Us'. They guide people to take the next step."
          />
          <GlossaryTerm
            term="Internal Linking"
            definition="Links that connect your pages together, like 'Learn more about our rooms →'. Helps visitors explore and tells Google which pages are important."
          />
          <GlossaryTerm
            term="Bounce Rate"
            definition="When visitors leave your site quickly after viewing only one page. Low bounce = good (they're exploring), high bounce = bad (they left immediately)."
          />
          <GlossaryTerm
            term="Landing Page"
            definition="The first page someone sees when they visit your site. Like your hotel lobby - first impressions matter!"
          />
          <GlossaryTerm
            term="User Experience (UX)"
            definition="How easy and pleasant it is for visitors to use your website. Good UX = happy visitors who book rooms."
          />
        </GlossaryBox>
      </PageSection>

      {/* OUR STORY Page */}
      <PageSection id="about" title="OUR STORY" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Build credibility and personality
            (E-E-A-T focus)
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Our Story</li>
            <li>Our Team</li>
            <li>Press & Recognition</li>
            <li>Our Promise to You</li>
            <li>Our Partners</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content
          </h3>
          <p>
            <strong>Our Story</strong> — Founders' vision + sustainable mission
          </p>
          <p>
            <strong>Our Team</strong> — Mini bios (Managing Director, Head Chef,
            Activities Manager, Sustainability Lead) with quotes
          </p>
          <p>
            <strong>Press & Recognition</strong> — Logos (Virtuoso, Condé Nast,
            Booking.com Traveller Review Award)
          </p>
          <p>
            <strong>Our Promise to You</strong> — 3 pillars: Personalization,
            Sustainability, Comfort
          </p>
          <p>
            <strong>Our Partners</strong> — NGOs, local farms, indigenous
            cooperatives
          </p>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>E-E-A-T Strategy:</strong> Google's ranking algorithm
            prioritizes Experience, Expertise, Authoritativeness, and
            Trustworthiness. This page directly addresses all four.
          </p>

          <p>
            <strong>Why This Matters:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              <strong>Experience:</strong> Founders' personal journey and vision
              adds authenticity
            </li>
            <li>
              <strong>Expertise:</strong> Named team members with specific
              titles (Head Chef, Sustainability Lead) demonstrate specialized
              knowledge
            </li>
            <li>
              <strong>Authority:</strong> Press recognition (Condé Nast,
              Virtuoso) and partnerships validate credibility
            </li>
            <li>
              <strong>Trust:</strong> Transparent partnerships with NGOs and
              local communities show genuine commitment
            </li>
          </ul>

          <p>
            <strong>Conversion Impact:</strong> Boutique hotel bookings are
            emotional decisions. Knowing WHO runs the resort and WHY they care
            transforms a transaction into supporting a mission. This resonates
            deeply with conscious travelers willing to pay premium rates.
          </p>

          <p>
            <strong>Differentiation:</strong> Most resort "About" pages are
            generic. Named experts with quotes humanize the brand and create
            memorable personality.
          </p>
        </StrategyBox>

        <GlossaryBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Quick Reference Guide
          </h3>
          <p className="italic mb-4 text-[var(--color-text-muted)]">
            Key terms used on this page
          </p>

          <GlossaryTerm
            term="E-E-A-T"
            definition="Experience, Expertise, Authority, Trust - Google checks if your website is run by real experts who know what they're talking about. It's like having credentials."
          />
          <GlossaryTerm
            term="Page Authority"
            definition="Google's trust score for a webpage. Pages with high authority rank higher in search results - like having a good reputation."
          />
          <GlossaryTerm
            term="SEO"
            definition="Search Engine Optimization - Making your website show up when people search on Google. Think of it like putting up signs so customers can find your hotel easily."
          />
        </GlossaryBox>
      </PageSection>

      {/* ACCOMMODATIONS Page */}
      <PageSection id="accommodations" title="ACCOMMODATIONS" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Cabanas & Rooms with Sea View
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Hero Section</li>
            <li>Intro Paragraph</li>
            <li>Room Comparison Grid (4 types)</li>
            <li>Photo Gallery + 360° Tours</li>
            <li>Special Offers & Packages</li>
            <li>Availability & Rates</li>
            <li>CTA Banner</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content
          </h3>
          <p>
            <strong>H1:</strong> "Cabanas & Rooms with Sea View"
          </p>

          <p>
            <strong>Hero Section</strong> – Full-width image (cabana + bay) +
            CTA "Book Now"
          </p>
          <p>
            <strong>Intro Paragraph</strong> – Comfort, views, and
            sustainability
          </p>

          <p>
            <strong>Room Comparison Grid</strong> (4 types):
          </p>
          <ul className="ml-8 mb-5">
            <li>Premium Deluxe Sea View Cabana</li>
            <li>Sea View Cabana</li>
            <li>Dolphin View Room</li>
            <li>Family Jungle Room</li>
          </ul>
          <p>Each: gallery thumbnail + highlight list + "Book Your Room" CTA</p>

          <p>
            <strong>Photo Gallery + 360° Tours</strong>
          </p>
          <p>
            <strong>Availability & Rates</strong>
          </p>
          <p>
            <strong>CTA Banner</strong> – "Find your place between the jungle
            and the sea"
          </p>

          <h4 className="text-lg text-[var(--color-navy)] font-semibold mt-5 mb-2.5">
            Special Offers & Packages
          </h4>
          <p>
            Packages appear directly within the Accommodations page, allowing
            guests to discover room upgrades and bundled experiences at the
            moment they're choosing where to stay. This reduces decision fatigue
            and creates a seamless path from browsing to booking.
          </p>

          <p>
            <strong>Package Options:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>Romantic Escape</li>
            <li>Adventure Package</li>
            <li>Private Island Buyout</li>
          </ul>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>Single-Page Strategy:</strong> All 4 room types on ONE page
            for frictionless comparison and faster booking decisions.
          </p>

          <p>
            <strong>Why Not Separate Pages Per Room?</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              Reduces decision paralysis—guests can compare side-by-side
              instantly
            </li>
            <li>
              Decreases page depth (fewer clicks to book = higher conversion)
            </li>
            <li>Mobile-friendly: scrolling beats clicking on mobile devices</li>
            <li>
              Integrated packages appear contextually when guests are already
              thinking about rooms
            </li>
          </ul>
        </StrategyBox>

        <GlossaryBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Quick Reference Guide
          </h3>
          <p className="italic mb-4 text-[var(--color-text-muted)]">
            Key terms used on this page
          </p>

          <GlossaryTerm
            term="Long-tail Keywords"
            definition="Specific search phrases people type, like 'eco resort with dolphins in Bocas del Toro' instead of just 'resort'. They bring visitors who know exactly what they want."
          />
          <GlossaryTerm
            term="Conversion"
            definition="When a website visitor takes action you want - like booking a room, calling, or filling out a contact form. It's turning browsers into bookers."
          />
          <GlossaryTerm
            term="CTA (Call to Action)"
            definition="Buttons or links that tell visitors what to do next, like 'Book Now' or 'Contact Us'. They guide people to take the next step."
          />
        </GlossaryBox>
      </PageSection>

      {/* DINING Page */}
      <PageSection id="dining" title="DINING" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Farm-to-Table Dining Over the Water
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Hero Section</li>
            <li>Overview</li>
            <li>Menus & Schedule</li>
            <li>Locals Dining Policy</li>
            <li>CTA Section</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content
          </h3>
          <p>
            <strong>Hero:</strong> "Farm-to-Table Dining Over the Water"
          </p>
          <p>
            <strong>Overview</strong> — Chef philosophy + locally sourced
            organic ingredients
          </p>
          <p>
            <strong>Menus & Schedule</strong> (Breakfast, Lunch, Dinner)
          </p>
          <ul className="ml-8 mb-5">
            <li>Subpage: Menus → downloadable PDF</li>
          </ul>
          <p>
            <strong>Locals Dining Policy</strong> — 48-hour notice
          </p>
          <p>
            <strong>CTA:</strong> "Reserve a Table via WhatsApp or Email"
          </p>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>Strategic Positioning:</strong> Dining as a DESTINATION, not
            just an amenity. This elevates perceived value and attracts
            food-focused travelers.
          </p>

          <p>
            <strong>Why Standalone Page?</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              Culinary tourism is a major booking driver for high-end travelers
            </li>
            <li>
              "Farm-to-table" and "over-the-water dining" are high-value SEO
              keywords
            </li>
            <li>
              Detailed chef philosophy and sourcing transparency appeals to
              conscious foodies
            </li>
            <li>
              Allows for rich content: menu PDFs, ingredient stories, supplier
              partnerships
            </li>
          </ul>
        </StrategyBox>
      </PageSection>

      {/* EXPERIENCES Page */}
      <PageSection id="experiences" title="EXPERIENCES" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Discover Our Curated Eco-Adventures
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Main Activities Hub</li>
            <li>Individual Activity Pages (10 total)</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content
          </h3>
          <p>
            <strong>H1:</strong> "Discover Our Curated Eco-Adventures"
          </p>
          <p>
            <strong>Main Hub:</strong> Grid of cards linking to individual
            activity pages
          </p>

          <p>
            <strong>Activity Pages:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>Dolphin Bay Encounter</li>
            <li>Rainforest Hike & Wildlife Tour</li>
            <li>Chocolate Farm Tour</li>
            <li>Snorkeling</li>
            <li>Kayak & SUP</li>
            <li>Monkey Island Excursion</li>
            <li>Surfing (seasonal)</li>
            <li>Fishing</li>
            <li>Massages</li>
            <li>Volunteering in an Indigenous Village</li>
          </ul>

          <p>
            <strong>Each Activity Page Includes:</strong> Hero image, Summary,
            Logistics (duration/inclusions/difficulty), Wildlife/species, What
            to bring, CTA: "Add to Your Itinerary"
          </p>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>Long-Tail SEO Powerhouse:</strong> This page structure
            captures every possible experience-related search query.
          </p>

          <p>
            <strong>Why List EVERY Activity?</strong>
          </p>
          <p>Each activity name becomes a clickable anchor for:</p>
          <ul className="ml-8 mb-5">
            <li>"Dolphin bay encounter Bocas del Toro"</li>
            <li>"Chocolate farm tour Panama"</li>
            <li>"Rainforest hike Isla San Cristóbal"</li>
          </ul>
          <p>
            → These niche searches have HIGH intent (people searching this are
            ready to book)
          </p>
        </StrategyBox>
      </PageSection>

      {/* SUSTAINABILITY Page */}
      <PageSection id="sustainability" title="SUSTAINABILITY" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Standalone sustainability hub (strong
            eco-tourism differentiator)
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Off-Grid Infrastructure</li>
            <li>Sustainable Food Cycle</li>
            <li>Community Programs</li>
            <li>Biodiversity Protection</li>
            <li>Impact Metrics</li>
            <li>CTA Section</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content
          </h3>
          <p>
            <strong>Off-Grid Infrastructure</strong> — Solar system (kW
            capacity, storage, water systems)
          </p>
          <p>
            <strong>Sustainable Food Cycle</strong> — Farm-to-table, composting,
            sourcing partners
          </p>
          <p>
            <strong>Community Programs</strong> — Ngäbe-Buglé collaboration,
            youth programs
          </p>
          <p>
            <strong>Biodiversity Protection</strong> — Dolphin monitoring,
            reforestation, no single-use plastic policy
          </p>
          <p>
            <strong>Impact Metrics</strong> — "Each stay supports X hours of
            conservation work"
          </p>
          <p>
            <strong>CTA:</strong> "Download Full Sustainability Report (PDF)"
          </p>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>Standalone = Strategic Choice:</strong> Sustainability isn't
            buried in "About"—it's a PRIMARY value proposition deserving its own
            page.
          </p>

          <p>
            <strong>Target Audience Alignment:</strong>
          </p>
          <p>
            Growing traveler segment (30-40% of luxury market) actively seeks
            eco-certified properties. They SEARCH for:
          </p>
          <ul className="ml-8 mb-5">
            <li>"Off-grid eco resort Panama"</li>
            <li>"Sustainable hotels Bocas del Toro"</li>
            <li>"Solar powered resort Central America"</li>
          </ul>

          <p>
            <strong>Credibility Through Specifics:</strong>
          </p>
          <p>
            Generic "we care about the environment" claims don't work.
            MEASURABLE data does:
          </p>
          <ul className="ml-8 mb-5">
            <li>"10kW solar capacity" vs "solar powered"</li>
            <li>"95% locally sourced produce" vs "farm-to-table"</li>
            <li>"Indigenous partnership since 2018" vs "community support"</li>
          </ul>
        </StrategyBox>
      </PageSection>

      {/* CONTACT Page */}
      <PageSection id="contact" title="CONTACT / RESERVATIONS" pageBreak>
        <DescriptionBox>
          <p>
            <strong>Description:</strong> Complete booking and planning hub
          </p>
        </DescriptionBox>

        <PageStructureBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Page Sections & Layout
          </h3>
          <ul className="ml-8 mb-5">
            <li>Contact Elements (Multi-channel)</li>
            <li>Live Booking Widget</li>
            <li>Location Map</li>
            <li>Getting Here (Travel Logistics)</li>
            <li>FAQs (Interactive Accordion)</li>
          </ul>
        </PageStructureBox>

        <ContentDetail>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            Detailed Content
          </h3>
          <p>
            <strong>Core Contact Elements:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              Multi-channel contact: Form, WhatsApp (instant), Phone, Email
            </li>
            <li>Live booking widget (Cloudbeds embed)</li>
            <li>Location map with pin</li>
          </ul>

          <h4 className="text-lg text-[var(--color-navy)] font-semibold mt-5 mb-2.5">
            Getting Here
          </h4>
          <p>
            Travel logistics appear directly on the Contact/Reservations page
            because this is when guests need it most—right before committing to
            book.
          </p>

          <p>
            <strong>Content Includes:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              Visual journey map: Panama City → Bocas Town → Isla San Cristóbal
            </li>
            <li>
              Step-by-step instructions: International flight + regional flight +
              water taxi
            </li>
            <li>Recommended packing list (weather-specific)</li>
            <li>Best travel times by season</li>
            <li>Downloadable "Travel Factsheet (PDF)"</li>
          </ul>

          <h4 className="text-lg text-[var(--color-navy)] font-semibold mt-5 mb-2.5">
            FAQs (Interactive Accordion)
          </h4>
          <p>
            FAQs appear directly on the Contact page to anticipate objections and
            answer questions immediately.
          </p>

          <p>
            <strong>FAQ Topics:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              <strong>Booking:</strong> How far in advance? Deposits? Group
              rates?
            </li>
            <li>
              <strong>Accessibility:</strong> Wheelchair access, mobility
              considerations
            </li>
            <li>
              <strong>Policies:</strong> Pets, children, minimum stay, safety
              protocols
            </li>
            <li>
              <strong>Amenities:</strong> Wi-Fi speed, electricity, water quality
            </li>
            <li>
              <strong>Inclusions:</strong> What's in the rate? Extra fees?
            </li>
            <li>
              <strong>Cancellation:</strong> Flexible? Refund policies?
            </li>
          </ul>
        </ContentDetail>

        <StrategyBox>
          <h3 className="text-2xl text-[#5A9FBD] font-semibold mt-8 mb-3">
            💡 Why This Works
          </h3>
          <p>
            <strong>The Conversion Bottleneck:</strong> This is where interest
            becomes revenue. Every barrier removed here = higher booking rate.
          </p>

          <p>
            <strong>Why Consolidate FAQs + Getting Here + Contact?</strong>
          </p>
          <p>
            Research shows guests who have to click away to find "How do I get
            there?" or "What's your cancellation policy?" often never return to
            complete booking. Anticipating and answering questions AT THE POINT
            OF DECISION is critical.
          </p>

          <p>
            <strong>Multi-Channel Contact Strategy:</strong>
          </p>
          <ul className="ml-8 mb-5">
            <li>
              <strong>Form:</strong> For detailed inquiries (low pressure)
            </li>
            <li>
              <strong>WhatsApp:</strong> For instant questions (high intent =
              higher conversion)
            </li>
            <li>
              <strong>Phone:</strong> For older demographics who prefer voice
            </li>
            <li>
              <strong>Email:</strong> For professional/corporate inquiries
            </li>
          </ul>
        </StrategyBox>
      </PageSection>

      {/* Footer */}
      <div className="text-center py-10 mt-16 border-t-2 border-[#E5E7EB] text-[#6B7280]">
        <p>
          <strong>Dolphin Blue Paradise</strong> - Complete Site Structure &
          Strategy Guide
        </p>
        <p className="text-sm mt-2.5">
          Streamlined architecture for clarity, efficiency, and conversion
        </p>
      </div>
    </div>
  );
}

