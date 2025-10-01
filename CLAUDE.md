# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for the Dolphin Blue Paradise website redesign - an eco-luxury resort in Panama. The project migrates from a legacy Wix site to a modern Next.js application with TypeScript and Tailwind CSS.

**Key characteristics:**
- Bilingual website (English/Spanish) with `/es/` route prefix for Spanish
- Tourism/hospitality focus with booking integration
- Eco-sustainability messaging and community impact content
- Mobile-responsive design with custom CSS variables

## Commands

### Development
```bash
# Start development server (web app only)
pnpm dev

# Start development server with Turbopack
cd apps/web && pnpm dev

# Install dependencies (monorepo root)
pnpm install
```

### Build & Test
```bash
# Build all apps
pnpm build

# Lint all projects
pnpm lint

# Format code across all projects
pnpm format

# Run tests (all projects)
pnpm test
```

### Wix CLI (legacy integration)
```bash
# Start Local Editor for Wix site preview
wix dev

# Sync types after package installation
wix sync-types
```

## Architecture

### Monorepo Structure
- **Root**: Workspace configuration with pnpm, shared dev dependencies
- **`apps/web/`**: Next.js 15 application with React 19
- **`packages/`**: Shared packages (currently empty)
- **`dolphinblueparadis-1/d/`**: Legacy Wix site data (JSON/HTML/media references)

### Web App Architecture (`apps/web/`)
- **Framework**: Next.js 15 with App Router, TypeScript, Tailwind CSS v4
- **Fonts**: Playfair Display (headings) + Source Sans 3 (body text)
- **Path aliases**: `@/*` maps to `./src/*`
- **Build**: Uses Turbopack for faster development builds

### Content Management
- Static data in `src/content/data.ts` (English) and `data-es.ts` (Spanish)
- Room configurations, dining schedules, activities, FAQs
- No headless CMS - content updates require code deployment

### Internationalization
- Route-based: `/` (English), `/es/*` (Spanish)
- Separate layouts: `src/app/layout.tsx` vs `src/app/es/layout.tsx`
- Component variants: `site-header.tsx` vs `site-header-es.tsx`

### Key Components
- **`SiteHeader`/`SiteFooter`**: Navigation with language toggle
- **`PageHero`**: Reusable hero sections with background images
- **`Card`**: Content cards with consistent styling
- **`TrackedLink`**: Analytics-enabled links
- **`BookingWidgetPlaceholder`**: Integration point for booking system

### Styling System
- **CSS Variables**: Custom properties in `globals.css` for colors/spacing
- **Tailwind**: Utility-first with custom theme extensions
- **Responsive**: Mobile-first design patterns

### Third-party Integrations
- **Google Tag Manager**: `GtmScript`/`GtmNoScript` components
- **Chatwoot**: Customer chat via `ChatwootScript`
- **Analytics**: Custom event tracking via `TrackedLink`

## Development Notes

### Content Updates
- Room details, pricing, and amenities: Edit `src/content/data.ts`
- Spanish translations: Edit `src/content/data-es.ts`
- Stories/testimonials: Edit `src/content/stories.ts`

### Adding New Pages
1. Create page component in `src/app/[page]/page.tsx`
2. Add Spanish version in `src/app/es/[page]/page.tsx`
3. Update navigation in `SiteHeader` components
4. Add route to content data files if needed

### Image Assets
- Place in `apps/web/public/images/`
- Reference as `/images/filename.jpg` in components
- Optimize for web delivery (WebP recommended)

### Component Development
- Follow existing patterns in `src/components/`
- Use TypeScript interfaces for props
- Implement responsive design with Tailwind classes
- Consider bilingual support for new components