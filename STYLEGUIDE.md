# Dolphin Blue Paradise UI Style Guide

## 1. Brand Essence
- **Positioning:** Boutique eco-luxury resort delivering curated, sustainable experiences on Isla San Cristóbal.
- **Tone & Voice:** Warm, sophisticated, service-forward. Copy should balance indulgence with mindful travel and community impact.
- **Design Keywords:** Coastal serenity, barefoot luxury, artisanal hospitality, eco-conscious, bespoke adventures.

## 2. Color System
| Role | Hex | Sample Use | Notes |
| --- | --- | --- | --- |
| Primary Ocean | `#0E8BA8` | Hero overlays, key CTAs, links | Derived from Caribbean waters. Ensure 4.5:1 contrast on light backgrounds.
| Deep Navy | `#1B2330` | Header/footer backgrounds, body text on light cards | Grounding tone that adds sophistication.
| Warm Sand | `#F5EDE3` | Section backgrounds, card fills | Creates light/airy feel; pairs well with deep navy text.
| Golden Accent | `#C7A46B` | Icons, buttons hover, dividers | Echoes sunlit wood/locally crafted details.
| Coral Highlight | `#D8684B` | Secondary CTA, status states | Use sparingly to draw attention (e.g., “Plan Your Escape” badge).
| Cloud White | `#FFFFFF` | Card surfaces, primary background | Maintain generous whitespace.
| Forest Canopy | `#3E5C4A` | Sustainability callouts, badges | Reinforces eco credentials; ensure contrast on sand/white backgrounds.

**Accessibility:** Maintain minimum 4.5:1 contrast for body text, 3:1 for large type. Pair Golden Accent with Deep Navy text or overlays when used as background.

## 3. Typography
| Role | Typeface | Weight / Size | Usage |
| --- | --- | --- | --- |
| Display | "Playfair Display" or "Cormorant Garamond" | 600 / 48–64px | Hero headlines, campaign taglines.
| Primary Heading | "Playfair Display" | 600 / 36–40px | Section titles (Rooms, Activities, Facilities).
| Secondary Heading | "Source Sans Pro" or "Lato" | 600 / 24–28px | Subheads, card titles.
| Body Text | "Source Sans Pro" or "Lato" | 400 / 16–18px | Paragraphs, testimonials.
| Supporting Meta | "Source Sans Pro" | 400 / 14px | Captions, timestamps, labels.
| Button | Uppercase "Source Sans Pro" | 600 / 15–16px, letter-spacing 0.08em | Medium border radius 4px.

**Line heights:** Display/Heading 1.1–1.2, body 1.6, captions 1.4.

## 4. Iconography & Illustration
- Use simple, line-based icons with rounded corners reflecting Warm Sand/Golden Accent palette.
- Maintain consistent stroke width (~1.75px) and 24–32px bounding box.
- Illustrative flourishes (waves, leaves) should be subtle, monochrome outlines in Forest Canopy or Golden Accent.

## 5. Photography & Media
- Favor high-resolution imagery emphasizing water, jungle canopy, handcrafted cuisine, and intimate guest moments.
- Apply soft gradient overlay (`linear-gradient(180deg, rgba(27,35,48,0) 0%, rgba(27,35,48,0.55) 100%)`) on hero images to preserve text legibility.
- Use gallery tiles with 4px radius, drop shadow `0 8px 24px rgba(27,35,48,0.12)`.
- Maintain consistent color grading: warm whites, teal blues, natural greens. Avoid oversaturated filters.

## 6. Grid & Spacing
- **Grid:** 12-column responsive grid, 1120px max width on desktop, 80px outer gutters.
- **Baseline spacing scale:** 4 → 8 → 16 → 24 → 32 → 48 → 72px. Use multiples for vertical rhythm.
- **Card layout:** Minimum 24px internal padding; 32px gap between cards on desktop, 16px on tablet, 12px on mobile.
- **Section structure:** Top/bottom padding 96px desktop, 64px tablet, 48px mobile.

## 7. Core Components
### Navigation Bar
- Transparent overlay on hero, solid Cloud White or Deep Navy on scroll.
- Logo left, contact snippet + CTA (WhatsApp link or Book Now) right.
- Menu spacing: 24px between items; active state underline `2px` in Golden Accent.

### Hero / Welcome Block
- Two-column system: left text card (Playfair Display headline, body copy, CTA), right or background hero image.
- Card uses Warm Sand background with subtle shadow `0 16px 40px rgba(27,35,48,0.08)`.
- Primary CTA button (Ocean) with hover shift to Golden Accent; secondary text link in Deep Navy.

### Value Pillars (Features)
- Four-card row introducing Pristine Nature, Yacht Service, Culinary, Sustainability, etc.
- Icon above title, Golden Accent rule, body text 16px.
- On hover: subtle lift `translateY(-6px)` with shadow intensifying and icon fill shifting to Primary Ocean.

### Highlighted Story Blocks
- Split layout: full-width image on left, text column on right with layered Warm Sand card.
- Include testimonial speech bubble card using Golden Accent background + white text.

### Latest News / Blog Feed
- Two-column list with thumbnail on left, excerpt on right.
- Meta data (date, author) in Golden Accent small caps.
- Read more links in Primary Ocean with underline on hover.

### Activity Carousel
- Use three/four image tiles with overlay gradient and title tag. Add small icons representing activity type.

### Contact & Footer
- Footer background Deep Navy; links in Warm Sand or Cloud White.
- Contact form fields: 100% width, 12px radius, border `1px solid rgba(255,255,255,0.24)`.
- Include social icons (24px) enclosed in circular buttons using Primary Ocean.

## 8. Buttons & Interactions
| Style | Default | Hover | Focus |
| --- | --- | --- | --- |
| Primary CTA | Background `#0E8BA8`, text white, border none | Background `#C7A46B`, text Deep Navy | 2px outline `#FFFFFF` outside border + drop shadow `0 0 0 4px rgba(14,139,168,0.2)`.
| Secondary CTA | Outlined Deep Navy 2px, text Deep Navy, background transparent | Fill Warm Sand, text Deep Navy | 2px outline `#0E8BA8`.
| Tertiary Link | Text Primary Ocean, underline on hover | Primary Ocean underline | Focus underline persists + dotted outline.

### Micro-interactions
- Smooth 200ms ease for hover/focus transitions.
- Reveal animations (fade-up) for cards on scroll; use 120px threshold, 400ms duration to maintain premium feel.

## 9. Forms & Inputs
- Input background Cloud White, border `1px solid rgba(27,35,48,0.16)`.
- Label uppercase Source Sans 600 / 12px in Deep Navy.
- Placeholder text `rgba(27,35,48,0.4)`.
- Error state: border `#D8684B`, helper text 14px in same color; success border `#3E5C4A`.

## 10. Accessibility & Responsive Guidelines
- Provide keyboard-accessible navigation (focus-visible states, skip link).
- Breakpoints: 1200px+, 992px, 768px, 576px.
- Stack hero text above imagery on mobile; primary CTA remains first.
- Ensure tap targets ≥48px height.
- Provide alternative text for all images referencing location/activity.

## 11. Content & Messaging Tips
- Lead with experiential verbs (“Savor,” “Immerse,” “Escape”) followed by tangible benefits.
- Include sustainability proof points near bookings and activities.
- Use bilingual headings where relevant; maintain consistent layout for English and Spanish pages.

---
Use this guide as the north star for high-fidelity mockups, component library creation, and handoff to development. Update once actual brand photography and finalized typography licenses are confirmed.
