# Component Demo Page - User Guide

## Quick Start

### 1. Access the Demo
```bash
cd /workspace/apps/web
pnpm dev
```

Then open your browser to: **http://localhost:3000/component-demo**

### 2. Browse Components
- Scroll through the page to see all 24 components
- Components are organized by category:
  - Navigation
  - Hero
  - Features
  - Content
  - Blog
  - Carousel
  - Buttons
  - Forms
  - Cards
  - Footer

### 3. Select Components You Like
- Click the checkbox next to any component you want to use
- The header shows your running count (e.g., "5 / 24 selected")
- Components with checkmarks will have a blue ring highlight

### 4. Quick Actions
- **Select All**: Choose all 24 components at once
- **Clear All**: Deselect everything and start over
- **Category Links**: Jump to specific categories using the sticky nav

### 5. Export Your Selection
1. Click the red "Export Selection" button (enabled when 1+ components selected)
2. Review your selections in the popup modal
3. Click "Download JSON" to save a file like `component-selection-1731276543210.json`

## What's in the Export?

The exported JSON file contains:
```json
{
  "timestamp": "2025-11-10T12:34:56.789Z",
  "selectedCount": 8,
  "components": [
    {
      "id": "hero-split",
      "name": "Hero - Split Layout",
      "description": "Two-column: left text card with headline + CTA, right/background hero image",
      "category": "Hero"
    },
    // ... more components
  ]
}
```

## Using the Export

### Share with Your Team
- Email the JSON file to developers
- Attach to project management tickets
- Include in design review docs

### Track Decisions
- Keep exports dated to track design evolution
- Compare different selection sets
- Document rationale for component choices

### Implementation Planning
- Use the component list to create development tickets
- Estimate work based on selected components
- Prioritize implementation order

## Component Previews

Each component shows a **live preview** demonstrating:
- ✅ Brand colors from STYLEGUIDE.md
- ✅ Typography hierarchy
- ✅ Spacing and layout
- ✅ Hover states (try hovering!)
- ✅ Responsive behavior

### Note on Images
The preview uses placeholder gradients and colors. For production:
- Replace with actual resort photography
- Use stock images from Unsplash/Pexels
- Commission professional photos if needed

See `site-components-list.md` for image requirements.

## Design Specifications

All components follow the **Dolphin Blue Paradise Style Guide**:

### Colors
- Primary Ocean: `#0E8BA8`
- Deep Navy: `#1B2330`
- Warm Sand: `#F5EDE3`
- Golden Accent: `#C7A46B`
- Coral Highlight: `#D8684B`
- Cloud White: `#FFFFFF`
- Forest Canopy: `#3E5C4A`

### Typography
- Display: Playfair Display (serif)
- Body: Source Sans Pro or Lato
- All measurements in the style guide

### Spacing
Uses 8px grid: 8, 16, 24, 32, 48, 72, 96

## Mobile View

The demo page is responsive! Try:
1. Narrowing your browser window
2. Opening on mobile device
3. Using browser dev tools responsive mode

Components stack appropriately on smaller screens.

## Tips for Selection

### Start Broad
- Select all components initially
- Remove what you don't need
- Easier than adding one-by-one

### Think About Pages
- Homepage needs: Hero, Value Pillars, Testimonials, Footer
- Rooms page needs: Navigation, Cards, Footer
- Blog needs: Navigation, Blog Feed, Footer
- Contact needs: Navigation, Contact Form, Footer

### Consider Variants
Some components have variations:
- Nav: Transparent vs. Solid
- Hero: Split vs. Full Width
- Value Pillars: 3 vs. 4 columns
- Story Block: Image Left vs. Right
- Footer: Standard vs. Minimal

You can select multiple variants!

### Balance Variety
- Don't select EVERY variant
- Choose what fits your content
- Consider maintenance burden

## Feedback & Iteration

After reviewing selections:
1. **Keep**: Components that work perfectly
2. **Modify**: Components that need tweaks (note in comments)
3. **Remove**: Components that don't fit
4. **Add**: Missing components (document requirements)

## Next Steps After Selection

1. ✅ Export your selection JSON
2. ✅ Review with stakeholders
3. ✅ Gather actual images for selected components
4. ✅ Create implementation tickets
5. ✅ Prioritize development order
6. ✅ Build real components in codebase

## Troubleshooting

### Export Button Disabled?
- Must select at least 1 component
- Check that you've clicked some checkboxes

### Can't See Components?
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

### Styles Look Wrong?
- Clear browser cache
- Ensure Tailwind CSS is building
- Check that dev server is running

## Questions?

Refer to:
- `site-components-list.md` - Full component catalog
- `STYLEGUIDE.md` - Design specifications
- `SITEMAP.md` - Page architecture
- Component demo page code: `apps/web/src/app/component-demo/page.tsx`

---

**Happy component selecting!** 🎨🏝️

Make your choices, export your list, and let's build an amazing site together.
