# Dolphin Blue Paradise - Component Library

This document lists all the UI components available in the Component Demo page, based on the STYLEGUIDE.md specifications.

## How to Use the Demo Page

1. Navigate to `/component-demo` in your browser
2. Browse through all component previews organized by category
3. Check the boxes next to components you like
4. Click "Export Selection" to download a JSON file with your choices
5. Use the sticky header to track your selection count and navigate categories

## Component Categories

### Navigation (2 components)
- **Navigation Bar - Transparent**: Overlay nav for hero sections
- **Navigation Bar - Solid**: Standard nav with solid background

### Hero (2 components)
- **Hero - Split Layout**: Two-column with text card and image
- **Hero - Full Width**: Full-width image/video with overlay text

### Features (2 components)
- **Value Pillars - 4 Column**: Four-card feature grid
- **Value Pillars - 3 Column**: Three-card feature grid

### Content (3 components)
- **Story Block - Image Left**: Split layout with image on left
- **Story Block - Image Right**: Split layout with image on right
- **Testimonial Speech Bubble**: Quote bubble with Golden Accent background

### Blog (2 components)
- **Blog Feed - 2 Column**: List view with thumbnail and excerpt
- **Blog Feed - Grid**: Grid layout of blog cards

### Carousel (2 components)
- **Activity Carousel - 3 Tiles**: Three-tile carousel with overlays
- **Activity Carousel - 4 Tiles**: Four-tile carousel with overlays

### Buttons (3 components)
- **Primary CTA Button**: Ocean blue with hover to Golden Accent
- **Secondary CTA Button**: Outlined with hover fill
- **Tertiary Link**: Text-only link with underline on hover

### Forms (3 components)
- **Contact Form**: Full contact form with validation states
- **Newsletter Signup**: Compact email signup
- **Booking Request Form**: Multi-field booking inquiry with date pickers

### Cards (3 components)
- **Room Card**: Room listing with image, stats, and CTA
- **Experience Card**: Activity card with duration, difficulty, and booking
- **Generic Content Card**: Flexible card with Warm Sand background

### Footer (2 components)
- **Footer - Standard**: Multi-column footer with social icons
- **Footer - Minimal**: Compact footer with essential links

## Total Components: 24

## Brand Colors Used

- **Primary Ocean** (#0E8BA8): Main CTAs, links
- **Deep Navy** (#1B2330): Headers, text, footer backgrounds
- **Warm Sand** (#F5EDE3): Section backgrounds, cards
- **Golden Accent** (#C7A46B): Hover states, dividers, badges
- **Coral Highlight** (#D8684B): Secondary CTAs
- **Cloud White** (#FFFFFF): Card surfaces, backgrounds
- **Forest Canopy** (#3E5C4A): Sustainability elements

## Design Tokens

### Typography
- **Display/Heading**: Playfair Display (serif)
- **Body/UI**: Source Sans Pro or Lato (sans-serif)
- **Button**: Uppercase with letter-spacing 0.08em

### Spacing
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 72px
- **Card padding**: 24px minimum
- **Section padding**: 96px (desktop), 64px (tablet), 48px (mobile)

### Border Radius
- **Buttons**: 4-8px
- **Cards**: 8-12px  
- **Input fields**: 12px

### Shadows
- **Cards**: 0 8px 24px rgba(27,35,48,0.12)
- **Hover cards**: 0 16px 40px rgba(27,35,48,0.08)

### Transitions
- **Duration**: 200ms ease for hover/focus
- **Reveal animations**: 400ms with 120px threshold

## Responsive Breakpoints

- **Desktop**: 1200px+
- **Laptop**: 992px
- **Tablet**: 768px
- **Mobile**: 576px

## Accessibility Features

- ✓ Minimum 4.5:1 contrast ratio for body text
- ✓ 3:1 for large type
- ✓ Keyboard-accessible navigation
- ✓ Focus-visible states on all interactive elements
- ✓ Tap targets ≥48px height on mobile
- ✓ Alternative text for images

## Implementation Notes

### Stock Images Needed
For production implementation, source high-quality images for:
- Hero sections: Bay views, jungle canopy, resort exteriors
- Room cards: Each of the 4 room types
- Experience cards: Dolphin watching, snorkeling, jungle tours, dining
- Story blocks: Sustainability practices, community involvement
- Blog posts: Activity highlights, travel tips, culinary features

Recommended sources:
- Unsplash (free, high-quality)
- Pexels (free, commercial use)
- Resort's own photography
- Professional photographer session

### Component Variants
Many components support multiple layouts:
- Image left/right story blocks
- 3 or 4 column grids
- Transparent or solid navigation
- Standard or minimal footers

### Interactive States
All components include:
- ✓ Default state
- ✓ Hover state
- ✓ Focus state (keyboard navigation)
- ✓ Active/Selected state (where applicable)
- ✓ Disabled state (forms/buttons)
- ✓ Error/Success states (forms)

## Next Steps

1. Review components in the demo page
2. Select your preferred variations
3. Export your selection
4. Share the JSON file for implementation planning
5. Gather/commission actual photography
6. Build out real components in the codebase

## Demo Page Location

The component demo is available at:
- **Route**: `/component-demo`
- **File**: `apps/web/src/app/component-demo/page.tsx`

---

**Created**: November 10, 2025  
**Based on**: STYLEGUIDE.md Section 7 (Core Components)  
**Demo Status**: ✅ Complete and ready for review
