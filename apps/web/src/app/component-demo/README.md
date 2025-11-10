# Component Demo Page

This page (`/component-demo`) showcases all the reusable UI components in the Dolphin Blue Paradise website project.

## Features

- **Interactive Component Gallery**: View live examples of all components
- **Selection Interface**: Checkboxes to select components you're interested in
- **Real-time Summary**: See your selected components in a list
- **Live Demonstrations**: Interactive examples of each component

## Available Components

### Layout Components
- **SiteHeader**: Navigation with logo, menu, and language switcher
- **SiteFooter**: Footer with links, social media, and contact info
- **PageHero**: Hero section with background image, title, and CTA

### Interactive Components
- **Button**: Primary/secondary buttons and links with tracking
- **TrackedLink**: Links with analytics event tracking
- **NewsletterPopup**: Modal popup for email signup

### Content Components
- **Card**: Container with card styling
- **BlogPostRenderer**: Rich content block renderer for blog posts
- **BookingWidgetPlaceholder**: Placeholder for booking system

### Integration Components
- **ChatwootScript**: Live chat widget integration
- **GtmScript**: Google Tag Manager integration

## Usage

1. Navigate to `/component-demo` in your browser
2. Browse the component gallery to see examples
3. Check the boxes next to components you want to use
4. View your selection summary in the right column
5. Use the selection list to plan your implementation

## Component Props & Customization

Each component has its own props and customization options. Refer to the individual component files in `/src/components/` for detailed prop interfaces and usage examples.

## Adding New Components

To add a new component to the demo:

1. Create the component file in `/src/components/`
2. Add an entry to `componentOptions` array in `page.tsx`
3. Add a demonstration section in the gallery
4. Update this README

## Stock Images

The demo uses existing project images. For production use, consider adding high-quality stock images from sources like:
- Unsplash (free)
- Pexels (free)
- Shutterstock (paid)
- Getty Images (paid)