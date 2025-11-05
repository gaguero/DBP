# Product Context

Concise reference for the project’s purpose, audience, and non-negotiables. Refresh when business goals or positioning change.

- **Project**: Relaunch Dolphin Blue Paradise’s digital presence and guest ops as an owned, integrated marketing and concierge stack.
- **Business Outcomes**:
  - Increase direct bookings vs. OTAs and capture higher-value packages.
  - Provide always-on guest communications (site, chat, phone, WhatsApp).
  - Centralize lead data, attribution, and follow-up inside EspoCRM.
  - Preserve sustainability narrative and community impact storytelling as key differentiators.
- **Primary Audiences**:
  - Eco-luxury couples, families, and remote professionals from feeder markets (Miami, NYC, Toronto, CDMX, Bogotá).
  - Purpose-driven volunteers and partners interested in community projects.
  - Returning guests seeking upgraded itineraries and bespoke service.
- **Value Pillars**:
  - Off-grid eco-luxury serviced by personalized concierge planning.
  - Farm-to-table dining at Blé Bar & Restaurant with locally sourced menus.
  - Curated experiences (marine wildlife, rainforest, wellness) plus impact opportunities with local communities.
  - Transparent sustainability metrics and volunteering pathways.
- **Digital Stack** (single Railway footprint):
  - **Frontend**: Next.js 15, React 19, Tailwind CSS v4, TypeScript strict mode, Turbopack for dev.
  - **CRM**: EspoCRM 9.2.2 containerized with PostgreSQL, persistent volume, cron automation.
  - **Communications**: Chatwoot widget, 3CX PBX (US + Panama numbers, WhatsApp integration).
  - **Automation**: n8n workflows bridging site, CRM, analytics, chat.
  - **Analytics**: GA4 via GTM, custom event helpers, consent-aware tracking.
- **Experience Blueprint**:
  - Sitemap pillars: Home, Rooms & Suites (+ details), Dining, Experiences, Sustainability & Impact, Plan Your Journey, Stories/Blog, Gallery, Contact & Booking with Spanish mirrors.
  - Dynamic CTAs and itinerary builders that adapt by scroll depth, geo, or exit intent.
  - Route-based i18n (`/` EN, `/es` ES) with mirrored layouts and localized content pipeline.
  - Booking widget embed or request flow tied to EspoCRM lead triage.
  - Accessibility baseline WCAG 2.1 AA, inclusive typography, high-contrast palette.
- **Brand & Tone**:
  - Visual keywords: coastal serenity, barefoot luxury, artisanal hospitality, eco-conscious craft.
  - Typography pairing: Playfair Display headlines, Source Sans body; warm sand/teal palette with golden accents.
  - Narrative voice: Warm, sophisticated, service-forward; blend indulgence with responsible travel.
- **Compliance & Data Handling**:
  - GDPR/CCPA aligned consent banner; honor opt-in preferences across site, CRM, chat.
  - Document data retention (24-month purges, anonymization upon request).
  - Maintain audit trails for communications and booking interactions.
- **Key Constraints / Guardrails**:
  - Keep shared content sources (`src/content/*.ts`) canonical; avoid drifting duplicates.
  - Maintain bilingual parity whenever new sections/components ship.
  - Preserve performance budgets for media-heavy pages (optimize images/video, lazy load).
  - Commit to accessibility, responsive breakpoints, and analytics instrumentation for all CTAs.
- **Launch Narrative** (deck alignment):
  - Notebook LM-driven content research, SERP intelligence, and competitor benchmarking feed sitemap and copy briefs.
  - Phased delivery: Oct 25–Nov 1 (SEO + Sitemap) → Nov 1–10 (Development) → Nov 10–14 (Testing) → Nov 15 launch.
  - Kickoff prerequisites: project email, media library, brand voice samples, keyword priorities, Railway stack approval.

> Treat this as the “North Star” reference. For sprint- or feature-specific nuance, use `active_context.md`.
